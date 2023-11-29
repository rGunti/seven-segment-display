import dateFormat from 'dateformat';
import { SegmentDisplayController } from '../segment-display';
import { center, limit } from '../utils';
import {
  WallpaperMediaPlaybackEvent,
  WallpaperMediaPropertiesEvent,
  WallpaperMediaTimelineEvent,
} from 'wallpaper-engine-types';
import { Logger } from '../log';

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
    public readonly owner: Application<T>,
  ) {}

  changeScreen(screen: Screen<T>): void {
    this.owner.setScreen(screen);
  }
}

export interface Screen<T extends DisplayCollection> {
  render(renderArgs: RenderArgs<T>): void;
}

export interface WpeEventReceiver {
  readonly supportsWpeEvents: boolean;
  onTimelineChanged(event: WallpaperMediaTimelineEvent): void;
  onPlaybackChanged(event: WallpaperMediaPlaybackEvent): void;
  onPropertyChanged(event: WallpaperMediaPropertiesEvent): void;
}

export class WelcomeScreen implements Screen<MainDisplayCollection> {
  private currentFrame = -1;
  private lastFrameChange = 0;
  private expectedFrameTime = 1000 / 10;

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
        dateFormat(now, now.getMilliseconds() < 500 ? 'HH:MM:ss' : 'HH MM ss'),
      );
    }

    if (this.showDate) {
      displays.date.show(
        center(
          dateFormat(now, 'dd. mmm. yyyy'),
          displays.date.displayCount,
          displays.date.specialChars,
        ),
      );
    }

    if (this.showWeekday) {
      displays.weekday.show(
        center(
          `${dateFormat(now, 'dddd')}`,
          displays.weekday.displayCount,
          displays.weekday.specialChars,
        ),
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

export const WPE_MP_LOGGER = new Logger('WpeMusicPlayer');

export class WpeMusicPlayer
  implements Screen<MainDisplayCollection>, WpeEventReceiver
{
  readonly supportsWpeEvents = true;

  private lastTimelineEvent: WallpaperMediaTimelineEvent | undefined;
  private lastTimelineEventReceived = 0;
  private timelineSkew = 0;
  private lastPlaybackEvent: WallpaperMediaPlaybackEvent | undefined;
  //private lastPlaybackEventReceived = 0;
  private lastPropertiesEvent: WallpaperMediaPropertiesEvent | undefined;
  //private lastPropertiesEventReceived = 0;

  //private songStartedAt = 0;

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    const { displays } = renderArgs;
    const now = renderArgs.now.getTime();

    const isPaused = this.lastPlaybackEvent?.state === 2;
    const showFlashText = Math.floor(now / 1000) % 2 === 0;

    if (isPaused && showFlashText) {
      displays.main.show('');
    } else if (this.lastTimelineEvent && this.lastTimelineEvent.duration > 0) {
      const { position } = this.lastTimelineEvent;
      const offset =
        this.lastTimelineEventReceived > 0 &&
        this.lastPlaybackEvent?.state !== 2
          ? now - this.lastTimelineEventReceived
          : 0;
      // If we're paused, we negate the offset for later
      const skew = this.lastPlaybackEvent?.state !== 2 ? this.timelineSkew : 0;
      const time = WpeMusicPlayer.formatTime(
        Math.round((position * 1000 + offset - skew) / 1000),
      );
      displays.main.show(time);
    } else {
      displays.main.show('R EA DY');
    }

    displays.date.show(
      isPaused && showFlashText
        ? center(
            '< PAUSE >',
            displays.date.displayCount,
            displays.date.specialChars,
          )
        : limit(
            this.lastPropertiesEvent?.title || '',
            displays.date.displayCount,
            displays.date.specialChars,
          ),
    );
    displays.weekday.show(
      isPaused && showFlashText
        ? ''
        : limit(
            this.lastPropertiesEvent?.artist || '',
            displays.date.displayCount,
            displays.date.specialChars,
          ),
    );
  }

  private static formatTime(time: number): string {
    // Takes the number of seconds and formats it into the format HH:mm:ss, including padding 0
    // eslint-disable-next-line no-bitwise
    const hours = ~~(time / 3600);
    // eslint-disable-next-line no-bitwise
    const minutes = ~~((time % 3600) / 60);
    // eslint-disable-next-line no-bitwise
    const seconds = ~~time % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  onTimelineChanged(event: WallpaperMediaTimelineEvent): void {
    const now = new Date().getTime();
    if (this.lastTimelineEventReceived > 0) {
      const positionDiff =
        (event.position - (this.lastTimelineEvent?.position || 0)) * 1000;
      const eventTimeDiff =
        positionDiff <= 0 ? 0 : now - this.lastTimelineEventReceived;
      const skew = positionDiff - eventTimeDiff;
      WPE_MP_LOGGER.debug('Calculated time diff', {
        positionDiff,
        eventTimeDiff: now - this.lastTimelineEventReceived,
        skew,
        lastTimelineEventReceived: this.lastTimelineEventReceived,
        lastTimelineEventUpdateDiff: this.timelineSkew,
        now,
      });
      this.timelineSkew =
        Math.abs(skew) > 1500 ? 0 : Math.max(Math.min(500, skew), -500);
    }

    this.lastTimelineEvent = event;
    this.lastTimelineEventReceived = now;
  }

  onPlaybackChanged(event: WallpaperMediaPlaybackEvent): void {
    if (this.lastPlaybackEvent?.state === 2 && event.state == 1 /* playing */) {
      this.lastTimelineEventReceived = new Date().getTime();
    }
    this.lastPlaybackEvent = event;
    //this.lastPlaybackEventReceived = new Date().getTime();
  }

  onPropertyChanged(event: WallpaperMediaPropertiesEvent): void {
    this.lastPropertiesEvent = event;
    //this.lastPropertiesEventReceived = new Date().getTime();
  }
}
