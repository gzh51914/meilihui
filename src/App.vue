<template>
  <div id="app">
   
    <search></search>
    <router-view></router-view>
  </div>
  
</template>
<style>

</style>

<script>
import search from "con/search"

export default {
  components:{
    search
  }
}
</script>
