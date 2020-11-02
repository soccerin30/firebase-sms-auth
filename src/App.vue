<template>
  <div id="app">
    <input type="tel" v-model="phoneNumber" placeholder="電話番号" />
    <p>{{ fixedPhoneNumber }}</p>
    <div id="recaptcha-container" />
    <button @click="sendMessage()">送信</button>
    <input type="number" v-model="verificationCode" placeholder="確認コード" />
    <button @click="confirmMessage()">送信</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      phoneNumber: null,
      recaptchaVerifier: null,
      recaptchaWidgetId: null,
      confirmationResult: null,
      verificationCode: null,
    };
  },
  computed: {
    fixedPhoneNumber() {
      if (this.phoneNumber) {
        return "+81" + this.phoneNumber.slice(1);
      }
      return "";
    },
  },
  methods: {
    async sendMessage() {
      try {
        this.confirmationResult = await firebase
          .auth()
          .signInWithPhoneNumber(this.fixedPhoneNumber, this.recaptchaVerifier);
        console.log(this.confirmationResult);
      } catch (e) {
        console.log(e);
      }
    },
    async confirmMessage() {
      if (this.confirmationResult && this.verificationCode) {
        try {
          const result = await this.confirmationResult.confirm(
            this.verificationCode
          );
          const user = result.user;
          console.log(user);
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
  async mounted() {
    this.recaptchaVerifier = window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (responseToken) => {
          console.log(responseToken);
        },
      }
    );
    this.recaptchaWidgetId = await this.recaptchaVerifier.render();
  },
};
</script>
