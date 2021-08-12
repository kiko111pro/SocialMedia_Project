import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import Header from '../../utils/components/Header';
import {Colors} from '../../utils/UI/Colors';

function Profile() {
  return (
    <ScrollView>
      <Header title="Edit Profile" />
      <View style={{padding: 16}}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Avatar.Image
              size={100}
              style={styles.image}
              source={require('../../assets/user-placeholder.png')}
            />
            <IconButton
              icon="camera"
              color={Colors.secondary}
              size={20}
              style={styles.camera}
              onPress={() => console.log('Pressed')}
            />
          </View>
        </View>

        <View></View>
      </View>
    </ScrollView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  imageWrapper: {
    // borderWidth: 2,
    alignItems: 'center',
    width: 100,
  },

  image: {
    // position: 'relative',
  },

  camera: {
    position: 'absolute',
    // zIndex: 2,
    backgroundColor: 'white',
    top: -10,
    right: -10,
  },

  imageContainer: {
    // width: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
});
