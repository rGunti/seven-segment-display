import dateFormat from 'dateformat';
import { SegmentDisplayController } from '../segment-display';
import { center } from '../utils';

export const WELCOME_ANIMATION = [
  // 345678901
  '           ',
  '          W',
  '         WE',
  '        WEL',
  '       WELC',
  '      WELCO',
  '     WELCOM',
  '    WELCOME',
  '   WELCOME ',
  '  WELCOME  ',
  ' WELCOME   ',
  'WELCOME    ',
  'ELCOME     ',
  'LCOME      ',
  'COME       ',
  'OME        ',
  'ME         ',
  'E          ',
  '           ',
  '           ',
];

export declare type DisplayCollection = {
  [displayName: string]: SegmentDisplayController;
};

export declare type MainDisplayCollection = DisplayCollection & {
  main: SegmentDisplayController;
  date: SegmentDisplayController;
  weekday: SegmentDisplayController;
};

export interface Application<T extends DisplayCollection> {
  setScreen(screen: Screen<T>): void;
}

export class RenderArgs<T extends DisplayCollection> {
  constructor(
    public readonly displays: T,
    public readonly now: Date,
    public readonly owner: Application<T>
  ) {}

  changeScreen(screen: Screen<T>): void {
    this.owner.setScreen(screen);
  }
}

export interface Screen<T extends DisplayCollection> {
  render(renderArgs: RenderArgs<T>): void;
}

export class WelcomeScreen implements Screen<MainDisplayCollection> {
  private currentFrame = -1;
  private lastFrameChange = 0;
  private expectedFrameTime = 1000 / 5;

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    this.advanceFrame();
    renderArgs.displays.date.show(WELCOME_ANIMATION[this.currentFrame]);

    if (this.currentFrame === WELCOME_ANIMATION.length - 1) {
      renderArgs.changeScreen(new ClockScreen());
    }
  }

  private advanceFrame(): void {
    const now = new Date().getTime();
    if (
      this.currentFrame >= 0 &&
      now - this.lastFrameChange < this.expectedFrameTime
    ) {
      return;
    }
    this.currentFrame = (this.currentFrame + 1) % WELCOME_ANIMATION.length;
    this.lastFrameChange = now;
  }
}

export class ClockScreen implements Screen<MainDisplayCollection> {
  private bootAnimationCompleted = false;
  private showTime = true;
  private showDate = false;
  private showWeekday = false;

  private readonly bootTime = new Date().getTime();

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    const { displays, now } = renderArgs;
    if (this.showTime) {
      displays.main.show(
        dateFormat(now, now.getMilliseconds() < 500 ? 'HH:MM:ss' : 'HH MM ss')
      );
    }

    if (this.showDate) {
      displays.date.show(
        center(
          dateFormat(now, 'dd. mmm. yyyy'),
          displays.date.displayCount,
          displays.date.specialChars
        )
      );
    }

    if (this.showWeekday) {
      displays.weekday.show(
        center(
          `${dateFormat(now, 'dddd')}`,
          displays.weekday.displayCount,
          displays.weekday.specialChars
        )
      );
    }

    if (!this.bootAnimationCompleted) {
      this.processBootAnimation(now.getTime());
    }
  }

  private processBootAnimation(now: number): void {
    const timeDelta = now - this.bootTime;
    this.showDate = timeDelta > 100;
    this.showWeekday = timeDelta > 200;
  }
}
