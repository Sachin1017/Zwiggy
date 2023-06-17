import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';

const Address = ({navigation}) => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.addrContainer}>
        <View style={styles.cityContainer}>
          <Image
            style={styles.compassIcon}
            source={require('../assets/icons/compass.png')}
          />
          <Text style={styles.cityNameTxt}>Vijayanagar</Text>
          <Image
            style={styles.down_arrow}
            source={require('../assets/icons/down-arrow.png')}
          />
        </View>
        <Text style={{color: '#000'}} ellipsizeMode="tail" numberOfLines={1}>
          Kempegowda Layout, Govindaraja Nagar Ward, Prashant Nagar,
          Vijayanagar, Bengaluru, Karnataka 560079
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          style={styles.account}
          source={require('../assets/icons/account.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  compassIcon: {
    width: 18,
    height: 18,
    tintColor: '#fc5805',
  },
  down_arrow: {
    width: 18,
    height: 18,
  },
  cityNameTxt: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  cityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  navContainer: {
    width: '95%',
    marginVertical: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addrContainer: {
    maxWidth: '75%',
    display: 'flex',
  },
  account: {
    width: Dimensions.get('screen').width / 10,
    height: Dimensions.get('screen').width / 10,
    tintColor: '#fc5805',
  },
});

export default Address;
