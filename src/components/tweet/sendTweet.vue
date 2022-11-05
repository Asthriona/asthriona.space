<template>
    <div class="composeTweet">
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="8">
                    <v-form @submit="sendTweet()" v-model="valid" lazy-validation>
                    <v-text-field
                        v-model="tweet"
                        :counter="280"
                        :rules="[rules.required, rules.min, rules.max]"
                        :placeholder="`What's up ${user.displayName}?`"
                        require
                    ></v-text-field>
                    <v-btn color="primary" @click="sendTweet()" :disabled="!valid">
                        Tweet
                    </v-btn>
                </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "composeTweet",
    props: ["user"],
    data() {
        return { 
            tweet: "",
            valid: false,
            rules: {
                min: v => v.length >= 0 || 'Min 1 characters',
                max: v => v.length <= 280 || 'Max 280 characters',
            },
        }
    },
    methods: {
        sendTweet() {
            if(!this.tweet) return;
            if (this.valid) {
                axios.post(`${process.env.VUE_APP_URI}tweet/`, {
                    content: this.tweet,
                }, {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                })
                .then((res) => {
                    this.tweet = "";
                    // remove focus from text field
                    return res;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            }else {
                alert('Please fill out the form');
            }
        }
    }
}
</script>