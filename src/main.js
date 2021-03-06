// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import App from '@/App'
import SquareLogoForm from '@/components/SquareLogoForm'
import WideLogoForm from '@/components/WideLogoForm'
import ajax from 'vuejs-ajax'

// Tooling
import router from './routes.js'

// // Config
Vue.config.productionTip = false
Vue.use(ajax)

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
