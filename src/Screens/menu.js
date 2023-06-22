/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  BackHandler,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {setMenuList} from '../redux/actions';
import {ScrollView} from 'react-native-gesture-handler';
import Stars from 'react-native-stars';

const Menu = ({navigation, route}) => {
  const [res, setRes] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [navStyle, setNavStyle] = useState({
    display: 'flex',
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  });
  const {restoId} = route.params;
  console.log(scroll);
  // console.log(cuisinesList);
  // console.log('navStyle: ', navStyle);

  const dispatch = useDispatch();
  const menuList = useSelector(state => state.Reducers.menuList);
  // console.log(
  //   menuList?.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card
  //     .itemCards,
  // );
  console.log('menuList: ', menuList);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  const backHandler = () => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  };

  const getMenuList = async () => {
    try {
      const resp = await axios.get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9667581&lng=77.614948&restaurantId=${restoId.id}&submitAction=ENTER`,
      );
      // console.log(
      //   resp.data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card
      //     .card.itemCards,
      // );
      dispatch(setMenuList(resp.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    backHandler();
    getMenuList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={navStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{width: 25, height: 25, marginLeft: 20}}
            source={require('../assets/icons/back.png')}
          />
        </TouchableOpacity>
        {scroll && (
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              display: 'flex',
              fontWeight: '500',
              flex: 1,
              color: '#000',
              fontSize: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {restoId.name} · {restoId.deliveryTime} mins
          </Text>
        )}
      </View>
      <ScrollView
        onScroll={({nativeEvent}) => {
          const scrollY = nativeEvent.contentOffset.y;
          setScroll(scrollY > 0 ? true : false);
          setNavStyle({
            backgroundColor: scrollY > 0 ? '#fff' : '#e1e8eb',
            display: 'flex',
            height: 50,
            gap: Dimensions.get('screen').width / 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          });
        }}
        disableScrollViewPanResponder={true}>
        <View style={styles.restoDetailsContainer}>
          <View style={styles.restoDetails}>
            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
              {restoId.name}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                marginVertical: 10,
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/icons/star.png')}
              />
              <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
                {restoId.avgRating}
              </Text>
              <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
                ({restoId.totalRatings / 1000}K+)
              </Text>
              <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
                · ₹{restoId.costForTwo / 100} for two
              </Text>
            </View>
            <Text style={styles.cuisines}>{restoId.cuisines.join(', ')}</Text>
            <View style={styles.delivery}>
              <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
                  Outlet
                </Text>
                <Text style={{color: '#7d7d7d', fontSize: 14}}>
                  {restoId.locality}
                </Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
                  {restoId.deliveryTime}mins
                </Text>
                <Text style={{color: '#7d7d7d', fontSize: 14}}>
                  Delivery to Vijayanagar
                </Text>
              </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
                {restoId.lastMileTravelString}
              </Text>
              <Text style={{color: '#7d7d7d', fontSize: 14}}>
                | Free delivery on your order
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text>Menu</Text>
          {menuList !== [] ? (
            menuList?.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards.map(
              item => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '90%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderBottomWidth: 0.5,
                    paddingVertical: 40,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      alignSelf: 'center',
                      justifyContent: 'space-around',
                      gap: 10,
                    }}>
                    <Text
                      style={{color: '#000', fontSize: 18, fontWeight: '500'}}>
                      {item.card.info.name}
                    </Text>
                    <Text style={{color: '#000', fontSize: 16}}>
                      ₹{item.card.info.price / 100}
                    </Text>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                      <Stars
                        default={
                          item.card.info.ratings?.aggregatedRating?.rating
                        }
                        count={5}
                        half={true}
                        starSize={16}
                        fullStar={require('../assets/icons/fullStar.png')}
                        emptyStar={require('../assets/icons/emptyStar.png')}
                        halfStar={require('../assets/icons/halfStar.png')}
                      />
                      <Text style={{color: '#ffa600'}}>
                        {item.card.info.ratings?.aggregatedRating?.rating}
                      </Text>
                      <Text>
                        (
                        {
                          item.card.info.ratings?.aggregatedRating
                            ?.ratingCountV2
                        }
                        )
                      </Text>
                    </View>
                  </View>
                  <View style={{position: 'relative', width: 150, height: 150}}>
                    <Image
                      style={{
                        width: 150,
                        height: 150,
                        backgroundColor: '#d4d4d4',
                        borderRadius: 20,
                      }}
                      source={{
                        uri: `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${item.card.info.imageId}`,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#fff',
                        borderWidth: 2,
                        width: '80%',
                        borderRadius: 10,
                        alignSelf: 'center',
                        borderColor: '#d4d4d4',
                        position: 'absolute',
                        top: 125,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 40,
                      }}>
                      <Text
                        style={{
                          color: '#02b016',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        ADD
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ),
            )
          ) : (
            <Text>Loding...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  restoDetailsContainer: {
    width: '100%',
    backgroundColor: '#e1e8eb',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    padding: 20,
  },
  restoDetails: {
    backgroundColor: '#fff',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 15,
  },
  cuisines: {
    fontSize: 14,
    color: '#000',
  },
  delivery: {
    marginVertical: 10,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#a1a1a1',
  },
});

export default Menu;
