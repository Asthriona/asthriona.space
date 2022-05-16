<template>
  <div class="Blog">
    <v-container>
      <v-row v-if="posts.length == 0">
        <v-col cols="12" class="text-center">
          <h1>No posts yet</h1>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="4" v-for="post in posts" :key="post.id">
          <v-card class="mt-4 mb-4 mx-4">
            <v-img>
              <v-img :src="post.image" aspect-ratio="2.5"></v-img>
            </v-img>
            <v-card-title>
              <span>{{ post.title }}</span>
            </v-card-title>
            <v-card-text>
              <div class="subtitle">
                <span>{{ post.description }}</span> <br />
                <span>{{ post.date }}</span>
              </div>
            </v-card-text>
            <v-card-actions>
              <router-link :to="`/blog/${post.slug}`">
                <v-btn color="primary" text>Read More</v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "allPosts",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    axios.get(`${process.env.VUE_APP_URI}blog/posts/asthriona.space`).then((res) => {
      this.posts = res.data;
    });
  },
};
</script>