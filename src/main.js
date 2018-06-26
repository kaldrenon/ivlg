// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import App from '@/App'
import SquareLogoForm from '@/components/SquareLogoForm'
import WideLogoForm from '@/components/WideLogoForm'

// Tooling
import router from './routes.js'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
//
// // Config
// Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
    el.select()
  }
})

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  components: { App, SquareLogoForm, WideLogoForm },
  router: router,
  render: h => h(App)
})

console.log(app)
