<template>
  <div>
    <div class="red">I'm arealist</div>
    <div>{{ count }}</div>
    <button @click="addOne">+1</button>
    <FileLink to="/">跳转到首页</FileLink>
    <!-- <a href="./index.html">跳转到首页</a> -->
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  /** 数据 */
  data() {
    return {
      count: 0,
    };
  },
  /** 生命周期mounted */
  mounted() {},
  methods: {
    /** 加1函数 */
    addOne() {
      this.count++;
      console.log("哥们执行了");
    },
  },
});
</script>

<style>
.red {
  color: rgb(50, 253, 209);
}
</style>
