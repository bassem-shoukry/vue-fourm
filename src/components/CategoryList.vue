<template>
  <forum-list v-for="category in categories" :key="category.id" :forums="forums(category.id)" :category="category"/>
</template>

<script>
import ForumList from "@/components/ForumList";
export default {
  name: "CategoryList",
  components: {ForumList},
  props:{
    categories :{
      required:true,
      type:Array
    }
  },
  methods:{
    forums(categoryId)
    {
      return this.$store.state.forums.filter(forums => forums.categoryId === categoryId)
    }
  }

}
</script>

<style scoped>

</style>