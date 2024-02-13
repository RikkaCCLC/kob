import { createRouter, createWebHistory } from 'vue-router'
import BattleIndexView from '../views/Battle/BattleIndexView'
import Error from '../views/Error/NotFound'
import GameListIndexView from '../views/GameList/GameListIndexView'
import LeaderboardIndexView from '../views/Leaderboard/LeaderboardIndexView'
import UserBotsIndexView from '../views/User/Bots/UserBotsIndexView.vue'


const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/battle/",
  },
  {
    path: "/battle/",
    name: "BattleIndex",
    component: BattleIndexView,
  },
  {
    path: "/error/",
    name: "ErrorIndex",
    component: Error,
  },
  {
    path: "/gamelist/",
    name: "GameListIndex",
    component: GameListIndexView,
  },
  {
    path: "/leaderboard/",
    name: "LeaderboardIndex",
    component: LeaderboardIndexView,
  },
  {
    path: "/userbots/",
    name: "UserbotsIndex",
    component: UserBotsIndexView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/error/"
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
