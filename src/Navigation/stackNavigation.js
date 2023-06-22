import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../Screens/Login/login';
import Home from '../Screens/food';
import Register from '../Screens/Register/register';
import SplashScreen from '../Screens/splashScreen';
import BottomNavigator from './bottomNavigation';
import Profile from '../Screens/profile';
import Menu from '../Screens/menu';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
