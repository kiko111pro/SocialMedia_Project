import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Dot from '../../utils/components/Dot';
import TabHeader from '../../utils/components/TabHeader';
import { truncate } from '../../utils/functions';
import { TEXT } from '../../utils/UI/Custom';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { getMatchedUserInfo } from '../../utils/functions';

import { useNavigation } from '@react-navigation/native';

const ChatRow = ({ matchDetails, user, navigation }) => {
  const [matchedUserInfo, setMatchedUserInfo] = useState({});

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  return (
    <TouchableRipple
      rippleColor="rgba(0,0,0,.1)"
      onPress={() =>
        navigation.navigate('ChatScreen', {
          name: matchedUserInfo.name,
          matchDetails,
        })
      }
      style={styles.chat}>
      <>
        <Avatar.Image
          size={60}
          source={
            matchedUserInfo.profileImage
              ? { uri: matchedUserInfo.profileImage }
              : require('../../assets/user-placeholder.png')
          }
        />
        <View style={styles.info}>
          <TEXT semiBold>{matchedUserInfo.name}</TEXT>
          {/* <TEXT style={styles.text}>{truncate(matchedUserInfo.message, 25)}</TEXT> */}
        </View>
        <Dot />
      </>
    </TouchableRipple>
  );
};

function Inbox() {
  const navigation = useNavigation();
  const { user } = useSelector(state => state.profile);

  const [matches, setMatches] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const updatingList = async () => {
    const chatList = await firestore()
      .collection('matches')
      .where('usersMatched', 'array-contains', user.uid)
      .get();

    setMatches(chatList.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    updatingList();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updatingList();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [user, navigation]);

  console.log({ matches });

  return (
    <>
      <TabHeader title="Chats" />
      {matches?.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={matches}
          inverted={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          keyExtractor={(i, id) => id}
          renderItem={({ item }) => (
            <ChatRow navigation={navigation} matchDetails={item} user={user} />
          )}
        />
      ) : (
        <TEXT>NO MATCHES YET!</TEXT>
      )}
      {/* <TEXT>Coming in next version</TEXT> */}
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
