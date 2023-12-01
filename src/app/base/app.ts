import { DisplayCollection, Screen } from './screen';

export interface Application<T extends DisplayCollection> {
  setScreen(screen: Screen<T>): void;
}
