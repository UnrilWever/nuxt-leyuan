<template>
  <div class="container">
    <TheHeader />
    <h1>点击跳转页面</h1>
    <div>
      <!-- <NuxtLink to="/home/arealist">跳转到arealist</NuxtLink>
      <NuxtLink to="/sth">跳转到sth</NuxtLink> -->
      <!-- <a href="./home/arealist/index.html?a=1">跳转到arealist</a>
      <a href="./sth/index.html?b2">跳转到sth</a> -->

      <FileLink to="/home/arealist">跳转到arealist</FileLink>
      <FileLink
        :to="{ path: '/home/arealist', query: { q: 1 }, params: { id: 1 } }"
        >跳转到arealist带query params</FileLink
      >

      <FileLink :to="{ path: '/sth', query: { q: 1 }, params: { id: 1 } }"
        >跳转到sth带query params</FileLink
      >
      <h2 class="h2">gemenshishi</h2>
    </div>
    <!-- <client-only placeholder="Loading..."> -->
    <div>
      <h1>-----某个组件-----</h1>
      <div>
        <div class="red">I'm arealist</div>
        <div>{{ count }}</div>
        <button @click="addOne">+1</button>
      </div>
    </div>
    <div>-----请求模块-----</div>
    <h1>{{ ip }}</h1>
    <button @click="fetchSomething">请求ip在上面显示</button>
    <!-- </client-only> -->
    <div>
      <FileLink to="/home/arealist/" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  /** 属性 */
  data() {
    return {
      count: 0,
      ip: "",
    };
  },
  /** 生命周期beforeCreate */
  beforeCreate() {
    console.log("im index beforeCreate");
  },
  /** 生命周期created */
  created() {
    console.log("im index Created");
  },
  /** 生命周期beforeMount */
  beforeMount() {
    console.log("im index beforeMount");
  },
  methods: {
    /** 加一方法 */
    addOne() {
      this.count++;
      console.log("哥们执行了");
    },
    /** 请求IP方法 */
    async fetchSomething() {
      const ip = await this.$axios.$get("http://icanhazip.com");
      this.ip = ip;
    },
  },
});
</script>

<style>
/* * {
  text-decoration: none;
}
.h2 {
  font-size: 2rem;
} */
</style>
