import axios from 'axios';
import { API_KEY } from './ApiConstants';
import { Alert } from 'react-native';

export const axiosGETRequest = async url => {
  const config = {
    method: 'get',
    url: url,
    headers: {
      KEY: API_KEY,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then(response => {
        if (!response?.data?.success) {
          reject(response);
        }
        resolve(response);
      })
      .catch(async error => {
        if (error.toString().includes('Network Error')) {
          reject(error);
          return;
        }
        Alert.alert('Something went wrong, Please contact admin for support.');
        reject(error);
      });
  });
};
