<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-09-03 16:08:27
 * @LastEditTime: 2021-09-03 16:19:02
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="content">
    <div class="fog"></div>
    <div class="fog"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'fog',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url('../../assets/images/photo.jpg');
  background-size: cover;
  .fog {
    position: absolute;
    left: 0;
    top: 0;
    width: 300vw;
    height: 100%;
    background-size: contain;
    background-position: center;
    
    &:first-child {
      background-image: url('../../assets/images/fog-1.png');
      animation: marquee 60s linear infinite;
    }
    &:last-child {
      background-image: url('../../assets/images/fog-2.png');
      animation: marquee 40s linear infinite;
    }
  }
}
</style>

<style lang="less">
@keyframes marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-200vw, 0, 0);
  }
}
</style>