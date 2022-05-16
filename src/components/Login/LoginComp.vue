<template>
    <div class="loginComp">
        <v-container>
            <v-row>
                <v-form>
                    <v-text-field
                        label="Email"
                        v-model="email"
                        :rules="[v => !!v || 'Email is required']"
                    ></v-text-field>
                    <v-text-field
                        label="Password"
                        v-model="password"
                        :rules="[v => !!v || 'Password is required']"
                        type="password"
                    ></v-text-field>
                    <v-btn
                        color="primary"
                        @click="login"
                        :disabled="!email || !password"
                    >
                        Login
                    </v-btn>
                </v-form>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "LoginComp",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        login(event) {
            event.preventDefault();
            axios.post(`${process.env.VUE_APP_URI}login/login`, {
                email: this.email,
                password: this.password,
            }).then((res) => {
                localStorage.setItem('token', res.data.token);
                return window.location.href = "/";
            }).catch((err) => {
                console.log(err);
            });
        },
    },
};
</script>