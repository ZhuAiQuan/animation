<template>
  <div class="container" @mousedown="handleDown" @mouseup="handleLeave" @mousemove="handleMove" @mouseleave="handleLeave">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { routes } from './router';
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute();
    const router = useRouter();
    // 不用关心横轴偏移
    const movePage = reactive({
      offsetY: 0,
      moveState: false,
      moveOffsetY: 0,
      positionY: 0
    });
    const windowClientHeight = ref(0);
    // 按下鼠标触发事件
    function handleDown(e: MouseEvent) {
      movePage.offsetY = e.offsetY;
      movePage.moveState = true;
    }
    // 松开或者离开视图触发事件 拖动多了仍然会触发bug 具体原因未知
    function handleLeave(e) {
      if (!movePage.moveState) return
      movePage.moveState = false;
      /**
       * @description state false加载下一页 true 上一页
       */
      let state = false;
      movePage.moveOffsetY > 0 ? state = false : state = true
      movePage.positionY = 0;
      movePage.offsetY = 0;
      movePage.moveOffsetY = 0;
      routePush(state)
    }
    // 鼠标移动触发事件
    function handleMove(e: MouseEvent) {
      if (movePage.moveState) {
        movePage.moveOffsetY = movePage.offsetY - e.offsetY;
        if (movePage.moveOffsetY > 0 && movePage.moveOffsetY >= windowClientHeight.value / 3) {
          movePage.moveOffsetY = windowClientHeight.value / 3
        } else if (movePage.moveOffsetY < 0 && movePage.moveOffsetY * -1 >= windowClientHeight.value / 3) {
          movePage.moveOffsetY = (windowClientHeight.value / 3) * -1
        }
        movePage.positionY = `${movePage.moveOffsetY * -1}px`;
      } else {
        movePage.positionY = 0
      }
    }
    // 页面跳转
    function routePush(state: boolean) {
      const path = route.path;
      const index = routes.findIndex(item => item.path === path);
      if (!state) {
        if (index >= routes.length - 1) {
          router.push(routes[0].path)
        } else {
          router.push(routes[index + 1].path)
        }
      } else {
        if (index <= 0) {
          router.push(routes[routes.length - 1].path)
        } else {
          router.push(routes[index - 1].path)
        }
      }
    }
    onMounted(() => {
      // 获取视图高度 拖拽不允许超过该高度1/3
      windowClientHeight.value = document.body.clientHeight;
    })
    return {
      handleDown,
      handleMove,
      handleLeave,
      ...toRefs(movePage),
      windowClientHeight,
    }
  }
})
</script>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: v-bind(positionY);
    left: 0;
    transition: all .3s linear;
    &::before {
      content: '正在加载上一页...';
      position: absolute;
      left: 0;
      top: calc((100vh / 3) * -1);
      width: 100%;
      height: calc(100vh / 3);
      background-image: linear-gradient(45deg, #409EFF, #F56C6C, #E6A23C);
      color: #fff;
      text-align: center;
      line-height: calc(100vh / 3);
      background-size: 300% 300%;
      animation: gradientBG 15s ease infinite;
    }
    &::after {
      content: '马上加载下一页...';
      position: absolute;
      bottom: calc((100vh / 3) * -1);
      left: 0;
      height: calc(100vh / 3);
      width: 100%;
      background-image: linear-gradient(135deg, #F56C6C, #E6A23C, #67C23A);
      color: #fff;
      text-align: center;
      line-height: calc(100vh / 3);
      background-size: 300% 300%;
      animation: gradientBG 15s ease infinite;
    }
  }
}
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
