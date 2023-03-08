<!--
 * @LastEditTime: 2023-03-08 23:04:12
 * @Descripttion: 布局页面
-->
<template>
  <div>
    <Header></Header>
    <main>
      <el-card class="box-card">
        <router-view></router-view>
      </el-card>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/layout/Header.vue';
</script>

<style lang="less" scoped>
main {
  margin: 5px;
  .box-card {
    padding: 5px;
  }
}
</style>
