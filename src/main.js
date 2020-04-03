// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import './assets/css/chat.css'
import './assets/css/reset.css'
import './assets/css/info.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import websocket from './assets/js/websocket.js'
import store from './assets/js/store.js'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

router.beforeEach((to, from, next) => {
  if (to.path === '/info') {
    next()
  } else {
    if (VueCookies.get('cookie_user_nickname') === null) {
      next({path: '/info'})
    } else {
      next()
    }
  }
})

window.onbeforeunload = function () {
  // 刷新、关闭 页面之前，做一些其他的事情。
  this.$cookies.remove('cookie_user_nickname')
  var $this = this
  this.axios.post('http://192.168.7.237:1025/delUser', {
    send_id: store.state.socket_id
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (response) {
    $this.$cookies.remove('cookie_user_nickname')
    $this.$router.push({path: '/info'})
  }).catch(function (err) {
    console.log(err)
  })
  console.log('level')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

Vue.prototype.$websocket = websocket
Vue.prototype.$cookies = VueCookies
