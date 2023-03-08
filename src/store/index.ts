/*
 * @LastEditTime: 2023-03-07 13:55:05
 * @Descripttion: 全局状态管理器
 */
import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

/**
 * @description: // 数据持久化
 */
const persistedState = new VuexPersistence({ 
  storage: window.sessionStorage,
  modules: ['keyword'],
});

const store = createStore({
  plugins: [persistedState.plugin],
  modules: {
  },
});

export default store;
