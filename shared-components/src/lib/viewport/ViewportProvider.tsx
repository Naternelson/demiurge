// Path: shared-components\src\lib\viewport\ViewportProvider.tsx

import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import {
  Boundaries,
  Centering,
  Position,
  Transition,
  ViewportContextType,
} from './Viewport.types';

export const ViewportContext = createContext<ViewportContextType>(
  {} as ViewportContextType
);

export interface ViewportProviderProps {
  boundaries?: Partial<Boundaries>;
  centering?: Partial<Centering>;
  transition?: Partial<Transition>;
  initialPosition?: Partial<Position>;
  children?: React.ReactNode;
}

const defaultBoundaries = (
  b: ViewportProviderProps['boundaries']
): Boundaries => {
  return {
    top: typeof b?.top === "number" ? b.top : Infinity,
    left: typeof b?.left === "number" ? b.left : Infinity,
    right: typeof b?.right === "number" ? b.right : Infinity,
    bottom: typeof b?.bottom === "number" ? b.bottom : Infinity,
    minScale: typeof b?.minScale === "number" ? b.minScale : 0,
    maxScale: typeof b?.maxScale === "number" ? b.maxScale : Infinity,
  };
};

const defaultCentering = (c: ViewportProviderProps['centering']): Centering => {
  return {
    centerY: c?.centerY || false,
    centerX: c?.centerX || false,
  };
};

const defaultTransition = (
  t: ViewportProviderProps['transition']
): Transition => {
  return {
    delay: t?.delay || 300,
    duration: t?.duration || 300,
    easing: t?.easing || 'ease-out',
  };
};

export const ViewportProvider = (props: ViewportProviderProps) => {
  const [repositioning, setRepositioning] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const boundaries = useMemo(() => {
    return defaultBoundaries(props.boundaries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.boundaries?.top,
    props.boundaries?.left,
    props.boundaries?.right,
    props.boundaries?.bottom,
    props.boundaries?.minScale,
    props.boundaries?.maxScale,
  ]);

  const centering = useMemo(() => {
    return defaultCentering(props.centering);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!props.centering, props.centering?.centerX, props.centering?.centerY]);

  const transition = useMemo(() => {
    return defaultTransition(props.transition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.transition?.delay,
    props.transition?.duration,
    props.transition?.easing,
  ]);

  const getPosition = useCallback(() => {
    const content = contentRef.current;
    if (!content) return { top: 0, left: 0, scale: 1 };
    const style = window.getComputedStyle(content);
    const transform = style.transform;
    let scale = 1;
    if (transform && transform !== 'none') {
      const match = transform.match(/scale\(([^)]+)\)/);
      if (match) {
        scale = parseFloat(match[1]);
      }
    }
    return {
      top: parseFloat(style.top),
      left: parseFloat(style.left),
      scale,
      width: content.offsetWidth * scale,
      height: content.offsetHeight * scale,
    };
  }, []);

  const setPosition = useCallback<ViewportContextType['setPosition']>(
    (arg) => {
      const position = typeof arg === 'function' ? arg(getPosition()) : arg;

      const content = contentRef.current;
      if (!content) return;
      if (typeof position.top === "number") content.style.top = `${position.top}px`;
      if (typeof position.left === "number") content.style.left = `${position.left}px`;
      if (typeof position.scale === "number")
        content.style.transform = `scale(${position.scale})`;
      return position;
    },
    [getPosition]
  );

  const value: ViewportContextType = {
    containerRef,
    contentRef,
    boundaries,
    centering,
    transition,
    getPosition,
    setPosition,
    repositioning,
    setRepositioning,
    initialPosition: {
      top: props.initialPosition?.top || 0,
      left: props.initialPosition?.left || 0,
      scale: props.initialPosition?.scale || 1,
    },
  };
  return (
    <ViewportContext.Provider value={value}>
      {props.children}
    </ViewportContext.Provider>
  );
};
