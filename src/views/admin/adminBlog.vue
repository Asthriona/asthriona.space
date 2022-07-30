<template>
    <div class="BlogAdminHome">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-btn text><router-link to="/admin/blog/create">
                    New Post</router-link></v-btn>
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
                <v-col 
                v-for="post in posts" :key="post.id"
                xs="12"
                sm="6"
                md="6"
                lg="5"
                xl="4">
                    <v-card 
                    elevation="4"
                    class="mt-4 mb-4"
                    >
                    <v-img 
                    height="250"
                    :src="post.image"></v-img>
                    <v-card-title>
                        {{ post.title }}
                    </v-card-title>
                    <v-card-text>
                        {{ post.description }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        color="primary"
                        class="ml-4 mr-1 mb-2"
                        @click="postRedirect(post.slug)">
                        Read</v-btn>
                        <v-btn
                        color="warning"
                        class="ml-1 mr-1 mb-2"
                        @click="postEdit(post.slug)"
                        >Edit</v-btn>
                        <v-btn
                        color="error"
                        class="ml-1 mr-1 mb-2"
                        @click="deletePost(post.slug)"
                        >Delete</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminBlog',
    props: ['user'],
    data() {
        return {
            posts: [],
            postsLoading: true,
            alert: {
                type: '',
                text: '',
                show: false
            }
        }
    },
    onCreated() {
        this.postsLoading = true;
    },
    mounted() {
        axios.get(`${process.env.VUE_APP_URI}blog/posts/asthriona.space/admin`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(res => {
            const noImageCheck = res.data;
            let posts = [];
            noImageCheck.forEach(post => {
                if(!post.image.startsWith("http" || "https")) {
                    post.image = "https://picsum.photos/900/250"
                    posts.push(post);
                }else {
                    posts.push(post);
                }
            })
            
            this.posts = posts;
            this.postsLoading = false;
        })
    },
    methods: {
        postRedirect(slug) {
            this.$router.push(`/blog/${slug}`);
        },
        postEdit(slug) {
            this.$router.push(`/admin/blog/update/${slug}`);
        },
        deletePost(slug) {
            axios.delete(`${process.env.VUE_APP_URI}blog/posts/asthriona.space/${slug}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(res => {
                if(res.data.status === 1) {
                    this.alert.type = 'success';
                    this.alert.text = res.data.message;
                    this.alert.show = true;
                    this.posts = this.posts.filter(post => post.slug !== slug);
                } else {
                    this.alert.type = 'error';
                    this.alert.text = res.data.message + '<br>' + res.data.error;
                    this.alert.show = true;
                    console.log(`else error: ${res.data.error}`);
                }
            })
            .catch(err => {
                this.alert.type = 'error';
                this.alert.text = err.response.data.error;
                this.alert.show = true;
            })
        }
    },
}
</script>