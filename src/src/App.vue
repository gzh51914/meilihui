<template>
  <div id="app">

    <search v-show="!isShow"></search>
    <router-view></router-view>
  </div>

</template>
<style>

</style>

<script>
import search from 'con/search'
import { mapState } from 'vuex'
export default {
  components: {
    search
  },
  computed: {
    ...mapState([('isShow')])
  }
}
</script>
