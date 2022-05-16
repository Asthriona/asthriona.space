<template>
  <div class="Profil">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center">
            <v-avatar size="200">
              <v-img :src="user.avatar"></v-img>
            </v-avatar>
          </div>
        </v-col>
        <v-col cols="12" class="text-center">
          <h1>
            {{ user.displayName }}
            <v-icon
              > {{ user.selectedBadge }} </v-icon
            >
          </h1>
                    <v-icon>mdi-format-quote-open</v-icon>
          {{ user.description }}
        </v-col>
        <v-col cols="12" class="accountName d-flex justify-center">
          <h3>
            <v-icon>mdi-account</v-icon>
            {{ user.username }}#{{ user.discriminator }}
          </h3>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
            <router-link :to="{ name: 'editProfile' }">
                <v-btn text>
                <v-icon>mdi-badge-account</v-icon>
                <span>edit profile</span>
            </v-btn>
            </router-link>
        </v-col>
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
export default {
  name: "OwnProfile",
  data() {
    return {
      user: {},
    };
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_URI}login/whoami`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        this.user = res.data.user;
      });
  },
};
</script>