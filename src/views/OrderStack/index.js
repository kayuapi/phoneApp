import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Feed } from './stack';
import { Details } from './details';

const Stack = createStackNavigator();

export const FeedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{ headerTitle: 'Twitter' }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerTitle: 'Tweet' }}
      />
    </Stack.Navigator>
  );
};
