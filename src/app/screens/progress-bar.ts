import { ClockScreen } from '.';
import { left, repeat } from '../../utils';
import { InputArgs, InputHandler, RenderArgs, Screen } from '../base';
import { MainDisplayCollection } from '../collection';

export class ProgressBarScreen
  implements Screen<MainDisplayCollection>, InputHandler<MainDisplayCollection>
{
  readonly supportsInput = true;

  private moveToScreen: Screen<MainDisplayCollection> | null = null;
  private currentValue = 0.0;
  private stepWidth = 0.001;

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    if (this.moveToScreen) {
      renderArgs.changeScreen(this.moveToScreen);
      return;
    }

    renderArgs.displays.main.show(`${this.currentValue.toFixed(2)}`);
    renderArgs.displays.date.show(
      this.renderReverseProgressBar(renderArgs.displays.date.displayCount),
    );
    renderArgs.displays.weekday.show(
      left(
        this.renderProgressBar(renderArgs.displays.weekday.displayCount),
        renderArgs.displays.weekday.displayCount,
        renderArgs.displays.weekday.specialChars,
      ),
    );

    const newValue = this.currentValue + this.stepWidth;
    if (newValue >= 1.0 || newValue <= 0.0) {
      this.stepWidth *= -1;
    }
    this.currentValue = Math.min(1.0, Math.max(0.0, newValue));
  }

  onInputReceived(e: InputArgs<MainDisplayCollection>): boolean | undefined {
    switch (e.input.key) {
      case 'Escape':
        this.moveToScreen = new ClockScreen();
        return;
    }
  }

  private renderProgressBar(displayCount: number): string {
    const blockDivisions = 5;
    const barLength = Math.ceil(
      Math.min(1, this.currentValue) * displayCount * blockDivisions,
    );
    const fullBlocks = Math.floor(barLength / blockDivisions);
    const partialBlockSize = barLength % blockDivisions;

    return (
      repeat('\x05', fullBlocks) +
      this.renderPartialBlock(partialBlockSize, false)
    );
  }

  private renderReverseProgressBar(displayCount: number): string {
    const blockDivisions = 5;
    const barLength = Math.ceil(
      Math.min(1, this.currentValue) * displayCount * blockDivisions,
    );
    const fullBlocks = Math.ceil(barLength / blockDivisions);
    const partialBlockSize = barLength % blockDivisions;

    return (
      this.renderPartialBlock(partialBlockSize, true) +
      repeat('\x05', displayCount - fullBlocks)
    );
  }

  private renderPartialBlock(level: number, reverse: boolean): string {
    if (level === 0) {
      return '';
    }
    return String.fromCharCode(reverse ? level + 5 : level);
  }
}
