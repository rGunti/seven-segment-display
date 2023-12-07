import { SegmentDisplay } from '.';
import { DEFAULT_KEY, SegmentDisplayFont } from './fonts';

export class SegmentDisplayController {
  constructor(
    public readonly displays: SegmentDisplay[],
    public readonly font: SegmentDisplayFont<string>,
    public readonly specialChars: Set<string> = new Set<string>(),
  ) {}

  get displayCount(): number {
    return this.displays.length;
  }

  show(str: string): void {
    this.clear();

    let offset = 0;
    for (let i = this.displayCount - 1; i >= 0; i--) {
      const display = this.displays[i];
      const strIdx = str.length - this.displayCount + i - offset;
      if (strIdx < 0) {
        display.clear();
        continue;
      }

      let chars = str[strIdx];
      if (this.specialChars.has(chars) && strIdx > 0) {
        offset += 1;
        chars += str[strIdx - 1];
      }

      const segments = chars
        .split('')
        .flatMap((char) => this.font[char] || this.font[DEFAULT_KEY] || []);
      display.setSegments(segments);
    }
  }

  clear(): void {
    this.displays.forEach((display) => display.clear());
  }
}
