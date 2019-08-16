<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>C S : G O </span>
        <span class="font-weight-light">League</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn v-if="currentUser"
              color="white"
              :outlined="true"
              :minWidth="150"
              :minHeight="50"
              @click="logout"
            >LOGOUT</v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
const fb = require('./firebaseConfig');
import { mapState } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    
  }),
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    logout() {
      fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/login')
      })
    }
  }
};
</script>
