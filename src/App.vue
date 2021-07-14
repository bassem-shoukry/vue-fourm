<template>
  <the-navbar/>
  <div class="container push-top">
    <router-view></router-view>
  </div>
</template>

<script>

import TheNavbar from "@/components/TheNavbar";
import {mapActions} from "vuex";
export default {
  name: 'App',
  components: {TheNavbar},
  methods:{
    ...mapActions(['fetchAuthUser'])
  },
  created()
  {
    this.fetchAuthUser()
  }
}
</script>

<style>
@import "assets/css/style.css";
</style>
