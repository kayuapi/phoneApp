/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

import { Auth as AmplifyAuth, Analytics } from 'aws-amplify';

// const Stack = createStackNavigator();
// import LoginScreen from './src/views/login';
// import HomeScreen from './src/views/home';
// import CreateNewPasswordScreen from './src/views/createNewPassword';
import Initializing from './src/views/Initializing';
import Auth from './src/views/Auth/Auth';
import MainNav from './src/views/Home/MainNav';
import { NativeModules } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key_chm_device_token')
    if(value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log('getData err', e);
  }
};

import { useTheme } from 'react-native-paper';
const AppNavigator = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  const [currentView, setCurrentView] = React.useState('initializing');
  const updateAuth = (currentView2) => {
    setCurrentView(currentView2);
  };
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await AmplifyAuth.currentAuthenticatedUser();
        if (user) {
          console.log('user is signed in');
          setCurrentView('home');
        }
      } catch (err) {
        console.log('user is not signed in');
        setCurrentView('auth');
      }
    };
    const updateEndpoint = async () => {
      try {
        const user = await AmplifyAuth.currentAuthenticatedUser();
        // getData().then((token) => {
        NativeModules.RNPushNotification.getToken((token) => {
          console.log('token', token);
          Analytics.updateEndpoint({
            address: token,
            channelType: 'GCM',
            userId: user.username,
            optOut: 'NONE',
          }).then((data) => console.log('updated endpoint', data));
        });
      } catch (err) {
        console.log('update endpoint failed', err);
        setCurrentView('auth');
      }
    };
    if (currentView === 'initializing') {
      setCurrentView('home');
    } else if (currentView === 'auth') {
      checkAuth();
    } else if (currentView === 'home') {
      updateEndpoint();
    }
  }, [currentView]);

  return (
    <NavigationContainer theme={navigationTheme}>
      {currentView === 'initializing' && <Initializing />}
      {currentView === 'auth' && <Auth updateAuth={updateAuth} />}
      {currentView === 'home' && <MainNav updateAuth={updateAuth} />}
    </NavigationContainer>
    // <Stack.Navigator>
    //   {state.userToken == null ? (
    //     <>
    //       <Stack.Screen
    //         name="Login"
    //         component={LoginScreen}
    //         options={{
    //           title: 'Chmbox',
    //           animationTypeForReplace: 'pop',
    //         }}
    //       />
    //       <Stack.Screen
    //         name="CreateNewPassword"
    //         component={CreateNewPasswordScreen}
    //       />
    //     </>
    //   ) : (
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   )}
    // </Stack.Navigator>
  );
};

export default AppNavigator;
