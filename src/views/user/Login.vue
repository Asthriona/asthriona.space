<template>
    <div class="userSection">
        <!-- Login / register nav comp switcher -->
        <!-- Login comp -->
        <!-- Register comp -->
        <div class="registerComp" v-if="comp == 'register'">
            <RegisterComp />
            <v-btn @click="comp = 'login'" text>
                <small>I don't have an account!</small>
            </v-btn>
        </div>
        <div class="loginComp" v-else>
            <LoginComp />
            <!-- on click change comp to 'register' -->
            <v-btn @click="comp = 'register'" text>
                <small>I don't have an account!</small>
            </v-btn>
        </div>
        <!-- forgotten password comp -->
    </div>
</template>

<script>
import RegisterComp from '@/components/Login/RegisterComp'
import LoginComp from '@/components/Login/LoginComp'
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
}
</script>