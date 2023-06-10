export interface SegmentDisplay {
  clear(): void;
  setSegment(pin: string, on: boolean): void;
  setSegments(pins: string[], skipClear?: boolean): void;
}

export interface FluentSegmentDisplay<T extends FluentSegmentDisplay<T>> {
  withSegment(pin: string, on: boolean): T;
}
