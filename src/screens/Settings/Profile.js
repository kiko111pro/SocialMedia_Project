import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import Header from '../../utils/components/Header';
import { Colors } from '../../utils/UI/Colors';
import { RippleIcon, TEXT, Button } from '../../utils/UI/Custom';
import IIcon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RadioButton } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import { Controller, useForm } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { getAge } from '../../utils/functions';
import { getCurrentUserDetails } from '../../data/reducers/profile/profile.reducer';
import { Snack } from '../../utils/components/Snackbar';

// import { chooseFile } from '../../utils/functions';

function Profile() {
  const dispatch = useDispatch();
  const { user, currentUserDetails } = useSelector(state => state.profile);
  console.log('-------------');
  console.log({ user });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [inputDOB, setInputDOB] = useState('');
  const [gender, setGender] = useState(
    currentUserDetails ? currentUserDetails._data.gender : 'male',
  );
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    setValue('name', currentUserDetails && currentUserDetails._data.name);
    setValue('city', currentUserDetails && currentUserDetails._data.city);
    setValue(
      'profession',
      currentUserDetails && currentUserDetails._data.profession,
    );
  }, []);

  const chooseFile = () => {
    // var initial = null;
    let options = {
      //   mediaType: type,
      maxWidth: 550,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      let source = response.assets[0];

      setProfilePic({
        name: source?.fileName,
        type: source.type,
        uri:
          Platform.OS === 'android'
            ? source?.uri
            : source?.uri.replace('file://', ''),
      });
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDatePickerVisibility(false);
    let DATE = date.toDateString();
    setInputDOB(DATE);
  };

  const onSubmit = async data => {
    setLoading(true);
    if (profilePic) {
      let uploadURI = profilePic.uri;
      let fileName = uploadURI.substring(uploadURI.lastIndexOf('/') + 1);
      try {
        await storage().ref(`/photos/${fileName}`).putFile(uploadURI);
        let url = await storage().ref(`photos/${fileName}`).getDownloadURL();
        await firestore().collection('Users').doc(user.uid).set(
          {
            profileImage: url,
          },
          { merge: true },
        );
      } catch (error) {
        console.log('Error while uploading profile: ', error);
      }
    }
    try {
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .set(
          {
            name: data.name,
            city: data.city,
            profession: data.profession,
            age: inputDOB ? getAge(inputDOB) : null,
            gender,
            dob: inputDOB,
          },
          { merge: true },
        );
    } catch (error) {
      console.log('Error while updating details: ', error);
    }

    dispatch(getCurrentUserDetails(user.uid));

    setLoading(false);
    Snack('Profile Updated!');
  };

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <Header title="Edit Profile" />
      <View style={{ padding: 16 }}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Avatar.Image
              size={100}
              style={styles.image}
              source={
                profilePic?.uri
                  ? { uri: profilePic.uri }
                  : currentUserDetails
                  ? { uri: currentUserDetails._data.profileImage }
                  : require('../../assets/user-placeholder.png')
              }
            />
            <IconButton
              icon="camera"
              color={Colors.secondary}
              size={20}
              style={styles.camera}
              onPress={chooseFile}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TEXT>Name</TEXT>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.name && { borderColor: 'red' }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
            rules={{
              required: {
                value: true,
                message: 'It is required',
              },
            }}
          />
          {errors.name && (
            <TEXT size="very-small" style={styles.errorText}>
              {errors?.name.message}
            </TEXT>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TEXT>Date of birth</TEXT>
          <Pressable
            onPress={showDatePicker}
            style={[styles.inputWrap, styles.input, { height: 50 }]}>
            {/* <TextInput
              //   defaultValue={inputDOB}
              value={inputDOB}
              style={[styles.input, {borderWidth: 0, height: '100%'}]}
            /> */}
            <TEXT size="small">
              {inputDOB || currentUserDetails?._data?.dob}
            </TEXT>
            <RippleIcon onPress={showDatePicker} size={24}>
              <IIcon name="caret-down" color="#bdbdbd" size={24} />
            </RippleIcon>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <TEXT>Gender </TEXT>
          <View style={[styles.input, styles.genderWrapper]}>
            <View
              style={[styles.input, { marginVertical: 0, maxWidth: '47%' }]}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <RadioButton
                  value="male"
                  status={gender === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('male')}
                  color={Colors.secondary}
                />
                <TEXT>{`  `}Male</TEXT>
              </View>
            </View>
            <View
              style={[styles.input, { marginVertical: 0, maxWidth: '47%' }]}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <RadioButton
                  value="female"
                  status={gender === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('female')}
                  color={Colors.secondary}
                />
                <TEXT>{`  `}Female</TEXT>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TEXT>City</TEXT>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.city && { borderColor: 'red' }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="city"
            rules={{
              required: {
                value: true,
                message: 'It is required',
              },
            }}
          />
          {errors.city && (
            <TEXT size="very-small" style={styles.errorText}>
              {errors.city?.message}
            </TEXT>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TEXT>Profession</TEXT>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  errors.profession && { borderColor: 'red' },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="profession"
            rules={{
              required: {
                value: true,
                message: 'It is required',
              },
            }}
          />
          {errors.profession && (
            <TEXT size="very-small" style={styles.errorText}>
              {errors?.profession.message}
            </TEXT>
          )}
        </View>
        <Button showLoading={loading} onPress={handleSubmit(onSubmit)}>
          UPDATE
        </Button>
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

  errorText: {
    color: 'red',
    position: 'absolute',
    bottom: -10,
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

  inputWrap: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  imageContainer: {
    // width: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#bdbdbd',
    marginVertical: 8,
    flex: 1,
    color: Colors.primary,
    paddingHorizontal: 10,
    fontFamily: 'OpenSans-Regular',
  },

  inputContainer: {
    // borderWidth: 1,
    marginTop: 24,
  },

  genderWrapper: {
    flexDirection: 'row',
    borderWidth: 0,
    paddingHorizontal: 0,
    // flex: 1,
    height: 50,
    justifyContent: 'space-between',
  },
});
