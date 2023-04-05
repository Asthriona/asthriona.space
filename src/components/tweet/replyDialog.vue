<template>
    <v-container>
        <v-row>
            <v-card
            min-width="100%">
                <v-card-title>
                    <span class="text-h4">Sorry, Not yet working :c</span>
                </v-card-title>
                <!-- <v-card-title>
                    <span>Reply to this Tweet</span>
                  </v-card-title>
                  <v-card-text>
                    <v-textarea v-model="reply" label="Reply" placeholder="What's happening?" outlined rows="5" />
                    <span class="right"><v-btn small outlined @click="tweetReply(tweet._id)">Send!</v-btn></span>
                  </v-card-text> -->
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
export default {
    name: "replyDialog",
    props: ["tweet", "user"],
    data() {
        return {
            reply: "",
        };
    },
    methods: {
        tweetReply(id) {
            axios.post(`${process.env.VUE_APP_URI}tweet/reply/${id}`, {
                content: this.reply,
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }).then((res) => {
                this.$emit("reply", res.data);
                this.reply = "";
                this.dialog = false;
                return res;
            });
        },
    },
};
</script>