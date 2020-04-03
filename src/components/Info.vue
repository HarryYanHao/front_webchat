<template>
  <div>
    <leftBar></leftBar>
    <div class="input-field linear">
    <input id="last_name" type="text" placeholder="昵称" v-model="nickname" @blur="setInfo">
    <span></span>
    </div>
  </div>
</template>

<script>
import LeftBar from './LeftBar.vue'
export default {
  name: 'Info',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      nickname: '',
      socket_id: 0
    }
  },
  methods: {
    setInfo: function () {
      if (this.$cookies.get('cookie_user_nickname') === null) {
        this.$cookies.set('cookie_user_nickname', this.nickname, 3600 * 24)
      }
      this.axios.post('http://192.168.7.237:1025/addUser', {
        send_id: this.socket_id,
        nickname: this.nickname
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
      }).catch(function (err) {
        console.log(err)
      })
    },
    getInfo: function () {
      this.nickname = ''
      if (this.$cookies.get('cookie_user_nickname') !== null) {
        this.nickname = this.$cookies.get('cookie_user_nickname')
      }
    }
  },
  components: {
    'leftBar': LeftBar
  },
  computed: {
    getSocketId () {
      return this.$store.state.socket_id
    }
  },
  watch: {
    getSocketId (socketId) {
      this.socket_id = socketId
    }
  }
}
</script>
<style scoped>
  @import '../assets/css/info.css'
</style>
