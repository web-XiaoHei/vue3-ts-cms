// service统一出口

import ZKRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';
import localCahe from '@/utils/cache';
const zkRequest = new ZKRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCahe.getCache('token');
      // console.log(token, 'token');

      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // console.log('请求成功的拦截');
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截');
      return err;
    },
    responseInterceptor: (config) => {
      // console.log('响应成功的拦截');
      return config;
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截');

      return err;
    },
  },
});
// const zkRequest2 = new ZKRequest();

export default zkRequest;
