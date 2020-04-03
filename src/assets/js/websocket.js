import store from './store.js'
var wsServer = 'ws://192.168.7.237:9502'
var websocket = new WebSocket(wsServer)
var $data = {'message_list': []}
websocket.onopen = function (evt) {
  console.log(evt)
  console.log('connected to webSocket Server')
}
websocket.onclose = function (evt) {
  console.log(evt, 'disconnected')
}
websocket.onmessage = function (evt) {
  console.log('Retrieved data from server: ' + evt.data)
  var data = JSON.parse(evt.data)
  if (data.type === 'socket') {
    // 获取socket_id
    $data.socket_id = data.socket_id
    store.commit('setChatInfo', {state: {
      'socket_id': data.socket_id
    }})
    return true
  } else if (data.type === 'chat') {
    var messageObj = {}
    if (data.message !== '') {
      messageObj.message = data.message
      messageObj.nickname = data.nickname
    }
    if (data.send_id === $data.socket_id) {
      console.log(data.send_id, $data.socket_id)
      messageObj.style = 'msgright'
    } else {
      console.log(data.send_id, $data.socket_id)
      messageObj.style = 'msgleft'
    }
    $data.message_list.push(messageObj)
    store.commit('setChatInfo', {state: {
      'message_obj': messageObj
    }})
  } else if (data.type === 'user_list') {
    var userArr = data.user_list
    store.commit('setUserInfo', {state: userArr})
  }
}
export default websocket
