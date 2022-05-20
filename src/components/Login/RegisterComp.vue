<template>
  <div class="register">
    <v-container>
      <v-row v-if="error">
        <v-col cols="12" class="text-center">
          <v-alert type="error" icon="mdi-alert-circle">
            <span class="headline">
              <v-icon>mdi-alert-circle</v-icon>
              <span>
                {{ error }}
              </span>
            </span>
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-if="success">
        <v-col cols="12" class="text-center">
          <v-alert type="success" icon="mdi-check-circle">
            <span class="headline">
              <v-icon>mdi-check-circle</v-icon>
              <span>
                Your account has been created! <br />
                Please check your mailbox to verify your email!
              </span>
            </span>
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="displayName"
            :counter="10"
            :rules="DisplayNameRule"
            label="Display Name"
            require
          ></v-text-field>
          <v-text-field
            v-model="username"
            :counter="10"
            :rules="usernameRule"
            label="Username"
            require
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRule"
            label="Email"
            require
          ></v-text-field>
          <v-text-field
            v-model="password"
            :counter="50"
            :rules="passwordRule"
            type="password"
            label="Password"
            attr="new-password"
            require
          ></v-text-field>
          <v-text-field
            v-model="passwordVerification"
            :counter="50"
            :rules="passwordVerificationRule"
            type="password"
            label="Password Again..."
            attribute="new-password"
            require
          ></v-text-field>
          <v-checkbox v-model="terms">
            <template v-slot:label>
              <div @click.stop="">
                I accept the Terms of Service, and I have read the Privacy
                policy
              </div>
            </template>
          </v-checkbox>
          <v-btn color="primary" @click="register" :disabled="!valid && !terms">
            Register
          </v-btn>
        </v-form>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "register",
  data() {
    return {
      displayName: "",
      username: "",
      email: "",
      password: "",
      passwordVerification: "",
      terms: false,
      valid: false,
      DisplayNameRule: [
        (v) => !!v,
        "Display Name is required",
        (v) =>
          (v && v.length <= 10) ||
          "Display Name must be less than 10 characters",
      ],
      usernameRule: [
        (v) => !!v,
        "Username is required",
        (v) => v && v.length <= 10,
        "Username must be less than 10 characters",
      ],
      emailRule: [
        (v) => !!v,
        "Email is required",
        (v) => /.+@.+\..+/.test(v),
        "Email must be valid",
      ],
      passwordRule: [
        (v) => !!v,
        "Password is required",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&<>]{8,}$/.test(
            v
          ) ||
          "Password must be at least 8 characters, and contain at least one number, one uppercase letter and one special character",
      ],
      passwordVerificationRule: [
        (v) => !!v,
        "Password is required",
        (v) => v && v === this.password,
        "Passwords must match",
      ],
      error: "",
      success: "",
    };
  },
  methods: {
    register() {
      if (this.valid) {
        axios
          .post(`${process.env.VUE_APP_URI}login/register`, {
            displayName: this.displayName,
            username: this.username,
            email: this.email,
            password: this.password,
            passwordVerification: this.passwordVerification,
            terms: this.terms,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            this.error = err.response.data.message;
            console.log(err.response.data);
          });
      }
    },
  },
};
</script>