<template>
    <div class="tweetHome">
        <div class="tweet" v-for="tweet in tweets" :key="tweet.id">
        <div class="author">
            <v-avatar>
                <v-img :src="tweet.author.avatar"></v-img>
            </v-avatar>
            <div class="author-name">
                <span>{{ tweet.author.displayName }}</span>#
                <span>{{ tweet.author.discriminator }}</span> <br>
                <small>@{{tweet.author.username}}</small>

            </div>
            <div class="tweetContent">
                <span>{{ tweet.content }}</span>
            </div>
            <div class="tweetInfo">
                <span>{{ tweet.createdAt }}</span>
                <!-- <span>{{ tweet.likes.length || 0 }}</span>
                <span>{{ tweet.retweets.length || 0 }}</span> -->
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "tweetHome",
    props: ["user"],
    data() {
        return {
            tweets: [],
        };
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
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}
</script>