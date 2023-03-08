/*
 * @LastEditTime: 2023-03-08 18:27:45
 * @Descripttion:
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
const app = createApp(App);
//定义一个应用级的错误处理器，用来捕获处理所有子组件上的错误
app.config.errorHandler = (err, instance, info) => {
  // console.log(err, info);
};
app.config.unwrapInjectedRef = true;
app.use(router).use(store).use(ElementPlus).mount("#app");
