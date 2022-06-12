import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, TEXT as Text } from '../../utils/UI/Custom';
import { Colors } from '../../utils/UI/Colors';
import { useNavigation } from '@react-navigation/native';

const Match = ({ route }) => {
  const { loggedInProfile, userSwiped } = route.params;
  const navigation = useNavigation();

  console.log({ loggedInProfile, userSwiped });
  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text size="very-large" bold>
            Congratulations!
          </Text>
          <Text style={{ marginTop: 10 }} size={'large'}>
            You can send text to each other!
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={
              !!loggedInProfile?.profileImage
                ? {
                    uri: loggedInProfile.profileImage,
                  }
                : require('../../assets/user-placeholder.png')
            }
            resizeMode="cover"
            style={styles.profileImage}
          />
          <Image
            source={
              !!userSwiped?.profileImage
                ? {
                    uri: userSwiped.profileImage,
                  }
                : require('../../assets/user-placeholder.png')
            }
            resizeMode="cover"
            style={styles.profileImage}
          />
        </View>
        <Button onPress={() => navigation.navigate('Messages')}>
          SEND MESSAGE
        </Button>
      </View>
    </View>
  );
};

export default Match;

const styles = StyleSheet.create({
  parent: {
    height: '100%',
    backgroundColor: 'red',
    backfaceVisibility: 'visible',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  container: {
    // flex: 1,
    margin: 16,
    padding: 16,
    marginTop: 170,
    // width: Dimensions.get('screen').width,
    // alignSelf: 'center',
    backgroundColor: '#e4f2e5',
    borderRadius: 8,
  },
  profileImage: {
    borderRadius: 170,
    width: 140,
    height: 140,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  imageContainer: {
    marginVertical: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
});
