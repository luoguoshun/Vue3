<!--
 * @LastEditTime: 2023-03-09 18:26:53
 * @Descripttion: 
-->
<template>
  <div id="home">
    <Hello title="我是父组件传来的title">
      <template v-slot:title> Hi </template>
    </Hello>
    <div>
      <el-button type="danger" @click="goLogin" size="small">去登入</el-button>
    </div>
    <div>
      <p>{{ message }}</p>
      <el-button type="primary" size="small" @Click="updateState">使用 store.$patch修改message数据</el-button>
      <el-button type="primary" size="small" @Click="updateMessage">提交方法修改message数据</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Hello from '@/components/HelloWorld.vue';
import { useUserStore } from '@/stores/piniaIndex';
import { storeToRefs } from 'pinia';
export default defineComponent({
  components: {
    Hello,
  },
  setup() {
    //#region 路由获取
    //获取当前路由
    const routeCurrent = useRoute();
    // 获取路由名称
    console.log(routeCurrent.name);
    // 获取路由参数
    console.log(routeCurrent.params.id);
    const router = useRouter();
    //#endregion

    //#region 定义函数
    /**
     * @description: 去登入
     */
    function goLogin() {
      router.push({
        name: 'login',
        params: {
          id: 123,
        },
      });
    }
    //#endregion

    //#region 全局状态管理
    // 像 useRouter 那样定义一个变量拿到实例
    const store = useUserStore();
    // 修改：定义 computed 变量的时候配置 getter 和 setter
    const message = computed({
      // getter 还是返回数据的值
      get: () => store.message,
      // 配置 setter 来定义赋值后的行为
      set(newVal) {
        store.message = newVal;
      },
    });
    // 通过 storeToRefs 来拿到响应性的 message
    //它会忽略掉 Store 上面的方法和非响应性的数据，只返回 state 上的响应性数据
    const { userInfo } = storeToRefs(store);
    /**
     * @description: 更改全局状态
     */
    function updateState() {
      // 继续用前面的数据，这里会打印出修改前的值
      console.log(JSON.stringify(store.$state));
      // 输出 {"message":"Hello World","randomMessages":[]}
      /**
       * 注意这里，传入了一个对象
       */
      store.$patch({
        message: 'New-Message-update',
        randomMessages: ['msg1', 'msg2', 'msg3'],
      });
      // 这里会打印出修改后的值
      console.log(JSON.stringify(store.$state));
      // 输出 {"message":"New Message","randomMessages":["msg1","msg2","msg3"]}
    }
    function updateMessage() {
      store.updateMessageSync('New message by sync.');
      store.updateMessage('New message by async.').then((res) => console.log(res));
    }
    //#endregion
    return { goLogin, message, userInfo, updateState, updateMessage };
  },
});
</script>

<style scoped></style>
