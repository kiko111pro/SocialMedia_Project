import React from 'react';
import {View} from 'react-native';
import {Colors} from '../UI/Colors';

function Dot() {
  return (
    <View
      style={{
        backgroundColor: Colors.secondary,
        height: 10,
        width: 10,
        borderRadius: 10,
      }}
    />
  );
}

export default Dot;
