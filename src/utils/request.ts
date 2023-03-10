/*
 * @LastEditTime: 2023-03-10 16:22:48
 * @Descripttion: axios封装
 */
import axios from 'axios';
import { useUserStore } from '@/stores';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
const unauthorizedHandler = () => {
  const routeCurrent = useRoute(); //获取当前路由
  const router = useRouter(); //路由实例
  if (routeCurrent.name != 'login') {
    ElMessage.warning('登录失效，请重新登录!');
    router.push({
      name: 'login',
      query: {
        redirectUrl: routeCurrent.fullPath as string,
      },
    });
  }
};
const service = axios.create({
  withCredentials: false, //跨域请求是否允许携带cookie资源凭证
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 5000, //请求超时时间
});
// http request 拦截器
service.interceptors.request.use(
  (config: any) => {
    const userStore = useUserStore();
    if (userStore.token && userStore.token.length > 0) {
      config.headers['Authorization'] = 'Bearer ' + userStore.token;
    }
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
      return;
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        unauthorizedHandler();
      } else if (error.response.status === 400) {
        ElMessage({ type: 'warning', message: '请求参数错误' });
      } else if (error.response.status === 403) {
        ElMessage({ type: 'warning', message: '没有权限访问' });
      } else if (error.message.includes('timeout')) {
        ElMessage({ type: 'warning', message: '请求超时' });
        return error.message;
      } else if (error.response.status === 500) {
        ElMessage({ type: 'warning', message: '接口异常' });
        return error;
      } else if (error.response.status === 503) {
        ElMessage({ type: 'warning', message: '服务器没有准备好处理请求。由于超载或系统维护，服务器暂时的无法处理客户端的请求' });
        return error;
      }
    }
    return error;
  },
);
export default service;
