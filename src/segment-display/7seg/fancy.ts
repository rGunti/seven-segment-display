import { FluentSegmentDisplay, SegmentDisplay } from '..';
import { SegmentId, SevenSegmentId } from '../fonts';
import { SVG_NS, createSvgElement } from '../shared';

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
    host.appendChild(this.svgRoot);

    this.segments = this.generateRecord();
  }

  private constructSvg(): SVGElement {
    // Create root
    const root = createSvgElement('svg', {
      viewBox: '0 0 57 80',
      version: '1.1',
      xmlns: SVG_NS,
      focusable: false,
      style: 'height: 100%',
    });

    // Create definitions
    const defs = createSvgElement('defs', undefined, [
      createSvgElement('polyline', {
        id: 'h-seg',
        points: '11 0, 37 0, 42 5, 37 10, 11 10, 6 5',
      }),
      createSvgElement('polyline', {
        id: 'v-seg',
        points: '0 11, 5 6, 10 11, 10 34, 5 39, 0 39',
      }),
    ]);
    root.appendChild(defs);

    // Create Display
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

    //g.setAttribute('transform', 'skewX(-5)');
    root.appendChild(g);

    // Create Decimal Point
    root.appendChild(
      createSvgElement('circle', {
        cx: 52,
        cy: 75,
        r: 5,
        'data-segment-id': 'dec',
        class: 'svg-seg',
      })
    );

    return root;
  }

  private generateRecord(): Record<SevenSegmentId, SVGElement> {
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
      dec: this.svgRoot.querySelector(`[data-segment-id=dec]`)!,
    };
  }

  clear(): void {
    Object.keys(this.segments).forEach((seg) => {
      this.setSegment(seg as SegmentId, false);
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

  withSegment(pin: string, on: boolean): FancySevenSegmentDisplay {
    this.setSegment(pin, on);
    return this;
  }
}

export class ColonDisplay
  implements SegmentDisplay, FluentSegmentDisplay<ColonDisplay>
{
  private readonly svgRoot: SVGElement;
  private readonly segments: Record<string, SVGElement>;

  constructor(host: HTMLElement) {
    this.svgRoot = this.constructSvg();
    host.appendChild(this.svgRoot);

    this.segments = this.generateRecord();
  }

  private constructSvg(): SVGElement {
    return createSvgElement(
      'svg',
      {
        viewBox: '0 0 30 80',
        version: '1.1',
        xmlns: SVG_NS,
        focusable: false,
        style: 'height: 100%',
      },
      [
        createSvgElement(
          'g',
          {
            class: 'seg-group',
          },
          [
            createSvgElement('circle', {
              cx: 12,
              cy: 60,
              r: 5,
              'data-segment-id': 'd',
              class: 'svg-seg',
            }),
            createSvgElement('circle', {
              cx: 12,
              cy: 30,
              r: 5,
              'data-segment-id': 'g',
              class: 'svg-seg',
            }),
          ]
        ),
      ]
    );
  }

  private generateRecord(): Record<string, SVGElement> {
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dec: this.svgRoot.querySelector(`[data-segment-id=d]`)!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dec2: this.svgRoot.querySelector(`[data-segment-id=g]`)!,
    };
  }

  clear(): void {
    Object.keys(this.segments).forEach((seg) => {
      this.setSegment(seg as SegmentId, false);
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

    pins.forEach((pin) => this.setSegment(pin, true));
  }

  withSegment(pin: string, on: boolean): ColonDisplay {
    this.setSegment(pin, on);
    return this;
  }
}
