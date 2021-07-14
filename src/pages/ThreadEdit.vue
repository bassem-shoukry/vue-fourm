<template>
  <div v-if="thread && text" class="col-full push-top">

    <h1>Update Thread</h1>
    <thread-editor :title="thread.title" :text="text" @save="save" @cancel="cancel"/>
  </div>
</template>

<script>
import ThreadEditor from "@/components/ThreadEditor";
import {findById} from "@/helpers";
import {mapActions} from "vuex";
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
    ...mapActions(['fetchThread','fetchThread','fetchPost']),
    async save({title,text}) {
      const thread = await this.fetchThread({
        id: this.threadId,
        title,
        text
      })
      this.$router.push({name:'ThreadShow',params:{id:thread.id}})
    },
    cancel()
    {
      this.$router.push({name:'ThreadShow',params:{id:this.thread.id}})

    }
  },
  async created() {
    const thread = await this.fetchThread({ id: this.threadId })
    this.fetchPost( { id: thread.posts[0] })
  }
}
</script>

<style scoped>

</style>