import React from 'react';

import Home from './Home';
import Route2 from './Route2';
import Initializing from '../Initializing';
import Auth from '../Auth/Auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack'
import { View, Text, StyleSheet } from 'react-native';
// const Stack = createStackNavigator();
import { OrderStackNavigator } from '../OrderStack/stack';
const Drawer = createDrawerNavigator();
import { DrawerContent } from '../Drawer/DrawerContent';
function MainNav(props) {
  const showDrawer = false;
  const passedDownProps = props;

  return (
    <Drawer.Navigator
      initialRouteName="OrderStack"
      // eslint-disable-next-line react-native/no-inline-styles
      drawerStyle={{ width: !showDrawer ? null : 280 }}
      drawerContent={(props) => (
        <DrawerContent updateAuth={passedDownProps.updateAuth} {...props} />
      )}>
      {/* <Drawer.Screen name="OrderStack" component={OrderStackNavigator} /> */}
      {/* <Drawer.Screen name="Initializing" component={Initializing} /> */}
      {/* <Drawer.Screen name="Initializing">
        {(screenProps) => <Initializing {...screenProps} />}
      </Drawer.Screen> */}
      {/* <Drawer.Screen name="Auth">
        {(screenProps) => <Auth {...screenProps} />}
      </Drawer.Screen> */}
      <Drawer.Screen name="OrderStack">
        {(screenProps) => (
          <OrderStackNavigator {...screenProps} updateAuth={props.updateAuth} />
        )}
      </Drawer.Screen>
      {/* <Drawer.Screen name="Home">
        {(screenProps) => (
          <Home {...screenProps} updateAuth={props.updateAuth} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Route2">
        {(screenProps) => (
          <Route2 {...screenProps} updateAuth={props.updateAuth} />
        )}
      </Drawer.Screen> */}
      {/* <Drawer.Screen name="Logout" component={Route2} /> */}
    </Drawer.Navigator>
  );
}

export default MainNav;
