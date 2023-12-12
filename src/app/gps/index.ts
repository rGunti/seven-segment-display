import {
  SegmentDisplayController,
  SixteenSegmentDisplay,
} from '../../segment-display';
import {
  SIXTEEN_FONT,
  SIXTEEN_FONT_SPECIAL,
} from '../../segment-display/fonts';
import { repeatArr } from '../../utils';
import {
  Application,
  DisplayCollection,
  GpsEventReceiver,
  RenderArgs,
  Screen,
} from '../base';
import { createDisplayContainer } from '../utils';
import { GpsScreen } from './screens';

import './gps.scss';

export declare type GpsCollection = DisplayCollection & {
  speed: SegmentDisplayController;
  altitude: SegmentDisplayController;
  accuracy: SegmentDisplayController;
  status: SegmentDisplayController;
};

export class GpsApp implements Application<GpsCollection> {
  private readonly collection: GpsCollection;

  private currentScreen: Screen<GpsCollection>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tickTimer: any | undefined;

  constructor(
    appRoot: HTMLElement,
    private readonly framerate = 30,
  ) {
    const speedRoot = createDisplayContainer('speed');
    const altitudeRoot = createDisplayContainer('auxiliary', 'altitude');
    const accuracyRoot = createDisplayContainer('auxiliary', 'accuracy');
    const statusRoot = createDisplayContainer('auxiliary', 'status');

    this.collection = {
      speed: new SegmentDisplayController(
        repeatArr(() => new SixteenSegmentDisplay(speedRoot), 3),
        SIXTEEN_FONT,
        SIXTEEN_FONT_SPECIAL,
      ),
      altitude: new SegmentDisplayController(
        repeatArr(() => new SixteenSegmentDisplay(altitudeRoot), 6),
        SIXTEEN_FONT,
        SIXTEEN_FONT_SPECIAL,
      ),
      accuracy: new SegmentDisplayController(
        repeatArr(() => new SixteenSegmentDisplay(accuracyRoot), 6),
        SIXTEEN_FONT,
        SIXTEEN_FONT_SPECIAL,
      ),
      status: new SegmentDisplayController(
        repeatArr(() => new SixteenSegmentDisplay(statusRoot), 20),
        SIXTEEN_FONT,
        SIXTEEN_FONT_SPECIAL,
      ),
    };
    this.currentScreen = new GpsScreen();

    appRoot.appendChild(speedRoot);
    appRoot.appendChild(altitudeRoot);
    appRoot.appendChild(accuracyRoot);
    appRoot.appendChild(statusRoot);
  }

  setScreen(screen: Screen<GpsCollection>): void {
    this.currentScreen = screen;
  }

  registerEvents(): void {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.watchPosition((position) => {
      if (
        (this.currentScreen as unknown as GpsEventReceiver).supportsGpsEvents
      ) {
        (this.currentScreen as unknown as GpsEventReceiver).onGpsDataChanged(
          position,
        );
      }
    });
  }

  startTicking(): void {
    if (this.tickTimer) {
      throw new Error('Tried to start ticking while already ticking!');
    }
    this.tickTimer = setInterval(() => this.tick(), 1000 / this.framerate);
  }

  private tick(): void {
    this.currentScreen.render(
      new RenderArgs(this.collection, new Date(), this),
    );
  }
}
