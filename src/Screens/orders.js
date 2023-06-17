import {View, Text, BackHandler} from 'react-native';
import React, {useEffect} from 'react';

const Orders = ({navigation}) => {
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <View>
      <Text>Orders</Text>
    </View>
  );
};

export default Orders;
