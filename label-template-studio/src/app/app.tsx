import { ThemeProvider } from '@./ui';
import { Viewport, ViewportProvider } from '@./shared-components';
import { Paper } from '@mui/material';

export function App() {
  return (
    <ThemeProvider>
      <ViewportProvider
      boundaries={{
        left: 0,
        right: 0,
        top: 0, 
        bottom: 0,
        minScale: 0,
        maxScale: 5
      }}>
        <Viewport
          containerProps={{
            sx: {
              width: '100vw',
              height: '100vh',
            },
          }}
        >
          <Paper
            sx={{
              width: '4in',
              height: '4in',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
            }}
          >
            Hello World
          </Paper>
        </Viewport>
      </ViewportProvider>
    </ThemeProvider>
  );
}

export default App;
