<template>
  <div>
    <div class="container">
        <div class="chatbox">
            <div class="chatleft">
                <div class="top">
                    <i class="fas fa-bars" style="font-size: 1.4em"></i>
                </div>
                <div class="center">
                    <ul v-for = "(v,i) in user_list" v-bind:key="i">
                        <li>
                            <img style="border-radius: 20px; vertical-align: middle;" src="http://placehold.it/40x40">
                            <span style="margin-left: 10px;">{{v.nickname}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="chatright">
                <div class="top">
                    <h2 v-if = '!is_edit' v-on:click = 'setIsEdit' style="font-weight: bold">{{title}}</h2>
                    <div v-else class="input-field linear" style="left: 0%">
                    <input  type="text"  v-model="title" @blur="setTitle(title)" >
                    </div>
                </div>
                <div class="center" id="msgbox">
                    <ul class = "welcome_ul">
                            <p class="welcome_msg">{{welcome_message}}</p>
                    </ul>
                    <ul v-for = "(v,i) in message_list" v-bind:key="i">
                        <li v-bind:class="{msgleft:msg_style(v),msgright:!msg_style(v)}">
                            <div style="width: 6%">
                            <div class="nickname">{{v.nickname}}</div>
                            <img style="border-radius: 20px; vertical-align: top;" src="http://placehold.it/40x40">
                            </div>
                            <p class="msgcard">{{v.message}}</p>
                        </li>
                    </ul>
                </div>
                <div class="center footer">
                    <textarea maxlength="800" rows="5" cols="40" style="width: 100%; resize: none; border: none; " :placeholder=type_message v-model="message"></textarea>
                    <button class="sendbtn" v-on:click="send">发送</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBox',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      welcome_message: '欢迎来到聊天室!',
      socket_id: '',
      type_message: '请在此输入要发送的内容......',
      message: '',
      message_list: [],
      user_list: [],
      is_edit: false,
      title: '全世界尬聊'
    }
  },
  created () {
    this.socket_id = this.$store.state.socket_id
    this.user_list = this.$store.state.user_list
    console.log(this.$store.state.user_list)
  },
  methods: {
    send: function () {
      console.log(this.socket_id)
      this.axios.post('http://192.168.7.237:1025/send', {
        send_id: this.socket_id,
        message: this.message
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
      }).catch(function (err) {
        console.log(err)
      })
      this.clear()
    },
    msg_style: function (i) {
      return i.style === 'msgleft'
    },
    clear () {
      this.message = ''
    },
    setIsEdit () {
      this.is_edit = !this.is_edit
    },
    setTitle (title) {
      this.title = title
      this.setIsEdit()
    }
  },
  computed: {
    getSocketId () {
      return this.$store.state.socket_id
    },
    getMessageList () {
      return this.$store.state.message_list
    },
    getUserList () {
      return this.$store.state.user_list
    }
  },
  watch: {
    getSocketId (socketId) {
      this.socket_id = socketId
      console.log(this.socket_id)
    },
    getMessageList (messageList) {
      console.log(messageList)
      this.message_list = messageList
    },
    getUserList (userList) {
      this.user_list = userList
    }
  },
  updated: function () {
    this.$nextTick(function () {
      var div = document.getElementById('msgbox')
      div.scrollTop = div.scrollHeight
    })
  }
}
</script>
<style>
@import "https://use.fontawesome.com/releases/v5.0.13/css/all.css"
</style>
