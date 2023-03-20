<template>
    <v-container class="reset-request">
        <v-row>
            <v-col cols="6" class="alert" v-if="alert.message">
                <v-alert :type="alert.type">
                    {{ alert.message }}
                </v-alert>
            </v-col>
            <v-col cols="12">
                <h1>Reset Password</h1>
                <v-form>
                    <v-text-field
                        v-model="email"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-btn
                        color="primary"
                        @click="resetPassword"
                    >Reset Password</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ResetPasswordRequest',
    data() {
        return {
            email: '',
            alert: {}
        }
    },
    methods: {
        resetPassword() {
            axios.post(`${process.env.VUE_APP_URI}login/resetpw-request`, {
                email: this.email
            })
            .then(res => {
                console.log(res.data)
                if(res.data.msg == "No email provided"){
                    return this.alert = {
                        type: 'warning',
                        message: 'Please enter your email address'
                    }
                }
                else {
                    this.alert = {
                    type: 'success',
                    message: res.data.message
                }
                }
            })
            .catch((err) => {
                console.log(err)
                this.alert = {
                    type: 'error',
                    message: "An error occurred. Please try again later."
                }
            })
        }
    },
    }
</script>