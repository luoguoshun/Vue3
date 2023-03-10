<!--
 * @LastEditTime: 2023-03-10 15:19:00
 * @Descripttion: 练习
-->
<template>
  <div id="userList">
    <Child :title="title" :userInfo="{ name, id }" msg="msg" @update-title="handleUpdate" ref="childeRef">
      <template v-slot:title> Hi </template>
    </Child>
    <!-- <el-button size="small" @click="handleEdit">Edit</el-button> -->
  </div>
</template>

<script setup lang="ts">
import Child from '@/components/Child.vue';
import { useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

//#region 定义数据
// 通过 storeToRefs 来拿到响应性的 state,它会忽略掉 Store 上面的方法和非响应性的数据
const store = useUserStore();
const { name, id } = storeToRefs(store);
let title = ref('practise');
//#endregion

//#region function
const handleUpdate = (value: string) => {
  title.value = value;
};
//#endregion

//#region 获取子组件数据
// 定义挂载节点，使用typeof获取子组件的类型
const childeRef = ref();
console.log(childeRef.value);
onMounted(() => {
  const child = ref<typeof Child | null>(null);
  // 视图渲染完毕后的逻辑操作
  console.log(child.value?.message); // 使用ts的可选符?.来避免出现错误 -- 此方法也可以使用 if(child.value){} 判断方法来实现
});
//#endregion
</script>

<style lang="less" scoped></style>
