import {Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const checkUser = async () => {
    try {
      const user = await AsyncStorage.getItem('uid');
      if (user === null) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('BottomNavigator');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      checkUser();
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/splash-screen/logo.png')}
      />
      <Text style={styles.title}>Zwiggy</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: Dimensions.get('screen').width / 4,
    height: Dimensions.get('screen').height / 4,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontFamily: 'cursive',
    fontWeight: 'bold',
    color: '#fc5805',
  },
});
