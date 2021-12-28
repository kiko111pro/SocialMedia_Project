import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TEXT as Text } from '../../utils/UI/Custom';
import Dot from '../../utils/components/Dot';

import { Colors } from '../../utils/UI/Colors';

const Card = ({ card }) => {
  console.log({ card });
  return (
    <View style={[styles.card, styles.elevation]}>
      <View style={styles.imageContainer}>
        <ImageBackground
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: card?.profileImage,
          }}>
          <View style={styles.infoWrapper}>
            <Text bold style={{ color: '#eee', marginBottom: 8 }}>
              {card?.name}, {card?.age}
            </Text>
            <Text size="small" style={{ color: '#eee' }}>
              {card?.city},{`  `}
              {/* <Dot color="#eee" /> */}
              {`  `}
              {card?.profession}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    // flex: 1,
    // marginVertical: 10,
    // height: 580,
    marginHorizontal: 10,
    marginTop: -20,
    maxHeight: '70%',

    // flex: 1,
    // position: 'relative',
    // backgroundColor: 'red',
  },
  elevation: {
    elevation: 4,
    shadowColor: Colors.secondary,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 8,
    // borderTopLeftRadius: 8,
    // flex: 3 / 4,
    // // maxHeight: '85%',
    // marginTop: -30,
    // backgroundColor: 'black',

    // position: 'absolute',
    // top: 0,
    maxHeight: '100%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  infoWrapper: {
    backgroundColor: Colors.primary,
    backfaceVisibility: 'visible',
    backgroundColor: 'rgba(0,0,0,.5)',
    padding: 10,
  },
});
