<template>
  <div class="register">
    <v-container>
      <v-row v-if="error" align="center" justify="center">
        <v-col cols="12" class="text-center" v-if="error.type">
          <v-alert :type="error.type" icon="mdi-alert-circle">
            <span class="headline">
              <v-icon>mdi-alert-circle</v-icon>
              <span>
                {{ error.message }}
              </span>
            </span>
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-if="success" align="center" justify="center">
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
      <v-row align="center" justify="center">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="displayName"
            :counter="20"
            :rules="[rules.required, rules.min, rules.max]"
            label="Display Name"
            require
          ></v-text-field>
          <v-text-field
            v-model="username"
            :counter="10"
            :rules="[rules.required, rules.min, rules.max]"
            label="Username"
            require
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"
            require
          ></v-text-field>
          <v-text-field
            v-model="password"
            :counter="50"
            :rules="[rules.required, rules.min, rules.password]"
            type="password"
            label="Password"
            attr="new-password"
            require
          ></v-text-field>
          <!-- <v-text-field
            v-model="passwordVerification"
            :counter="50"
            :rules="[rules.required, rules.passwordVerification]"
            type="password"
            label="Password Again..."
            attribute="new-password"
            require
          ></v-text-field> -->
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
  name: "registerPage",
  data() {
    return {
      displayName: "",
      username: "",
      email: "",
      password: "",
      passwordVerification: "",
      terms: false,
      valid: false,
      rules: {
        required: (v) => !!v || "Required",
        min: (v) => (v && v.length >= 3) || "Must be at least 3 characters",
        max: (v) => (v && v.length <= 20) || "Must be less than 20 characters",
        email: (value) =>
  (value && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value)) || "Invalid email",

        password: (value) =>
          (value &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              value
            )) ||
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
        passwordVerification: (v) => (v !== this.password) || "Passwords do not match",
      },
      error: {
        message: "",
        type: "",
      },
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
            this.error.type = "success";
            this.error.message = "You are now logged in, you will be redirected in a second.";
            setTimeout(() => {
              this.$router.push("/");
              return res;
            }, 2000);
          })
          .catch((err) => {
            this.error.message = err.response.data.message;
            this.error.type = "error"
          });
      }
    },
  },
};
</script>
