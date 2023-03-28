<template>
  <div>
    <h1 class="red">I'm arealist</h1>
    <h2>{{ count }}</h2>
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
    },
  },
}
</script>

<style>
.red {
  color: rgb(50, 253, 209);
}
</style>
