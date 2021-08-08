import Snackbar from 'react-native-snackbar';
import React from 'react';

export const Snack = message =>
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    action: {
      text: 'OK',
    },
  });
