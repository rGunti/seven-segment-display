export interface GpsEventReceiver {
  readonly supportsGpsEvents: true;
  onGpsDataChanged(event: GeolocationPosition): void;
}
