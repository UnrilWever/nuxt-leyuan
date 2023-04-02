<template>
  <div>
    <h1>点击跳转页面</h1>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <file-link :to="route.path">{{ route.name }}</file-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { routeMap } from "@/router";

export default defineComponent({
  /** 数据 */
  data() {
    return {
      count: 0,
    };
  },
  /** 计算属性 */
  computed: {
    /** 路由信息属性 */
    routes() {
      return Object.keys(routeMap).map((path) => {
        return { name: routeMap[path], path };
      });
    },
  },
  /** 生命周期mounted */
  mounted() {},
  methods: {},
});
</script>

<style>
/* 设置页面背景颜色为白色 */
body {
  background-color: white;
}

/* 设置标题样式为居中，橙色，粗体，大号字体 */
h1 {
  text-align: center;
  color: #ff6600; /* 橙色 */
  font-weight: bold;
  font-size: 36px;
  /* animation: bounce 1s infinite; */ /* 删除动画效果 */
  background: linear-gradient(to right, #ff6600, #ff9900); /* 添加渐变背景 */
  -webkit-background-clip: text; /* 背景裁剪为文字 */
  -webkit-text-fill-color: transparent; /* 文字填充为透明 */
}

/* 设置无序列表样式为垂直排列，无圆点，有间距 */
ul {
  display: block; /* 修改为block */
  list-style: none;
  padding: 10px;
}

/* 设置列表项样式为白色背景，无边框，圆角，有内边距 */
li {
  background-color: white;
  border: none; /* 删除边框 */
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1); /* 添加内阴影效果 */
}

/* 设置链接样式为橙色，无下划线 */
a {
  color: #ff6600; /* 橙色 */
  text-decoration: none;
}
</style>
