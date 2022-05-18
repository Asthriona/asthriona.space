<template>
    <div class="postSwow">
        <div class="thumbnail" v-bind:style="{ 'background-image': 'url(' + post.image + ')' }"></div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div class="headline text-center">
                        <span>{{ post.title }}</span>
                    </div>
                    <div class="subtitle text-center">
                        <i class="muted">posted on {{ new Date() | moment("MM Do YYYY") }}</i> <br>
                        <i v-if="post.updatedAt">last Update: {{ post.update | moment("dddd, MM Do YYYY") }}</i>
                    </div>
                </v-col>
                <v-col cols="12" class="post-body">
                    <div class="post-content">
                        <div class="post-content-text">
                            <span class="content" v-html="post.sanitizedHtml"></span>
                        </div>
                    </div>
                </v-col>
                <v-spacer></v-spacer>
                <hr />
                <v-col cols="12">
                    <div class="author">
                        <div class="headline">
                            <p>About the author:</p>
                        </div>
                        <div class="author-img">
                            <v-avatar
                            size="150">
                                <v-img :src="author.avatar"></v-img>
                            </v-avatar>
                            <span class="ml-4 display-2">{{ author.displayName }}#{{ author.discriminator }} <v-icon size="50" class="mb-2">{{ author.selectedBadge }}</v-icon></span> <br>
                            <span class="ml-12 subtitle">{{ author.description }}</span>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <div class="comments">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <div class="headline">
                            <p>post new comments</p>
                            <v-form>
                                <v-textarea
                                v-model="newComment"
                                label="Comment"
                                :rules="commentRules"
                                ></v-textarea>
                                <v-btn
                                color="primary"
                                type="submit"
                                @click="submitComment"
                                >
                                Post
                                </v-btn>
                            </v-form>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <div class="headline">
                            <p>Comments</p>
                        </div>
                    </v-col>
                    <div class="nocomment" v-if="!comments">
                    <p>be the first to comment to this post!</p>
                    </div>
                <div class="comment" v-else>
                    <v-col v-for="comment in comments" :key="comment.id">
                    <v-avatar>
                        <v-img :src="comment.author.avatar"></v-img>
                    </v-avatar>
                        <span class="headline ml-2">{{ comment.author.displayName }}#{{ comment.author.discriminator }} <v-icon>{{ comment.author.selectedBadge }}</v-icon></span>
                    <div class="comment-body ml-4 mt-4">
                        <div class="comment-body-text ml-4">
                            <span class="content" v-html="comment.content"></span>
                        </div>
                        </div>
                    </v-col>
                </div>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "PostView",
    data() {
        return {
            post: {},
            author: {},
            comments: [],
            newComment: "",
            commentRules: [
                v => !!v || "Comment is required"
            ]
            }
        },
    mounted() {
        axios.get(`${process.env.VUE_APP_URI}blog/posts/asthriona.space/${this.$route.params.slug}`).then((res) => {
            this.post = res.data.post;
            this.author = res.data.author;
        });
        axios.get(`${process.env.VUE_APP_URI}blog/comments/asthriona.space/${this.$route.params.slug}`)
        .then((res) => {
            this.comments = res.data.comments;
        });
    },
    methods: {
        submitComment(e) {
            e.preventDefault();
            if (this.newComment) {
                axios.post(`${process.env.VUE_APP_URI}blog/comments/asthriona.space/${this.$route.params.slug}`, {
                    content: this.newComment
                }, { headers: { 'Authorization': localStorage.getItem('token')}}).then((res) => {
                    this.comments.push(res.data.comment);
                    this.comment = "";
                });
            }
        }
    }
};

</script>

<style>
.thumbnail{
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat !important;
    height: 300px !important;
    width: 100% !important;
}
.content pre {
  color: #aa3f81 !important;
  background-color: #35373b;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  margin: 10px 0;
}
.content pre code {
  color: #aa3f81 !important;
}
.content code {
    color: #aa3f81 !important;
}
.content img {
  max-width: 100%;
  height: auto;
}
</style>