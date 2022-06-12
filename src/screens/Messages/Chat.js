import {
  View,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../utils/components/Header';
import { TextInput } from 'react-native-paper';
import { TEXT } from '../../utils/UI/Custom';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../utils/UI/Colors';
import firestore from '@react-native-firebase/firestore';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Chat = ({ route }) => {
  const { name, matchDetails } = route.params;

  const [messages, setMessages] = useState([]);
  console.log({ messages });
  useEffect(async () => {
    console.log(matchDetails.id);

    const db = firestore();

    db.collection('matches')
      .doc(matchDetails.id)
      .collection('messages')
      // .doc()

      .orderBy('timeStamp', 'desc')
      // .get();
      .onSnapshot(snapshot => {
        const postData = [];
        snapshot?.forEach(doc => postData.push({ ...doc.data(), id: doc.id }));
        setMessages(postData);
      });

    // console.log({m})

    // console.log({ coll });
  }, [matchDetails, firestore]);

  const { user } = useSelector(state => state.profile);
  const sendMessage = async () => {
    await firestore()
      .collection('matches')
      .doc(matchDetails.id)
      .collection('messages')
      .add({
        timeStamp: firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
        // displayName: user.displayName,
        message: input,
      });

    setInput('');
  };

  const [input, setInput] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={name} newUser={true} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={19}>
        <TouchableWithoutFeedback
          style={{ backgroundColor: 'red' }}
          onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            inverted={-1}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
        <View style={styles.sendContainer}>
          <TextInput
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
            style={{ width: '80%' }}
          />
          <Pressable
            onPress={sendMessage}
            style={{
              height: 50,
              width: 50,
              backgroundColor: Colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 40,
            }}>
            <MIcon name="send" size={24} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  sendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    // width: '100%',
    // marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    // width: '90%',
    // alignSelf: 'center',
    // justifyContent: 'space-between',
    // height: 60,
    // marginBottom: 16,
    // position: 'absolute',
    // bottom: 8,
    // backgroundColor: 'red',
  },
});
