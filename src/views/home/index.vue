<template>
  <div id="home">
    <Hello>
      <template v-slot:title> Hi </template>
    </Hello>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Hello from '@/components/HelloWorld.vue';
export default defineComponent({
  components: {
    Hello,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
