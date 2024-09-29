import { SegmentDisplayController } from '../../segment-display';
import { Application } from './app';

export declare type DisplayCollection = {
  [displayName: string]: SegmentDisplayController;
};

export class RenderArgs<T extends DisplayCollection> {
  constructor(
    public readonly displays: T,
    public readonly now: Date,
    public readonly owner: Application<T>,
  ) {}

  changeScreen(screen: Screen<T>): void {
    this.owner.setScreen(screen);
  }

  get time(): number {
    return this.now.getTime();
  }
}

export class InputArgs<T extends DisplayCollection> {
  constructor(
    public readonly displays: T,
    public readonly now: Date,
    public readonly owner: Application<T>,
    public readonly input: KeyboardEvent,
  ) {}

  get time(): number {
    return this.now.getTime();
  }
}

export interface Screen<T extends DisplayCollection> {
  render(renderArgs: RenderArgs<T>): void;
}
