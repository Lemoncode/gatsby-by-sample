import {
  createMuiTheme,
  Theme as DefaultTheme,
} from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#d9d900',
    },
    secondary: {
      main: '#333326',
    },
  },
});

type Theme = DefaultTheme;

export const theme: Theme = {
  ...defaultTheme,
};
