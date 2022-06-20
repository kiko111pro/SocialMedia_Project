import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import TabHeader from '../../utils/components/TabHeader';
import Card from '../../components/SwipingCard';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';
import AIcon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';

import { TEXT } from '../../utils/UI/Custom';
import { useSelector } from 'react-redux';
import { generateId } from '../../utils/functions';

function Home() {
  const swipeRef = useRef(null);
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const { user, currentUserDetails } = useSelector(state => state.profile);

  const swipeLeft = async cardIndex => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('passes')
      .doc(userSwiped.id)
      .set(
        {
          userSwiped,
        },
        { merge: true },
      );
  };

  const swipeRight = async cardIndex => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    const loggedInProfile = currentUserDetails?._data;

    //check if user swiped on u
    const checkUserSwiped = await firestore()
      .collection('Users')
      .doc(userSwiped.id)
      .collection('swipes')
      .doc(user.uid)
      .get();
    if (checkUserSwiped.exists) {
      console.log('you matched with', userSwiped.name);
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('swipes')
        .doc(userSwiped.id)
        .set(
          {
            userSwiped,
          },
          { merge: true },
        );

      //CReate a match

      await firestore()
        .collection('matches')
        .doc(generateId(user.uid, userSwiped.id))
        .set({
          users: {
            [user.uid]: loggedInProfile,
            [userSwiped.id]: userSwiped,
          },
          usersMatched: [user.uid, userSwiped.id],
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

      navigation.navigate('MATCH', {
        loggedInProfile,
        userSwiped,
      });
    } else {
      console.log('you swiped on', userSwiped.name);
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('swipes')
        .doc(userSwiped.id)
        .set(
          {
            userSwiped,
          },
          { merge: true },
        );
    }
  };

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passesCollection = await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('passes')
        .get();

      const swipesCollection = await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('swipes')
        .get();

      const passes = passesCollection.docs.map(doc => doc.id);
      const swipes = swipesCollection.docs.map(doc => doc.id);

      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

      unsub = await firestore()
        .collection('Users')
        .where('id', 'not-in', [...passedUserIds, ...swipedUserIds])
        .get();
      setProfiles(
        unsub.docs.filter(doc => doc.id !== user.uid).map(doc => doc.data()),
      );
    };
    fetchCards();
    return unsub;
  }, []);

  console.log({ profiles });

  return (
    <View style={{ flex: 1 }}>
      <TabHeader title="Home" />
      {/* <Animated.View style={[{ width: '100%', height: '100%' }, cardStyle]}> */}
      <View style={styles.swiper}>
        <Swiper
          ref={swipeRef}
          cards={profiles}
          backgroundColor={'#eee'}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          onSwipedLeft={swipeLeft}
          onSwipedRight={swipeRight}
          renderCard={card =>
            card ? (
              <Card card={card} />
            ) : (
              <View
                style={{
                  backgroundColor: 'white',
                  // flex: 1,
                  // borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 8,
                  flex: 1,
                  // elevation: 4,
                  // marginVertical: 10,
                  // height: 580,
                  marginHorizontal: 10,
                  marginTop: -20,
                  maxHeight: '70%',
                  // overflow: 'hidden',
                }}>
                <TEXT>No Profiles Left!</TEXT>
              </View>
            )
          }
          verticalSwipe={false}
          overlayLabels={{
            left: {
              title: 'DISLIKE',
              style: {
                label: {
                  color: 'red',
                  textAlign: 'right',
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  color: 'green',
                  textAlign: 'left',
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.bottomWrapper}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={[styles.button, { shadowColor: '#f33' }]}>
          <AIcon name="dislike1" color="#f33" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={[styles.button, { shadowColor: '#32cd32' }]}>
          <AIcon name="like1" color="#32CD32" size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  swiper: {
    backgroundColor: '#eee',
    // borderWidth: 3,
    // position: 'absolute',
    flex: 1,
    // marginTop: -6,
    // top: -10,
    // bottom: 0,

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '15%',
    backgroundColor: '#eee',
    // marginTop: 10,
  },
  button: {
    height: 70,
    width: 70,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
