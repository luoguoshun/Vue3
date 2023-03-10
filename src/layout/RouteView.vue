<!--
 * @LastEditTime: 2023-03-10 10:36:39
 * @Descripttion: 
-->
<template>
  <div>
    <!-- <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view> -->
    <router-view> </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
/* 渐变设置 */
.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.7s ease;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
