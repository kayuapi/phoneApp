import React from 'react';
import { RouteProp } from '@react-navigation/native';

import { DetailedOrder } from './components/detailedOrder';
import { StackNavigatorParamlist } from './types';

type Props = {
  route: RouteProp<StackNavigatorParamlist, 'Details'>;
};

export const Details = (props: Props) => {
  // console.log('propping', props);
  return <DetailedOrder {...props.route.params} />;
};