import { SegmentDisplay } from '.';
import { DIGIT_SEGMENTS, INTEGRATED_CHARS } from './internal';

export class SegmentDisplayController {
  constructor(public readonly displays: SegmentDisplay[]) {}

  get displayCount(): number {
    return this.displays.length;
  }

  show(str: string): void {
    this.clear();

    let offset = 0; /* str
      .split('')
      .filter((c) => INTEGRATED_CHARS.indexOf(c) >= 0).length*/
    for (let i = this.displayCount - 1; i >= 0; i--) {
      const display = this.displays[i];
      const strIdx = str.length - this.displayCount + i - offset;
      if (strIdx < 0) {
        display.clear();
        continue;
      }

      let chars = str[strIdx];
      if (INTEGRATED_CHARS.indexOf(chars) >= 0 && strIdx > 0) {
        offset += 1;
        chars += str[strIdx - 1];
      }

      const segments = chars
        .split('')
        .flatMap((char) => DIGIT_SEGMENTS[char] || []);
      display.setSegments(segments);
    }
  }

  clear(): void {
    this.displays.forEach((display) => display.clear());
  }
}
