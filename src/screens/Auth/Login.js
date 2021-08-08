import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {signIn} from '../../data/reducers/auth/auth.reducer';

import {Button, TEXT as Text, Input} from '../../utils/UI/Custom';
import {Colors} from '../../utils/UI/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {Snack} from '../../utils/components/Snackbar';
import {numbersOnlyRegex} from '../../utils/functions/regex';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);
  const [input, setInput] = useState('');

  const handleSubmit = async () => {
    if (input.length !== 10 || !numbersOnlyRegex.test(input)) {
      Snack('Invalid number');
      return;
    }

    const res = await dispatch(signIn(`+91${input}`));

    if (res?.error) {
      console.log(JSON.stringify(res));
    } else {
      navigation.navigate('OTPScreen', {input});
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text size="very-large" style={{textAlign: 'center'}} semiBold>
          Welcome on Social!
        </Text>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/login.jpg')}
        />
        <Input
          mode="outlined"
          label="Phone Number"
          keyboardType={'number-pad'}
          maxLength={10}
          onChangeText={t => setInput(t)}
        />
        <Button showLoading={loading} onPress={handleSubmit}>
          REQUEST OTP
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderWidth: 0.2,
    flex: 1,
    padding: 16,
  },

  image: {
    width: 300,
    // backgroundColor: "red",
    height: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
