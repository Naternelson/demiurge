
export interface GridLineParams {
  lineColor?: string;
  size?: string;
  factor?: number;
}

export const gridLines = ({
  lineColor = 'rgba(255,255,255,0.05)',
  factor = 4,
  size = '20px',
}: GridLineParams) => {
  return {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
      backgroundSize: `${size} ${size}`,
      backgroundPosition: `calc(${size} / -2) calc(${size} / -2)`,
      zIndex: 1,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `linear-gradient(to bottom, ${lineColor} 1px, transparent 1px), linear-gradient(to right, ${lineColor} 1px, transparent 1px)`,
      backgroundSize: `calc(${size} * ${factor}) calc(${size} * ${factor})`,
      backgroundPosition: `calc(${size} / ${factor /-2}) calc(${size} / ${factor /2})`,
      zIndex: 1,
    },
  };
};
