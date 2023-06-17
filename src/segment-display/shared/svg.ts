export const SVG_NS = 'http://www.w3.org/2000/svg';

export function createSvgElement(
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

export declare type Coordinate = [number, number] | { x: number; y: number };

export function createPointList(points: Coordinate[]): string {
  return points.map((coordinate) => formatCoordinate(coordinate)).join(', ');
}

export function scaleCoordinate(
  coordinate: Coordinate,
  factor: number
): Coordinate {
  if (Array.isArray(coordinate)) {
    return [coordinate[0] * factor, coordinate[1] * factor];
  }
  return { x: coordinate.x * factor, y: coordinate.y * factor };
}

function formatCoordinate(coordinate: Coordinate): string {
  if (Array.isArray(coordinate)) {
    return coordinate.join(' ');
  }
  return `${coordinate.x} ${coordinate.y}`;
}
