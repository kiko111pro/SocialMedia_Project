import Snackbar from 'react-native-snackbar';

export const Snack = message =>
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    action: {
      text: 'OK',
    },
  });
