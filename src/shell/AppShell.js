import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button} from 'react-native-paper';
import Container from '../utils/components/Container';
import auth from '@react-native-firebase/auth';

const STACK = createStackNavigator();

function AppShell() {
  function handleLogout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <Container>
      <Button onPress={handleLogout}>Logout</Button>
    </Container>
  );
}

export default AppShell;
