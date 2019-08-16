<template>
  <v-app>
      <v-app-bar absolute app dark flat>
        <v-toolbar-title class="headline text-uppercase">
          <span>C S : G O</span>
          <span class="font-weight-light"> League</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items color="#303030" exact>
          <v-btn text :to="{name: 'Home'}" exact>Home</v-btn>
          <v-btn text :to="{ name: 'Players'}" exact>Players</v-btn>
          <v-btn text exact>Teams</v-btn>
          <v-btn text exact>Auction</v-btn>
          <v-btn text :to="{ name: 'Announcements' }" exact>Announcements</v-btn>
          <v-btn text exact>Fixtures</v-btn>
          <v-btn text exact>Points Table</v-btn>
          <v-btn text exact v-if="currentUser" @click="logout">LOGOUT</v-btn>
        </v-toolbar-items>
      </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer padless absolute app class="lexend">
      <v-col class="text-center" cols="12">
        Made with
        <span class="fin">💚</span> by
        <span class="fin">
          <a href="https://github.com/VAR-solutions" class="link">UpThrust</a>
        </span> For
        <span class="fin">Arcadia</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
const fb = require("./firebaseConfig");
import { mapState } from "vuex";
export default {
  name: "App",
  data: () => ({}),
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    logout() {
      fb.auth.signOut().then(() => {
        this.$store.dispatch("clearData");
        this.$router.push("/login");
      });
    }
  }
};
</script>
