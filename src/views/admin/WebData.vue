<template>
  <div class="WebData">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h1>About Data</h1>
            </v-card-title>
            <v-card-text>
              <v-form @submit="aboutSubmit">
                <v-textarea
                  v-model="about.aboutMe"
                  label="About Me"
                ></v-textarea>
                <v-textarea
                  v-model="about.whoAmI"
                  label="who Am I"
                ></v-textarea>
                <v-textarea
                  v-model="about.personality"
                  label="Personality"
                ></v-textarea>
                <v-textarea
                  v-model="about.interests"
                  label="Interests"
                ></v-textarea>
                <v-textarea
                  v-model="about.learning"
                  label="Learning"
                ></v-textarea>
                <v-text-field
                  v-model="about.profilePict"
                  label="Profile Picture"
                ></v-text-field>
                <v-text-field v-model="about.name" label="Name"></v-text-field>
                <v-text-field
                  v-model="about.email"
                  label="Email"
                ></v-text-field>
                <v-text-field
                  v-model="about.webURL"
                  label="Website"
                ></v-text-field>
                <v-text-field
                  v-model="about.github"
                  label="Github"
                ></v-text-field>
                <v-text-field
                  v-model="about.location"
                  label="Location"
                ></v-text-field>
                <v-btn type="submit">Submit!</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WebData",
  data() {
    return {
      about: {
        website: "asthriona.space",
        aboutMe: "",
        whoAmI: "",
        personality: "",
        interests: "",
        learning: "",
        profilePict: "",
        name: "",
        email: "",
        webURL: "",
        github: "",
        location: "",
      },
    };
  },
  methods: {
    aboutSubmit(e) {
      e.preventDefault();
      axios
        .post(
          `${process.env.VUE_APP_URI}admin/about/asthriona.space`,
          this.about,
          { headers: { Authorization: localStorage.getItem("token") } }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_URI}admin/about/asthriona.space`)
      .then(res => {
        this.about = res.data;
      })
  }
};
</script>