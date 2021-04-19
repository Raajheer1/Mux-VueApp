import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Overview from '@/views/videoGrid'
import VideoPlayer from "@/views/VideoPlayer"
import Assets from "@/views/assetGrid"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview,
  },
  {
    path: '/assets',
    name: 'assets',
    component: Assets,
  },
  {
    path: '/stream',
    name: 'stream',
    component: VideoPlayer,
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
