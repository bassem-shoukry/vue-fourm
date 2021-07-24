<template>
  <div v-if="asyncDataStatus_ready" class="container col-full" >
    <div class="col-full push-top">
      <h1>{{category.name}}</h1>
    </div>
    <forum-list :key="category.id" :forums="forums(category.id)" :category="category"/>
  </div>
</template>

<script>
import ForumList from "@/components/ForumList";
import {mapActions} from "vuex";
import asyncDataStatus from "@/mixins/asyncDataStatus";
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
  mixins: [asyncDataStatus],

  async created()
  {
    const category = await this.fetchCategory({id :this.id})
    await this.fetchForums({ids:category.forums})
    this.asyncDataStatus_fetched()

  }

}
</script>

<style scoped>

</style>