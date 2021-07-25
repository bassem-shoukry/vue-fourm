<template>
  <the-navbar/>
  <div class="container push-top">
    <router-view v-show="showPage" @ready="showPage = true"/>
    <div v-show="!showPage" class="push-top">loading...</div>
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
  data () {
    return {
      showPage: false
    }
  },
  created()
  {
    this.fetchAuthUser()
    this.$router.beforeEach(() => {
      this.showPage = false
    })
  }
}
</script>

<style>
@import "assets/css/style.css";
</style>
