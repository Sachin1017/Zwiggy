import {Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
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
