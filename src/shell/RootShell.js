import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Auth/Login';
import OTPScreen from '../screens/Auth/OTPScreen';

const STACK = createStackNavigator();

function RootShell() {
  return (
    <STACK.Navigator screenOptions={{header: () => null}}>
      <STACK.Screen name="LOGIN" component={Login} />
      <STACK.Screen name="OTPScreen" component={OTPScreen} />
    </STACK.Navigator>
  );
}

export default RootShell;
