<template>
  <div>
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post">say somthing...</label>
      <input type="text" id="create-post" v-model="text" />
      <button v-on:click="createPost">post!</button>
    </div>
    <!-- Create post here -->
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dbclick="deletePost(post._id)"
      >
        {{ 
          `
            ${post.createAt.getFullYear()}/ ${post.createAt.getMonth() + 1}/
            ${post.createAt.getDate()}
          `
        }}
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService.js';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
