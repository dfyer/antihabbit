<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!--HelloWorld msg="Welcome to Your Vue.js App"/-->

    <!--Add buttons to initiate auth sequence and sign out-->
    <!--
    <button id="authorize_button" style="display: none;">Authorize</button>
    <button id="signout_button" style="display: none;">Sign Out</button>
    -->

    <div>
      <button id="authorize_button" v-on:click="handleAuthClick()">Sign In</button>
      <button id="signout_button" v-on:click="handleSignoutClick()">Sign Out</button>
    </div>
    <div>
      <span>Sheet ID: </span><input v-model="spreadsheetId">
      <button id="fetch_button" v-on:click="fetchSpreadsheet()">Fetch</button>
    </div>
    <div>
      {{status}}
    </div>

    <Summary :dates="dates" :totals="totals" />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Summary from '@/components/Summary.vue'

export default {
  name: 'home',
  components: {
    //HelloWorld,
    Summary,
  },
  data () {
    return {
      spreadsheetId: '1YhUfnvvVTFAU9DOvKn_ufAPl6cV7642pqSsPJ1qifr0',
      status: 'Connecting',
      dates: '',
      totals: '',
    }
  },
  methods: {
    initClient() {
    },
    handleAuthClick(event) {
      this.$gapi.login();
    },
    handleSignoutClick(event) {
      this.$gapi.logout();
    },
    fetchSpreadsheet() {
      let self = this;
      this.$gapi.getGapiClient()
        .then(gapi => {
          gapi.client.sheets.spreadsheets.values.batchGet({
            'spreadsheetId': self.spreadsheetId,
            'majorDimension': 'COLUMNS',
            'ranges': 'A6:G371',
          }).then(function(response) {
            let json = JSON.parse(response.body);
            self.dates = json.valueRanges[0].values[0];  // A Column
            self.totals = json.valueRanges[0].values[1];  // B Column
            self.status = 'Complete';
          });
      })
    },
  },
  mounted() {
    setTimeout(function() {
      this.status = 'Loading'
      this.fetchSpreadsheet()
    }.bind(this), 1000);
  },
}
</script>
