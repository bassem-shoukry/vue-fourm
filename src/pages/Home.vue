<template>
  <div v-if="asyncDataStatus_ready" class="container">
    <h1 class="push-top">Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
  <div v-else class="push-top">Loading...</div>
</template>

<script>
import CategoryList from "@/components/CategoryList";
import {mapActions} from "vuex/dist/vuex.mjs";
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  name: "PageHome",
  components: {CategoryList},
  data () {
  return {
    ready: false
  }
},
  computed:{
    categories()
    {
      return this.$store.state.categories
    }
  },
  methods:{
    ...mapActions(['fetchAllCategories','fetchForums'])
  },
  mixins: [asyncDataStatus],
  async created()
  {
    const categories = await this.fetchAllCategories()
    const forumIds = categories.map(category => category.forums).flat();
    await this.fetchForums({ ids: forumIds })
    this.asyncDataStatus_fetched()
  }
}
</script>

<style scoped>

</style>