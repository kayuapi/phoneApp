import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements'
import {
  Surface,
  Title,
  Caption,
  useTheme,
  Text,
  Checkbox,
  Button,
} from 'react-native-paper';
import { useOrderData } from '../context/orderDataContext';
import color from 'color';
import { API, graphqlOperation, Auth } from 'aws-amplify';

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
};

const updateOrderStatus = async (shopId, fulfillmentMethod, orderId) => {
  const queryingOrderId = {
    shopId,
    fulfillmentMethod,
    orderId,
    status: 'FULFILLED',
  };
  const receivedOrders = await API.graphql(graphqlOperation(`
    mutation UpdateOrder(
      $input: UpdateOrderInput!
    ) {
      updateOrder(input: $input) {
        shopId
        fulfillmentMethod
        orderId
        status
      }
    }`, {
      input: queryingOrderId
  }));
  return receivedOrders;
}

const deleteOrder = (orderId, fulfillmentMethod, state) => {
  return Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(result => {
    const shopId = result['username'];
    return updateOrderStatus(shopId, fulfillmentMethod, orderId).then(result => {

      const removedDeletedOrderArray = state.orders.filter(order => {
        // use the following filter because to identify a unique order, actually can remove the fulfillment method
        return (order.orderId !== orderId || order.fulfillmentMethod !== fulfillmentMethod);
      });
      return removedDeletedOrderArray;
    }).catch(err => console.log('err1', err));
  })
  .catch(err => console.log(err));
}

export const DetailedOrder = (props) => {
  const theme = useTheme();
  // console.log('props DetailedOrder', props);
  const [checked, setChecked] = React.useState([]);
  const [checked2, setChecked2] = React.useState([]);
  const [ filterValues,
    state,
    loading,
    changeFilterValues,
    updateOrderData,
    renew,
    updateRenew
 ] = useOrderData();
  // console.log('update order data', updateOrderData);
  const navigation = useNavigation();
  // const contentColor = color(theme.colors.text)
  //   .alpha(0.8)
  //   .rgb()
  //   .string();

  // const imageBorderColor = color(theme.colors.text)
  //   .alpha(0.15)
  //   .rgb()
  //   .string();
  // console.log('check', checked);
  // console.log('theme', theme);
  return (
    <ScrollView style={{backgroundColor: theme.colors.background}}>
    <Surface style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.topRow}>
        <View>
          <Title>#{props.orderId}: {props.fulfillmentMethod}</Title>
          <Caption style={styles.handle}>Order received time: {new Date(props.createdAt).toLocaleDateString()}, {new Date(props.createdAt).toLocaleTimeString()}</Caption>
        </View>
      </View>
      <Surface style={[styles.container2, {
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
        }]}>
        {/* <Subheading style={[styles.content, { color: contentColor }]}>
          {props.fulfillmentMethod}
        </Subheading> */}
        <View style={{flex: 1, paddingLeft: 20}}>
          {props.customAttributeField1 && (
            <Text>{props.customAttributeField1}</Text>
          )}
          <Title>
            {props.fulfillmentMethod === 'DINE_IN' ? `Table ${props.tableNumber}`: `${props.firstName} ${props.lastName ? props.lastName : ''}`}
          </Title>
          <Text>
            {props.phoneNumber && `phone: ${props.phoneNumber}\n`}
            {props.fulfillmentMethod === 'DELIVERY' && `Delivery address: ${props.deliveryAddress}`}
          </Text>
          <Text>
            {props.postscript && `PS: ${props.postscript}\n`}
            {props.vehiclePlateNumber && `Vehicle plate number: ${props.vehiclePlateNumber}`}
          </Text>

          <Text>
            {props.paymentMethod && `\n**${props.paymentMethod}**\n`}
            {props.fulfillmentMethod === 'SELF_PICKUP' && `Pickup date and time: ${new Date(`${props.pickupDate}T${props.pickupTime}`).toLocaleDateString()}, ${new Date(`${props.pickupDate}T${props.pickupTime}`).toLocaleTimeString()}`}
            {props.fulfillmentMethod === 'DELIVERY' && `Delivery date and time: ${new Date(`${props.deliveryDate}T${props.deliveryTime}`).toLocaleDateString()}, ${new Date(`${props.deliveryDate}T${props.deliveryTime}`).toLocaleTimeString()}`}            
          </Text>

          {props.orderedItems.map((orderedItem, index) => {
            let processedVariantName = '';
            if (orderedItem.variant) {
              processedVariantName = JSON.stringify(orderedItem.variant)
                .replace(/["']/g, '')
                .replace(/[,]/g, '\n');
            }
            return (
              <ListItem key={index}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <View style={{flexDirection: 'row', paddingRight: 20}}>
                    <Checkbox.Android 
                      color='blue'
                      uncheckedColor='blue'
                      status={checked.includes(index) ? 'checked': 'unchecked'} 
                      onPress={() => {
                        if (checked.includes(index)) {
                          const result = checked.filter(id => id !== index);
                          setChecked(result);
                        } else {
                          setChecked([...checked, index]);
                        }
                      }} 
                    />
                    <Checkbox.Android 
                      color='red'
                      uncheckedColor='red'
                      status={checked2.includes(index) ? 'checked': 'unchecked'} 
                      onPress={() => {
                        if (checked2.includes(index)) {
                          const result = checked2.filter(id => id !== index);
                          setChecked2(result);
                        } else {
                          setChecked2([...checked2, index]);
                        }
                      }} 
                    />
                  </View>
                  <ListItem.Content>
                    <ListItem.Title>{orderedItem.name}{processedVariantName && `\n${processedVariantName}`}</ListItem.Title>
                    <ListItem.Subtitle>Quantity: {orderedItem.quantity}</ListItem.Subtitle>
                  </ListItem.Content>
                </View>
              </ListItem>
            )
          })}

        </View>
      </Surface>


      {props.status === 'UNFULFILLED' &&
        <Button mode="contained" 
          onPress={
            () => {
              deleteOrder(props.orderId, props.fulfillmentMethod, state).then(result => {
                updateOrderData({...state, orders: result});
                navigation.navigate('FeedList');
                updateRenew();
              });
            }} 
          style={{
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20, 
            borderBottomLeftRadius: 20, 
            borderBottomRightRadius: 20
          }}
        >Fulfill</Button>
    }
    </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container2: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 30,
    // marginBottom: 30,
    // marginLeft: 30,
    // marginRight: 30,
    elevation: 3,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    marginRight: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  handle: {
    marginRight: 3,
    lineHeight: 12,
  },
  content: {
    marginTop: 25,
    fontSize: 20,
    lineHeight: 30,
  },
  image: {
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 25,
    borderRadius: 20,
    width: '100%',
    height: 280,
  },
});
