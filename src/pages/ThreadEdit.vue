<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

    <h1>Update Thread</h1>
    <thread-editor :title="thread.title" :text="text" @save="save" @cancel="cancel"/>
  </div>
</template>

<script>
import ThreadEditor from "@/components/ThreadEditor";
import {findById} from "@/helpers";
import {mapActions} from "vuex";
import asyncDataStatus from "@/mixins/asyncDataStatus";
export default {
  name: "ThreadEdit",
  components: {ThreadEditor},
  props:{
    threadId:{
      type:String,
      required:true
    }
  },

  computed:{
    thread()
    {
      return this.$store.state.threads.find(thread => thread.id === this.threadId)
    },
    text()
    {
      const post = findById(this.$store.state.posts, this.thread.posts[0])
      return post ? post.text : ''
    }
  },
  methods:{
    ...mapActions(['fetchThread','updateThread','fetchPost']),
    async save({title,text}) {
      const thread = await this.updateThread({
        id: this.threadId,
        title,
        text
      })
      await this.$router.push({name: 'ThreadShow', params: {id: thread.id}})
    },

    cancel()
    {
      this.$router.push({name:'ThreadShow',params:{id:this.thread.id}})

    }
  },
  mixins: [asyncDataStatus],
  async created() {
    const thread = await this.fetchThread({ id: this.threadId })
    await this.fetchPost( { id: thread.posts[0] })
    this.asyncDataStatus_fetched()
  }
}
</script>

<style scoped>

</style>