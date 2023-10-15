import { FluentSegmentDisplay, SegmentDisplay } from '..';
import { SVG_NS, createPointList, createSvgElement } from '../shared';

declare type SvgElement = {
  type: string;
  attributes?: { [key: string]: unknown };
};

const SVG_OBJECT_TEMPLATE: Record<string, SvgElement | null> = {
  'h-seg-17': {
    type: 'polyline',
    attributes: {
      points: createPointList([
        [2, 0],
        [8, 0],
        [10, 2],
        [8, 4],
        [2, 4],
        [0, 2],
      ]),
    },
  },
  'h-seg-17-side': {
    type: 'polyline',
    attributes: {
      points: createPointList([
        [2, 0],
        [10, 0],
        [10, 2],
        [8, 4],
        [2, 4],
        [0, 2],
      ]),
    },
  },
  'v-seg-17': {
    type: 'polyline',
    attributes: {
      points: createPointList([
        [2, 0],
        [4, 2],
        [4, 19],
        [2, 21],
        [0, 19],
        [0, 2],
      ]),
    },
  },
  'v-seg-17-side': {
    type: 'polyline',
    attributes: {
      points: createPointList([
        [2, 0],
        [4, 0],
        [4, 19],
        [2, 21],
        [0, 19],
        [0, 2],
      ]),
    },
  },
  'd-seg-17': {
    type: 'polyline',
    attributes: {
      points: createPointList([
        [0, 0],
        [2.5, 0],
        [6, 14],
        [6, 17],
        [3.5, 17],
        [0, 3],
      ]),
    },
  },
  'dr-seg-17': {
    type: 'polyline',
    attributes: {
      points: createPointList([
        [6, 0],
        [3.5, 0],
        [0, 14],
        [0, 17],
        [2.5, 17],
        [6, 3],
      ]),
    },
  },
};
const SVG_TEMPLATE: Record<string, { [key: string]: unknown } | null> = {
  a1: { href: '#h-seg-17-side', class: 'svg-seg', x: 2.5, y: 0 },
  a2: {
    href: '#h-seg-17-side',
    class: 'svg-seg',
    x: -23.5,
    y: 0,
    transform: 'scale(-1,1)',
  },
  b: {
    href: '#v-seg-17-side',
    class: 'svg-seg',
    x: 22,
    y: -23.5,
    transform: 'scale(1,-1)',
  },
  c: {
    href: '#v-seg-17-side',
    class: 'svg-seg',
    x: 22,
    y: 24.5,
  },
  d1: {
    href: '#h-seg-17-side',
    class: 'svg-seg',
    x: 2.5,
    y: -48,
    transform: 'scale(1,-1)',
  },
  d2: {
    href: '#h-seg-17-side',
    class: 'svg-seg',
    x: -23.5,
    y: -48,
    transform: 'scale(-1,-1)',
  },
  e: {
    href: '#v-seg-17-side',
    class: 'svg-seg',
    x: -4,
    y: 24.5,
    transform: 'scale(-1,1)',
  },
  f: {
    href: '#v-seg-17-side',
    class: 'svg-seg',
    x: -4,
    y: -23.5,
    transform: 'scale(-1,-1)',
  },
  g1: { href: '#h-seg-17', class: 'svg-seg', x: 2.5, y: 22 },
  g2: { href: '#h-seg-17', class: 'svg-seg', x: 13.5, y: 22 },
  h: { href: '#v-seg-17', class: 'svg-seg', x: 11, y: 2.5 },
  i: { href: '#v-seg-17', class: 'svg-seg', x: 11, y: 24.5 },
  j: { href: '#d-seg-17', class: 'svg-seg', x: 4.5, y: 4.5 },
  k: { href: '#dr-seg-17', class: 'svg-seg', x: 15.5, y: 4.5 },
  l: { href: '#d-seg-17', class: 'svg-seg', x: 15.5, y: 26.5 },
  m: { href: '#dr-seg-17', class: 'svg-seg', x: 4.5, y: 26.5 },
};

export const SIXTEEN_FONT_PINS = Object.keys(SVG_TEMPLATE).sort();

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
      viewBox: '0 0 35 49',
      version: '1.1',
      xmlns: SVG_NS,
      focusable: false,
    });

    const defs = createSvgElement(
      'defs',
      undefined,
      Object.keys(SVG_OBJECT_TEMPLATE).map((id) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const element = SVG_OBJECT_TEMPLATE[id]!;
        return createSvgElement(element.type, {
          id,
          ...element.attributes,
        });
      })
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
    g.appendChild(
      createSvgElement('circle', {
        cx: 29,
        cy: 47,
        r: 2,
        'data-segment-id': 'dec',
        class: 'svg-seg',
      })
    );
    g.appendChild(
      createSvgElement('circle', {
        cx: 29,
        cy: 23,
        r: 2,
        'data-segment-id': 'dec2',
        class: 'svg-seg',
      })
    );

    return root;
  }

  private generateSegmentRecord(): Record<string, SVGElement> {
    const objects: { key: string; obj: SVGElement }[] = Object.keys(
      SVG_TEMPLATE
    )
      .concat('dec', 'dec2')
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
    const isOn = el.classList.contains('svg-seg-on');
    if (on && !isOn) {
      el.classList.add('svg-seg-on');
    } else if (!on && isOn) {
      el.classList.remove('svg-seg-on');
    }
  }

  setSegments(pins: string[], skipClear?: boolean | undefined): void {
    if (!skipClear) {
      this.clear();
    }

    pins.forEach((pin) => this.setSegment(pin, true));
  }

  withSegment(pin: string, on: boolean): SixteenSegmentDisplay {
    this.setSegment(pin, on);
    return this;
  }
}
