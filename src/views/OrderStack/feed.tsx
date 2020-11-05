import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme, Menu, Provider, Button } from 'react-native-paper';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { Order } from './components/order';
import { twitts, orders } from './data';
import { StackNavigatorParamlist } from './types';

import Accordion from 'react-native-collapsible/Accordion';
import Animated from 'react-native-reanimated';
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
import { useLinkBuilder, useNavigation, useRoute } from '@react-navigation/native';
import { useOrderData } from './context/orderDataContext';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';
import PushNotification from '@aws-amplify/pushnotification';

type OrderProps = React.ComponentProps<typeof Order>;

function renderItem({ item }: { item: OrderProps }) {
  // console.log('render order');
  return <Order {...item} />;
}

function keyExtractor(item: OrderProps) {
  return item.id.toString();
}

type Props = {
  navigation?: StackNavigationProp<StackNavigatorParamlist>;
};
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
export const Feed = (props: Props) => {
  const theme = useTheme();  
  const navig = useNavigation();
  const rout = useRoute();
  const requestUnfulfilledOrder = rout.name === 'Unfulfilled orders';
  // console.log('navig', navig);
  // console.log('rout', rout);
  const [filterValues, state, loading, changeFilterValues, updateOrderData, renew, updateRenew, refreshData, triggerRefreshData] = useOrderData();
  const [menuVisible, setMenuVisible] = React.useState({
    date_range: false,
    fulfillmentMethod: false,
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    triggerRefreshData();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  // console.log('start date', subWeeks(startOfWeek(new Date()),1).getTime());
  // console.log('end date', startOfWeek(new Date()).getTime()-1);
  // console.log('final', state.orders);
  // console.log('final2', state.fulfilledOrders);
  // console.log('renew', renew);
  
  // React.useEffect(() => {
  //   console.log('a');
  //   PushNotification.onNotification(remoteMessage => {
  //     console.log('remote message5', remoteMessage);
  //   });
  // }, []);

  // console.log('render flatlist');

  return (
    <>
      {/* <Provider> */}
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
          <View style={styles.buttonContainer}>
            <Menu
              visible={menuVisible.date_range}
              onDismiss={() => setMenuVisible({...menuVisible, date_range: false})}
              anchor={
                <Button
                  icon="chevron-down"
                  mode="contained"
                  onPress={() => {
                    setMenuVisible({...menuVisible, date_range: true});
                  }}>
                  {filterValues.date_range_text}
                </Button>
              }>
              <Menu.Item
                onPress={() => {
                  changeFilterValues({...filterValues, date_range: [
                    `${startOfMonth(new Date()).getTime()}00`,
                    `${endOfMonth(new Date()).getTime()}zz`,
                  ], date_range_text: 'This month'});
                  setMenuVisible({...menuVisible, date_range: false});
                }}
                title="This month"
              />
              <Menu.Item
                onPress={() => {
                  changeFilterValues({...filterValues, date_range: [
                    `${startOfWeek(new Date()).getTime()}00`,
                    `${endOfWeek(new Date()).getTime()}zz`,
                  ], date_range_text: 'This week'});
                  setMenuVisible({...menuVisible, date_range: false});
                }}
                title="This week"
              />
              <Menu.Item
                onPress={() => {
                  changeFilterValues({...filterValues, date_range: [
                    `${subWeeks(startOfWeek(new Date()),1).getTime()}00`,
                    `${startOfWeek(new Date()).getTime()-1}zz`,
                  ], date_range_text: 'Last week'});
                  setMenuVisible({...menuVisible, date_range: false});
                }}
                title="Last week"
              />
              <Menu.Item
                onPress={() => {
                  changeFilterValues({...filterValues, date_range: [
                    `${subMonths(startOfMonth(new Date()),1).getTime()}00`,
                    `${startOfMonth(new Date()).getTime()-1}zz`,
                  ], date_range_text: 'Last month'});
                  setMenuVisible({...menuVisible, date_range: false});
                }}
                title="Last month"
              />
            </Menu>
          </View>
          <View style={styles.buttonContainer}>
            <Menu
              visible={menuVisible.fulfillmentMethod}
              onDismiss={() => setMenuVisible({...menuVisible, fulfillmentMethod: false})}
              anchor={
                <Button
                  icon="chevron-down"
                  mode="contained"
                  onPress={() => {
                    setMenuVisible({...menuVisible, fulfillmentMethod: true});
                  }}>
                  {filterValues.fulfillmentMethod} 
                </Button>
              }>
              <Menu.Item
                onPress={() => {
                  changeFilterValues({...filterValues, fulfillmentMethod: 'ALL'});
                  setMenuVisible({...menuVisible, fulfillmentMethod: false});
                }}
                title="ALL"
              />
              <Menu.Item
                onPress={() => {
                  changeFilterValues({...filterValues, fulfillmentMethod: 'ON PREMISE'});
                  setMenuVisible({...menuVisible, fulfillmentMethod: false});
                }}
                title="ON PREMISE"
              />
              <Menu.Item
                onPress={() => {
                  changeFilterValues({...filterValues, fulfillmentMethod: 'DELIVERY'});
                  setMenuVisible({...menuVisible, fulfillmentMethod: false});
                }}
                title="DELIVERY"
              />
              <Menu.Item
                onPress={() => {
                  changeFilterValues({...filterValues, fulfillmentMethod: 'SELF PICKUP'});
                  setMenuVisible({...menuVisible, fulfillmentMethod: false});
                }}
                title="SELF PICKUP"
              />
            </Menu>
          </View>
        </View>
        { loading ? <ActivityIndicator size="large" color="#0000ff" /> : 
          <FlatList
            contentContainerStyle={{ backgroundColor: theme.colors.background, flexGrow: 1 }}
            style={{ backgroundColor: theme.colors.background }}
            data={requestUnfulfilledOrder ? state.orders:state.fulfilledOrders}
            renderItem={renderItem}
            initialNumToRender={7}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            ListEmptyComponent={<Text style={{color: theme.colors.primary, textAlign: 'center'}}>No new order.</Text>}
            ItemSeparatorComponent={() => (
              <View style={{ height: StyleSheet.hairlineWidth }} />
            )}
            extraData={renew}
          />        
        }
      {/* </Provider> */}


    </>

  );
};

const styles = StyleSheet.create({
  containerf: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container: {
    // flex: 1,
    // paddingTop: 50,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    // flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    padding: 8,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});