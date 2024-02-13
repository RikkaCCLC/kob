<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <!-- <a class="navbar-brand" href="#">King of Bots</a> -->
    <!-- 将a标签替换为router-link标签实现页面局部加载，就是不用每次跳转都刷新 -->
    <router-link class="navbar-brand" :to="{name: 'Home'}">King of Bots</router-link>

    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link :class="route_name == 'BattleIndex' ? 'nav-link active' : 'nav-link' " :to="{name: 'BattleIndex'}">Battle</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route-name == 'GameListIndex' ? 'nav-link active' : 'nav-link'" :to="{name: 'GameListIndex'}">Game-List</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route-name == 'LeaderboardIndex' ? 'nav-link active' : 'nav-link'" :to="{name: 'LeaderboardIndex'}">Leaderboard</router-link>
        </li>
        </ul>

        <ul class="navbar-nav">
            <li class="nav-item dropdown"  >
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            XQY
          </a>
          <ul class="dropdown-menu ">
            <li>
              <router-link class="dropdown-item" :to="{name: 'UserbotsIndex'}">My Bots</router-link>
            </li>
            <li>
              <a class="dropdown-item" href="#">Log out</a>
            </li>
          </ul>
        </li>
        </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { useRoute } from 'vue-router'
// 从vue-router中引入一个这个组件

import {computed} from 'vue'
//从vue中引入一个实时计算函数
export default {
  setup(){
    const route = useRoute();  //这里引用一下这个组件
    let route_name = computed(() => route.name) //computed中是一个函数
    return {
      route_name //返回route_name，返回完之后上面就可以用了
    } 
  } 
}
</script>

<style scoped>
</style>