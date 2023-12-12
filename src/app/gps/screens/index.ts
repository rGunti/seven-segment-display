import { GpsCollection } from '..';
import { GpsEventReceiver, RenderArgs, Screen } from '../../base';

export class GpsScreen implements Screen<GpsCollection>, GpsEventReceiver {
  readonly supportsGpsEvents = true;

  private lastLocation: GeolocationPosition | undefined = undefined;

  render(renderArgs: RenderArgs<GpsCollection>): void {
    const { displays } = renderArgs;

    if (!this.lastLocation) {
      this.renderUnknownLocation(displays);
      return;
    }

    this.renderLocation(displays);
  }

  private renderUnknownLocation(displays: GpsCollection): void {
    displays.speed.show('---');
    displays.altitude.show('---- m');
    displays.accuracy.show('---- m');
    displays.status.show('WAIT FOR FIX');
  }

  private renderLocation(displays: GpsCollection): void {
    if (!this.lastLocation) {
      return;
    }

    const speed = (this.lastLocation.coords.speed ?? 0) * 3.6;
    displays.speed.show(`${speed.toFixed(0)}`);

    if (this.lastLocation?.coords.altitudeAccuracy) {
      displays.altitude.show(
        `${this.lastLocation.coords.altitude?.toFixed(0)} m`,
      );
    } else {
      displays.altitude.show(`---- m`);
    }

    displays.accuracy.show(
      `${this.lastLocation?.coords.accuracy.toFixed(0)} m`,
    );

    displays.status.show(
      `Update ${new Date(this.lastLocation?.timestamp).toLocaleTimeString()}`,
    );
  }

  onGpsDataChanged(event: GeolocationPosition): void {
    console.log(event);
    this.lastLocation = event;
  }
}
