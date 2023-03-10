<!--
 * @LastEditTime: 2023-03-10 16:48:24
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
      <p>{{ name }}</p>
      <el-button type="primary" size="small" @Click="updateState">使用 store.$patch修改name数据</el-button>
      <el-button type="primary" size="small" @Click="updateMessage">异步更新修改name数据</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Hello from '@/components/HelloWorld.vue';
import { useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
export default defineComponent({
  components: {
    Hello,
  },
  setup() {
    //#region 路由获取
    const routeCurrent = useRoute(); //获取当前路由
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
      get: () => store.name,
      // 配置 setter 来定义赋值后的行为
      set(newVal) {
        store.name = newVal;
      },
    });
    // 通过 storeToRefs 来拿到响应性的 state,它会忽略掉 Store 上面的方法和非响应性的数据
    const { name, userId } = storeToRefs(store);
    /**
     * @description: 更改全局状态
     */
    function updateState() {
      // 继续用前面的数据，这里会打印出修改前的值
      console.log(JSON.stringify(store.$state));
      store.$patch({
        name: 'New-Message-update',
      }); //批量更新操作
    }
    function updateMessage() {
      store.updateName('aaaaa').then((res) => console.log(res));
    }
    //#endregion
    return { goLogin, message, name, updateState, updateMessage };
  },
});
</script>

<style scoped></style>
