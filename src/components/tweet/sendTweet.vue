<template>
    <div class="composeTweet">
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="8">
                    <v-alert :type="alert.type" v-if="alert.message">
                    {{ alert.message }}
                    </v-alert>
                    <v-form @submit="uploadMedia" v-model="valid" lazy-validation>
                        <v-text-field v-model="tweet" :counter="280" :rules="[rules.required, rules.min, rules.max]"
                            :placeholder="`What's up ${user.displayName}?`" require />
                        <v-form>
                            <!-- upload file avatar -->
                            <v-file-input v-model="file" label="Upload a media" prepend-icon="mdi-camera"
                                color="primary"></v-file-input>
                            <v-btn @click="uploadMedia">Send</v-btn>
                        </v-form>
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
            file: null,
            uploadProgress: 0,
            valid: false,
            alert: {
                message: null,
                type: null,
            },
            rules: {
                min: v => v.length >= 0 || 'Min 1 characters',
                max: v => v.length <= 280 || 'Max 280 characters',
            },
        }
    },
    methods: {
        uploadMedia(event) {
            console.log(this.file)
            if(this.file !== null) {
                event.preventDefault();
                console.log(this.file)
                const formData = new FormData();
                formData.append("file", this.file);
                console.log("lol?")
            axios.post(`${process.env.VUE_APP_URI}tweet/media`, formData, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => {
                console.log(res.data)
                this.sendTweet(res.data.media.id);
            }).catch((error) => {
                console.log(error.response.data);
            });
            // this.sendTweet(res.data.);
            } else {
                console.log("Sending with no files.")
                this.sendTweet(null);
            }
        },
        sendTweet(media) {
            console.log(this.tweet)
            if (this.valid && this.media !== "") {
                axios.post(`${process.env.VUE_APP_URI}tweet/`, {
                    content: this.tweet,
                    media: [media]
                }, {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                })
                    .then((res) => {
                        this.tweet = "";
                        this.file = null;
                        // remove focus from text field
                        this.$refs.tweet.blur();

                        return res;
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
            } else if(this.valid && this.media === null){
                console.log(media)
                axios.post(`${process.env.VUE_APP_URI}tweet/`, {
                    content: this.tweet,
                    media: media ? [media] : [null]
                }, {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                })
                    .then((res) => {
                        this.tweet = "";
                        this.file = null;
                        // remove focus from text field
                        this.$refs.tweet.blur();

                        return res;
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
            } else {
                alert('Please fill out the form');
            }
        }
    }
}
</script>