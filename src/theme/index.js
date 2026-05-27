import { createTheme } from '@mui/material/styles';
import shadows from './shadows';
import typography from './typography';

// 60-30-10 color rule:
// 60% steel neutrals for page foundation, 30% SAHATHAI blue for brand UI,
// 10% SAHATHAI red for sharp accents and critical emphasis.
const foundation = {
  main: '#253746',
  dark: '#172632',
  light: '#607482',
  wash: '#EEF4F7',
  canvas: '#F7FAFC',
  paper: '#FFFFFF'
};

const brandBlue = {
  main: '#3f51b5',
  dark: '#303f9f',
  light: '#7986cb',
  wash: 'rgba(63, 81, 181, 0.08)',
  selected: 'rgba(63, 81, 181, 0.14)'
};

const accentRed = {
  main: '#ef3124',
  dark: '#b42318',
  light: '#ff746b',
  wash: 'rgba(239, 49, 36, 0.08)'
};

const theme = createTheme({
  palette: {
    background: {
      dark: foundation.wash,
      default: foundation.canvas,
      paper: foundation.paper
    },
    primary: {
      main: brandBlue.main,
      dark: brandBlue.dark,
      light: brandBlue.light,
      contrastText: '#ffffff'
    },
    secondary: {
      main: accentRed.main,
      dark: accentRed.dark,
      light: accentRed.light,
      contrastText: '#ffffff'
    },
    info: {
      main: foundation.main,
      dark: foundation.dark,
      light: foundation.light,
      contrastText: '#ffffff'
    },
    error: {
      main: accentRed.main,
      dark: accentRed.dark,
      light: accentRed.light,
      contrastText: '#ffffff'
    },
    divider: 'rgba(37, 55, 70, 0.14)',
    text: {
      primary: foundation.main,
      secondary: foundation.light
    },
    action: {
      active: brandBlue.main,
      hover: brandBlue.wash,
      selected: brandBlue.selected,
      disabled: 'rgba(37, 55, 70, 0.34)',
      disabledBackground: 'rgba(37, 55, 70, 0.10)'
    }
  },
  shadows,
  typography
});

export default theme;
