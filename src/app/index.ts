import dateFormat from 'dateformat';
import {
  ColonDisplay,
  SegmentDisplayController,
  SixteenSegmentDisplay,
} from '../segment-display';
import { SIXTEEN_FONT, SIXTEEN_FONT_SPECIAL } from '../segment-display/fonts';
import { center } from '../utils';

import './style.scss';

export class App {
  private readonly timeController: SegmentDisplayController;
  private readonly dateController: SegmentDisplayController;
  private readonly weekdayController: SegmentDisplayController;

  private readonly timeControllerRoot: HTMLElement;
  private readonly dateControllerRoot: HTMLElement;
  private readonly weekdayControllerRoot: HTMLElement;

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

  private tick(): void {
    const renderValue = App.getCurrentTimeAsString();
    this.timeController.show(renderValue);
    this.dateController.show(
      center(
        App.getCurrentDateAsString(),
        this.dateController.displayCount,
        this.dateController.specialChars
      )
    );
    this.weekdayController.show(
      center(
        `${dateFormat(new Date(), 'dddd')}`,
        this.weekdayController.displayCount,
        this.weekdayController.specialChars
      )
    );
  }

  private static createDisplayContainer(
    ...additionalClasses: string[]
  ): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('display');
    container.classList.add(...additionalClasses);
    return container;
  }

  private static getCurrentTimeAsString(): string {
    const now = new Date();
    const format = now.getMilliseconds() < 500 ? 'HH:MM:ss' : 'HH MM ss';
    return dateFormat(now, format);
  }

  private static getCurrentDateAsString(): string {
    return dateFormat(new Date(), 'dd. mmm. yyyy');
  }
}
