import { SegmentDisplay } from '..';
import { DIGIT_SEGMENTS, SegmentId } from './internal';

export class SevenSegmentDigit implements SegmentDisplay {
  private readonly segments: Record<SegmentId, HTMLElement>;
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
      this.parent.appendChild(segment);
    });
  }

  private setSegment(segment: SegmentId, state: boolean): void {
    const el = this.segments[segment];
    if (state) {
      el.classList.add('on');
    } else {
      el.classList.remove('on');
    }
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
