import React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCbkvCkRcQ5azlm-pe36bdKQq6EcbhOm1I',
  authDomain: 'social-project-5911c.firebaseapp.com',
  projectId: 'social-project-5911c',
  storageBucket: 'social-project-5911c.appspot.com',
  messagingSenderId: '44186900827',
  appId: '1:44186900827:web:e6dcd291709dad6dfbe27e',
  measurementId: 'G-H8VDZEN9KW',
  databaseURL:
    'https://social-project-5911c-default-rtdb.asia-southeast1.firebasedatabase.app',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default () => {
  return {firebase, auth};
};
