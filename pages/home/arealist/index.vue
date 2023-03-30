<template>
  <div>
    <div class="red">I'm arealist</div>
    <div>{{ count }}</div>
    <button @click="addOne">+1</button>
    <!-- <NuxtLink to="/">跳转到首页</NuxtLink> -->
    <a href="./index.html">跳转到首页</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  mounted() {},
  methods: {
    addOne() {
      this.count++
      console.log('哥们执行了')
    },
  },
}
</script>

<style>
.red {
  color: rgb(50, 253, 209);
}
</style>
