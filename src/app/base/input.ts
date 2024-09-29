import { DisplayCollection, InputArgs } from './screen';

export interface InputHandler<T extends DisplayCollection> {
  readonly supportsInput: true;
  onInputReceived(e: InputArgs<T>): boolean | undefined;
}
