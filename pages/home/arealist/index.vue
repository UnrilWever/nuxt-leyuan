<template>
  <div>
    <div class="red">I'm arealist</div>
    <div>{{ count }}</div>
    <button @click="addOne">+1</button>
    <FileLink to="/">跳转到首页</FileLink>
    <!-- <a href="./index.html">跳转到首页</a> -->
    <div>
      <h1>----测试能否拿到query或params----</h1>
      <!-- <div>query:{{}}||params{{}}</div> -->
      <button @click="seeRoute">看看route对象</button>
    </div>
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
    /** 看看router对象 */
    seeRoute() {
      console.log("看看route对象", this.$route);
    },
  },
});
</script>

<style>
.red {
  color: rgb(50, 253, 209);
}
</style>
