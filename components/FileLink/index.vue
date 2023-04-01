<template>
  <component :is="linkTag" v-bind="linkProps">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import Vue from "vue";
import { RawLocation } from "vue-router";
import { PropType } from "vue/types/options";
import { toRelaHtmlPath } from "@/src/utils/fileRouter";
// 判断是在正常环境还是开发环境
const isDev = process.env.NODE_ENV !== "production";

export default Vue.extend({
  name: "FileLink",
  props: {
    to: {
      type: [String, Object] as PropType<RawLocation>,
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
        return { href: this.getHref() };
      } else {
        return { to: this.to };
      }
    },
  },
  methods: {
    /** 处理a链接情况下的href拼接 */
    getHref(): string {
      if (typeof this.to === "string") {
        return toRelaHtmlPath(this.to);
      } else if (typeof this.to === "object") {
        const { path, query } = this.to;
        let href = "";
        if (path) {
          const queryString = new URLSearchParams(query as {}).toString();
          href = `${toRelaHtmlPath(path)}?${queryString}`;
        }
        // if (params) {
        // }
        return href;
      } else {
        return "";
      }
    },
  },
});
</script>
