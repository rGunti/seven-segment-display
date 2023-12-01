import { ClockScreen } from '.';
import { center } from '../../utils';
import { RenderArgs, Screen } from '../base';
import { MainDisplayCollection } from '../collection';

const WELCOME_TEXT = 'WELCOME';

export class WelcomeScreen implements Screen<MainDisplayCollection> {
  private currentFrame = -1;
  private lastFrameChange = 0;
  private expectedFrameTime = 1000 / 25;

  render(renderArgs: RenderArgs<MainDisplayCollection>): void {
    this.advanceFrame();

    const display = renderArgs.displays.date;
    display.show(
      center(WELCOME_TEXT, display.displayCount, display.specialChars),
    );

    if (this.currentFrame === WELCOME_TEXT.length - 1) {
      renderArgs.changeScreen(new ClockScreen());
    }
  }

  private advanceFrame(): void {
    const now = new Date().getTime();
    if (
      this.currentFrame >= 0 &&
      now - this.lastFrameChange < this.expectedFrameTime
    ) {
      return;
    }
    this.currentFrame = (this.currentFrame + 1) % WELCOME_TEXT.length;
    this.lastFrameChange = now;
  }
}
