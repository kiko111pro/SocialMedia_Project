import { View } from 'react-native';
import { TEXT as Text } from '../../utils/UI/Custom';
import React from 'react';
import { Colors } from '../../utils/UI/Colors';

const SenderMessage = ({ message }) => {
  console.log({ message });
  return (
    <View
      style={{
        backgroundColor: Colors.primary,
        maxWidth: '70%',
        padding: 10,
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
        marginVertical: 3,
        marginRight: 16,
        // alignContent: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
      }}>
      <Text style={{ color: 'white' }}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
