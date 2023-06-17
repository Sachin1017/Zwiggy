/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setData, setImageSlider, setRestaurants} from '../redux/actions';
import ImageSlider from '../Components/imageSlider';
import Address from '../Components/address';
import RestaurantsList from '../Components/restaurantsList';
import DoubleTapToClose from '../Components/doubleTapToClose';

const Food = ({navigation}) => {
  const [img, setImg] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [msg, setMsg] = useState(false);

  const dispatch = useDispatch();
  // const image = useSelector(state => state.Reducers.imageSlider);
  // const data = useSelector(state => state.Reducers.Data);
  const resto = useSelector(state => state.Reducers.restaurants);
  // console.log('data: ', data);
  // console.log('images:', image);

  const getData = async () => {
    try {
      const res = await axios.get(
        'https://sachin1017.github.io/FoodData/db.json',
      );
      const i = await res.data.cards[0].data.data.cards.map(x => {
        return `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${x.data.creativeId}`;
      });
      // console.log(i);
      setImg(i);
      // dispatch(setData(res.data));
      dispatch(setImageSlider(img));
      // console.log(res.data.cards[2].data.data.cards);
      dispatch(setRestaurants(res.data.cards[2].data.data.cards));
      // console.log(resto[0].data.cuisines);
    } catch (error) {
      console.log(error);
    }
  };

  const local = async () => {
    try {
      const l = await axios.get('http://192.168.1.14:8081/name');
      console.log('data: ', l.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showMsg = () => {
    setMsg(true);
    setTimeout(() => {
      setMsg(false);
    }, 2000);
  };

  useEffect(() => {
    getData();
    showMsg();
    local();
  }, []);

  const refresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Address navigation={navigation} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBox}
            placeholder="Search for foods, restaurants & more ..."
            placeholderTextColor="#000"
          />
          <Image
            style={styles.searchIcon}
            source={require('../assets/icons/search.png')}
          />
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }>
          {!refreshing ? (
            <View>
              <View>
                {img !== undefined ? <ImageSlider img={img} /> : null}
              </View>
              <View>
                {resto
                  ? resto.map(item => <RestaurantsList item={item} />)
                  : null}
              </View>
            </View>
          ) : null}
        </ScrollView>
        {msg ? (
          <View
            style={{
              position: 'absolute',
              top: 300,
              backgroundColor: '#ebfaeb',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '500',
              }}>
              Welcome back Sachin.. 🖐
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
      <DoubleTapToClose />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    flex: 1,
  },

  searchContainer: {
    backgroundColor: '#e6eced',
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 10,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  searchBox: {
    fontSize: 16,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
});

export default Food;
