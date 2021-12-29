import { TouchableRipple } from 'react-native-paper';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Colors } from '../UI/Colors';

const checkSize = str => {
  switch (str) {
    case 'very-small':
      return 12;
    case 'small':
      return 14;
    case 'large':
      return 18;
    case 'very-large':
      return 20;
    default:
      return 16;
  }
};

const checkFamily = str => {
  switch (str) {
    case 'bold':
      return 'OpenSans-Bold';
    case 'semi-bold':
      return 'OpenSans-SemiBold';
    default:
      return 'OpenSans-Regular';
  }
};

export const TEXT = ({
  children,
  bold,
  semiBold,
  style,
  size,
  onPress,
  ...rest
}) => {
  return (
    <Text
      onPress={onPress}
      style={[
        {
          fontFamily: checkFamily(
            (bold && 'bold') || (semiBold && 'semi-bold'),
          ),
          fontSize: checkSize(size),
          color: '#000',
        },
        { ...style },
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

export const Button = ({ children, onPress, showLoading, ...rest }) => {
  return (
    <TouchableRipple
      style={styles.button}
      rippleColor="rgba(255, 255, 255, .3)"
      disabled={showLoading}
      onPress={onPress}
      {...rest}>
      {showLoading ? (
        <ActivityIndicator color={Colors.secondary} />
      ) : (
        <TEXT bold style={{ color: '#f5f5f5', letterSpacing: 0.2 }}>
          {children}
        </TEXT>
      )}
    </TouchableRipple>
  );
};

export const Input = ({ label, onChangeText, ...rest }) => {
  return (
    <TextInput
      placeholder={label}
      placeholderTextColor="#bdbdbd"
      style={styles.input}
      selectionColor={Colors.secondary}
      theme={{ colors: { primary: Colors.secondary } }}
      onChangeText={onChangeText}
      {...rest}
    />
  );
};

export const RippleIcon = ({ onPress, size, children, style }) => (
  <View>
    <TouchableRipple
      centered={true}
      onPress={onPress}
      style={[
        {
          //   padding: 18,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: size,
          height: size + 18,
          width: size + 18,
          marginLeft: -12,
        },
        style,
      ]}
      rippleColor="rgba(0,0,0,.1)"
      borderless={true}>
      {children}
    </TouchableRipple>
  </View>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    // flex: 1,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    borderRadius: 6,
  },

  text: {
    color: '#eee',
    // fontWeight: '700',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },

  input: {
    borderColor: Colors.secondary,
    color: Colors.primary,
    marginBottom: 24,
    fontFamily: 'OpenSans-Regular',
    // flex: 1,
    height: 48,
    // includeFontPadding: false,
    // maxHeight: 48,
    fontSize: 14,
    justifyContent: 'center',
    // textAlignVertical: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
});
