<template>
  <div>
    <div>
      <div class="red">I'm arealist</div>
      <div>{{ count }}</div>
      <button @click="addOne">+1</button>
    </div>
    <div>
      <h1>-----请求模块-----</h1>
      <button @click="sendRequest">发送请求</button>
      <button @click="cancelRequest">取消请求</button>
    </div>
    <div>
      <h1>-----js进行路由跳转-----</h1>
      <button @click="navigateTo({ path: '/', query: { q: '1' } })">
        跳转首页
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { RawLocation } from "vue-router";
import { defineComponent } from "vue";

let cancel: Function;

export default defineComponent({
  /**  */
  data() {
    return {
      count: 0,
      CancelToken: this.$axios.CancelToken,
    };
  },
  /**  */
  beforeCreate() {
    console.log("im sth beforeCreate");
  },
  /**  */
  beforeMount() {
    console.log("im sth beforeMount");
  },
  methods: {
    /**  */
    addOne() {
      this.count++;
      console.log("哥们执行了");
    },
    /**  */
    sendRequest() {
      this.$axios.$get("/user/12345", {
        cancelToken: new this.CancelToken((c) => {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }),
      });
    },
    /**  */
    cancelRequest() {
      cancel();
    },
    /**  */
    navigateTo(options: RawLocation) {
      console.log("      window.location.assign(./index.html options", options);
      window.location.assign("./index.html");
      this.$fileRouter.push({
        path: "/",
        query: { a: "1" },
        params: { id: "1" },
      });
    },
  },
});
</script>

<style>
.red {
  color: rgb(50, 253, 209);
}
</style>
