import React from 'react';
import color from 'color';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused, RouteProp } from '@react-navigation/native';

import overlay from './overlay';
import { Feed } from './feed';
import { Message } from './message';
import { Notifications } from './notifications';
import { StackNavigatorParamlist } from './types';

const Tab = createMaterialBottomTabNavigator();

type Props = {
  route: RouteProp<StackNavigatorParamlist, 'FeedList'>;
};

export const BottomTabs = (props: Props) => {
  const routeName = props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : 'Feed';

  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  let icon = 'feather';

  switch (routeName) {
    case 'Messages':
      icon = 'email-plus-outline';
      break;
    default:
      icon = 'feather';
      break;
  }

  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface) as string)
    : theme.colors.surface;

  return (
    <React.Fragment>

      <Tab.Navigator
        initialRouteName="Feed"
        backBehavior="initialRoute"
        shifting={true}
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text)
          .alpha(0.6)
          .rgb()
          .string()}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Unfulfilled orders"
          component={Feed}
          options={{
            tabBarIcon: 'check',
            tabBarColor,
          }}
        />

        <Tab.Screen
          name="Fulfilled orders"
          component={Feed}
          options={{
            tabBarIcon: 'check-all',
            tabBarColor,
          }}
        />
        {/* <Tab.Screen
          name="Messages"
          component={Message}
          options={{
            tabBarIcon: 'message-text-outline',
            tabBarColor,
          }}
        /> */}
      </Tab.Navigator>
      {/* <Portal>
        <FAB
          visible={isFocused}
          icon={icon}
          style={{
            position: 'absolute',
            bottom: insets.bottom + 65,
            right: 16,
          }}
          color="white"
          theme={{
            colors: {
              accent: theme.colors.primary,
            },
          }}
          onPress={() => {}}
        />
      </Portal> */}
    </React.Fragment>
  );
};