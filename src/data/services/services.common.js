import AsyncStorage from '@react-native-async-storage/async-storage';

export const error = e => {
  return { status: 'error', isSuccessful: false, message: e };
};
export const success = (data, isCached = false) => {
  return { status: 'success', isSuccessful: true, data: data, isCached };
};

// export const getAuthHeaders = async () => {
//   return {
//     Authorization:
//       'Bearer ' + (await AsyncStorage.getItem(constants.KEY_AUTH_TOKEN)),
//   };
// };

export const setDataOffline = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
  return success(data, true);
};

export const getOfflineData = async key => {
  const res = await AsyncStorage.getItem(key);
  return JSON.parse(res);
};

// export const get = async (url, headers) => {
//   try {
//     let response = await axios.get(url, { headers });
//     return success(response.data);
//   } catch (e) {
//     console.log(e);
//     if (e.response?.data) {
//       return error(e.response.data.statusMessage);
//     }
//     return error(e);
//   }
// };

// export const post = async (url, data, headers) => {
//   try {
//     let response = await axios.post(url, data, { headers });
//     return success(response.data);
//   } catch (e) {
//     if (e.response?.data) {
//       return error(e.response.data.statusMessage);
//     }
//     return error(e);
//   }
// };

// export const download = async (url, data, headers) => {
//   try {
//     let response = await axios.post(url, data, {
//       headers,
//       responseType: 'blob',
//     });
//     return success(response.data);
//   } catch (e) {
//     console.log(e);
//     if (e.response?.data) {
//       return error(e.response.data.statusMessage);
//     }
//     return error(e);
//   }
// };

// export const update = async (url, data, headers) => {
//   try {
//     let response = await axios.put(url, data, { headers });
//     return success(response.data);
//   } catch (e) {
//     console.log('e', e);
//     if (e.response?.data) {
//       return error(e.response.data.statusMessage);
//     }
//     return error(e);
//   }
// };

// export const del = async (url, headers) => {
//   try {
//     let response = await axios.delete(url, { headers });
//     return success(response.data);
//   } catch (e) {
//     console.log(e);
//     if (e.response?.data) {
//       return error(e.response.data.statusMessage);
//     }
//     return error(e);
//   }
// };
