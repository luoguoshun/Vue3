<!--
 * @LastEditTime: 2023-03-10 14:00:55
 * @Descripttion: 子组件
-->
<template>
  <div>
    <p>
      <slot name="title"></slot>
    </p>
    <h3>{{ title }}</h3>
    <div>
      <p>用户信息</p>
      <p>{{ userInfo.id }}</p>
      <p>{{ userInfo.name }}</p>
    </div>
  </div>
</template>
<!-- 在script-setup模式下 setup 会自动变成 async setup  -->
<script setup lang="ts">
import { reactive, ref, useAttrs,defineExpose } from 'vue';
const message = ref<string>('我是子组件的message');
const isShowDialog = ref<Boolean>(true);
//#region props 通信
interface UserInfo {
  id: string;
  name?: string;
}
//获取props
const props = defineProps<{
  title: String;
  userInfo: UserInfo;
}>();
//#endregion
//#region 获取attrs
//attrs:未在子组件props定义的数据而父组件传进来的数据
const attrs = useAttrs();
// attrs 是个对象，和 props 一样，需要通过 `key` 来得到对应的单个 attr
console.log(attrs.msg);
//#endregion
//#region  emit 通信
const emit = defineEmits(['update-title']);
// 调用 emit
emit('update-title', 'Tom');
//#endregion
//#region ref 通信 
// 通过该 API 显式暴露的数据，才可以在父组件拿到
defineExpose({
  message,
  isShowDialog,
  loadList: () => {
    console.log('我是子组件暴露的loadList函数');
  },
});
//#endregion
</script>

<style lang="less" scoped></style>
