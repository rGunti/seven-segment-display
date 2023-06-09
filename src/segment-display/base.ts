export interface SegmentDisplay {
  clear(): void;
  setDigit(digit: string, skipClearingSegments?: boolean): void;
}

export interface FluentSegmentDisplay<T extends FluentSegmentDisplay<T>> {
  withDigit(digit: string, skipClearingSegments?: boolean): T;
}
