import { SegmentDisplay } from '.';
import { DIGIT_SEGMENTS } from './internal';

export class SegmentDisplayController {
  constructor(private readonly displays: SegmentDisplay[]) {}

  get displayCount(): number {
    return this.displays.length;
  }

  show(str: string): void {
    this.clear();

    for (let i = 0; i < this.displayCount; i++) {
      const display = this.displays[i];
      const strIdx = str.length - this.displayCount + i;
      if (strIdx < 0) {
        display.clear();
        continue;
      }

      const char = str[strIdx];
      //if (false && INTEGRATED_CHARS.indexOf(char) >= 0) {
      //  offset -= 1;
      //  strIdx -= 1;
      //  char = str[strIdx];
      //}

      const segments = DIGIT_SEGMENTS[char] || [];
      display.setSegments(segments);
    }
  }

  clear(): void {
    this.displays.forEach((display) => display.clear());
  }
}
