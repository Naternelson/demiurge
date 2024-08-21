import { gridLines } from '@./ui';
import { Box, BoxProps, styled } from '@mui/material';
import { FC, useEffect } from 'react';
import { useReposition } from './useReposition';
import { useDraggable, useHasMouseDown } from './useDraggable';
import { useViewport } from './useViewport';

const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  flex: 1,
  display: 'flex',
  backgroundColor: 'rgb(30,30,30)',
  overflow: 'hidden',
  ...gridLines({}),
}));

const Content = styled(Box)(({ theme }) => ({
  position: 'absolute',
  boxShadow: theme.shadows[1],
}));

export interface ViewportProps {
  containerProps?: Omit<BoxProps, 'children'>;
  contentProps?: Omit<BoxProps, 'children'>;
  children?: React.ReactNode;
}

export const Viewport: FC<ViewportProps> = ({
  containerProps,
  contentProps,
  children,
}) => {
  const { containerRef, contentRef, transition, repositioning } = useViewport();
  const mouseDown = useHasMouseDown(containerRef, 1)
  useReposition();
  useDraggable();

  const containerP = {...containerProps, sx: {
    ...containerProps?.sx,
    cursor: repositioning ? 'grabbing' : mouseDown ? "grab" :  'default'
  }}
  return (
    <Container {...containerP} ref={containerRef}>
      <Content
        {...contentProps}
        ref={contentRef}
        sx={{

          transition: repositioning
            ? 'none'
            : `all ${transition.duration}ms ${transition.easing}`,
          ...contentProps?.sx,
        }}
      >
        {children}
      </Content>
    </Container>
  );
};

