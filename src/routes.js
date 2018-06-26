import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '@/App'
import SquareLogoForm from '@/components/SquareLogoForm'
import WideLogoForm from '@/components/WideLogoForm'

Vue.use(VueRouter)

var router = new VueRouter({
  base: __dirname,
  routes: [{
    path: '/',
    component: WideLogoForm,
    children: [
      {
        path: 'square',
        component: SquareLogoForm
      }
    ]
  }]
})

export default router
