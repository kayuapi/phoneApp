/**
 * @format
 */
import 'react-native-gesture-handler';
import * as React from 'react';
// import { Provider as PaperProvider } from 'react-native-paper';
import {AppRegistry, NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Amplify from 'aws-amplify';
import PushNotification from '@aws-amplify/pushnotification';
// import { PushNotificationIOS } from '@react-native-community/push-notification-ios';
import config from './aws-exports';
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme, AppearanceProvider } from 'react-native-appearance';
import { PreferencesContext } from './src/context/preferencesContext';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
var PushNotificationModule = require('react-native-push-notification');
import AsyncStorage from '@react-native-community/async-storage';

Amplify.configure(config);

function AppWithRootNavigator() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(
    colorScheme === 'dark' ? 'dark' : 'light'
  );
  function toggleTheme() {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  }
  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme]
  );
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <PreferencesContext.Provider value={preferences}>
          <PaperProvider
            theme={
              theme === 'light'
                ? {
                    ...DefaultTheme,
                    colors: { ...DefaultTheme.colors, primary: '#000' },
                  }
                : {
                    ...DarkTheme,
                    colors: { ...DarkTheme.colors, primary: '#fff' },
                  }
            }>
            <App />
          </PaperProvider>
        </PreferencesContext.Provider>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}

// get the notification data when notification is received
PushNotification.onNotification((notification) => {
  // Note that the notification object structure is different from Android and IOS
  console.log('in app notification', notification);
  PushNotificationModule.localNotification({
    channelId: 'com.chmappproject',
    autoCancel: true,
    bigText: `Pull down the list to see it! ${
      notification.data
        ? notification.data['pinpoint.notification.body']
        : notification.bigText
    }`,
    subText: `${new Date().toLocaleTimeString()}`,
    title: `${
      notification.data
        ? notification.data['pinpoint.notification.title']
        : notification.title
    }`,
    onlyAlertOnce: true,
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    // actions: '["Yes", "No"]',
  });

  // (required) Called when a remote is received or opened, or local notification is opened
  // notification.finish(PushNotificationIOS.FetchResult.NoData);
});

// get the registration token
// This will only be triggered when the token is generated or updated.
PushNotification.onRegister((token) => {
  console.log('in app registration', token);
});

// get the notification data when notification is opened
PushNotification.onNotificationOpened((notification) => {
  console.log('the notification is opened', notification);
});
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key_chm_device_token', value);
  } catch (e) {
    // saving error
    console.log('store token failed', e);
  }
};

// Must be outside of any component LifeCycle (such as `componentDidMount`).
// PushNotificationModule.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log('TOKEN:', token);
//     storeData(token.token);
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);

//     // process the notification
//     PushNotificationModule.localNotification({
//       channelId: 'com.chmappproject',
//       autoCancel: true,
//       bigText: notification.data['pinpoint.notification.body'],
//       subText: 'Online Ordering System',
//       title: notification.data['pinpoint.notification.title'],
//       message: 'Expand me to see more',
//       vibrate: true,
//       vibration: 300,
//       playSound: true,
//       soundName: 'default',
//       actions: '["Yes", "No"]',
//     });

//     // (required) Called when a remote is received or opened, or local notification is opened
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//   onAction: function (notification) {
//     console.log('ACTION:', notification.action);
//     console.log('NOTIFICATION:', notification);

//     // process the action
//   },

//   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//   onRegistrationError: function (err) {
//     console.error(err.message, err);
//   },

//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    * - if you are not using remote notification or do not have Firebase installed, use this:
//    *     requestPermissions: Platform.OS === 'ios'
//    */
//   requestPermissions: true,
// });

PushNotificationModule.getChannels(function (channel_ids) {
  console.log('channel_ids', channel_ids); // ['channel_id_1']
});
PushNotificationModule.createChannel(
  {
    channelId: 'com.chmappproject', // (required)
    channelName: 'Notification', // (required)
    channelDescription: 'Rings when new order arrives.', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

AppRegistry.registerComponent(appName, () => AppWithRootNavigator);
