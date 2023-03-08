<!--
 * @LastEditTime: 2023-03-08 23:24:36
 * @Descripttion: 首页
-->
<template>
  <div id="home">
    <!-- 给 DOM 元素添加 `ref` 属性 -->
    <span ref="msg">
      <slot name="title"></slot>
    </span>
    <div class="form">
      <p>{{ name }}</p>
      <el-input v-model="name" />
      <el-select v-model="region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="output">打印</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="success">点击</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="info">撤销</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="warning">清空</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="danger">删除</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<!-- 标准组件格式 -->
<script lang="ts">
//每个生命周期函数都要先导入才可以使用（统一放在 setup 里运行）
import { defineComponent, onBeforeMount, onMounted, reactive, ref, toRefs, watch, watchEffect, computed } from 'vue';
import type { ComputedRef } from 'vue';
import RefTest from '@/components/RefTest.vue';
interface User {
  name: string;
  age: number;
  region: string[];
}
export default defineComponent({
  components: {
    RefTest, 
  },
  /**
   * @description: 在创建组件之前执行，一旦 props setup(){}被解析，并作为组合式 API 的入口点（不可在用this）
   * @return {object} 数据 函数
   * @param {Object} props 由父组件传递下来的数据(无需必传)(不要解构它，这样会让数据失去响应)
   * @param {Object} context 组件的执行上下文(无需必传),
   * context内部属性
   * attrs	非响应式对象	未在 Props 里定义的属性都将变成 Attrs
   * slots	非响应式对象	组件插槽，用于接收父组件传递进来的模板内容
   * emit	  方法	触发父组件绑定下来的事件
   */
  setup(props: object, context: object): object {
    //注意：Reactive 数据进行 ES6 的解构 操作，解构后得到的变量会失去响应性
    const data = reactive({
      name: '',
      region: [],
      age: 18,
    });
    //创建一个新的对象，它的每个字段都是 Reactive 对象各个字段的 Ref 变量
    const dataRef = toRefs(data);
    const uids: number[] = reactive([1, 2, 3]);
    // 异步获取数据后，不会破坏响应性（如果直接定义 const uids=[],会丢失）
    setTimeout(() => {
      uids.push(1);
    }, 1000);

    //在 setup 之后，其他的生命周期才会被启用
    onBeforeMount(() => {
      console.log(`当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程`);
    });
    onMounted(() => {
      console.log('当我们想在组件初始渲染完成，并且相应的 DOM 节点创建完成之后，来执行代码的时候，我们就可以调用mounted钩子函数');
    });
    //#region 函数定义
    function output() {
      //要对 Reactive 数据进行 ES6 的解构 操作，因为解构后得到的变量会失去响应性。
      console.log({ ...data });
    }
    //#endregion

    //#region 监听器
    //注意：通过 reactive API 定义的对象无法将 deep 成功设置为 false，因为被强制开启了
    /**
     * @description: 监听某个值
     * @return {WatchStopHandle}
     */
    watch(
      // 数据源，getter 形式
      () => data.name,
      // 回调函数 callback
      (newValue: any, oldValue: any) => {
        console.log('只侦听 name 的变化 ', data.name);
        console.log('打印变化前后的值', { oldValue, newValue });
      },
      {
        deep: true, //是否进行深度侦听(直接监听一个引用类型使用)
        immediate: false, //是否立即执行侦听回调（在任何第一次赋值的时候就直接触发回调）
      },
    );
    /**
     * @description: 批量监听
     * @return {WatchStopHandle}
     */
    // 定义多个数据源
    const message = ref<string>('');
    const index = ref<number>(0);

    // 2s后改变数据
    setTimeout(() => {
      message.value = 'Hello World!';
      index.value++;
    }, 2000);

    watch(
      // 数据源改成了数组
      [message, index],
      // 回调的入参也变成了数组，每个数组里面的顺序和数据源数组排序一致
      ([newMessage, newIndex], [oldMessage, oldIndex]) => {
        console.log('message 的变化', { newMessage, oldMessage });
        console.log('index 的变化', { newIndex, oldIndex });
      },
    );
    //区别
    // watch 可以访问侦听状态变化前后的值，而 watchEffect 没有。
    // watch 是在属性改变的时候才执行，而 watchEffect 则默认会执行一次，然后在属性改变的时候也会执行。
    //对比 watch API ，它不支持 deep 和 immediate
    watchEffect(() => {
      console.log('watchEffect');
      console.log({
        name: data.name,
        age: data.age,
      });
    });
    //#endregion

    //#region 计算属性
    // 定义基本的数据
    const firstName = ref<string>('Bill');
    const lastName = ref<string>('Gates');
    // 定义需要计算拼接结果的数据
    // 这里配合setter的需要，改成了另外一种写法
    const fullName = computed({
      // getter还是返回一个拼接起来的全名
      get() {
        return `${firstName.value} ${lastName.value}`;
      },
      // setter这里改成只更新firstName，注意参数也定义TS类型
      set(newFirstName: string) {
        firstName.value = newFirstName;
      },
    });
    // 2s 后改变某个数据的值
    setTimeout(() => {
      firstName.value = 'Petter';
    }, 2000);

    const address = computed(() => {
      try {
        return data.address;
      } catch (error) {
        return '';
      }
    });
    //#endregion

    return {
      ...dataRef,
      uids,
      fullName,
      output,
      address,
    };
  },
});
</script>

<style lang="less" scoped>
// 定义颜色变量
@color-black: #333;
@color-red: #ff0000;
#home {
  span {
    text-align: center;
  }
  .form {
    max-width: 400px;
    > div {
      margin-top: 5px;
    }
  }
}
</style>

<!-- 原本需要这样才可以使用 setup 函数 -->
<!-- import { Slots } from 'vue'

// 声明 `props` 和 `return` 的数据类型
interface Data {
  [key: string]: unknown
}

// 声明 `context` 的类型
interface SetupContext {
  attrs: Data
  slots: Slots
  emit: (event: string, ...args: unknown[]) => void
}

// 使用的时候入参要加上声明， `return` 也要加上声明
export default {
  setup(props: Data, context: SetupContext): Data {
    // ...

    return {
      // ...
    }
  },
} -->
