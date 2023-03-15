<template>
    <div class="blogUpdate">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <span class="display-4">
                        <v-icon left>mdi-pencil-outline</v-icon>
                        Update post: {{ post.title }}
                    </span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-alert
                    v-model="alert.show"
                    close-text="Oki doki :c"
                    :color="alert.type || 'info'"
                    dark
                    dismissible>
                        {{ alert.text }}
                    </v-alert>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <!-- title -->
                        <v-text-field
                        v-model="post.title"
                        :counter="100"
                        :rules="titleRules"
                        label="title"
                        required
                        ></v-text-field>
                        <!-- description -->
                        <v-textarea
                        v-model="post.description"
                        :rules="descriptionRules"
                        label="Description"
                        required></v-textarea>
                        <!-- content Markdown -->
                        <v-textarea
                        v-model="post.markdown"
                        :rules="contentRules"
                        label="Content"
                        required></v-textarea>
                        <!-- Image -->
                        <v-text-field
                        v-model="post.image"
                        label="Image"
                        :rules="imgRules"
                        required
                        ></v-text-field>
                        <v-switch
                        v-model="post.isPosted"
                        label="Post now?"
                        flat></v-switch>
                        <v-btn color="primary"
                        @click="submit"
                        :disabled="!valid"
                        >Submit</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "BlogUpdate",
    props: ["user"],
    data() {
        return {
            alert: {
                show: false,
                type: "",
                text: ""
            },
            post: {},
            valid: false,
            titleRules: [
                v => !!v || "Title is required",
                v => v.length < 100 || "Title must be less than 100 characters"
            ],
            contentRules: [v => !!v || "Content is required"],
            imgRules: [v => !!v || "Image is required"],
            descriptionRules: [v => !!v || "Description is required"],

        }
    },
    mounted() {
        axios.get(`${process.env.VUE_APP_URI}blog/posts/asthriona.space/${this.$route.params.slug}`, { headers: { 'Authorization': localStorage.getItem('token')}}).then((res) => {
            this.post = res.data;
        });
    },
    methods: {
        submit(e) {
            e.preventDefault();
            if(this.valid) {
                axios.put(`${process.env.VUE_APP_URI}blog/posts/asthriona.space/${this.$route.params.slug}`, {
                    website: 'asthriona.space',
                    title: this.post.title,
                    description: this.post.description,
                    markdown: this.post.markdown,
                    image: this.post.image,
                    keywords: this.post.keywords,
                    tags: this.post.tags,
                    isPosted: this.post.isPosted,
                    authorId: this.post.authorId
                }, { headers: { 'Authorization': localStorage.getItem('token')}}).then(() => {
                    // this.$router.push("/blog");
                    this.alert = {
                        type: 'success',
                        text: 'Post updated successfully',
                        show: true
                    }
                }).catch((err) => {
                    this.alert = {
                        type: 'error',
                        text: 'Error updating post',
                        show: true
                    }
                    console.log(err.response);
                })
            }
        }
    }
}
</script>