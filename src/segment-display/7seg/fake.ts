import { FluentSegmentDisplay, SegmentDisplay } from '..';

export class FakeSegmentDisplay
  implements SegmentDisplay, FluentSegmentDisplay<FakeSegmentDisplay>
{
  public readonly segments: Record<string, boolean> = {
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  };

  get activeSegments(): string[] {
    return Object.keys(this.segments).filter((key) => this.segments[key]);
  }

  clear(): void {
    Object.keys(this.segments).forEach((key) => {
      this.segments[key] = false;
    });
  }

  setSegment(pin: string, on: boolean): void {
    this.segments[pin] = on;
  }

  setSegments(pins: string[], skipClear?: boolean | undefined): void {
    if (!skipClear) {
      this.clear();
    }

    pins.forEach((pin) => this.setSegment(pin, true));
  }

  withSegment(pin: string, on: boolean): FakeSegmentDisplay {
    this.setSegment(pin, on);
    return this;
  }
}
