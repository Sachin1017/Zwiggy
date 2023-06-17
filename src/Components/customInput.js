import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {Field} from 'formik';

const CustomInput = ({handleChange, value, placeholder, type, onTouch}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={handleChange}
        value={value}
        keyboardType={type}
        placeholderTextColor="#949494"
        onTouchStart={onTouch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: '#fff',
    fontSize: 16,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default CustomInput;
