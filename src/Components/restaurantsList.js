/* eslint-disable react-native/no-inline-styles */
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const RestaurantsList = ({item}) => {
  return (
    <Pressable style={styles.restoContainer} key={item.data.id}>
      <View>
        <Image
          style={styles.restoImage}
          source={{
            uri: `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${item.data.cloudinaryImageId}`,
          }}
        />
      </View>
      <View style={styles.restoDetails}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.restoName}>
          {item.data.name}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../assets/icons/star.png')}
          />
          <Text style={styles.restoRatings}>{item.data.avgRating}</Text>
          <Text style={styles.restoRatings}>
            ({item.data.totalRatings / 1000}K+)
          </Text>
          <Text style={styles.restoRatings}>
            · {item.data.deliveryTime} mins
          </Text>
        </View>
        <View
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            display: 'flex',
            width: '95%',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            flexShrink: 1,
          }}>
          {item.data.cuisines.map(i => (
            <Text style={{color: '#000', fontSize: 16}}>{i},</Text>
          ))}
        </View>
        <Text style={{fontSize: 16, color: '#000'}}>
          {item.data.area} · {item.data.lastMileTravelString}
        </Text>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#edebfa', '#fff']}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            // backgroundColor: '#edebfa',
            padding: 8,
            borderRadius: 20,
          }}>
          <Image
            style={{width: 18, height: 18}}
            source={require('../assets/icons/scooter-front-view.png')}
          />
          <Text
            style={{
              color: '#5900FF',
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            FREE DELIVERY
          </Text>
        </LinearGradient>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  restoContainer: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  restoImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  restoName: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  restoDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 5,
  },
  restoRatings: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});

export default RestaurantsList;
