<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-08-31 14:59:15
 * @LastEditTime: 2021-08-31 15:21:24
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="content">
    <div v-for="(item, i) in title.split('')" :key="item" :style="{ 'animation-delay': `${i *.15}s` }">{{ item }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: '',
  setup() {
    const title = '丁总yyds';
    const duration = computed(() => {
      return `${title.split('').length * .15}s`
    })
    return {
      title,
      duration,
    }
  },
})
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2d303a;
  div {
    color: #fff;
    font-size: 6rem;
    font-weight: 500;
    text-shadow: rgba(255, 255, 255, .4) 0 0 0.05em;
    transform: translate3d(0, 0, 0);
    animation: bounce .75s linear infinite alternate;
    animation-duration: v-bind(duration);
    font-family: 'Product Sans';
    font-weight: bold;
  }
}
</style>

<style lang="less">
@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
    text-shadow: rgba(255, 255, 255, .4) 0 0 0.05em;
  }
  100% {
    transform: translate3d(0, -1em, 0);
    text-shadow: rgba(255, 255, 255, .4) 0 1em 0.35em;
  }
}
</style>
