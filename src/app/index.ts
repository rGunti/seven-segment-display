import {
  ColonDisplay,
  SegmentDisplayController,
  SixteenSegmentDisplay,
} from '../segment-display';
import { SIXTEEN_FONT, SIXTEEN_FONT_SPECIAL } from '../segment-display/fonts';

import './style.scss';
import {
  Application,
  MainDisplayCollection,
  RenderArgs,
  Screen,
  WelcomeScreen,
} from './startup';

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
      SIXTEEN_FONT
    );

    this.dateControllerRoot = App.createDisplayContainer('date');
    this.dateController = new SegmentDisplayController(
      [
        new SixteenSegmentDisplay(this.dateControllerRoot),
        new SixteenSegmentDisplay(this.dateControllerRoot),
        new SixteenSegmentDisplay(this.dateControllerRoot),
        new SixteenSegmentDisplay(this.dateControllerRoot),
        new SixteenSegmentDisplay(this.dateControllerRoot),
        new SixteenSegmentDisplay(this.dateControllerRoot),
        new SixteenSegmentDisplay(this.dateControllerRoot),
        new SixteenSegmentDisplay(this.dateControllerRoot),
        new SixteenSegmentDisplay(this.dateControllerRoot),
        new SixteenSegmentDisplay(this.dateControllerRoot),
        new SixteenSegmentDisplay(this.dateControllerRoot),
      ],
      SIXTEEN_FONT,
      SIXTEEN_FONT_SPECIAL
    );

    this.weekdayControllerRoot = App.createDisplayContainer('date');
    this.weekdayController = new SegmentDisplayController(
      [
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
        new SixteenSegmentDisplay(this.weekdayControllerRoot),
      ],
      SIXTEEN_FONT,
      SIXTEEN_FONT_SPECIAL
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
