import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyCkEV52hzLPXNTV773tJeeKkFhZDo0BfLQ",
  projectId: "sms-estra",
  authDomain: "sms-estra.firebaseapp.com",
  databaseURL: "https://sms-estra.firebaseio.com",
  storageBucket: "sms-estra.appspot.com"
}

firebase.initializeApp(config)

export default firebase

new Vue({
  render: h => h(App),
}).$mount('#app')
