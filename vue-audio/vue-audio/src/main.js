// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import jQuery from 'jquery'
import cjzhangAudio from 'cjzhang-audio'
Vue.use(cjzhangAudio);
Vue.config.productionTip = false
Vue.prototype.$ = jQuery
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
