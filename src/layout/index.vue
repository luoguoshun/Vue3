<!--
 * @LastEditTime: 2023-03-10 09:00:06
 * @Descripttion: 布局页面
-->
<template>
  <div>
    <Header></Header>
    <main>
      <el-card class="box-card">
        <MyRouteView></MyRouteView>
      </el-card>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/layout/Header.vue';
import MyRouteView from '@/layout/RouteView.vue';
</script>

<style lang="less" scoped>
main {
  margin: 5px;
  .box-card {
    padding: 5px;
  }
}
</style>
