<template>
  <div class="container">
    <h1>点击跳转页面</h1>
    <h1>
      <!-- <NuxtLink to="/home/arealist">跳转到arealist</NuxtLink>
      <NuxtLink to="/sth">跳转到arealist</NuxtLink> -->
      <a href="./home/arealist/index.html">跳转到arealist</a>
      <a href="./sth/index.html">跳转到arealist</a>
      <h2>gemenshishi</h2>
    </h1>
    <!-- <client-only placeholder="Loading..."> -->
    <div>
      <h1>某个组件</h1>
      <div>
        <div class="red">I'm arealist</div>
        <div>{{ count }}</div>
        <button @click="addOne">+1</button>
      </div>
    </div>
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
    }
  },
  beforeCreate() {
    console.log('im beforeCreate')
  },
  created() {
    console.log('im Created')
  },
  beforeMount() {
    console.log('im beforeMount')
  },
  methods: {
    addOne() {
      this.count++
      console.log('哥们执行了')
    },
  },
})
</script>

<style scoped>
* {
  text-decoration: none;
}
</style>
