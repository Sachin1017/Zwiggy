import 'react-native-gesture-handler';
import React from 'react';
import StackNavigator from './src/Navigation/stackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
import Profile from './src/Screens/profile';

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      {/* <Profile /> */}
    </Provider>
  );
};

export default App;
