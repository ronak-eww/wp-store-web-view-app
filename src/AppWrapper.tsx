/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';
import { navigationRef } from './utils/NavigationServiceHooks';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home/Home';

const AppWrapper = () => {
  const PrimaryStack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
    contentStyle: { backgroundColor: '#FFF' },
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <PrimaryStack.Navigator
          detachInactiveScreens
          screenOptions={screenOptions}
        >
          <PrimaryStack.Screen name={'Home'} component={Home} />
        </PrimaryStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default memo(AppWrapper);
