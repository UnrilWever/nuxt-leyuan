<template>
  <div>
    <div class="red">I'm arealist</div>
    <div>{{ count }}</div>
    <button @click="addOne">+1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
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
