<template>
  <div>
    <div style="background-color:#FF0000">
    <Header></Header>
    </div>
    <p>
      Hi!
    </p>
    <input type="text" v-model="message">
    <p>{{ message }}</p>
  </div>
</template>
<script>
import Header from './Header'

export default {
  components: {
    Header
  },
  data () {
    return {
      message: 'Hello World!'
    }
  }
}
</script>
