<template>
  <the-navbar/>
  <div class="container push-top">
    <router-view></router-view>
  </div>
</template>

<script>

import TheNavbar from "@/components/TheNavbar";
export default {
  name: 'App',
  components: {TheNavbar},
}
</script>

<style>
@import "assets/css/style.css";
</style>
