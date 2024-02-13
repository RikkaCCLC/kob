<template>
  <div ref="parent" class="gamemap"> 
  <!-- 使用 div ref="" 来实现template中对下面返回对象的引用-->
  <canvas ref="canvas">
    <!-- 我们的游戏是画在canvas中的，这个是html中的一个标签，意思是画布 -->
  </canvas> 
</div>
</template>

<script>
import { GameMap } from '@/assets/scripts/GameMap'

//想创建游戏对象，首先需要引入canvas，这里需要用到vue中的ref属性
import { ref, onMounted } from 'vue';
//onMounted 是当组件挂载完之后需要执行的操作，组件挂载完之后需要创建游戏对象

export default {
    setup() {
        let parent = ref(null); //vue中定义对象都必须用到ref
        let canvas = ref(null);

        onMounted(() => {
            //创建GameMap对象，其中需要传两个参数，一个是ctx，另一个是parents
            new GameMap(canvas.value.getContext('2d'), parent.value)
            //在vue中取得变量的值需要使用value字段
        })
        return {
            parent,
            canvas  //定义了变量之后将其返回便可在templates中使用
        }
    }
}
</script>

<style scoped>
div.gamemap {
    width: 100%; /* 100%的意思是与其父元素等长 */
    height: 100%;
    display: flex; /* 居中使用flex属性 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 竖直居中 */
}
</style>