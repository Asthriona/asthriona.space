<template>
    <div class="userSection mt-4" align="center" justify="center">
        <!-- Login / register nav comp switcher -->
        <!-- Login comp -->
        <!-- Register comp -->
        <div class="registerComp" v-if="comp == 'register'">
            <RegisterComp />
            <v-btn @click="comp = 'login'" text>
                <small class="mt-4">I don't have an account!</small>
            </v-btn>
        </div>
        <div class="loginComp" v-else>
            <LoginComp />
            <!-- on click change comp to 'register' -->
            <v-btn @click="comp = 'register'" text>
                <small class="mt-4">I don't have an account!</small>
            </v-btn>
        </div>
        <!-- forgotten password comp -->
    </div>
</template>

<script>
import RegisterComp from '@/components/Login/RegisterComp'
import LoginComp from '@/components/Login/LoginComp'
import axios from 'axios';
export default {
    name: 'userSection',
    data() {
        return {
            comp: '',
            button: '',
        };
    },
    components: {
        RegisterComp,
        LoginComp,
    },
    beforeCreate() {
        if (localStorage.getItem('token')) {
            // check if token is valid
            axios.get(`${process.env.VUE_APP_URI}login/whoami`, {
        headers: { Authorization: localStorage.getItem("token") },
            })
            .then((res) => {
                if (res.data.user) {
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>