/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Menu from '../Screens/food';
import Profile from '../Screens/profile';
import {Image} from 'react-native';
import Orders from '../Screens/orders';
import Food from '../Screens/food';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const getUser = async () => {
    try {
      const res = await AsyncStorage.getItem('uid');
      console.log(res);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#123',
          height: 70,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
        },
        tabBarActiveTintColor: '#fc5805',
        tabBarIcon: ({focused}) => {
          let icon;
          if (route.name === 'Food') {
            icon = require('../assets/BotNavigationIcon/dinner.png');
          }
          if (route.name === 'Orders') {
            icon = require('../assets/BotNavigationIcon/shopping-bag.png');
          }
          return (
            <Image
              source={icon}
              style={{
                tintColor: focused ? '#fc5805' : '#fff',
                width: 40,
                height: 40,
              }}
            />
          );
        },
      })}>
      <Tab.Screen name="Food" component={Food} options={{header: () => null}} />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          header: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
