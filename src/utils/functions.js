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

// export const getAge = dateString => {
//   if (dateString === '') return null;
//   var today = new Date();
//   console.log({ today });
//   let birthDate = new Date(dateString).getDate();
//   console.log({ birthDate, dateString });
//   console.log('birth, ', birthDate);
//   let birthYear = birthDate.getFullYear();
//   var age = today.getFullYear() - birthYear;
//   var m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   console.log('in func', { age });
//   return age.toString();
// };

export const getAge = dateString => {
  if (!dateString) return null;
  let dob = dateString.split(' ');
  let birth_month = dob[1];
  let birth_day = dob[2];
  let birth_year = dob[3];
  today_date = new Date();
  today_year = today_date.getFullYear();
  today_month = today_date.getMonth();
  today_day = today_date.getDate();
  age = today_year - birth_year;

  if (today_month < birth_month - 1) {
    age--;
  }
  if (birth_month - 1 == today_month && today_day < birth_day) {
    age--;
  }
  return age;
};
