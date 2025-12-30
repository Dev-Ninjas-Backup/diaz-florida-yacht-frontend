declare module 'dom-to-image-more' {
  export interface Options {
    quality?: number;
    bgcolor?: string;
    style?: Record<string, string>;
    width?: number;
    height?: number;
  }

  export function toPng(node: HTMLElement, options?: Options): Promise<string>;
  export function toJpeg(node: HTMLElement, options?: Options): Promise<string>;
  export function toBlob(node: HTMLElement, options?: Options): Promise<Blob>;
  export function toPixelData(
    node: HTMLElement,
    options?: Options,
  ): Promise<Uint8ClampedArray>;
}
