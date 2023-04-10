<template>
  <div class="Header">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/"
          ><v-img
            alt="Asthriona Logo"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.asthriona.com/i/2023/04/asthriona%20jp%20dark"
            width="200"
        /></router-link>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-btn text
          ><v-icon>mdi-home</v-icon> Home</v-btn
        ></router-link>
        <v-btn target="_blank" text
          ><a target="_blank" class="noLink" href="https://asthriona.com"
            ><v-icon>mdi-file-account</v-icon> Resume</a
          ></v-btn
        >
        <router-link to="/blog"
          ><v-btn text
            ><v-icon>mdi-book-open-blank-variant</v-icon> Blog</v-btn
          ></router-link
        >
        <router-link to="/about"
          ><v-btn text
            ><v-icon>mdi-information-outline</v-icon> About</v-btn
          ></router-link
        >
      </div>
      <v-spacer></v-spacer>

      <div class="logins" v-if="!user">
        <router-link :to="{ name: 'Login', params: { comp: 'login' } }">
        <v-btn icon target="_blank" text>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </router-link>
      <router-link :to="{ name: 'Login', params: { comp: 'register' } }">
        <v-btn icon target="_blank" text>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </router-link>
      </div>
      <div class="userinfo" v-else>
        <router-link :to="{ name: 'Profile' }">
          <v-btn text>
          <v-avatar size="30" class="mr-2">
            <v-img class="avatarBanned" :src="user.avatar" v-if="user.isBanned"></v-img>
            <v-img  :src="user.avatar" v-else></v-img>
          </v-avatar>
          {{ user.username }}#{{ user.discriminator }} <v-icon>{{ user.selectedBadge }}</v-icon>
        </v-btn>
        </router-link>
          <router-link :to="{ name: 'Admin' }" v-if="user.isAdmin">
            <v-btn text>
              <v-icon>mdi-hammer-wrench</v-icon>
            </v-btn>
          </router-link>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderComp",
  props: ['user'],
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.noLink {
  color: inherit;
  text-decoration: none;
}
</style>