import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {TEXT} from '../../utils/UI/Custom';
import Container from '../../utils/components/Container';
import {Colors} from '../../utils/UI/Colors';
import TabHeader from '../../utils/components/TabHeader';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import {TouchableRipple} from 'react-native-paper';

const Settings = ({navigation}) => {
  const options = [
    {
      text: 'Edit Profile',
      icon: 'edit',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      text: 'Logout',
      icon: 'logout',
      onPress: () => auth().signOut(),
    },
  ];
  return (
    <>
      <TabHeader title="Profile" profile={true} />
      <View style={{padding: 16}}>
        {options.map((item, idx) => (
          <Pressable onPress={item.onPress} key={idx} style={styles.list}>
            <>
              <TEXT style={{color: Colors.lightDark}}>{item.text}</TEXT>
              <MIcon name={item.icon} color={Colors.lightDark} size={24} />
            </>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    height: 324,
    width: '100%',
  },

  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    alignItems: 'center',
  },
});
