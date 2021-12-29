import React from 'react';
import { FlatList, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Dot from '../../utils/components/Dot';
import TabHeader from '../../utils/components/TabHeader';
import { truncate } from '../../utils/functions';
import { TEXT } from '../../utils/UI/Custom';

const DATA = true
  ? [
      {
        image: null,
        name: 'Lana Rhodes',
        message: 'Hey There how you doing hope you are well there',
      },
      {
        image: null,
        name: 'Dani Daniels',
        message: 'Hey There how you doing hope you are well there',
      },
      {
        image: null,
        name: 'Ava Addams',
        message: 'Hey There how you doing hope you are well there',
      },
      {
        image: null,
        name: 'Skylar Vox',
        message: 'Hey There how you doing hope you are well there',
      },
      {
        image: null,
        name: 'Mia Khalifa',
        message: 'Hey There how you doing hope you are well there',
      },
      {
        image: null,
        name: 'Kendra Lust',
        message: 'Hey There how you doing hope you are well there',
      },
      {
        image: null,
        name: 'Riley Reid',
        message: 'Hey There how you doing hope you are well there',
      },
      {
        image: null,
        name: 'Lena Paul',
        message: 'Hey There how you doing hope you are well there',
      },
      {
        image: null,
        name: 'Mia Malkova',
        message: 'Hey There how you doing hope you are well there',
      },
    ]
  : [];

const renderItem = ({ item }) => {
  return (
    <TouchableRipple
      rippleColor="rgba(0,0,0,.1)"
      onPress={() => null}
      style={styles.chat}>
      <>
        <Avatar.Image
          size={60}
          source={require('../../assets/user-placeholder.png')}
        />
        <View style={styles.info}>
          <TEXT semiBold>{item.name}</TEXT>
          <TEXT style={styles.text}>{truncate(item.message, 25)}</TEXT>
        </View>
        <Dot />
      </>
    </TouchableRipple>
  );
};

function Inbox() {
  return (
    <>
      <TabHeader title="Chats" />
      <FlatList
        data={DATA}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
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
