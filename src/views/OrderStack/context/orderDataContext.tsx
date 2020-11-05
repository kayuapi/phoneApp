import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo
} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
  endOfYesterday,
  startOfWeek,
  subWeeks,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  subMonths,
} from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';


const OrderDataContext = React.createContext(undefined);

type FeedScreenNavigationProp = StackNavigationProp<undefined>;

const OrderDataProvider = ({
  children
}) => {
  const [filterValues, setFilters] =  React.useState({
    date_range: [
      `${startOfWeek(new Date()).getTime()}00`,
      `${endOfWeek(new Date()).getTime()}zz`,
    ],
    date_range_text: 'This week',
    fulfillmentMethod: 'ALL',
  });
  const [refreshData, setRefreshData] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState({
    date_range: false,
    fulfillmentMethod: false,
  });
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const [random, setRandom] = useState(1);
  const [state, setState] = React.useState({orders: [], ordersByDate: {}, fulfilledOrders: []});
  const [loading, setLoading] = React.useState(true);
  const [renew, setRenew] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    async function listReceivedOrders(shopId, fulfillmentMethod, startingOrderId, endingOrderId) {
      const receivedOrders = await API.graphql(graphqlOperation(`
      query ListOrders(
        $shopId: String
        $fulfillmentMethodOrderId: ModelOrderPrimaryCompositeKeyConditionInput
      ) {
        listOrders(
          shopId: $shopId
          fulfillmentMethodOrderId: $fulfillmentMethodOrderId
        ){
          items {
            createdAt
            shopId
            fulfillmentMethod
            orderId
            status
            paymentMethod
            postscript
            tableNumber
            firstName
            lastName
            phoneNumber
            pickupDate
            pickupTime
            vehiclePlateNumber
            deliveryDate
            deliveryTime
            deliveryAddress
            orderedItems {
              name
              variant
              quantity
            }      
          }      
        }
      }`, {
        shopId: `${shopId}`,
        fulfillmentMethodOrderId: {
          between: [{fulfillmentMethod, orderId: startingOrderId}, {fulfillmentMethod, orderId: endingOrderId}]
        }
      }));
      return receivedOrders;
    };
    Auth.currentUserInfo().then(result => {
      if (result) {
        const shopId = result['username'];
        const startingDate = filterValues['date_range'][0];
        const endingDate = filterValues['date_range'][1];
        let fulfillmentMethod = filterValues['fulfillmentMethod'];
        // mapping the ui text to api call input parameter
        if (fulfillmentMethod === 'ON PREMISE') {
          fulfillmentMethod = 'DINE_IN';
        } else if (fulfillmentMethod === 'DELIVERY') {
          fulfillmentMethod = 'DELIVERY';
        } else if (fulfillmentMethod === 'SELF PICKUP') {
          fulfillmentMethod = 'SELF_PICKUP';
        }
        let callFunc;
        if (fulfillmentMethod === 'ALL') {
          callFunc = () => Promise.all([
            listReceivedOrders(shopId, 'DINE_IN', startingDate, endingDate), 
            listReceivedOrders(shopId, 'DELIVERY', startingDate, endingDate),
            listReceivedOrders(shopId, 'SELF_PICKUP', startingDate, endingDate)
          ]);
        } else {
          callFunc = () => Promise.all([listReceivedOrders(shopId, fulfillmentMethod, startingDate, endingDate)]);
        }
        callFunc().then((results) => {
          let combinedOrderList = [];
          let fulfilledCombinedOrderList = [];
          // for one result only
          if (results.length === 1) {
            combinedOrderList = results[0]['data']['listOrders']['items'];
            fulfilledCombinedOrderList = combinedOrderList.filter(order => order.status === 'FULFILLED');
            combinedOrderList = combinedOrderList.filter(order => order.status !== 'FULFILLED');
          }
          if (results.length === 3) {
            combinedOrderList = [
              ...results[0]['data']['listOrders']['items'],
              ...results[1]['data']['listOrders']['items'],
              ...results[2]['data']['listOrders']['items'],
            ];
            fulfilledCombinedOrderList = combinedOrderList.filter(order => order.status === 'FULFILLED');
            combinedOrderList = combinedOrderList.filter(order => order.status !== 'FULFILLED');
          }
          combinedOrderList = combinedOrderList.map(orderItem => ({
            ...orderItem,
            id: uuidv4(),
            onPress: () =>
              navigation.navigate('Details', {
                ...orderItem,
            }),    
          }));
          fulfilledCombinedOrderList = fulfilledCombinedOrderList.map(orderItem => ({
            ...orderItem,
            id: uuidv4(),
            onPress: () =>
              navigation.navigate('Details', {
                ...orderItem,
            }),    
          }));
          // const todaysUnfulfilledOrders = fakeData;
          setState(prevState => ({
            ...prevState,
            orders: [
              ...combinedOrderList
            ],
            fulfilledOrders: [
              ...fulfilledCombinedOrderList
            ]
          }));
          setLoading(false);
          setRenew(!renew);
        }).catch(err => console.log(err));  
      }
    }).catch(err => console.log('orderDataContext err', err));
  }, [filterValues, refreshData]);



  const changeUser = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * 10 + 1);
    setRandom(randomNumber);
  }, [])

  const changeFilterValues = useCallback((newFilterValue) => {
    setFilters(newFilterValue);
  }, [])

  const triggerRefreshData = useCallback(() => {
    setRefreshData(prevState => !prevState);
  }, [])

  // const updateOrderData = (newOrderData) => {
  //   // setState({...state, orders: newOrderData});
  //   setState(newOrderData);
  // }
  const updateOrderData = useCallback((newOrderData) => {
    // setState({...state, orders: newOrderData});
    setState(newOrderData);
  }, [])

  const updateRenew = useCallback(() => {
    // setState({...state, orders: newOrderData});
    setRenew(renew => !renew);
  }, [])


  const data = useMemo(() => ([
    filterValues,
    state,
    loading,
    changeFilterValues,
    updateOrderData,
    renew,
    updateRenew,
    refreshData,
    triggerRefreshData,
  ]), [filterValues, loading, changeFilterValues, updateOrderData, renew, updateRenew, refreshData, triggerRefreshData])

  return (
    <OrderDataContext.Provider value={data}>
      {children}
    </OrderDataContext.Provider>
  )
}

const useOrderData = () => {
  const context = useContext(OrderDataContext);
  if (context === undefined) {
    throw new Error('useOrderData can only be used inside OrderDataProvider');
  }
  return context;
}

export {
  OrderDataProvider,
  useOrderData
}