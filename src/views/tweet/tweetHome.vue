<template>
    <div class="tweetHome">
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                    <send-tweet v-if="user !== null" :user="user" />
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                    <p class="text-center muted">Updated: {{ updatedAt }}</p>
                    <div class="display-1 text-center">Latest Posts</div>
                    <timeline :tweets="tweets" :user="user" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
import sendTweet from '@/components/tweet/sendTweet.vue';
import timeline from '@/components/tweet/timeline.vue';
export default {
    name: "tweetHome",
    props: ["user"],
    data() {
        return {
            tweets: [],
            updatedAt: null
        };
    },
    components: {
        sendTweet,
        timeline,
    },
    beforeMount() {
        this.getTweets();

    },
    mounted() {
        setInterval(() => {
            this.getTweets();
        }, 5000);
    },
    methods: {
        getTweets() {
            axios
                .get(`${process.env.VUE_APP_URI}tweet/latest`)
                .then((res) => {
                    this.tweets = res.data.tweets;
                    this.updatedAt = new Date().toLocaleString();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>
.muted {
    color: #aaa;
    font-size: 0.8rem;
}
</style>