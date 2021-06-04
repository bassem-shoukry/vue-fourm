<template>
  <div class="col-full push-top">

    <div class="thread-list">

      <h2 class="list-title">Threads</h2>

      <div class="thread" v-for="thread in threads" v-bind:key="thread.key">
        <div>
          <p>
            <router-link :to="{name:'ThreadShow',params:{id:thread.id}}">{{thread.title}}</router-link>
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{userById(thread.userId).name}}</a>, <AppDate :timestamp="thread.publishedAt" /> replies.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
            {{thread.posts.length}}
          </p>

          <img class="avatar-medium" :src="userById(thread.userId).avatar" alt="">

          <div>
            <p class="text-xsmall">
              <a href="#">{{userById(thread.userId).name}}</a>
            </p>
            <p class="text-xsmall text-faded">
              <AppDate :timestamp="thread.publishedAt"/>
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
export default {
name: "ThreadList",
  props:{
    threads:{
      type:Array,
      required : true
    }
  },
  computed:{
    posts(){
      return this.$store.state.posts
    },
    users(){
      return this.$store.state.users
    },
  },
  methods:{
    userById(userId)
    {
      return this.users.find(u => u.id === userId)
    }
  }
}
</script>

<style scoped>

</style>