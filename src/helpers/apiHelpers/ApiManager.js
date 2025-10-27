import axios from 'axios';
import { API_KEY } from './ApiConstants';
const axiosApiInstance = axios.create();

const { CancelToken } = axios;
const createCancelTokenSource = () => CancelToken.source();
let cancelTokenSource = createCancelTokenSource();

axiosApiInstance.interceptors.response.use(
  response => {
    if (response?.data) {
      return response.data;
    }
    return response?.data;
  },
  error => {
    return Promise.reject(error);
  },
);
axiosApiInstance.interceptors.request.use(
  async config => {
    config.headers = {
      'Content-Type': 'application/json',
      KEY: API_KEY,
    };
    config.cancelToken = cancelTokenSource.token;
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export default axiosApiInstance;
