import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import {Button} from '../../utils/UI/Custom';
import Container from '../../utils/components/Container';
import Header from '../../utils/components/Header';
import {TEXT, Button} from '../../utils/UI/Custom';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/UI/Colors';
import {Snack} from '../../utils/components/Snackbar';

function OTPScreen({route, navigation}) {
  const dispatch = useDispatch();
  const {input} = route.params;
  const {confirmation} = useSelector(state => state.auth);

  const handleSubmit = async code => {
    try {
      let res = await confirmation.confirm(code);
      console.log({res});
    } catch (error) {
      Snack('Invalid OTP');
      // console.error({error});
    }
  };

  return (
    <>
      <Header title="Verify phone number" />
      <Container style={{alignItems: 'center'}}>
        <TEXT size="small">Code has been sent to {input}</TEXT>

        <OTPInputView
          style={{width: '90%', height: 50, marginVertical: 44}}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => handleSubmit(code)}
        />

        <TEXT>
          Didn't receive CODE?{' '}
          <TEXT semiBold onPress={() => navigation.goBack()}>
            REQUEST AGAIN
          </TEXT>
        </TEXT>
      </Container>
    </>
  );
}

export default OTPScreen;

const styles = StyleSheet.create({
  // borderStyleBase: {
  //   width: 30,
  //   height: 45,
  //   backgroundColor: 'red',
  // },

  // borderStyleHighLighted: {
  //   borderColor: '#03DAC6',
  // },

  underlineStyleBase: {
    // width: 30,
    flexGrow: 1,
    height: 45,
    color: Colors.primary,
    // elevation: 1,
    fontSize: 18,
    // borderWidth: 1,
    // elevation: 1,

    // borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.secondary,
    color: Colors.secondary,
  },
});
