<template>
  <div v-if="asyncDataStatus_ready" class="col-full">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{forum.description}}</p>
        </div>
        <router-link :to="{name:'ThreadCreate',params:{forumId:forum.id}}" class="btn-green btn-small">Start a thread</router-link>
      </div>
    </div>


   <thread-list :threads="threads"/>

  </div>
</template>

<script>
import ThreadList from "@/components/ThreadList";
import {mapActions} from "vuex";
import asyncDataStatus from "@/mixins/asyncDataStatus";
export default {
  name: "Forum",
  components: {ThreadList},
  props:{
    id:{
      required : true,
      type:String
    }
  },
  computed:{
    forum()
    {
      return this.$store.state.forums.find(forum => forum.id === this.id)
    },
    threads()
    {
      if (!this.forum) return []

      return this.forum.threads.map(threadId => this.$store.getters.thread(threadId))
    }
  },
  methods:{
    ...mapActions(['fetchForum','fetchThreads'])
  },
  mixins: [asyncDataStatus],
  async created () {
    const forum = await this.fetchForum({ id: this.id })
    const threads = await this.fetchThreads({ ids: forum.threads })
    await this.$store.dispatch('fetchUsers', { ids: threads.map(thread => thread.userId) })
    this.asyncDataStatus_fetched()

  }
}
</script>

<style scoped>

</style>