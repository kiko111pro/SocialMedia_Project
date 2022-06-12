import { View } from 'react-native';
import { TEXT as Text } from '../../utils/UI/Custom';
import React from 'react';

const Message = ({ message }) => {
  console.log({ message });
  return (
    <View
      style={{
        backgroundColor: 'white',
        maxWidth: '70%',
        // width: "aut"
        padding: 10,
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
        borderBottomRightRadius: 9,
        marginVertical: 3,
        marginLeft: 16,

        alignSelf: 'flex-start',
      }}>
      <Text>{message.message}</Text>
    </View>
  );
};

export default Message;
