<template>
  <v-container grid-list-sm align-content-space-between>
    <v-layout wrap>
      <Player v-for="(ex, k) in this.players" :key="k" :data="ex" />
    </v-layout>
  </v-container>
</template>

<script>
import Player from "../components/Player";
const fb = require("../firebaseConfig");

export default {
  name: "Players",
  components: {
    Player
  },
  created() {
    fb.playersCollection
      .orderBy("name")
      .get()
      .then(res => {
        res.forEach(doc => {
          this.players.push(doc.data());
        });
      });
  },
  data() {
    return {
      players: []
    };
  }
};
</script>
