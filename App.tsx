import 'react-native-gesture-handler';
import React from 'react';
import StackNavigator from './src/Navigation/stackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import Menu from './src/Screens/menu';

const App = () => {
  return (
    // <NavigationContainer>
    //   <StackNavigator />
    // </NavigationContainer>
    <Menu />
  );
};

export default App;
