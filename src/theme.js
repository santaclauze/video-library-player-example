import { makeTheme } from 'bootstrap-styled/lib/theme/index';
import makeThemeMotion from '@bootstrap-styled/motion/lib/theme';
import createMakeTheme, { toMakeTheme } from 'bootstrap-styled/lib/utils';

const mediaAppTheme = makeTheme({
  '$body-bg': '#1E2129',
  '$navbar-padding-x': '2rem',
  '$navbar-padding-y': '2rem',
  '$headings-color': 'white',
  '$font-size-h2': '20px',
});

export const makeThemeMediaApp = createMakeTheme([
  toMakeTheme(mediaAppTheme),
  toMakeTheme(makeThemeMotion),

]);

const theme =  makeThemeMediaApp();

export default theme;
