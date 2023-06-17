import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import {RegisterFields} from './registerFields';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../Components/customInput';

const Register = ({navigation}) => {
  const initialValues = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Email is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.number().required('Mobile number is required'),
    // .matches(
    //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    //   'Invalid mobile number',
    // ),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character',
      ),
    confirmPassword: Yup.string()
      .required('Password is required')
      .oneOf([Yup.ref('password'), null], "Passwords don't match."),
  });

  const handleFormSubmit = values => {
    if (values !== null) {
      auth()
        .createUserWithEmailAndPassword(
          values.email,
          values.password,
          values.name,
        )
        .then(res => {
          console.log(res);
          console.log('User account created & signed in!');
          AsyncStorage.setItem('uid', res.user.uid);
          navigation.navigate('BottomNavigator');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }
        });
    }
    // Perform login logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/splash-screen/logo.png')}
        />
        <Text style={styles.title}>Zwiggy</Text>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}>
        {({handleChange, handleSubmit, values, errors, isValid, dirty}) => (
          <View style={styles.formContainer}>
            <FlatList
              data={RegisterFields}
              renderItem={({item}) => (
                <View>
                  <Field
                    component={CustomInput}
                    placeholder={item.placeholder}
                    value={values[item.id]}
                    handleChange={handleChange(item.id)}
                    name={item.name}
                    type={item.type}
                  />
                  {errors[item.id] && (
                    <Text style={styles.error}>{errors[item.id]}</Text>
                  )}
                </View>
              )}
            />
            <View style={styles.btnContainer}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{color: '#fff', fontSize: 16}}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text style={{color: '#fc5805', fontSize: 16}}>Login</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={
                  isValid && dirty ? styles.subBtnActive : styles.subBtnDisabled
                }
                onPress={() => {
                  handleSubmit();
                }}
                disabled={!isValid}>
                <Text style={styles.subText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123',
    justifyContent: 'flex-start',
    padding: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  subText: {
    color: '#fff',
    fontSize: 20,
  },
  subBtnActive: {
    backgroundColor: '#fc5805',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  subBtnDisabled: {
    backgroundColor: '#8c8b8b',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  logo: {
    width: Dimensions.get('screen').width / 6,
    height: Dimensions.get('screen').height / 6,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontFamily: 'cursive',
    fontWeight: 'bold',
    color: '#fc5805',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  btnContainer: {
    alignItems: 'center',
    gap: 20,
  },
});

export default Register;
