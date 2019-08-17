<template>
  <v-container>
    
    <v-layout text-center wrap>
      <v-row justify="center">
        <v-col>
          <h1 class="titlefont">AUCTION - 2019</h1>
        </v-col>
      </v-row>
    </v-layout>
    <v-row>
      <v-col v-for="card in cards" :key="card.title">
        <v-card width="320" class="ma-4 pa-4" outlined @click="startauction(card.title)">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text-center catfont mb-1"
                :class="card.colr"
              >{{ card.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
const fb = require("../firebaseConfig");
export default {
  data: () => ({
    cards: [
      {
        title: "GOLD",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 4,
        colr: "amber--text text--lighten-1"
      },
      {
        title: "SILVER",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 4,
        colr: "blue-grey--text text--lighten-4"
      },
      {
        title: "BRONZE",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 4,
        colr: "orange--text text--darken-2"
      }
    ],
    playerstype: {},
  }),
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    getRandInt(range) {
      return Math.floor(Math.random() * Math.floor(range));
    },
    startauction(type) {
      let sz = this.playerstype[type.toLowerCase()].length
      let pos = this.getRandInt(sz);
      let pid = this.playerstype[type.toLowerCase()][pos]
      let routelink = "/players/" + pid;
      // console.log(routelink)
      this.$router.push(routelink)
    }
  },

  created() {
    fb.auctionCollection.onSnapshot(snap => {
      this.playerstype['gold'] = snap.docs[1].data().players
      this.playerstype['silver'] = snap.docs[2].data().players
      this.playerstype['bronze'] = snap.docs[0].data().players
    })
  }
};
</script>

<style scoped>
.catfont {
  /* font-family: 'Bungee Inline', cursive !important; */
  font-size: 3.5em;
}
</style>