import { SegmentDisplay } from '..';
import { DIGIT_SEGMENTS, SegmentId } from '../internal';

export class SevenSegmentDigit implements SegmentDisplay {
  private readonly segments: Record<string, HTMLElement | null>;
  private readonly parent: HTMLElement;

  constructor(target: HTMLElement) {
    this.segments = {
      a: SevenSegmentDigit.generateSegment('a'),
      b: SevenSegmentDigit.generateSegment('b'),
      c: SevenSegmentDigit.generateSegment('c'),
      d: SevenSegmentDigit.generateSegment('d'),
      e: SevenSegmentDigit.generateSegment('e'),
      f: SevenSegmentDigit.generateSegment('f'),
      g: SevenSegmentDigit.generateSegment('g'),
    };
    this.parent = SevenSegmentDigit.generateParent();

    this.insertSegmentsOn(target);
  }

  private static generateParent(): HTMLElement {
    const element = document.createElement('div');
    element.classList.add('segment-container', 'segment-container-7');
    return element;
  }

  private static generateSegment(segmentId: SegmentId): HTMLElement {
    const element = document.createElement('div');
    element.classList.add('segment', `segment-${segmentId}`);
    return element;
  }

  private insertSegmentsOn(target: HTMLElement): void {
    target.appendChild(this.parent);

    Object.values(this.segments).forEach((segment) => {
      if (segment) {
        this.parent.appendChild(segment);
      }
    });
  }

  setSegment(pin: string, on: boolean): void {
    const el = this.segments[pin];
    if (!el) {
      return;
    }
    if (on) {
      el.classList.add('on');
    } else {
      el.classList.remove('on');
    }
  }

  setSegments(pins: string[], skipClear?: boolean | undefined): void {
    if (!skipClear) {
      this.clear();
    }

    pins.forEach((pin) => this.setSegment(pin, true));
  }

  setDigit(digit: string, skipClearingSegments?: boolean): void {
    if (!skipClearingSegments) {
      this.clear();
    }

    const segmentsToDisplay = DIGIT_SEGMENTS[digit] || [];
    segmentsToDisplay.forEach((segmentId) => {
      this.setSegment(segmentId, true);
    });
  }

  clear(): void {
    Object.keys(this.segments).forEach((seg) => {
      this.setSegment(seg as SegmentId, false);
    });
  }
}
