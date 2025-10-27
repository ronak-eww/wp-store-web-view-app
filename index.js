/**
 * @format
 */

import { AppRegistry, TextInput, Text } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.includeFontPadding = false;

AppRegistry.registerComponent(appName, () => App);
