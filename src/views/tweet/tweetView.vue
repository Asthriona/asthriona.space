<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card class="mt-4">
          <v-card-title>
            <v-avatar><v-img :src="tweet.author.avatar"></v-img></v-avatar> <span class="ml-2">{{ tweet.author.displayName
            }}</span> <v-icon>{{ tweet.author.selectedBadge }}</v-icon>
          </v-card-title>
          <v-card-text>
            <p v-html="tweet.content"></p>
          </v-card-text>
          <v-card-actions>
            <small>
              <v-icon>mdi-calendar-month-outline</v-icon>
            </small>
            <small style="color:'#657786';text-decoration: underline;">
              <router-link :to="`/tweet/${tweet._id}`">{{ tweet.createdAt }}</router-link>
            </small>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="7">
        <div class="reply" v-for="reply in tweet.replies" :key="reply.id">
        <Reply v-if="reply.isDeleted == false" :reply="reply" :user="user" :tweet="tweet" />
      </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Reply from '@/components/tweet/reply.vue';
export default {
  name: "TweetView",
  data() {
    return {
      tweetId: this.$route.params.id,
      username: this.$route.params.username,
      tweet: {},
      dialog: false,
    };
  },
  mounted() {
    this.getTweet();
  },
  components: {
    Reply,
  },
  methods: {
    getTweet() {
      axios.get(`${process.env.VUE_APP_URI}tweet/${this.tweetId}`)
        .then((res) => {
          console.log(res.data)
          this.tweet = res.data.tweet;
        })
    }
  }
}
</script>