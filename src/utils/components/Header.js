import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { RippleIcon, TEXT } from '../UI/Custom';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/core';

function Header({ title, newUser }) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {newUser && (
        <RippleIcon
          style={{ marginRight: 25 }}
          size={24}
          onPress={() => navigation.goBack()}>
          <MIcon name="keyboard-backspace" size={24} />
        </RippleIcon>
      )}
      <TEXT>{title}</TEXT>
    </View>
  );
}

export default memo(Header);

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    // borderWidth: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
