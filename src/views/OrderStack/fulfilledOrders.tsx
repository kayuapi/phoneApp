import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme, Menu, Provider, Button } from 'react-native-paper';

import { Order } from './components/order';
import { twitts, orders } from './data';
import { StackNavigatorParamlist } from './types';

import Accordion from 'react-native-collapsible/Accordion';
import Animated from 'react-native-reanimated';

import {
  endOfYesterday,
  startOfWeek,
  subWeeks,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  subMonths,
} from 'date-fns';

type OrderProps = React.ComponentProps<typeof Order>;

function renderItem({ item }: { item: OrderProps }) {
  return <Order {...item} />;
}

function keyExtractor(item: OrderProps) {
  return item.id.toString();
}

type Props = {
  navigation?: StackNavigationProp<StackNavigatorParamlist>;
};

export const FulfilledOrders = (props: Props) => {
  const theme = useTheme();  
  
  const [filterValues, setFilters] =  React.useState({
    date_range: [
      `${startOfWeek(new Date()).getTime()}00`,
      `${endOfWeek(new Date()).getTime()}zz`,
    ],
    date_range_text: 'This week',
    fulfillmentMethod: 'ALL',
  });
  const [menuVisible, setMenuVisible] = React.useState({
    date_range: false,
    fulfillmentMethod: false,
  });



  const [state, setState] = React.useState({activeSections: []});
  const data = orders.map(twittProps => ({
    ...twittProps,
    onPress: () =>
      props.navigation &&
      props.navigation.push('Details', {
        ...twittProps,
      }),
  }));

  // const data = twitts.map(twittProps => ({
  //   ...twittProps,
  //   onPress: () =>
  //     props.navigation &&
  //     props.navigation.push('Details', {
  //       ...twittProps,
  //     }),
  // }));


  return (
    <>
      <Provider>
        <View style={styles.container}>
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
                  setFilters({...filterValues, date_range: [
                    `${startOfMonth(new Date()).getTime()}00`,
                    `${endOfMonth(new Date()).getTime()}zz`,
                  ], date_range_text: 'This month'});
                  setMenuVisible({...menuVisible, date_range: false});
                }}
                title="This month"
              />
              <Menu.Item
                onPress={() => {
                  setFilters({...filterValues, date_range: [
                    `${startOfWeek(new Date()).getTime()}00`,
                    `${endOfWeek(new Date()).getTime()}zz`,
                  ], date_range_text: 'This week'});
                  setMenuVisible({...menuVisible, date_range: false});
                }}
                title="This week"
              />
              <Menu.Item
                onPress={() => {
                  setFilters({...filterValues, date_range: [
                    `${subWeeks(startOfWeek(new Date()),1).getTime()}00`,
                    `${startOfWeek(new Date()).getTime()-1}zz`,
                  ], date_range_text: 'Last week'});
                  setMenuVisible({...menuVisible, date_range: false});
                }}
                title="Last week"
              />
              <Menu.Item
                onPress={() => {
                  setFilters({...filterValues, date_range: [
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
                  setFilters({...filterValues, fulfillmentMethod: 'DINE_IN'});
                  setMenuVisible({...menuVisible, fulfillmentMethod: false});
                }}
                title="On premise"
              />
              <Menu.Item
                onPress={() => {
                  setFilters({...filterValues, fulfillmentMethod: 'DELIVERY'});
                  setMenuVisible({...menuVisible, fulfillmentMethod: false});
                }}
                title="Delivery"
              />
              <Menu.Item
                onPress={() => {
                  setFilters({...filterValues, fulfillmentMethod: 'SELF_PICKUP'});
                  setMenuVisible({...menuVisible, fulfillmentMethod: false});
                }}
                title="Self-pickup"
              />
            </Menu>
          </View>
        </View>
        <FlatList
          contentContainerStyle={{ backgroundColor: theme.colors.background }}
          style={{ backgroundColor: theme.colors.background }}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => (
            <View style={{ height: StyleSheet.hairlineWidth }} />
          )}
        />
      </Provider>


    </>

  );
};

const styles = StyleSheet.create({
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