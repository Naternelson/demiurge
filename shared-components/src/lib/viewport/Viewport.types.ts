// Path: shared-components\src\lib\viewport\Viewport.types.ts
import { RefObject } from 'react';
export interface Centering {
  centerY: boolean;
  centerX: boolean;
}

export interface Boundaries {
  top: number;
  left: number;
  right: number;
  bottom: number;
  minScale: number;
  maxScale: number
}

export interface Position {
  top: number;
  left: number;
  scale: number;
  width?: number; 
  height?: number;
}
export interface Transition {
  delay: number;
  duration: number;
  easing: string;
}

export type SetPosition = (arg: ((prev: Position)=> Partial<Position>) | Partial<Position>) => void

export interface ViewportContextType {
  boundaries: Boundaries,
  centering: Centering; 
  transition: Transition;
  /** Set the position and scale of the Content Element */
  setPosition: SetPosition;
  /** Retrieve the position and dimensions of the Content Element */
  getPosition: () => Position;
  initialPosition: Position;
  containerRef: RefObject<HTMLElement>;
  contentRef: RefObject<HTMLElement>;
  repositioning: boolean;
  setRepositioning: (arg: boolean) => void;
}