<template>
  <div>
    <leftBar></leftBar>
    <chatBox></chatBox>
  </div>
</template>

<script>
import LeftBar from './LeftBar.vue'
import ChatBox from './ChatBox.vue'
export default {
  name: 'LeftBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    'leftBar': LeftBar,
    'chatBox': ChatBox
  }
}
</script>
