import { Icon } from 'react-native-elements';
import React from 'react';
import { View, StyleSheet, NativeModules } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { Auth as AmplifyAuth, Analytics } from 'aws-amplify';
import { PreferencesContext } from '../../context/preferencesContext';

type Props = DrawerContentComponentProps<DrawerContentOptions>;

// export function DrawerContent(props: Props) {
export function DrawerContent(props) {
  // console.log('drawer content props', props);
  const paperTheme = useTheme();
  const { theme, toggleTheme } = React.useContext(
    PreferencesContext
  );
  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });
  const [username, setUsername] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  React.useEffect(() => {
    AmplifyAuth.currentAuthenticatedUser().then((result) => {
      setUsername(result.username);
      setPhoneNumber(result.attributes.phone_number);
    }).catch(err=>console.log('drawer content err', err));
  }, []);
  const endpointOptOut = async () => {
    try {
      const user = await AmplifyAuth.currentAuthenticatedUser();
      NativeModules.RNPushNotification.getToken((token) => {
        // console.log('token', token);
        Analytics.updateEndpoint({
          address: token,
          channelType: 'GCM',
          userId: user.username,
          optOut: 'ALL',
        })
        // .then((data) => 
        //   console.log('updated endpoint', data)
        // )
        .catch(err => console.log('drawer content err2', err));
      });
    } catch (err) {
      console.log('endpoint opt out failed');
    }
  };

  const signOut = async () => {
    try {
      await endpointOptOut();
      await AmplifyAuth.signOut();
      console.log('signed out')
      props.updateAuth('auth')
      // props.navigation.navigate('Auth');

    } catch (err) {
      console.log('error signing out...', err)
    }
  }
  return (
    <DrawerContentScrollView {...props}>
      <Animated.View
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.surface,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.userInfoSection}>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Avatar.Image
            source={require('../../assets/logo.png')}
            size={100}
            style={{justifyContent: 'center', alignContent: 'center'}}
          />
          </View>
          <Title style={styles.title}>{username}</Title>
          <Caption style={styles.caption}>{phoneNumber}</Caption>
          {/* <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                ?
              </Paragraph>
              <Caption style={styles.caption}>Monthly order</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                ?
              </Paragraph>
              <Caption style={styles.caption}>Today's order</Caption>
            </View>
          </View> */}
        </View>
        <Drawer.Section style={styles.drawerSection}>
          {/* <DrawerItem
            icon={({ color, size }) => (
              <Icon name="dashboard" color={color} size={size} />
            )}
            label="Dashboard (Coming soon)"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="collections" color={color} size={size} />
            )}
            label="Banner (Coming soon)"
            onPress={() => {}}
          /> */}
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="edit" color={color} size={size} />
            )}
            label="OrderMemo"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={theme === 'dark'} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section>
          <TouchableRipple onPress={signOut}>
            <View style={styles.preference}>
              <Text>Logout</Text>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
