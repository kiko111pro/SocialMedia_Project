import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {HEIGHT, WIDTH} from '../UI/Dimensions';

export default function Container({children, style}) {
  return (
    <SafeAreaView>
      <ScrollView
        style={[{height: HEIGHT, width: WIDTH, backgroundColor: '#fff'}]}>
        <View style={[{padding: 16}, style]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
