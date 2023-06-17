/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import {LoginFields} from './loginFields';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../Components/customInput';

const Login = ({navigation}) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const forgotPassword = values => {
    auth()
      .sendPasswordResetEmail(values.email)
      .then(() => {
        alert('Password reset email sent');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const handleFormSubmit = values => {
    if (values !== null) {
      auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(res => {
          console.log(JSON.stringify(res.user.uid));
          const uid = JSON.stringify(res.user.uid);
          console.log('User account signed in!');
          AsyncStorage.setItem('uid', uid);
          navigation.navigate('BottomNavigator');
        })
        .catch(error => {
          console.log(error);
          alert('Invalid user or password..!');
          // console.error(error);
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
            <View>
              <FlatList
                data={LoginFields}
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
              <TouchableOpacity onPress={() => forgotPassword(values)}>
                <Text style={{fontSize: 16, color: '#6b75fa'}}>
                  Forgot password ?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{color: '#fff', fontSize: 16}}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={{color: '#fc5805', fontSize: 16}}>Register</Text>
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
                <Text style={styles.subText}>Login</Text>
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
    // alignSelf: 'center',
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
    marginBottom: 50,
  },
  btnContainer: {
    alignItems: 'center',
    gap: 20,
  },
});

export default Login;
