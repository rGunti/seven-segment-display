import {
  ColonDisplay,
  SegmentDisplayController,
  SixteenSegmentDisplay,
} from '../segment-display';
import { SIXTEEN_FONT, SIXTEEN_FONT_SPECIAL } from '../segment-display/fonts';

import { Logger } from '../log';
import { repeatArr } from '../utils';
import { Application, RenderArgs, Screen, WpeEventReceiver } from './base';
import { MainDisplayCollection } from './collection';
import { isWpeEnabled } from './plugins';
import { WelcomeScreen } from './screens';
import './style.scss';

const LOGGER = new Logger('App');
const WPE_LOGGER = new Logger('App.WPE');

export class App implements Application<MainDisplayCollection> {
  private readonly timeController: SegmentDisplayController;
  private readonly dateController: SegmentDisplayController;
  private readonly weekdayController: SegmentDisplayController;

  private readonly timeControllerRoot: HTMLElement;
  private readonly dateControllerRoot: HTMLElement;
  private readonly weekdayControllerRoot: HTMLElement;

  private readonly displays: MainDisplayCollection;
  private currentScreen: Screen<MainDisplayCollection> = new WelcomeScreen();

  private framerate: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tickTimer: any | undefined;

  constructor(appRoot: HTMLElement, framerate = 60) {
    LOGGER.debug('Creating app ...');
    this.framerate = framerate;

    this.timeControllerRoot = App.createDisplayContainer('time');
    this.timeController = new SegmentDisplayController(
      [
        new SixteenSegmentDisplay(this.timeControllerRoot),
        new SixteenSegmentDisplay(this.timeControllerRoot),
        new ColonDisplay(this.timeControllerRoot),
        new SixteenSegmentDisplay(this.timeControllerRoot),
        new SixteenSegmentDisplay(this.timeControllerRoot),
        new ColonDisplay(this.timeControllerRoot),
        new SixteenSegmentDisplay(this.timeControllerRoot),
        new SixteenSegmentDisplay(this.timeControllerRoot),
      ],
      SIXTEEN_FONT,
    );

    this.dateControllerRoot = App.createDisplayContainer('date');
    this.dateController = new SegmentDisplayController(
      repeatArr(() => new SixteenSegmentDisplay(this.dateControllerRoot), 20),
      SIXTEEN_FONT,
      SIXTEEN_FONT_SPECIAL,
    );

    this.weekdayControllerRoot = App.createDisplayContainer('date');
    this.weekdayController = new SegmentDisplayController(
      repeatArr(
        () => new SixteenSegmentDisplay(this.weekdayControllerRoot),
        20,
      ),
      SIXTEEN_FONT,
      SIXTEEN_FONT_SPECIAL,
    );

    this.displays = {
      main: this.timeController,
      date: this.dateController,
      weekday: this.weekdayController,
    };

    appRoot.appendChild(this.timeControllerRoot);
    appRoot.appendChild(this.dateControllerRoot);
    appRoot.appendChild(this.weekdayControllerRoot);
  }

  registerEvents(): void {
    if (isWpeEnabled()) {
      LOGGER.debug('Detected Wallpaper Engine, registering events');
      this.registerWpeEvents();
    }
  }

  private registerWpeEvents(): void {
    if (
      !window.wallpaperRegisterMediaPlaybackListener ||
      !window.wallpaperRegisterMediaTimelineListener ||
      !window.wallpaperRegisterMediaPropertiesListener ||
      !window.wallpaperRegisterMediaThumbnailListener
    ) {
      LOGGER.error('Tried to initialize WPE events outside of WPE!');
      return;
    }
    window.wallpaperRegisterMediaPlaybackListener((e) => {
      WPE_LOGGER.debug('Playback Status changed', e);
      const wpe = this.currentWpeEventReceiver;
      if (wpe) {
        wpe.onPlaybackChanged(e);
      }
    });
    window.wallpaperRegisterMediaTimelineListener((e) => {
      WPE_LOGGER.debug('Timeline changed', e);
      const wpe = this.currentWpeEventReceiver;
      if (wpe) {
        wpe.onTimelineChanged(e);
      }
    });
    window.wallpaperRegisterMediaPropertiesListener((e) => {
      WPE_LOGGER.debug('Media Properties changed', e);
      const wpe = this.currentWpeEventReceiver;
      if (wpe) {
        wpe.onPropertyChanged(e);
      }
    });
  }

  get currentScreenSupportsWpeEvents(): boolean {
    return (this.currentScreen as unknown as WpeEventReceiver)
      .supportsWpeEvents;
  }
  get currentWpeEventReceiver(): WpeEventReceiver | undefined {
    const screen = this.currentScreen as unknown as WpeEventReceiver;
    return screen.supportsWpeEvents ? screen : undefined;
  }

  startTicking(): void {
    if (this.tickTimer) {
      throw new Error('Tried to start ticking while already ticking!');
    }
    this.tickTimer = setInterval(() => this.tick(), 1000 / this.framerate);
  }

  stopTicking(): void {
    if (this.tickTimer) {
      clearTimeout(this.tickTimer);
    }
  }

  setScreen(screen: Screen<MainDisplayCollection>): void {
    this.currentScreen = screen;
  }

  private tick(): void {
    this.currentScreen.render(new RenderArgs(this.displays, new Date(), this));
  }

  private static createDisplayContainer(
    ...additionalClasses: string[]
  ): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('display');
    container.classList.add(...additionalClasses);
    return container;
  }
}
