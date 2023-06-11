import { FluentSegmentDisplay, SegmentDisplay } from '..';
import { DIGIT_SEGMENTS, SegmentId } from '../internal';

const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_TEMPLATE: Record<string, { [key: string]: unknown } | null> = {
  a: { href: '#h-seg', class: 'svg-seg', x: 0, y: 0 },
  b: {
    href: '#v-seg',
    class: 'svg-seg',
    x: -48,
    y: 0,
    transform: 'scale(-1,1)',
  },
  c: {
    href: '#v-seg',
    class: 'svg-seg',
    x: -48,
    y: -80,
    transform: 'scale(-1,-1)',
  },
  d: { href: '#h-seg', class: 'svg-seg', x: 0, y: 70 },
  e: {
    href: '#v-seg',
    class: 'svg-seg',
    x: 0,
    y: -80,
    transform: 'scale(1,-1)',
  },
  f: { href: '#v-seg', class: 'svg-seg', x: 0, y: 0 },
  g: { href: '#h-seg', class: 'svg-seg', x: 0, y: 35 },
};

export class FancySevenSegmentDisplay
  implements SegmentDisplay, FluentSegmentDisplay<FancySevenSegmentDisplay>
{
  private readonly svgRoot: SVGElement;
  private readonly segments: Record<string, SVGElement>;

  constructor(host: HTMLElement) {
    this.svgRoot = this.constructSvg();
    console.log('Constructed SVG', this.svgRoot);
    host.appendChild(this.svgRoot);

    this.segments = this.generateRecord();
  }

  private constructSvg(): SVGElement {
    // Create root
    const root = FancySevenSegmentDisplay.createSvgElement('svg', {
      viewBox: '0 0 57 80',
      version: '1.1',
      xmlns: SVG_NS,
      focusable: false,
      style: 'height: 100%',
    });

    // Create definitions
    const defs = FancySevenSegmentDisplay.createSvgElement('defs', undefined, [
      FancySevenSegmentDisplay.createSvgElement('polyline', {
        id: 'h-seg',
        points: '11 0, 37 0, 42 5, 37 10, 11 10, 6 5',
      }),
      FancySevenSegmentDisplay.createSvgElement('polyline', {
        id: 'v-seg',
        points: '0 11, 5 6, 10 11, 10 34, 5 39, 0 39',
      }),
    ]);
    root.appendChild(defs);

    // Create Display
    const g = FancySevenSegmentDisplay.createSvgElement('g', {
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
        FancySevenSegmentDisplay.createSvgElement('use', {
          ...e.element,
          'data-segment-id': e.elementId,
        })
      )
      .forEach((el) => {
        g.appendChild(el);
      });

    //g.setAttribute('transform', 'skewX(-5)');
    root.appendChild(g);

    // Create Decimal Point
    root.appendChild(
      FancySevenSegmentDisplay.createSvgElement('circle', {
        cx: 52,
        cy: 75,
        r: 5,
        'data-segment-id': 'h',
        class: 'svg-seg',
      })
    );

    return root;
  }

  private static createSvgElement(
    elType: string,
    attributes?: { [attributeName: string]: unknown },
    children?: SVGElement[]
  ): SVGElement {
    const el = document.createElementNS(SVG_NS, elType);
    if (attributes) {
      Object.keys(attributes).forEach((attribute) => {
        const attrVal = attributes[attribute];
        if (attrVal !== null && attrVal !== undefined) {
          el.setAttribute(attribute, `${attrVal}`);
        }
      });
    }
    if (children) {
      children.forEach((child) => el.appendChild(child));
    }
    return el;
  }

  private generateRecord(): Record<SegmentId, SVGElement> {
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      a: this.svgRoot.querySelector(`[data-segment-id=a]`)!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      b: this.svgRoot.querySelector(`[data-segment-id=b]`)!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      c: this.svgRoot.querySelector(`[data-segment-id=c]`)!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      d: this.svgRoot.querySelector(`[data-segment-id=d]`)!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      e: this.svgRoot.querySelector(`[data-segment-id=e]`)!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      f: this.svgRoot.querySelector(`[data-segment-id=f]`)!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      g: this.svgRoot.querySelector(`[data-segment-id=g]`)!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      h: this.svgRoot.querySelector(`[data-segment-id=h]`)!,
    };
  }

  clear(): void {
    Object.keys(this.segments).forEach((seg) => {
      this.setSegment(seg as SegmentId, false);
    });
  }

  setSegment(pin: string, on: boolean): void {
    const el = this.segments[pin];
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

    pins.forEach((pin) => this.setSegment(pin, true));
  }

  setDigit(digit: string, skipClearingSegments?: boolean | undefined): void {
    if (!skipClearingSegments) {
      this.clear();
    }

    const segmentsToDisplay = DIGIT_SEGMENTS[digit] || [];
    segmentsToDisplay.forEach((segmentId) => {
      this.setSegment(segmentId, true);
    });
  }

  withSegment(pin: string, on: boolean): FancySevenSegmentDisplay {
    this.setSegment(pin, on);
    return this;
  }

  withDigit(
    digit: string,
    skipClearingSegments?: boolean | undefined
  ): FancySevenSegmentDisplay {
    this.setDigit(digit, skipClearingSegments);
    return this;
  }
}
