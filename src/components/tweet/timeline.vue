<template>
  <div class="timeline">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div class="page-content mt-4 mb-4" v-for="tweet in tweets" :key="tweet.id">
              <div class="tweet">
                <div class="author-avatar">
                <v-avatar size="48">
                <img :src="tweet.author.avatar" />
              </v-avatar>
              </div>
              <router-link class="no-link" :to="`/profile/${tweet.author.username}`">
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
                <div class="test" v-if="tweet.media">
                  <v-img :src="tweet.media.link" height="500px" contain></v-img>
                </div>
              </div>
              <div class="content-action">
                <v-dialog
                v-model="dialog"
                width="500">
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
                  <span class="right"><v-btn small outlined @click="reply(tweet.id)">Send!</v-btn></span>
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
                <span class="muted"><router-link :to="`tweet/${tweet.author.username}/${tweet.id}`" class="noLink">{{ tweet.createdAt }}</router-link></span>
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
                <v-btn @click="deleteTweet(tweet.id)" color="error" x-small outlined>Delete</v-btn> <v-btn @click="banUser(tweet.author.id)" color="error" x-small outlined>Ban</v-btn> 
              </div>
            </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "timelineComp",
  props: ["tweets", "user"],
  data() {
    return {
      dialog: false,
      reply: "",
    };
  },
};
</script>

<style scoped>
/* author info and content next to avatar */
.tweet {
    display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
.page-content {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgb(0, 0, 0);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}
/* author avatar */
.author-avatar {
  flex: 0 0 48px;
  margin-right: 1rem;
}
/* author info and content */
.author-info,
.content {
  flex: 1 1 auto;
}
/* author info */
.author-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
/* remove author info link style */

/* author info > span */
.author-info > span {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: large;
}
/* author info > span > small */
.author-info > span > small {
  margin-left: 0.5rem;
  color: #999;
}
/* author info > span > v-icon */
.author-info > span > v-icon {
  margin-left: 0.5rem;
  color: #999;
}
/* content */
.content {
    margin-top: -1.4rem;
    margin-left: 4rem;
}
/* content > p */
.content > p {
  margin: 0;
  padding: 0;
}
/* content > p > a */
.content > p > a {
  color: #1da1f2;
  text-decoration: none;
}
/* content > p > a:hover */
.content > p > a:hover {
  text-decoration: underline;
}
/* content-action to the right */
.content-action {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
  margin-left: 1rem;
}
.muted {
  color: #657786;
  font-size: 0.8em;
}
.disabled {
  cursor: not-allowed !important;
}
/* tweet-tools on the top right */
.tweet-tools {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: -1.5rem;
  margin-right: 1rem;
}
</style>