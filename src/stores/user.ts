/*
 * @LastEditTime: 2023-03-10 16:56:18
 * @Descripttion:用户数据中心
 */
import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userId: '19300326',
      name: '罗国顺',
      headerImgUrl: '',
      roleIdStr: '',
      token: '',
      expiresIn: 0,
    };
  },
  getters: {
    // token: (state) => {
    //   return state.token;
    // },
  },
  actions: {
    // 异步更新 message
    async updateName(name: string): Promise<string> {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 这里的 this 是当前的 Store 实例
          this.name = name;
          resolve('Async done.');
        }, 1000);
      });
    },
    // 同步更新 user
    clearUserInfo(): void {
      // 这里的 this 是当前的 Store 实例
      this.userId = '';
      this.name = '';
      this.token = '';
      this.headerImgUrl = '';
      this.roleIdStr = '';
      this.expiresIn = 0;
    },
  },
  persist: true, //开启数据持久化
});
