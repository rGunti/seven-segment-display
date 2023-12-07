import { SegmentDisplayController } from '../../segment-display';
import { calcStringLength, scrollToPosition } from '../../utils';
import { RenderArgs, Screen } from '../base';
import { MainDisplayCollection } from '../collection';

export class TextScrollerScreen implements Screen<MainDisplayCollection> {
  private textLines: string[] = [
    'This is a long text that should be scrolling across the display',
    'Short Text',
    'This is another long text that should be scrolling across the display',
    'Short Text',
    'This is a third long text that should be scrolling across the display',
    'Short Text',
    'This is a fourth long text that should be scrolling across the display',
    'Short Text',
  ];
  private currentLine = 0;
  private lastPageFlip = 0;
  private scrollPos = -1;
  private lastScrollPosUpdate = 0;

  constructor(
    private readonly scrollSpeed: number = 500,
    private readonly minFlipTime: number = 5_000,
  ) {}

  updateText(lines: string[]): void {
    this.textLines = lines;
    this.currentLine = 0;
    this.scrollPos = -20;
    this.lastScrollPosUpdate = Date.now();
    this.lastPageFlip = Date.now();
  }

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    if (this.lastPageFlip === 0) {
      this.lastPageFlip = renderArgs.now.getTime();
    }

    const { displays } = renderArgs;
    this.renderCurrentText(displays.date);
    this.renderDebugLine(displays.weekday, renderArgs.now.getTime());
    this.calculate(renderArgs);
  }

  private get currentLineText(): string {
    return this.textLines[this.currentLine];
  }

  private renderCurrentText(display: SegmentDisplayController): void {
    const textToDisplay = scrollToPosition(
      this.currentLineText,
      display.displayCount,
      display.specialChars,
      this.scrollPos,
    );
    display.show(textToDisplay);
  }

  private renderDebugLine(
    display: SegmentDisplayController,
    now: number,
  ): void {
    display.show(
      [
        `L${this.currentLine.toString().padStart(2, ' ')}`,
        `P${this.scrollPos.toString().padStart(3, ' ')}`,
        `T${(Math.min(now - this.lastScrollPosUpdate, 9_990) / 1_000)
          .toFixed(2)
          .padStart(4, ' ')}`,
        `F${(Math.min(now - this.lastPageFlip, 99_990) / 1_000)
          .toFixed(1)
          .padStart(4, ' ')}`,
      ].join('|'),
    );
  }

  private calculate(renderArgs: RenderArgs<MainDisplayCollection>): void {
    this.advanceScrollPosition(
      renderArgs.now.getTime(),
      renderArgs.displays.date,
    );

    if (this.scrollPos >= this.currentLineText.length) {
      this.advanceText(renderArgs.now.getTime(), renderArgs.displays.date);
    }
  }

  private advanceScrollPosition(
    now: number,
    display: SegmentDisplayController,
  ): void {
    const textLength = calcStringLength(
      this.currentLineText,
      new Set(display.font.characters),
    );
    if (textLength <= display.displayCount) {
      if (now - this.lastPageFlip > this.minFlipTime) {
        this.advanceText(now, display);
      }
      return;
    }

    if (now - this.lastScrollPosUpdate > this.scrollSpeed) {
      this.scrollPos += 1;
      this.lastScrollPosUpdate = now;
    }
  }

  private advanceText(now: number, display: SegmentDisplayController): void {
    this.currentLine = (this.currentLine + 1) % this.textLines.length;
    this.lastPageFlip = now;
    this.lastScrollPosUpdate = now;

    const textLength = calcStringLength(
      this.currentLineText,
      new Set(display.font.characters),
    );
    this.scrollPos =
      textLength <= display.displayCount ? 0 : -display.displayCount;
  }
}
