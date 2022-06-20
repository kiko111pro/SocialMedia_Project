import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MIcon from 'react-native-vector-icons/MaterialIcons';
import { RippleIcon } from '../utils/UI/Custom';
import { Colors } from '../utils/UI/Colors';
import { useSelector } from 'react-redux';

//screens
import Home from '../screens/Home/Home';
import Settings from '../screens/Settings/Settings';
import Inbox from '../screens/Messages/Inbox';
import Profile from '../screens/Settings/Profile';
import Match from '../screens/Home/Match';
import Chat from '../screens/Messages/Chat';

const STACK = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
            color = focused ? Colors.secondary : 'black';
          } else if (route.name === 'Messages') {
            iconName = 'chat-bubble';
            color = focused ? Colors.secondary : 'black';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
            color = focused ? Colors.secondary : 'black';
          }

          // You can return any component that you like here!
          return <MIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#cd4e40',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontFamily: 'OpenSans-Bold',
          fontSize: 12,
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name="Messages"
        component={Inbox}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ header: () => null }}
      />
    </Tab.Navigator>
  );
}

function AppShell() {
  const { currentUserDetails } = useSelector(state => state.profile);

  return (
    <STACK.Navigator screenOptions={{ header: () => null }}>
      <STACK.Screen name="tab" component={TabNavigator} />

      <STACK.Screen name="Profile" component={Profile} />
      <STACK.Group screenOptions={{ presentation: 'transparentModal' }}>
        <STACK.Screen name="MATCH" component={Match} />
      </STACK.Group>
      <STACK.Screen name="ChatScreen" component={Chat} />
    </STACK.Navigator>
  );
}

export default AppShell;
