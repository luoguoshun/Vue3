<!--
 * @LastEditTime: 2023-03-08 13:41:43
 * @Descripttion: 
-->
<template>
  <div>hello 我是Child组件</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const isShowDialog = false;
    return { isShowDialog };
  },
});
</script>

<style scoped></style>
