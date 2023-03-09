/*
 * @LastEditTime: 2023-03-09 18:26:39
 * @Descripttion:
 */
import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      message: 'Hello World',
      // 添加了一个随机消息数组
      randomMessages: [] as Array<string>,
      userInfo: {
        name: 'lgs',
        token: 'AAAAABBB',
      },
    };
  },
  // 定义一个 fullMessage 的计算数据
  getters: {
    fullMessage: (state) => `The message is "${state.message}".`,
    // 这个 getter 返回了另外一个 getter 的结果
    emojiMessage(): string {
      return `🎉🎉🎉 ${this.fullMessage}`;
    },
  },
  actions: {
    // 异步更新 message
    async updateMessage(newMessage: string): Promise<string> {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 这里的 this 是当前的 Store 实例
          this.message = newMessage;
          resolve('Async done.');
        }, 1000);
      });
    },
    // 同步更新 message
    updateMessageSync(newMessage: string): string {
      // 这里的 this 是当前的 Store 实例
      this.message = newMessage;
      return 'Sync done.';
    },
  },
});
