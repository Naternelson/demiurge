import { useCallback, useEffect, useRef } from 'react';
import { useViewport } from './useViewport';
import { reposition } from './reposition';

export const useDraggable = () => {
  const context = useViewport();
  const {
    setPosition,
    containerRef,
    contentRef,
    setRepositioning,
    transition,
  } = context;
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const elementStartPos = useRef<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 1) return; // Only activate for middle mouse button
      const content = contentRef.current;
      if (!content) return;
      setRepositioning(true);
      if (timeout.current) clearTimeout(timeout.current);
      isDragging.current = true;
      dragStartPos.current = { x: event.clientX, y: event.clientY };
      const { top, left } = window.getComputedStyle(content);
      elementStartPos.current = {
        top: parseFloat(top),
        left: parseFloat(left),
      };

      event.preventDefault(); // Prevent default behavior like scrolling
    },
    [contentRef, setRepositioning]
  );

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging.current) return;
      const content = contentRef.current;
      if (!content) return;

      const deltaX = event.clientX - dragStartPos.current.x;
      const deltaY = event.clientY - dragStartPos.current.y;
      const newLeft = elementStartPos.current.left + deltaX;
      const newTop = elementStartPos.current.top + deltaY;

      setPosition({ left: newLeft, top: newTop });
    },
    [contentRef, setPosition]
  );

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    setRepositioning(false);
    timeout.current = setTimeout(() => {
      const container = containerRef.current;
      if(!container) return;
      reposition(container, {
        boundary: context.boundaries, 
        centering: context.centering, 
        getPosition: context.getPosition,
        setPosition: context.setPosition
      }
      )
    }, transition.delay);
  }, [containerRef, context.boundaries, context.centering, context.getPosition, context.setPosition, setRepositioning, transition.delay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [containerRef, onMouseDown, onMouseMove, onMouseUp]);
};
