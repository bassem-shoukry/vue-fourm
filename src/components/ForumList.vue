<template>
<div class="col-full">
  <div class="forum-list">

    <h2 class="list-title">
      <router-link :to="{name:'Category',params:{id:category.id}}">{{category.name}}</router-link>
    </h2>

    <div class="forum-listing" v-for="forum in forums" :key="forum.id">
      <div class="forum-details">
        <router-link :to="{name:'Forum',params:{id:forum.id}}" class="text-xlarge">{{forum.name}}</router-link>
        <p>{{forum.description}}</p>
      </div>

      <div class="threads-count">
        <p><span class="count">{{forum.threads?.length}}</span> {{forumThreadWords(forum)}}</p>
      </div>

      <div class="last-thread"></div>
    </div>


  </div>

</div>
</template>

<script>
export default {
  name: "ForumList",
  props:{
    forums :{
      required:true,
      type:Array
    },
    category:{
      required: true,
      type: Object
    }
  },
  methods:{
    forumThreadWords(forum)
    {
      if (forum.threads?.length) {
        return forum.threads.length > 1 ? 'threads' : 'thread'
      } else {
        return 'no threads'
      }
    }
  }
}
</script>

<style scoped>

</style>