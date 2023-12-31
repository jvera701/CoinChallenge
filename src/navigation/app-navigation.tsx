import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, CoinScreen} from '@screens';

export type RootStackParamList = {
  Home: undefined;
  'Coin Screen': {
    name: string;
    id: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const AppNavigation = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator
        screenOptions={{gestureEnabled: false}}
        initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Coin Screen"
          component={CoinScreen}
          options={({route}) => ({
            title: route.params.name,
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
