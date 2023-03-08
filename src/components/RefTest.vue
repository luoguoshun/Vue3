<template>
  <!-- 给 DOM 元素添加 `ref` 属性 -->
  <p ref="msg">请留意该节点，有一个 ref 属性</p>

  <!-- 子组件也是同样的方式添加 -->
  <Child ref="child" />
</template>

<script lang="ts">
//ref 是最常用的一个响应式 API，它可以用来定义所有类型的数据，包括 Node 节点和组件
import { defineComponent, onMounted, ref, Ref } from 'vue';
import Child from '@/components/Child.vue';

// 声明 `useCalculator` 函数的返回值类型
interface Calculator {
  // 这里包含了一个 Ref 变量
  num: Ref<number>;
  add: () => void;
}
// 声明一个 “使用计算器” 的函数，返回值为Calculator类型
function useCalculator(): Calculator {
  // `ref` API 的 TS 类型
  // function ref<T>(value: T): Ref<UnwrapRef<T>>
  // `ref` API 的返回值的 TS 类型
  // interface Ref<T> {
  //   value: T
  // }
  const num = ref<number>(0);
  const add = () => num.value++;
  return { num, add };
}
// 在执行使用计算器函数时，可以获取到一个 Ref 变量和其他方法
const { num, add } = useCalculator();
add();
console.log(num.value); // 1
add();
console.log(num.value); // 2
export default defineComponent({
  components: {
    Child,
  },
  setup() {
    // 定义挂载节点，声明的类型详见下方附表
    const msg = ref<HTMLElement>();
    //InstanceType<T> 是 TypeScript 提供的一个工具类型，可以获取构造函数类型的实例类型
    const child = ref<InstanceType<typeof Child>>();
    // 请保证视图渲染完毕后再执行节点操作 e.g. `onMounted` / `nextTick`
    onMounted(() => {
      // 比如获取 DOM 的文本
      //任何 Ref 对象的值都必须通过 xxx.value 才可以正确获取
      if (msg.value) {
        console.log(msg.value.innerText);
      }
        // 或者操作子组件里的数据
        child.value.isShowDialog = true;
    });
    // 必须 `return` 出去才可以给到 `<template />` 使用
    return { msg, child };
  },
});
</script>

<style scoped></style>
