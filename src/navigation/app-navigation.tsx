import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@screens';

const RootStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{gestureEnabled: false}}
        initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
