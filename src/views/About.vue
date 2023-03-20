<template>
<!-- for later:
Make this page dynamic.
Profile picture will be linked to my account
Location, mail, website, github, name and text will be defined in admin zone. -->
  <div class="about">
    <v-container>
      <v-row>
        <!-- about me page -->
  <v-col cols="12">
            <div class="head-banner">
        <v-col cols="12" class="avatar d-flex justify-center">
          <v-avatar size="250">
            <v-img
              :src="about.profilePict"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col class="name d-flex justify-center" cols="12">
          <span class="display-1">{{ about.name }}</span>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <span class="location subheading">
            <v-icon>mdi-map-marker</v-icon>
            <span>{{ about.location }}</span>
          </span>
        </v-col>
        <v-col cols="12" class="Contacts d-flex justify-center">
          <span class="emails subheading">
            <v-icon>mdi-email</v-icon>
            <span>
              <a class="noLink" :href="`mailto:${about.email}`">
                {{ about.email }}</a
              >
            </span>
          </span>
          <span class="websites subheading">
            <v-icon>mdi-web</v-icon>
            <span>
              <a class="noLink" :href="about.webURL">{{ about.webURL }}</a>
            </span>
          </span>
          <span class="github subheading">
            <v-icon>mdi-github</v-icon>
            <span>
              <a class="noLink" :href="`https://github.com/${about.github}`">
                github.com/{{ about.github }}</a
              >
            </span>
          </span>
        </v-col>
        </div>
  </v-col>
        <v-card
          class="mx-auto"
          max-width="1000"
          outlined
          shaped>
          <v-card-title><v-icon>mdi-information</v-icon>About Me</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div>
                <b>Welcome to Asthriona.space!</b> <br />
                {{ about.aboutMe }}
              </div>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card
          class="mx-auto mt-4"
          max-width="1000"
          outlined
          shaped>
          <v-card-title><v-icon>mdi-information</v-icon>Who am I?</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div>
                {{ about.whoAmI }}
              </div>
            </v-row>
          </v-card-text>
        </v-card>
                <v-card
          class="mx-auto mt-4"
          max-width="1000"
          outlined
          shaped>
          <v-card-title><v-icon>mdi-information</v-icon>What's my personality like?</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div>
                {{ about.personality }}
              </div>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card
          class="mx-auto mt-4"
          max-width="1000"
          outlined
          shaped>
          <v-card-title><v-icon>mdi-information</v-icon>learning anything new?</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div>
                {{ about.learning }}
              </div>
            </v-row>
          </v-card-text>
        </v-card>
        <!-- end about me page -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AboutPage',
  data() {
    return {
      about: {}
    }
  },
    created() {
      axios.get(`${process.env.VUE_APP_URI}admin/about/asthriona.space`)
      .then(res => {
        this.about = res.data
      })
    },
}
</script>

<style scoped>
.subheading {
  margin-left: 1rem;
  margin-right: 1rem;
}
.noLink {
  text-decoration: none;
  color: inherit;
}
.head-banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-image: url(); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>