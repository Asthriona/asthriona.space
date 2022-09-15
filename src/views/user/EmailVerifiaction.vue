<template>
    <div class="emailVerification">
        <v-container>
            <v-row v-if="loading == true">
                <v-col cols="12" class="text-center">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-col>
            </v-row>
            <v-row v-if="loading == false && verified == true">
                <v-col cols="12" class="text-center">
                    <v-alert type="success" icon="mdi-check-circle">
                        <span class="headline">
                            <v-icon>mdi-check-circle</v-icon>
                            <span>
                                Your email has been verified! <br>
                                You may now login into your account!
                            </span>
                        </span>
                    </v-alert>
                </v-col>
            </v-row>
            <v-row v-if="loading == false && verified == false">
                <v-col cols="12" class="text-center">
                    <v-alert type="error" icon="mdi-alert-circle">
                        <span class="headline">
                            <v-icon>mdi-alert-circle</v-icon>
                            <span>
                                Your email has not been verified! <br>
                                {{ message }}
                            </span>
                        </span>
                    </v-alert>
                </v-col>
            </v-row>
            <v-row v-if="error">
                <v-col cols="12" class="text-center">
                    <v-alert type="error" icon="mdi-alert-circle">
                        <span class="headline">
                            <v-icon>mdi-alert-circle</v-icon>
                            <span>
                                {{ error }}
                            </span>
                        </span>
                    </v-alert>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'emailVerification',
    data() {
        return {
            emailToken: this.$route.query.token,
            isUpdate: this.$route.query.update,
            email: this.$route.query.email,
            loading: true,
            verified: false,
            error: '',
            message: ''
        }
    },
    mounted() {
        this.loading = true
        let body;
        if(this.isUpdate){
            body = {
                token: this.emailToken,
                email: this.email,
                update: true
            }
            }else {
                body = {
                    emailToken: this.emailToken,
                    update: false
                }
            }
        axios.post(`${process.env.VUE_APP_URI}login/verify-email`, {
            body

        }).then((res) => {
            this.loading = false
            this.verified = true
            console.log(res.data)
        }).catch(err => {
            this.loading = false
            this.verified = false
            this.error = err.message
            this.message = err.response.data.message
        })
    },
}
</script>