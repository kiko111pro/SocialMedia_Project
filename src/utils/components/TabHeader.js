import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Colors} from '../UI/Colors';
import {TEXT} from '../UI/Custom';

function TabHeader({title, profile = false}) {
  return (
    <View style={styles.header}>
      {profile && (
        <View style={styles.profile}>
          <Image
            source={
              {
                uri: 'https://www.make-over.in/static/media/hero.23091799.png',
              } || require('../../assets/user-placeholder.png')
            }
            resizeMode="cover"
            style={styles.profileImage}
          />
          <TEXT bold style={{color: 'white', fontSize: 28}}>
            Kshitiz
          </TEXT>
        </View>
      )}

      <TEXT bold style={{color: 'white', fontSize: 28}}>
        {title || 'Tab Name'}
      </TEXT>
    </View>
  );
}

export default TabHeader;

const styles = StyleSheet.create({
  header: {
    minHeight: 113,
    maxHeight: 414,
    backgroundColor: Colors.primary,
    padding: 16,
    flexDirection: 'column-reverse',
    // paddingTop: 47,
  },

  profileImage: {
    borderRadius: 170,
    width: 170,
    height: 170,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.secondary,
  },

  profile: {
    // borderWidth: 2,
    // borderColor: 'white',
    // backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 5,
    // height: 700,
  },
});
