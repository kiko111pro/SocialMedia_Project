import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {checkLogin} from './data/reducers/auth/auth.reducer';

import reducers from './data/reducers';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Shells
import RootShell from './shell/RootShell';
import AppShell from './shell/AppShell';

import auth from '@react-native-firebase/auth';
import { updateUser } from './data/reducers/profile/profile.reducer';
// import {LogBox} from 'react-native';
// LogBox.ignoreLogs(['Reanimated 2']);

const reduxStore = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const App = () => {
  const dispatch = useDispatch();
  const { user, currentUserDetails } = useSelector(state => state.profile);

  // const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(updateUser(user));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // useEffect(async () => {
  //   await dispatch(checkLogin());
  // }, []);

  console.log({ currentUserDetails });

  return (
    <NavigationContainer>
      {user ? <AppShell /> : <RootShell />}
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
