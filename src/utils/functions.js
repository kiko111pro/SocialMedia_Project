import { launchImageLibrary } from 'react-native-image-picker';
import { Platform } from 'react-native';
import React, { useState } from 'react';

export const numbersOnlyRegex = /^\d+$/;

export const truncate = (str, num) => {
  if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num) + '...';
  }
};

export const getAge = dateString => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
