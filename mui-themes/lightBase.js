/* @flow weak */

// This is simply a copy of the light theme as per:
// http://www.material-ui.com/v0.15.0-alpha.1/#/customization/themes

import {
  lightBlue100,
  indigo50,
  cyanA700,
  indigo900,
  cyan500,
  cyan700,
  darkBlack,
  grey100,
  grey300,
  grey400,
  grey500,
  fullBlack,
  pinkA200,
  teal50,
  white
} from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';

export default {
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopLeftNavMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: '#2a4466',
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: ColorManipulator.fade( darkBlack, 0.3 ),
    pickerHeaderColor: cyan500,
    clockCircleColor: ColorManipulator.fade( darkBlack, 0.07 ),
    shadowColor: fullBlack,
  },
  card: {
      headerColor: pinkA200,
      backgroundColor: indigo50,
      actionColor: indigo900
  },
  avatar: { borderColor: null },
};
