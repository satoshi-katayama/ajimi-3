<template>
  <div>
    <VueHeader></VueHeader>
    <p class="example">
      {{msg}}
    </p>
  </div>
</template>

<script>

import VueHeader from './components/VueHeader'

export default {
  components: {
    VueHeader
  },
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
  .example {
    color: red;
  }
</style>
