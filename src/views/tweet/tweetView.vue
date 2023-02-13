<template>
  <v-container>
    {{ tweet }}
    <v-row align="center" justify="center">
      <v-col cols="12">
          <div class="tweet">
            <div class="author-avatar">
              <v-avatar size="48">
                <img :src="tweet.author.avatar" />
              </v-avatar>
            </div>
            <router-link
              class="no-link"
              :to="`/profile/${tweet.author.username}`"
            >
              <div class="author-info">
                <span
                  >{{ tweet.author.displayName }}
                  <small class="muted">@{{ tweet.author.username }}</small>
                  <v-icon v-if="tweet.author.isVerified == false">{{
                    tweet.author.selectedBadge
                  }}</v-icon>
                  <v-icon v-else>mdi-check-decagram-outline</v-icon></span
                >
              </div>
            </router-link>
          </div>
          <div class="content">
            <p v-html="tweet.content"></p>
          </div>
          <div class="content-action">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-comment-outline</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span>Reply to this Tweet</span>
                </v-card-title>
                <v-card-text>
                  <v-textarea
                    v-model="reply"
                    label="Reply"
                    placeholder="What's happening?"
                    outlined
                    rows="5"
                  />
                  <span class="right"
                    ><v-btn small outlined @click="reply(tweet.id)"
                      >Send!</v-btn
                    ></span
                  >
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-btn class="disabled" icon disabled>
              <v-icon>mdi-repeat</v-icon>
            </v-btn>
            <v-btn class="disabled" icon disabled>
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn class="disabled" icon disabled>
              <v-icon>mdi-upload</v-icon>
            </v-btn>
          </div>
          <div class="tweet-infos">
            <span class="muted"
              ><router-link
                :to="`tweet/${tweet.author.username}/${tweet.id}`"
                class="noLink"
                >{{ tweet.createdAt }}</router-link
              ></span
            >
          </div>
          <div class="tweet-tools" v-if="tweet.author.id == user.id">
            <!-- menu to delete tweet -->
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="deleteTweet(tweet.id)">
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="admin-btns" v-if="user.isAdmin">
            <v-btn @click="deleteTweet(tweet.id)" color="error" x-small outlined
              >Delete</v-btn
            >
            <v-btn
              @click="banUser(tweet.author.id)"
              color="error"
              x-small
              outlined
              >Ban</v-btn
            >
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
    name: "TweetView",
    data() {
        return {
            tweetId: this.$route.params.id,
            username: this.$route.params.username,
            tweet: "",
            dialog: false,
            reply: "",
        };
    },
    mounted() {
        this.getTweet();
    },
    methods: {
        getTweet() {
            axios.get(`${process.env.VUE_APP_URI}tweet/${this.tweetId}`)
            .then((res) => {
                this.tweet = res.data.tweet;
            })
        }
    }
}
</script>