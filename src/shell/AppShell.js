import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {RippleIcon} from '../utils/UI/Custom';
import {Colors} from '../utils/UI/Colors';

//screens
import Home from '../screens/Home/Home';
import Settings from '../screens/Settings/Settings';
import Inbox from '../screens/Messages/Inbox';
import Profile from '../screens/Settings/Profile';

const STACK = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
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
      <Tab.Screen name="Home" component={Home} options={{header: () => null}} />
      <Tab.Screen
        name="Messages"
        component={Inbox}
        options={{header: () => null}}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{header: () => null}}
      />
    </Tab.Navigator>
  );
}

function AppShell() {
  return (
    <STACK.Navigator screenOptions={{header: () => null}}>
      <STACK.Screen name="tab" component={TabNavigator} />
      <STACK.Screen name="Profile" component={Profile} />
    </STACK.Navigator>
  );
}

export default AppShell;
