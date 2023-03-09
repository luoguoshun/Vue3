/*
 * @LastEditTime: 2023-03-09 22:46:49
 * @Descripttion: 入口文件
 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia'; // 导入 Pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'//数据持久化
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
const app = createApp(App);
//定义一个应用级的错误处理器，用来捕获处理所有子组件上的错误
app.config.errorHandler = (err, instance, info) => {
  // console.log(err, info);
};
app.config.unwrapInjectedRef = true;
const pinia = createPinia() // 初始化 Pinia
pinia.use(piniaPluginPersistedstate) // 激活 Pinia 插件
app.use(router).use(pinia).use(ElementPlus).mount('#app');
