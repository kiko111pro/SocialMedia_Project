import React from 'react';
import {FlatList, View, StyleSheet, Image} from 'react-native';
import {Avatar} from 'react-native-paper';
import Dot from '../../utils/components/Dot';
import TabHeader from '../../utils/components/TabHeader';
import {truncate} from '../../utils/functions';
import {TEXT} from '../../utils/UI/Custom';

const DATA = [
  {
    image: null,
    name: 'Rachel',
    message: 'Hey There how you doing hope you are well there',
  },
  {
    image: null,
    name: 'Rachel',
    message: 'Hey There how you doing hope you are well there',
  },
];

const renderItem = ({item}) => {
  return (
    <View style={styles.chat}>
      <Avatar.Image
        size={60}
        source={require('../../assets/user-placeholder.png')}
      />
      <View style={styles.info}>
        <TEXT semiBold>{item.name}</TEXT>
        <TEXT style={styles.text}>{truncate(item.message, 25)}</TEXT>
      </View>
      <Dot />
    </View>
  );
};

function Inbox() {
  return (
    <>
      <TabHeader title="Chats" />
      <FlatList
        data={DATA}
        keyExtractor={(i, id) => id}
        renderItem={renderItem}
      />
    </>
  );
}

export default Inbox;

const styles = StyleSheet.create({
  chat: {
    height: 100,
    // borderWidth: 1,
    width: '100%',
    // backgroundColor: 'red',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  info: {
    marginHorizontal: 20,
    flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'space-between',
    height: 50,
  },

  text: {},
});
