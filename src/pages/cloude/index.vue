<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-08-30 17:09:39
 * @LastEditTime: 2021-08-30 17:32:10
 * @LastEditors: zaq
 * @Reference: 
-->
<template>
  <div class="content">
    <div class="cloude"></div>
    <div class="cloude"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'cloude',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/poster-about.jpg');
  background-size: cover;
  .cloude {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    
    &:first-child {
      background-image: url('../../assets/images/poster-drop-animate1.png');
      animation: move-cloude2 6000s linear infinite;
    }
    &:last-child {
      background-image: url('../../assets/images/poster-drop-animate2.png');
      animation: move-cloude 8000s linear infinite;
    }
  }
}
</style>

<style lang="less">
@keyframes move-cloude {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 4000% 0;
  }
}
@keyframes move-cloude2 {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 30000% 0;
  }
}
</style>