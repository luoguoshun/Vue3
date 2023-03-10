<!--
 * @LastEditTime: 2023-03-10 10:04:38
 * @Descripttion: 顶部菜单
-->
<template>
  <div id="header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
      :router="true"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-sub-menu index="system">
        <template #title>系统设置</template>
        <el-menu-item index="/system/user">用户管理</el-menu-item>
        <el-menu-item index="/system/role">角色管理</el-menu-item>
        <el-menu-item index="department">部门管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="/practise">练习页面</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  setup() {
    //获取当前路由
    const route = useRoute();
    const activeIndex = ref(route.path);
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    return { activeIndex, handleSelect };
  },
});
</script>

<style scoped></style>
