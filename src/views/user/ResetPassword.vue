<template>
    <div class="reset-password">
        <div class="loading" v-if="loading == true">
            <h1 class="text--red">{{ this.alert || "TEST" }}</h1>
            <span class="headline">
                Checking stuff with the server...
            </span>
            <span>
                Please hold on...
            </span>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <div class="passwd" v-else>
            <span class="headline">
                Reset Password
            </span>
            <span>
                Hello {{ user.username }}, so you lost your password uh?
            </span>
            <v-form>
                <v-text-field
                    v-model="user.password"
                    label="Password"
                    type="password"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="user.password2"
                    label="Confirm Password"
                    type="password"
                    required
                ></v-text-field>
                <v-btn
                    color="primary"
                    @click="resetPassword"
                >Reset Password</v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ResetPassword',
    data() {
        return {
            loading: true
        }
    },
    beforeMount() {
        this.loading = true
        axios.get(`${process.env.VUE_APP_URI}login/resetpw/${this.$route.params.token}`)
        .then(res => {
            console.log(res.data)
            this.user = res.data.user
            this.loading = false
        })
        .catch((err) => {
            console.log(err)
            this.alert = {
                type: 'error',
                message: 'Something went wrong, please try again later'
            }
        })
    },
}
</script>