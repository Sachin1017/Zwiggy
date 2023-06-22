/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const logout = () => {
    AsyncStorage.removeItem('uid');
    navigation.navigate('Login');
  };
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
    <SafeAreaView>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtnIcon}
            source={require('../assets/icons/back.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'relative'}}>
          <Image
            style={styles.profile}
            source={require('../assets/icons/man.png')}
          />
          <Image
            style={styles.pen}
            source={require('../assets/icons/pen.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.nameContainer}>
          <View>
            <Text style={styles.name}>Sachin</Text>
            <Text style={{color: '#000'}}>123457890</Text>
          </View>
          <TouchableOpacity>
            <Text style={{color: '#FC5805', fontWeight: '500', fontSize: 16}}>
              EDIT
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#000',
          }}>
          <Text style={styles.title}>My account</Text>
          <Text style={{color: '#000'}}>
            Favourites, Hidden restaurants % Settings
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#000',
          }}>
          <Text style={styles.title}>Address</Text>
          <Text style={{color: '#000'}}>Share, Edit & New Address</Text>
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#000',
          }}>
          <Text style={styles.title}>Payments & Refunds</Text>
          <Text style={{color: '#000'}}>Refund status & Payment moddes</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backBtnIcon: {width: 25, height: 25},
  profile: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  profileContainer: {
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  pen: {
    position: 'absolute',
    top: 50,
    left: 50,
    width: 25,
    height: 25,
  },
  detailsContainer: {
    position: 'absolute',
    width: '100%',
    top: Dimensions.get('screen').height / 5,
  },
  name: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  nameContainer: {
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
  },
  title: {color: '#000', fontSize: 18, fontWeight: '500'},
  logoutBtn: {
    backgroundColor: '#fc5805',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    top: Dimensions.get('screen').height - 150,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 500,
    fontSize: 20,
  },
});

export default Profile;
