export interface InputHandler {
  readonly supportsInput: true;
  onInputReceived(e: KeyboardEvent): boolean | undefined;
}
