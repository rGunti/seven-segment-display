import { SegmentDisplayController } from '../segment-display';
import { DisplayCollection } from './base';

export declare type MainDisplayCollection = DisplayCollection & {
  main: SegmentDisplayController;
  date: SegmentDisplayController;
  weekday: SegmentDisplayController;
};
