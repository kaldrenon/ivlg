// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import InputForm from '@/components/InputForm'
import FormResponse from '@/components/FormResponse'
// import Router from 'vue-router'

Vue.config.productionTip = false

const routes = {
  '/': InputForm,
  '/thanks': FormResponse
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { InputForm, FormResponse },
  template: '<InputForm/>',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || InputForm
    }
  },
  render (h) { return h(this.ViewComponent) }
})
