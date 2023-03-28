<template>
  <div class="container">
    <h1>点击跳转页面</h1>
    <p>
      <NuxtLink to="/home/arealist">跳转到arealist</NuxtLink>
      <!-- <a href="./home/arealist/index.html">跳转到arealist</a>
      <a href="./home/arealist/index.html">跳转到arealist</a> -->
      <h2>gemenshishi</h2>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>

<style scoped>
* {
  text-decoration: none;
}
</style>
