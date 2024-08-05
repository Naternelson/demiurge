import { useCallback, useEffect, useMemo, useRef } from 'react';
import { reposition } from './reposition';
import { useViewport } from './useViewport';

export const useReposition = () => {
  const previous = useRef<[number, number, number]>([0, 0, 1]);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const context = useViewport();
  const {
    containerRef,
    contentRef,
    boundaries,
    centering,
    transition,
    setPosition,
    getPosition,
    repositioning,
  } = context;

  const b = useMemo(() => {
    return boundaries;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    boundaries?.bottom,
    boundaries?.left,
    boundaries?.right,
    boundaries?.top,
    boundaries?.maxScale,
    boundaries?.minScale,
  ]);

  const c = useMemo(() => {
    return centering;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centering?.centerX, centering?.centerY]);

  const callback = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!content || !container) return;
    const style = window.getComputedStyle(content);
    const transform = style.transform;
    let scale = 1;
    if (transform && transform !== 'none') {
      const match = transform.match(/scale\(([^)]+)\)/);
      if (match) {
        scale = parseFloat(match[1]);
      }
    }
    const left = parseFloat(style.left);
    const top = parseFloat(style.top);
    const nextValues: [number, number, number] = [top, left, scale];
    const match = previous.current.every(
      (value, index) => value === nextValues[index]
    );
    if (match) return;
    if (timeout.current) clearTimeout(timeout.current);
    previous.current = nextValues;
    reposition(container, {
      boundary: b,
      centering: c,
      getPosition: getPosition,
      setPosition: setPosition,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [b, c, getPosition, setPosition]);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        console.log('mutation', repositioning);
        if (repositioning) return;
        timeout.current = setTimeout(callback, transition?.delay || 0);
      });
    });
    observer.observe(content, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, [callback, contentRef, repositioning, transition?.delay]);


  useEffect(() => {
    console.log({repositioning})
  },[repositioning])


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => {
      callback();
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [callback, containerRef]);
};
