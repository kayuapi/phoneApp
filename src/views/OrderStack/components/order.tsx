import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {
  Surface,
  Title,
  Caption,
  Text,
  Avatar,
  TouchableRipple,
  useTheme,
  Button,
  IconButton,
  Colors,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from 'color';

type Props = {
  id: number;
  name: string;
  handle: string;
  date: string;
  content: string;
  image: string;
  avatar: string;
  comments: number;
  retweets: number;
  hearts: number;
  onPress: (id: number) => void;
};

export const Order = React.memo(function Order(props) {
  // const theme = useTheme();

  // const iconColor = color(theme.colors.text)
  //   .alpha(0.54)
  //   .rgb()
  //   .string();

  // const contentColor = color(theme.colors.text)
  //   .alpha(0.8)
  //   .rgb()
  //   .string();

  // const imageBorderColor = color(theme.colors.text)
  //   .alpha(0.15)
  //   .rgb()
  //   .string();

  return (
    <View style={styles.wrapper}>
      {/* <TouchableRipple onPress={() => props.onPress(props.orderId)}> */}
        <Surface style={styles.container}>
          <View style={styles.rightColumn}>
            <View style={styles.topRow}>
              <Title>
                #{props.orderId}{' '}
                {props.fulfillmentMethod === 'DINE_IN' && <Avatar.Icon style={{backgroundColor: 'black'}} color="red" size={26} icon="table-chair" />}
                {props.fulfillmentMethod === 'SELF_PICKUP' && <Avatar.Icon style={{backgroundColor: 'black'}} color="red" size={26} icon="home-import-outline" />}
                {props.fulfillmentMethod === 'DELIVERY' && <Avatar.Icon style={{backgroundColor: 'black'}} color="red" size={26} icon="truck-delivery" />}
              </Title>
            </View>
            {/* <Text style={{ color: contentColor }}>Order received time: {new Date(props.createdAt).toLocaleDateString()}, {new Date(props.createdAt).toLocaleTimeString()}</Text> */}
            <View style={styles.bottomRow}>
            <Caption style={styles.handle}>Order received time: {new Date(props.createdAt).toLocaleDateString()}</Caption>
            <Caption style={[styles.handle, styles.dot]}>{'\u2B24'}</Caption>
            <Caption>{new Date(props.createdAt).toLocaleTimeString()}</Caption>
            </View>
          </View>
          <View style={styles.leftColumn}>
            {/* <Avatar.Image source={{ uri: props.avatar }} size={60} /> */}
            {/* <Icon name = 'doubleright' size={60} onPress={() => props.onPress(props.orderId)} /> */}
            <IconButton
              icon="arrow-right-bold-circle"
              color={Colors.red500}
              size={60}
              onPress={() => props.onPress(props.orderId)}
            />
            {/* <Avatar.Icon size={60} icon="folder" onPress={() => props.onPress(props.orderId)} /> */}
            {/* <Button icon={{ uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' }}>
              Press me
            </Button> */}
          </View>
        </Surface>
      {/* </TouchableRipple> */}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    // marginTop: 30,
    marginBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  container: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingRight: 15,
    // marginBottom: 30,
    // marginLeft: 30,
    // marginRight: 30,
    elevation: 4,
  },
  leftColumn: {
    width: 100,
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  handle: {
    marginRight: 3,
  },
  dot: {
    fontSize: 3,
  },
  image: {
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
    borderRadius: 20,
    width: '100%',
    height: 150,
  },
  bottomRow: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDescription: {
    marginLeft: 2,
    lineHeight: 12,
  },
});
