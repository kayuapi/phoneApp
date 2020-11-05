import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { Order } from './components/order';
import { twitts } from './data';
import { StackNavigatorParamlist } from './types';

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

export const Feed = (props: Props) => {
  const theme = useTheme();

  const data = twitts.map(twittProps => ({
    ...twittProps,
    onPress: () =>
      props.navigation &&
      props.navigation.push('Details', {
        ...twittProps,
      }),
  }));

  return (
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
  );
};
