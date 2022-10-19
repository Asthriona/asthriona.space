<template>
    <div class="userComment">
        <v-container>
            <v-row>
                <v-col cols="12" v-if="commentsLoading == true">
                    <h1>Loading {{ usrProfile.displayName }}'s comments.</h1>
                </v-col>
                <v-col cols="12" v-else-if="comments.length && commentsLoading == false">
                        <v-col cols="12" v-for="comment in comments" :key="comment.id">
                            <v-card
                            elevation="2"
                            class="mt-2 mb-2">
                            <v-card-title>
                                {{ comment.Comment }}
                            </v-card-title>
                            <v-card-text>
                                Commented on: {{ comment.PostTitle }}
                                <span v-if="comment.updatedAt !== null"> Updated {{ comment.updatedAt }}</span>
                            </v-card-text>
                            </v-card>
                        </v-col>
                </v-col>
                <v-col cols="12" v-if="!comments.length && commentsLoading == false">
                    <h1>{{ usrProfile.displayName }} has no comment.</h1>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "UserCommentComp",
    props: ['usrProfile'],
    data() {
        return {
            comments: [],
            commentsLoading: true,
        };
    },
    mounted() {
        this.commentsLoading = true;
        setTimeout(() => {
            this.getUserComments();
        }, 1000);
    },
    methods: {
        getUserComments() {
            axios.get(`${process.env.VUE_APP_URI}profile/comments/${this.usrProfile.id}`)
            .then((res) => {
              this.comments = res.data;
              this.commentsLoading = false;
            })
            .catch((err) => {
              console.log(err);
              this.commentsLoading = false;
            });
        }
    }
}
</script>