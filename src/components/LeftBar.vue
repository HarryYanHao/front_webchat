<template>
  <div>
    <div class="leftbar">
      <ul>
            <li v-on:click="chat"><i class="fas fa-users"></i></li>
            <li v-on:click="smile"><i class="fas fa-smile"></i></li>
            <li><i class="fas fa-envelope"></i></li>
            <li><i class="fas fa-bell"></i></li>
            <li><i class="fas fa-calendar-alt"></i></li>
            <keep-alive><li v-on:click="user"><i class="fas fa-user"></i></li></keep-alive>
            <li v-on:click="exit"><i class="fas fa-power-off"></i></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    smile: function () {
      this.$router.push({path: '/'})
    },
    user: function () {
      this.$router.push({path: '/info'})
    },
    chat: function () {
      this.$router.push({path: '/chat'})
    },
    exit: function () {
      var $this = this
      this.axios.post('http://192.168.7.237:1025/delUser', {
        send_id: this.$store.state.socket_id
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
    }
  }
}
</script>
<style>
@import "https://use.fontawesome.com/releases/v5.0.13/css/all.css"
</style>
