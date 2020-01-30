import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePapaParse from 'vue-papa-parse'
import VueGAPI from "vue-gapi";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// create the 'options' object
const apiConfig = {
  apiKey: "AIzaSyAzYr6tnsn-JZSBwwZJdmZhrKSWwsrZ3wM",
  clientId: "932639527247-t5415ba5emiooe6silboa7le53ns9bnr.apps.googleusercontent.com",
  discoveryDocs: [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ],
  scope: "https://www.googleapis.com/auth/spreadsheets",
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

Vue.use(VuePapaParse)

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig);
