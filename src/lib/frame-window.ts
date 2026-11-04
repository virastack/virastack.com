/**
 * A same-origin iframe's window with its own globals (`ResizeObserver` and the like),
 * which the DOM types leave off `contentWindow`.
 */
export function getFrameWindow(frame: HTMLIFrameElement): (Window & typeof globalThis) | null {
  return frame.contentWindow as (Window & typeof globalThis) | null;
}
