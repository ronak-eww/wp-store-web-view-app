import React, { memo } from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppWrapper from './AppWrapper';

enableScreens(true);
// All providers, store, redux setup is here

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <AppWrapper />
      </View>
    </SafeAreaProvider>
  );
}

export default memo(App);
