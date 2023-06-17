/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';

const ImageSlider = ({img}) => {
  return (
    <View>
      <SliderBox
        images={img}
        autoplay
        circleLoop
        dotColor="#fc5805"
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 15,
          width: '90%',
          marginTop: 10,
          resizeMode: 'contain',
        }}
        paginationBoxStyle={{width: '90%'}}
        autoplayInterval={4000}
        disableOnPress
      />
    </View>
  );
};

export default ImageSlider;
