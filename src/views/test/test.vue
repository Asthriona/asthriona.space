<template>
  <v-container>
    <v-row class="text-center">
      <h1>Some sort of form.</h1>
      <v-col cols="12">
        <v-form>
          <v-text-field
            v-model="form.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.subject"
            label="Subject"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.message"
            label="Message"
            required
          ></v-text-field>
          <v-btn color="primary" type="submit" @click="submit"> Submit </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: "form",
  data() {
    return {
      alert: {
        type: "",
        text: "",
      },
      user: {},
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    submit(e) {
        e.preventDefault();
      const webhookURL =
        "https://canary.discord.com/api/webhooks/1001213846029086882/AfGGAqMj52l8EsNIhZa-PyVQ_XHx-qZ8nNcY5jhbWX5cW9cYA_7PybjnLKOPu25NoOZF";
      axios.post(webhookURL, {
        content: null,
        embeds: [
          {
            title: `${this.form.subject || "No subject"}`,
            description: `${this.form.message || "no message"}`,
            url: "https://asthriona.space",
            color: 5814783,
            author: {
              name: `${this.form.name || "No name"}`,
            },
            footer: {
              text: "Sent from Asthriona.space",
            },
          },
        ],
        attachments: [],
      })
      .then(() => {
        this.alert.type = "success";
        this.alert.text = "Message sent successfully!";
      })
      .catch((error) => {
        this.alert.type = "error";
        this.alert.text = "Message failed to send!";
        console.log(error.response.status);
      });
    },
  },
};
</script>