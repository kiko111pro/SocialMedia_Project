import React from 'react';
import { View } from 'react-native';
import { Colors } from '../UI/Colors';

function Dot({ color = Colors.secondary }) {
  return (
    <View
      style={{
        backgroundColor: color,
        height: 10,
        width: 10,
        borderRadius: 10,
      }}
    />
  );
}

export default Dot;
