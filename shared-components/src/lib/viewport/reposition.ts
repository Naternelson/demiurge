// Path: shared-components/src/lib/viewport/reposition.ts

import {
  Boundaries,
  Centering,
  Position,
  ViewportContextType,
} from './Viewport.types';

export const reposition = (
  parentNode: HTMLElement,
  params: {
    boundary: Boundaries | null;
    centering: Centering | null;
    getPosition: ViewportContextType['getPosition'];
    setPosition: ViewportContextType['setPosition'];
  }
) => {
  const { boundary, centering, getPosition, setPosition } = params;
  const pDims = getContainerDimensions(parentNode);
  const tDims = getPosition();

  const retracted = retractNode(pDims, tDims, boundary);

  const clamped = clampScale(retracted, boundary);
  const centered = centerNode(pDims, clamped, boundary, centering);
  setPosition(centered);
};

const getContainerDimensions = (container: HTMLElement) => {
  const { width, height } = container.getBoundingClientRect();
  return { width, height };
};

const retractNode = (
  parentDims: { width: number; height: number },
  targetDims: Position,
  boundaries: Boundaries | null
): Position => {
  const { width, height } = parentDims;
  const { top, left, width: tWidth, height: tHeight } = targetDims;
  if (!boundaries) return { ...targetDims };
  const virtualWidth =
    (tWidth || 0) + (boundaries.left || 0) + (boundaries.right || 0);
  const virtualHeight =
    (tHeight || 0) + (boundaries.top || 0) + (boundaries.bottom || 0);
  const returnDims = { ...targetDims };

  // Handle horizontal boundaries
  if (virtualWidth >= width) {
    const maxLeft = boundaries.left !== undefined ? boundaries.left : Infinity;
    const minLeft =
      boundaries.left !== undefined && boundaries.right !== undefined
        ? boundaries.left - boundaries.right - (tWidth || 0)
        : -Infinity;
    returnDims.left = Math.min(maxLeft, Math.max(minLeft, left));
  } else {
    const maxLeft =
      boundaries.right !== undefined ? width - boundaries.right : Infinity;
    const minLeft = boundaries.left !== undefined ? boundaries.left : -Infinity;
    returnDims.left = Math.min(maxLeft, Math.max(minLeft, left));
  }

  // Handle vertical boundaries
  if (virtualHeight >= height) {
    const maxTop = boundaries.top !== undefined ? boundaries.top : Infinity;
    const minTop =
      boundaries.top !== undefined && boundaries.bottom !== undefined
        ? boundaries.top - boundaries.bottom - (tHeight || 0)
        : -Infinity;
    returnDims.top = Math.min(maxTop, Math.max(minTop, top));
  } else {
    const maxTop =
      boundaries.bottom !== undefined ? height - boundaries.bottom : Infinity;
    const minTop = boundaries.top !== undefined ? boundaries.top : -Infinity;
    returnDims.top = Math.min(maxTop, Math.max(minTop, top));
  }
  return returnDims;
};

const centerNode = (
  parentDims: { width: number; height: number },
  target: Position,
  boundaries: Boundaries | null,
  centering: Centering | null
): Position => {
  const { centerX, centerY } = centering || {};
  if (!centerX && !centerY) return { ...target };
  const { width, height } = parentDims;
  const { width: tWidth, height: tHeight } = target;
  const virtualWidth =
    (tWidth || 0) + (boundaries?.left || 0) + (boundaries?.right || 0);
  const virtualHeight =
    (tHeight || 0) + (boundaries?.top || 0) + (boundaries?.bottom || 0);
  const returnDims = { ...target };

  if (centerX && virtualWidth < width) {
    returnDims.left = (width - virtualWidth) / 2;
  }
  if (centerY && virtualHeight < height) {
    returnDims.top = (height - virtualHeight) / 2;
  }
  return returnDims;
};

const clampScale = (
  targetDims: Position,
  boundaries: Boundaries | null
): Position => {
  if (!boundaries || (!boundaries.minScale && !boundaries.maxScale))
    return targetDims;
  const returnDims = { ...targetDims };
  if (boundaries.minScale !== undefined) {
    returnDims.scale = Math.max(boundaries.minScale, returnDims.scale);
  }
  if (boundaries.maxScale !== undefined) {
    returnDims.scale = Math.min(boundaries.maxScale, returnDims.scale);
  }
  return returnDims;
};
