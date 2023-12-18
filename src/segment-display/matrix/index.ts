import { FluentSegmentDisplay, SegmentDisplay } from '..';
import { SVG_NS, createPointList, createSvgElement } from '../shared';

declare type SvgElement = {
  type: string;
  attributes?: { [key: string]: unknown };
};

const SVG_OBJECT_TEMPLATE: Record<string, SvgElement | null> = {
  seg: {
    type: 'polyline',
    attributes: {
      points: createPointList([
        [0, 0],
        [5, 0],
        [5, 5],
        [0, 5],
      ]),
    },
  },
};

const X_COORDS = ['a', 'b', 'c', 'd', 'e'];
const Y_COORDS = ['1', '2', '3', '4', '5', '6', '7'];

declare type MatrixDefinition = {
  id: string;
  x: string;
  y: string;
  xIndex: number;
  yIndex: number;
};
export const MATRIX_SEGMENT_IDS = X_COORDS.reduce(
  (acc, x, xIndex) =>
    acc.concat(
      Y_COORDS.map((y, yIndex) => ({
        id: `${x}${y}`,
        x,
        y,
        xIndex,
        yIndex,
      })),
    ),
  [] as MatrixDefinition[],
);

const SVG_TEMPLATE: Record<string, { [key: string]: unknown }> =
  MATRIX_SEGMENT_IDS.reduce((acc, seg) => {
    return {
      ...acc,
      [seg.id]: {
        href: '#seg',
        class: 'svg-seg',
        'data-segment-id': seg.id,
        x: seg.xIndex * 6,
        y: seg.yIndex * 6,
      },
    };
  }, {});

export const MATRIX_PINS = Object.keys(SVG_TEMPLATE).sort();

export class DotMatrixDisplay
  implements SegmentDisplay, FluentSegmentDisplay<DotMatrixDisplay>
{
  private readonly svgRoot: SVGElement;
  private readonly segments: Record<string, SVGElement>;

  constructor(host: HTMLElement) {
    this.svgRoot = this.constructSvg();
    host.appendChild(this.svgRoot);

    this.segments = this.generateSegmentRecord();
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

  withSegment(pin: string, on: boolean): DotMatrixDisplay {
    this.setSegment(pin, on);
    return this;
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
      }),
    );
    root.appendChild(defs);

    const g = createSvgElement('g', {
      class: 'seg-group',
    });
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
        }),
      )
      .forEach((el) => {
        g.appendChild(el);
      });
    root.appendChild(g);

    return root;
  }

  private generateSegmentRecord(): Record<string, SVGElement> {
    const objects: { key: string; obj: SVGElement }[] = Object.keys(
      SVG_TEMPLATE,
    ).map((key) => ({
      key,
      obj: this.svgRoot.querySelector(`[data-segment-id=${key}]`) as SVGElement,
    }));
    const base: Record<string, SVGElement> = {};
    return objects.reduce((map, el) => {
      return {
        ...map,
        [el.key]: el.obj,
      };
    }, base);
  }
}
