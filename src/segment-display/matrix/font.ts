import { MATRIX_SEGMENT_IDS } from '.';
import { DEFAULT_KEY, SegmentDisplayFont } from '../fonts';

export declare type MatrixSegmentId = string;

export const MATRIX_FONT: SegmentDisplayFont<MatrixSegmentId> = {
  [DEFAULT_KEY]: ['a7', 'b7', 'c7', 'd7', 'e7'],
  '§': MATRIX_SEGMENT_IDS.map((seg) => seg.id),
  '0': [
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'b1',
    'b3',
    'b7',
    'c1',
    'c4',
    'c7',
    'd1',
    'd5',
    'd7',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
  ],
  '1': ['c1', 'b2', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'b7', 'd7'],
  '2': [
    'a2',
    'b1',
    'c1',
    'd1',
    'e2',
    'e3',
    'd4',
    'c5',
    'b6',
    'a7',
    'b7',
    'c7',
    'd7',
    'e7',
  ],
  '3': [
    'a2',
    'b1',
    'c1',
    'd1',
    'e2',
    'e3',
    'd4',
    'c4',
    'e5',
    'e6',
    'd7',
    'c7',
    'b7',
    'a6',
  ],
  '4': [
    'd1',
    'd2',
    'd3',
    'd4',
    'd5',
    'd6',
    'd7',
    'c2',
    'b3',
    'a4',
    'a5',
    'b5',
    'c5',
    'd5',
    'e5',
  ],
  '5': [
    'a1',
    'b1',
    'c1',
    'd1',
    'e1',
    'a2',
    'a3',
    'b3',
    'c3',
    'd3',
    'e4',
    'e5',
    'e6',
    'd7',
    'c7',
    'b7',
    'a6',
  ],
  '6': [
    'd1',
    'c1',
    'b2',
    'a3',
    'a4',
    'a5',
    'a6',
    'b7',
    'c7',
    'd7',
    'e6',
    'e5',
    'd4',
    'c4',
    'b4',
  ],
  '7': ['a1', 'b1', 'c1', 'd1', 'e1', 'e2', 'e3', 'd4', 'c5', 'b6', 'a7'],
  '8': [
    'a2',
    'a3',
    'b1',
    'c1',
    'd1',
    'e2',
    'e3',
    'd4',
    'c4',
    'b4',
    'a5',
    'a6',
    'c7',
    'd7',
    'e6',
    'e5',
    'd4',
    'c4',
    'b4',
    'b7',
  ],
  '9': [
    'e2',
    'e3',
    'd4',
    'c4',
    'b4',
    'a3',
    'a2',
    'b1',
    'c1',
    'd1',
    'e2',
    'e3',
    'd4',
    'e4',
    'e5',
    'd6',
    'c7',
    'b7',
  ],
  ' ': [],
  '.': ['b6', 'b7', 'c6', 'c7'],
  ':': ['b2', 'b3', 'c2', 'c3', 'b6', 'b7', 'c6', 'c7'],
  ';': ['b2', 'b3', 'c2', 'c3', 'b5', 'c5', 'c6', 'b7'],
  '/': ['e2', 'd3', 'c4', 'b5', 'a6'],
  '\\': ['a2', 'b3', 'c4', 'd5', 'e6'],
  '-': ['a4', 'b4', 'c4', 'd4', 'e4'],
  _: ['a7', 'b7', 'c7', 'd7', 'e7'],
  '!': ['c1', 'c2', 'c3', 'c4', 'c5', 'c7'],
  '?': ['a2', 'b1', 'c1', 'd1', 'e2', 'e3', 'd4', 'c5', 'c7'],
  A: [
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'b1',
    'c1',
    'd1',
    'b4',
    'c4',
    'd4',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
  ],
  B: [
    'b1',
    'b2',
    'b3',
    'b4',
    'b5',
    'b6',
    'b7',
    'a1',
    'c1',
    'd1',
    'c4',
    'd4',
    'a7',
    'c7',
    'd7',
    'e2',
    'e3',
    'e5',
    'e6',
  ],
  C: [
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'b1',
    'c1',
    'd1',
    'e2',
    'b7',
    'c7',
    'd7',
    'e6',
  ],
  D: [
    'b1',
    'b2',
    'b3',
    'b4',
    'b5',
    'b6',
    'b7',
    'a1',
    'c1',
    'd1',
    'e4',
    'a7',
    'c7',
    'd7',
    'e2',
    'e3',
    'e5',
    'e6',
  ],
  E: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'b1',
    'c1',
    'd1',
    'e1',
    'b4',
    'c4',
    'd4',
    'b7',
    'c7',
    'd7',
    'e7',
  ],
  F: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'b1',
    'c1',
    'd1',
    'e1',
    'b4',
    'c4',
    'd4',
  ],
  G: [
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'b1',
    'c1',
    'd1',
    'e2',
    'b7',
    'c7',
    'd7',
    'e6',
    'e5',
    'e4',
    'd4',
    'c4',
  ],
  H: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'b4',
    'c4',
    'd4',
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
  ],
  I: ['b1', 'c1', 'd1', 'c2', 'c3', 'c4', 'c5', 'c6', 'b7', 'c7', 'd7'],
  J: [
    'b1',
    'c1',
    'd1',
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'd7',
    'c7',
    'b7',
    'a6',
  ],
  K: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'e1',
    'e2',
    'd3',
    'c4',
    'b4',
    'd5',
    'e6',
    'e7',
  ],
  L: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'b7', 'c7', 'd7', 'e7'],
  M: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'b2',
    'c3',
    'c4',
    'd2',
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
  ],
  N: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'b2',
    'c3',
    'd4',
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
  ],
  O: [
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'b1',
    'b7',
    'c1',
    'c7',
    'd1',
    'd7',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
  ],
  P: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'b1',
    'c1',
    'd1',
    'b4',
    'c4',
    'd4',
    'a7',
    'e2',
    'e3',
  ],
  Q: [
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'b1',
    'b7',
    'c1',
    'c5',
    'c7',
    'd1',
    'd6',
    'd7',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
  ],
  R: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'b1',
    'c1',
    'd1',
    'b4',
    'c4',
    'd4',
    'a7',
    'e2',
    'e3',
    'c5',
    'd6',
    'e7',
  ],
  S: [
    'b1',
    'c1',
    'd1',
    'e2',
    'a2',
    'a3',
    'b4',
    'c4',
    'd4',
    'e5',
    'e6',
    'd7',
    'c7',
    'b7',
    'a6',
  ],
  T: ['a1', 'b1', 'c1', 'd1', 'e1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'],
  U: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'b7',
    'c7',
    'd7',
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
  ],
  V: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'b6',
    'c7',
    'd6',
    'e5',
    'e4',
    'e3',
    'e2',
    'e1',
  ],
  W: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'b7',
    'c6',
    'c5',
    'd7',
    'e6',
    'e5',
    'e4',
    'e3',
    'e2',
    'e1',
  ],
  X: [
    'a1',
    'a2',
    'b3',
    'c4',
    'd5',
    'e6',
    'e7',
    'e1',
    'e2',
    'd3',
    'c4',
    'b5',
    'a6',
    'a7',
  ],
  Y: ['a1', 'a2', 'b3', 'c4', 'e1', 'e2', 'd3', 'c5', 'c6', 'c7'],
  Z: [
    'a1',
    'b1',
    'c1',
    'd1',
    'e1',
    'e2',
    'd3',
    'c4',
    'b5',
    'a6',
    'a7',
    'b7',
    'c7',
    'd7',
    'e7',
  ],
  a: [
    'a3',
    'b3',
    'c3',
    'd3',
    'e4',
    'b5',
    'c5',
    'd5',
    'e5',
    'a6',
    'e6',
    'b7',
    'c7',
    'd7',
    'e7',
  ],
  b: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'b4',
    'c4',
    'd4',
    'e5',
    'e6',
    'b7',
    'c7',
    'd7',
  ],
  c: ['a4', 'a5', 'b3', 'c3', 'd3', 'e4', 'a6', 'e6', 'b7', 'c7', 'd7'],
  d: [
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
    'b4',
    'c4',
    'd4',
    'a5',
    'a6',
    'b7',
    'c7',
    'd7',
  ],
  e: [
    'a4',
    'a5',
    'b3',
    'c3',
    'd3',
    'e4',
    'b5',
    'c5',
    'd5',
    'e5',
    'a6',
    'b7',
    'c7',
    'd7',
    'e7',
  ],
  f: ['e1', 'd1', 'c2', 'c3', 'b4', 'c4', 'd4', 'c5', 'c6', 'c7'],
  g: [
    'a4',
    'b3',
    'c3',
    'd3',
    'e3',
    'e4',
    'b5',
    'c5',
    'd5',
    'e5',
    'e6',
    'a7',
    'b7',
    'c7',
    'd7',
  ],
};

/*
a1 b1 c1 d1 e1
a2 b2 c2 d2 e2
a3 b3 c3 d3 e3
a4 b4 c4 d4 e4
a5 b5 c5 d5 e5
a6 b6 c6 d6 e6
a7 b7 c7 d7 e7
*/

const DEBUG_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const MATRIX_DEBUG_FONT: SegmentDisplayFont<MatrixSegmentId> = {
  [DEFAULT_KEY]: MATRIX_SEGMENT_IDS.map((seg) => seg.id),
  ...MATRIX_SEGMENT_IDS.reduce((acc, seg) => {
    const index = seg.xIndex * 7 + seg.yIndex;
    const id = DEBUG_CHARS[index];
    return {
      ...acc,
      [id]: [seg.id],
    };
  }, {}),
};
