<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea v-model="text" class="form-control" cols="30" rows="10"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">submit post</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: "PostEditor",
  data(){
    return {
      text:''
    }
  },
  methods: {
    save()
    {
      const postId = 'ggg'+ Math.random();
      const post = {
        id:postId,
        text:this.text,
        threadId:this.id,
      }

      this.$emit('save',{post})
      this.text = '';
    }
  }
}
</script>

<style scoped>

</style>