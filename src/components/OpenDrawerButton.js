import React from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
const OpenDrawerButton = ({navigation}) => (
  <Icon
    name="menu"
    // name="sc-telegram"
    // type="evilicon"
    color="#ffffff"
    // color="#517fa4"
    onPress={() => navigation.toggleDrawer()}
  />
);

export default OpenDrawerButton;
