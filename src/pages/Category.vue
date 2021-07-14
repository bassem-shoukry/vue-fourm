<template>
  <div class="container">
    <div class="col-full push-top">
      <h1>{{category.name}}</h1>
    </div>
    <forum-list :key="category.id" :forums="forums(category.id)" :category="category"/>
  </div>
</template>

<script>
import ForumList from "@/components/ForumList";
import {mapActions} from "vuex";
export default {
  name: "Category",
  components: {ForumList},
  props:{
    id:{
      required:true,
      type:String
    }
  },
  computed:{
    category()
    {
      return this.$store.state.categories.find(category => category.id === this.id) || {}
    }
  },
  methods:{
    ...mapActions(['fetchCategory','fetchForums']),
    forums(categoryId)
    {
      return this.$store.state.forums.filter(forums => forums.categoryId === categoryId)
    }
  },

  async created()
  {
    const category = await this.fetchCategory({id :this.id})
    this.fetchForums({ids:category.forums})
  }

}
</script>

<style scoped>

</style>