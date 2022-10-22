<template>
  <div class="app">
    <v-app dark>
      <TheHeader :user="user" />
      <div class="GateWayError text-center" v-if="gatewayError == true">
        <span>
          <h1>Oops! Seems like Asthriona's gateway is down...</h1>
          <p>All major feature wont be availiable.</p>
        </span>
      </div>
      <BanComp :user="user" v-if="user && user.isBanned" />
      <v-main dark>
        <router-view @updateUser="updateUser" :user="user" />
      </v-main>
      <TheFooter />
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import TheHeader from "@/components/PageComp/TheHeader.vue";
import TheFooter from "@/components/PageComp/TheFooter.vue";
import BanComp from "@/components/users/banComp.vue";
export default {
  name: "App",
  components: {
    TheHeader,
    BanComp,
    TheFooter,
  },
  data: () => ({
    user: {},
    gatewayError: false
  }),
  created() {
    this.getUser();
    setInterval(() => {
      console.log("Checking for user changes...");
      this.getUser();
    }, 10000);
    // vuetify darkmode
    this.$vuetify.theme.dark = true;
  },
  methods: {
    getUser() {
      axios
      .get(`${process.env.VUE_APP_URI}login/whoami`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.msg == "Invalid token") {
          return (this.user = null);
        }
        if (!res.data.user) {
          this.user = null;
        }
        if (res.data.user) {
          this.user = res.data.user;
        }
      })
      .catch(() => {
        this.user = null;
        this.gatewayError = true;
      });
    },
    updateUser() {
      axios
        .get(`${process.env.VUE_APP_URI}login/whoami`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          this.user = res.data.user;
          console.log("User updated... refreshing...");
          // this.$router.go();
        })
        .catch(() => {
          this.user = null;
          this.gatewayError = true;
        });
    }
  }
};
</script>

<style scoped>
/* google font roboto*/
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
.GateWayError {
  /* banner under navbar */
  background-color: #f44336;
  color: #fff;
  margin-top: 4rem;
}
</style>

<style>
.avatarBanned {
  filter: grayscale(100%);
}
</style>