<template>
  <div class="Profil">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center">
            <v-avatar size="200">
              <v-img :src="user.avatar" class="avatarBanned" v-if="user.isBanned"></v-img>
              <v-img :src="user.avatar" v-else></v-img>
            </v-avatar>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <h1>
            {{ user.displayName }}
            <v-icon
              > {{ user.selectedBadge }} </v-icon
            >
          </h1>
        </v-col>
        <v-col cols="12" class="accountName d-flex justify-center">
          <h3>
            <v-icon>mdi-account</v-icon>
            {{ user.username }}#{{ user.discriminator }}
          </h3>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
        </v-col>
        <!-- Admin Widget -->
        <div class="admin d-flex justify-center" v-if="myself.isAdmin">
        <AdminWidget :user="user" :myself="myself"/>
        </div>
      </v-row>
      <v-row>
          <v-col cols="12" class="d-flex justify-center">
              <h1>User has no content yet.</h1>
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import AdminWidget from "../../components/Admin/profileWidget.vue"
export default {
  name: "UserProfile",
  components: {
    AdminWidget
  },
  data() {
    return {
      user: {},
      myself: {},
    };
  },
  created() {
      axios.get(`${process.env.VUE_APP_URI}login/whoami`, { headers: { Authorization: localStorage.getItem("token")} })
      .then(res => {
          this.myself = res.data.user;
      });
    axios
      .get(`${process.env.VUE_APP_URI}profile/user/${this.$route.params.username}`)
      .then((res) => {
          console.log(res.data)
        this.user = res.data;
      });
  },
};
</script>