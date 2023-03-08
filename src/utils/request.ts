/*
 * @LastEditTime: 2023-03-08 23:37:54
 * @Descripttion: axios二次封装
 */
import axios from 'axios';
import Vrouter from '@/router';
const Router = Vrouter;
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 99999,
});
// http request 拦截器
service.interceptors.request.use(
  (config: any) => {
    // 全局添加 token
    // if (getToken()) {
    //   config.headers["asr-token"] = getToken();
    // }
    return config;
  },
  (error: any) => {
    console.error(error);
    return Promise.reject(error);
  },
);
// http response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 9) {
      // Router.replace('/rejectUser');
      return;
    }
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status && error.response.status === 403) {
      //   logout().then(() => {
      //     // removeToken()
      //   });
    }
    // 网络超时
    if (error.message && error.message.includes('timeout')) {
      console.error('请求超时');
      return error.message;
    }
    if (error.response && error.response.status && error.response.status === 500) {
      // 没有权限
      console.error('接口异常');
      return error;
    }
    return error;
  },
);
export default service;
