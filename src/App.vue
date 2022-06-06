<template>
  <div class="app">
    <div class="isOffline" v-if="isOnline == false">
    <v-app dark>
      <!-- center text middle of the screen -->
      <div class="offline">
        <h1 class="text-center">
          This website is still under construction.
        </h1>
        <h1 class="text-center">
          Please check back later.
        </h1>
      </div>
      </v-app>
    </div>
    <div class="isOnline" v-else>
      <v-app dark>
   <TheHeader :user="user" />
    <div class="GateWayError text-center" v-if="gatewayError == true">
      <span>
        <h1>Oops! Seems like Asthriona's gateway is down...</h1>
        <p>All major feature wont be availiable.</p>
      </span>
    </div>
   <BanComp :user="user" v-if="user && user.isBanned"/>
    <v-main dark>
      <router-view :user="user" />
    </v-main>
    <TheFooter />
  </v-app>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TheHeader from '@/components/PageComp/TheHeader.vue'
import TheFooter from '@/components/PageComp/TheFooter.vue'
import BanComp from '@/components/users/banComp.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    BanComp,
    TheFooter,
  },
  data: () => ({
    user: {},
    gatewayError: false,
    isOnline: false,
  }),
  created() {
    axios.get(`${process.env.VUE_APP_URI}login/whoami`, { headers: { 'Authorization': localStorage.getItem('token')}})
    .then((res) => {
      if(res.data.msg == 'Invalid token'){
        return this.user = null;
      }
      if(!res.data.user) {
        this.user = null;
      }
      if(res.data.user) {
        this.user = res.data.user;
      }

    })
    .catch(() => {
      this.user = null;
      this.gatewayError = true;
    })
    // vuetify darkmode
    this.$vuetify.theme.dark = true;  
  },
};
</script>

<style scoped>
/* google font roboto*/
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');
.GateWayError {
  /* banner under navbar */
  background-color: #f44336;
  color: #fff;
  margin-top: 4rem;
}
html, body {
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  background-color: #333;
  color: #fff;
}
.offline {
  /* font roboto */
  font-family: 'Roboto', sans-serif;
  text-align: center;
  position: relative;
  margin-top: 20%;
  transform: translateY(-50%);
}
</style>

<style>
.avatarBanned {
  filter: grayscale(100%);
}
</style>