import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '@/App'
import LogoGen from '@/components/LogoGen'

Vue.use(VueRouter)

var router = new VueRouter({
  base: __dirname,
  routes: [{
    path: '/',
    component: LogoGen
  }]
})

export default router
