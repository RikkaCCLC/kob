<template>
    <div class="playground">
        <GameMap></GameMap>
    </div>
    
</template>

<script>
import GameMap from './GameMap.vue';

export default {
    components: {
        GameMap,
    }
}


</script>

<style scoped>
div.playground {
    width: 60vw;  /* 60% 浏览器宽度 */
    height: 70vh; 
    background: blue;
    margin:70px  auto; /* auto实现左右居中，50px代表距离上下左右两边的距离 */
}
</style>