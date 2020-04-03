import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
  state: {
    'message_list': [],
    'socket_id': 0,
    'user_list': ''
  },
  mutations: {
    setChatInfo (state, value) {
      if (typeof (value.state.socket_id) !== 'undefined' && value.state.socket_id !== null) {
        state.socket_id = value.state.socket_id
      }
      if (typeof (value.state.message_obj) !== 'undefined' && value.state.message_obj !== null) {
        state.message_list.push(value.state.message_obj)
      }
    },
    setUserInfo (state, value) {
      var userArr = []
      for (let i = 0; i < value.state.length; i++) {
        var tmpJson = JSON.parse(value.state[i])
        userArr.push(tmpJson)
      }
      state.user_list = userArr
    }

  }
})
export default store
