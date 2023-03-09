<!--
 * @LastEditTime: 2023-03-09 16:52:08
 * @Descripttion: 
-->
<template>
  <div id="notfound">
    <el-empty :image-size="200" description="404 Not Found" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
#notfound {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
