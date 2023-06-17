import { FluentSegmentDisplay, SegmentDisplay } from '..';
import { SVG_NS, createPointList, createSvgElement } from '../shared';

const SVG_OBJECT_TEMPLATE: Record<string, { [key: string]: unknown } | null> = {
  'h-seg-17': {
    points: createPointList([
      [1, 0],
      [8, 0],
      [9, 1],
      [8, 2],
      [1, 2],
      [0, 1],
    ]),
  },
  'v-seg-17': {
    points: createPointList([
      [1, 0],
      [2, 1],
      [2, 19],
      [1, 20],
      [0, 19],
      [0, 1],
    ]),
  },
  'd-seg-17': {
    points: createPointList([
      [0, 0],
      [7, 14],
      [7, 18],
      [0, 4],
    ]),
  },
  'dr-seg-17': {
    points: createPointList([
      [7, 0],
      [0, 14],
      [0, 18],
      [7, 4],
    ]),
  },
};
const SVG_TEMPLATE: Record<string, { [key: string]: unknown } | null> = {
  a1: { href: '#h-seg-17', class: 'svg-seg', x: 2, y: 0 },
  a2: { href: '#h-seg-17', class: 'svg-seg', x: 13, y: 0 },
  b: { href: '#v-seg-17', class: 'svg-seg', x: 22, y: 2 },
  c: { href: '#v-seg-17', class: 'svg-seg', x: 22, y: 24 },
  d1: { href: '#h-seg-17', class: 'svg-seg', x: 2, y: 44 },
  d2: { href: '#h-seg-17', class: 'svg-seg', x: 13, y: 44 },
  e: { href: '#v-seg-17', class: 'svg-seg', x: 0, y: 24 },
  f: { href: '#v-seg-17', class: 'svg-seg', x: 0, y: 2 },
  g1: { href: '#h-seg-17', class: 'svg-seg', x: 2, y: 22 },
  g2: { href: '#h-seg-17', class: 'svg-seg', x: 13, y: 22 },
  h: { href: '#v-seg-17', class: 'svg-seg', x: 11, y: 2 },
  i: { href: '#v-seg-17', class: 'svg-seg', x: 11, y: 24 },
  j: { href: '#d-seg-17', class: 'svg-seg', x: 3, y: 3 },
  k: { href: '#dr-seg-17', class: 'svg-seg', x: 14, y: 3 },
  l: { href: '#d-seg-17', class: 'svg-seg', x: 14, y: 25 },
  m: { href: '#dr-seg-17', class: 'svg-seg', x: 3, y: 25 },
};
const ALIASES: Record<string, string[]> = {
  a: ['a1', 'a2'],
  d: ['d1', 'd2'],
  g: ['g1', 'g2'],
};

export class SixteenSegmentDisplay
  implements SegmentDisplay, FluentSegmentDisplay<SixteenSegmentDisplay>
{
  private readonly svgRoot: SVGElement;
  private readonly segments: Record<string, SVGElement>;

  constructor(host: HTMLElement) {
    this.svgRoot = this.constructSvg();
    host.appendChild(this.svgRoot);

    this.segments = this.generateSegmentRecord();
  }

  private constructSvg(): SVGElement {
    const root = createSvgElement('svg', {
      viewBox: '0 0 30 46',
      version: '1.1',
      xmlns: SVG_NS,
      focusable: false,
      style: 'height: 100%',
    });

    const defs = createSvgElement(
      'defs',
      undefined,
      Object.keys(SVG_OBJECT_TEMPLATE).map((id) =>
        createSvgElement('polyline', {
          id,
          ...SVG_OBJECT_TEMPLATE[id],
        })
      )
    );
    root.appendChild(defs);

    const g = createSvgElement('g', {
      class: 'seg-group',
    });
    // Create Segments
    Object.keys(SVG_TEMPLATE)
      .map((elementId) => ({
        elementId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        element: (SVG_TEMPLATE as unknown as any)[elementId],
      }))
      .filter((e) => !!e.element)
      .map((e) =>
        createSvgElement('use', {
          ...e.element,
          'data-segment-id': e.elementId,
        })
      )
      .forEach((el) => {
        g.appendChild(el);
      });
    root.appendChild(g);

    // Create Decimal Point
    root.appendChild(
      createSvgElement('circle', {
        cx: 25,
        cy: 45,
        r: 1,
        'data-segment-id': 'dec',
        class: 'svg-seg',
      })
    );

    return root;
  }

  private generateSegmentRecord(): Record<string, SVGElement> {
    const objects: { key: string; obj: SVGElement }[] = Object.keys(
      SVG_TEMPLATE
    )
      .concat('dec')
      .map((key) => ({
        key,
        obj: this.svgRoot.querySelector(
          `[data-segment-id=${key}]`
        ) as SVGElement,
      }));
    const base: Record<string, SVGElement> = {};
    return objects.reduce((map, el) => {
      return {
        ...map,
        [el.key]: el.obj,
      };
    }, base);
  }

  clear(): void {
    Object.keys(this.segments).forEach((seg) => {
      this.setSegment(seg, false);
    });
  }

  setSegment(pin: string, on: boolean): void {
    const el = this.segments[pin];
    if (!el) {
      return;
    }
    if (on) {
      el.classList.add('svg-seg-on');
    } else {
      el.classList.remove('svg-seg-on');
    }
  }

  setSegments(pins: string[], skipClear?: boolean | undefined): void {
    if (!skipClear) {
      this.clear();
    }

    pins
      .flatMap((pin) => {
        const aliases = ALIASES[pin];
        if (aliases !== undefined) {
          return aliases;
        }
        return [pin];
      })
      .forEach((pin) => this.setSegment(pin, true));
  }

  withSegment(pin: string, on: boolean): SixteenSegmentDisplay {
    this.setSegment(pin, on);
    return this;
  }
}
