<template>
  <component :is="linkTag" v-bind="linkProps">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue/types/options";
import { toURL, NavicateParam } from "@/src/utils/fileRouter/index";
// 判断是在正常环境还是开发环境
const isDev = process.env.NODE_ENV !== "production";

export default Vue.extend({
  name: "FileLink",
  props: {
    to: {
      type: [String, Object] as PropType<NavicateParam>,
      required: true,
    },
  },
  computed: {
    /** 链接的标签 */
    linkTag(): string {
      return isDev ? "nuxt-link" : "a";
    },
    /** 链接的属性 */
    linkProps(): Record<string, unknown> {
      if (this.linkTag === "a") {
        return { href: toURL(this.to) };
      } else {
        return { to: this.to };
      }
    },
  },
  methods: {},
});
</script>
