<template>
  <div class="container">
    <TheHeader />
    <h1>点击跳转页面</h1>
    <h1>
      <!-- <NuxtLink to="/home/arealist">跳转到arealist</NuxtLink>
      <NuxtLink to="/sth">跳转到sth</NuxtLink> -->
      <a href="./home/arealist/index.html?a=1">跳转到arealist</a>
      <a href="./sth/index.html?b2">跳转到arealist</a>
      <h2 class="h2">gemenshishi</h2>
    </h1>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      count: 0,
      ip: '',
    }
  },
  beforeCreate() {
    console.log('im index beforeCreate')
  },
  created() {
    console.log('im index Created')
  },
  beforeMount() {
    console.log('im index beforeMount')
  },
  methods: {
    addOne() {
      this.count++
      console.log('哥们执行了')
    },
    async fetchSomething() {
      const ip = await this.$axios.$get('http://icanhazip.com')
      this.ip = ip
    },
  },
})
</script>

<style scoped>
* {
  text-decoration: none;
}
.h2 {
  font-size: 2rem;
}
</style>
