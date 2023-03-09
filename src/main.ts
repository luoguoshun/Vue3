/*
 * @LastEditTime: 2023-03-09 17:48:16
 * @Descripttion:
 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from '@/router';
import store from '@/stores';
import { createPinia } from 'pinia'; // 导入 Pinia
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
const app = createApp(App);
//定义一个应用级的错误处理器，用来捕获处理所有子组件上的错误
app.config.errorHandler = (err, instance, info) => {
  // console.log(err, info);
};
app.config.unwrapInjectedRef = true;
app.use(router).use(createPinia()).use(ElementPlus).mount('#app');
