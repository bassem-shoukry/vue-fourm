<template>
  <div class="post-list">
    <div class="post" v-for="post in posts" :key="post.id">

      <div class="user-info">
        <a href="#" class="user-name">{{userById(post.userId).name}}</a>

        <a href="#">
          <img class="avatar-large" :src="userById(post.userId).avatar" alt="">
        </a>

        <p class="desktop-only text-small">107 posts</p>

      </div>

      <div class="post-content">
        <div>
          <p>
            {{post.text}}
          </p>
        </div>
        <a href="#" style="margin-left: auto;" class="link-unstyled" title="Make a change"><i class="fa fa-pencil"></i></a>
      </div>



      <div class="post-date text-faded">
        6 hours ago
      </div>

      <div class="reactions">
        <ul>
          <li>💡</li>
          <li>❤️</li>
          <li>👎</li>
          <li>👍</li>
          <li>👌</li>
        </ul>
        <button class="btn-xsmall"><span class="emoji">❤️</span>️ 3</button>
        <button class="btn-xsmall active-reaction"><span class="emoji">👌️</span>️ 1</button>
        <button class="btn-xsmall">+ <i class="fa fa-smile-o emoji"></i></button>
      </div>

    </div>

    <div class="post">

      <div class="user-info">
        <a href="#" class="user-name">Joseph Kerr</a>

        <a href="#">
          <img class="avatar-large" src="https://i.imgur.com/OqlZN48.jpg" alt="">
        </a>

        <p class="desktop-only text-small">116 posts</p>

        <p class="desktop-only text-small">73 threads</p>

        <span class="online desktop-only">online</span>

      </div>

      <div class="post-content">
        <div>
          <blockquote class="small">
            <div class="author">
              <a href="#" class=""> robin</a>
              <span class="time">a month ago</span>
              <i class="fa fa-caret-down"></i>
            </div>

            <div class="quote">
              <p>Is horseradish and Wasabi the same thing? I've heard so many different things.</p>
            </div>
          </blockquote>
          <p>They're not the same!</p>
        </div>
        <a class="edit-post link-unstyled"><i class="fa fa-pencil"></i></a>
      </div>



      <div class="post-date text-faded">
        6 hours ago
      </div>

      <div class="reactions">
        <button class="btn-xsmall">+ <i class="fa fa-smile-o emoji"></i></button>
      </div>

    </div>

    <div class="post">

      <div class="user-info">
        <a href="#" class="user-name">Ray-Nathan James</a>

        <a href="#">
          <img class="avatar-large" src="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Fraynathan?alt=media&amp;token=bd9a0f0e-60f2-4e60-b092-77d1ded50a7e" alt="">
        </a>

        <p class="desktop-only text-small">10 posts</p>

        <p class="desktop-only text-small">4 threads</p>

        <span class="offline desktop-only">offline</span>

      </div>

      <div class="post-content">
        <div>
          <p>
            <a href="#" class="">@Joker</a> is right, they're not the same.
          </p>
          <p>
            They are different plants from the same family (mustard/cabbage).
          </p>
        </div>
      </div>



      <div class="post-date text-faded">
        6 hours ago
      </div>

      <div class="reactions">
        <button class="btn-xsmall">+ <i class="fa fa-smile-o emoji"></i></button>
      </div>

    </div>
  </div>
</template>

<script>
import sourceData from "@/data.json";

export default {

name: "PostList",
props : {
  posts : {
    required:true,
    type:Array
  }
},
  data(){
    return {
      threads : sourceData.threads,
      users: sourceData.users
    }
  },
  methods:{
    userById(userId)
    {
      return this.users.find(u => u.id === userId)
    }
  },
}
</script>

<style scoped>

</style>