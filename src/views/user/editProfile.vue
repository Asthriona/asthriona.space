<template>
  <div class="editProfile">
    <!-- alerts -->
    <div class="alert" v-if="alert.type">
      <v-alert class="text-center" border="right" :color="alert.type" dark>
        {{ alert.text }}
      </v-alert>
    </div>
    <!-- end alerts -->
    <v-container>
      <v-row>
        <v-col cols="3" cols-sm="12">
          <v-card title="Update Avatar" max-width="240">
            <v-img :src="user.avatar"></v-img>
            <v-card-text>
              <v-form>
                <!-- upload file -->
                <v-file-input
                  v-model="file"
                  label="Upload a new avatar"
                  prepend-icon="mdi-camera"
                  color="primary"
                ></v-file-input>
                <!-- <v-text-field
                  v-model="file"
                  label="https://imgup.asthriona.com/i/eWI5UmUgsO"
                ></v-text-field> -->
                <v-btn color="primary" @click="updateAvatar">Update</v-btn>
                <br />
                <small
                  >For now we cannot store your avatar for you. you will have to
                  upload it somewhere and past the link. you can use
                  <a
                    href="https://imgup.asthriona.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Asthriona imgup</a
                  >
                  or
                  <a
                    href="https://imgur.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    >imgur</a
                  >
                  for exemple.</small
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card title="Update profile">
            <v-card-title>
              Edit profile
              </v-card-title>
              <v-form>
                <v-text-field
                  v-model="form.username"
                  :counter="10"
                  label="Username"
                  :placeholder="user.username"
                ></v-text-field>
                <v-text-field
                  v-model="form.displayName"
                  :counter="10"
                  label="Display Name"
                  :placeholder="user.displayName"
                >
                </v-text-field>
                <v-text-field
                  v-model="form.description"
                  :counter="140"
                  label="Description"
                  :placeholder="user.description"
                  value="user.description"
                ></v-text-field>
                <v-text-field
                  v-model="form.discriminator"
                  :counter="4"
                  type="number"
                  :label="'#' + user.discriminator"
                  :placeholder="user.discriminator"
                  :disabled="!user.isAdmin"
                ></v-text-field>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-information</v-icon>
                  </template>
                  <span
                    >Users Discriminator cannot be changed at the moment by
                    users. <br />
                    Please contact an admin if you want a custom one.</span
                  >
                </v-tooltip>
                <v-btn color="primary" @click="updateProfile"> Update </v-btn>
              </v-form>
          </v-card>
        </v-col>
        <v-col cols="3" v-if="user.isAdmin || user.isVerified">
          <v-card title="Choose Badge">
            <v-card-text>
              <v-form>
                <v-select
                  v-model="selectedBadge"
                  :items="badges"
                  label="Badge"
                  :disabled="!user.isAdmin"></v-select>
                <v-btn color="primary" @click="updateBadge"> Update </v-btn>
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
  name: "Edit-profile",
  data() {
    return {
      user: {},
      form: {},
      badges: [],
      selectedBadge: {},
      file: null,
      alert: {
        type: "",
        text: "",
      },
    };
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_URI}login/whoami`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        this.user = response.data.user;
        if (this.user.isVerified) {
          this.badges.push({
            text: "Verified",
            value: "mdi-check-decagram-outline",
          });
        }
        if (this.user.isAdmin) {
          this.badges.push({
            text: "Admin",
            value: "mdi-shield-crown",
          });
        }
        if (this.user.isAdmin) {
          this.badges.push({
            text: "Moderator",
            value: "mdi-shield-crown-outline",
          });
        }
        this.selectedBadge = this.user.selectedBadge;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    updateAvatar(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("avatar", this.file);
      axios.post(`${process.env.VUE_APP_URI}profile/update/avatar`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        this.alert.type = "success";
        this.alert.text = "Avatar updated";
        // emit event to update avatar in app.vue
        this.$emit("updateUser");
      }).catch((error) => {
        console.log(error);
        this.alert.type = "error";
        this.alert.text = error.response.data.message;
      });
    },
    updateProfile(e) {
      e.preventDefault();
      const updateForm = {
        username: this.form.username || this.user.username,
        displayName: this.form.displayName || this.user.displayName,
        description: this.form.description || this.user.description || "",
        discriminator: this.form.discriminator || this.user.discriminator,
      };
      console.log(updateForm);
      axios
        .post(`${process.env.VUE_APP_URI}profile/update`, updateForm, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          this.alert.text = res.data.message;
          this.alert.type = "success";
          this.user.username = this.form.username;
          this.user.displayName = this.form.displayName;
          this.user.description = this.form.description;
          this.user.email = this.form.email;
          this.user.discriminator = this.form.discriminator;
          this.form = {};
          this.$emit("updateUser");
        })
        .catch((err) => {
          this.alert.text = `${err.response.status || "500"} - ${
            err.response.data.message || "Internal Server Error"
          }`;
          this.alert.type = "error";
        });
    },
    updateBadge() {
      axios
        .post(
          `${process.env.VUE_APP_URI}profile/update/badge`,
          {
            badge: this.selectedBadge,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.user.badge = res.data.badge;
          this.selectedBadge = "";
        })
        .catch((err) => {
          this.alert.text = `${err.response.status || "500"} - ${
            err.response.data.message || "Internal Server Error"
          }`;
          this.alert.type = "error";
        });
    },
  },
};
</script>