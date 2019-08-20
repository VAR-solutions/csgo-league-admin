<template>
  <v-container fluid class="pa-2 ma-2">
    <v-row no-gutters class="pa-0 ma-0">
      <v-col lg="3" md="3" sm="12" xs="12">
        <v-layout text-center wrap fill-height>
          <v-row text-center>
            <v-col v-for="card in cards" :key="card.title">
              <v-card
                text-center
                class="mx-4 my-1 px-4 py-1"
                @click="startauction(card.title)"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-center catfont mb-1"
                      :class="card.colr"
                      >{{ card.title }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-card-text class="playleft fin"
                  >PLayers Left : {{ card.pleft }}</v-card-text
                >
              </v-card>
            </v-col>
            <!-- <v-col v-if="allsold">
              <v-card text-center class="ma-4 pa-4" @click="startauction(card.title)">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-center catfont mb-1"
                      :class="unsoldcard.colr"
                    >{{ unsoldcard.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-card-text class="playleft fin">PLayers Left : {{ unsoldcard.pleft }}</v-card-text>
              </v-card>
            </v-col>-->
          </v-row>
        </v-layout>
      </v-col>
      <v-col lg="9" md="9" sm="12" xs="12" class="pa-4">
        <v-layout text-center wrap>
          <v-row justify="center">
            <v-col>
              <h1 class="titlefont fin" align="center">AUCTION - 2019</h1>
              <h4 class="titlefont py-4">Team Stats</h4>
              <v-data-table
                :headers="headers"
                :items="teamstats"
                item-key="name"
                hide-default-footer
                :loading="dataload"
                loading-text="Loading... Please wait"
                class="elevation-1"
              >
                <template v-slot:item.credits="{ item }">
                  <v-chip :color="getColor(item.credits)" light>{{
                    item.credits
                  }}</v-chip>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { teamsCollection } from "../firebaseConfig";
const fb = require("../firebaseConfig");
export default {
  data: () => ({
    cards: [
      {
        title: "GOLD",
        colr: "amber--text text--lighten-1"
      },
      {
        title: "SILVER",
        colr: "blue-grey--text text--lighten-4"
      },
      {
        title: "BRONZE",
        colr: "orange--text text--darken-2"
      },
      {
        title: "UNSOLD",
        colr: "white--text"
      }
    ],
    playerstype: {},
    teamstats: [],
    dataload: true,
    allsold: false,
    headers: [
      {
        text: "Team Name",
        align: "left",
        sortable: true,
        value: "name"
      },
      { text: "Credits Left", align: "center", value: "credits" },
      { text: "Players Bought", align: "center", value: "players" }
    ]
  }),
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    getRandInt(range) {
      return Math.floor(Math.random() * Math.floor(range));
    },
    startauction(type) {
      let sz = this.playerstype[type.toLowerCase()].length;
      if (sz > 0) {
        let pos = this.getRandInt(sz);
        let pid = this.playerstype[type.toLowerCase()][pos];
        let routelink = "/players/" + pid;
        // console.log(routelink)
        this.$router.push(routelink);
      }
    },
    getColor(credits) {
      if (credits >= 150) return "green";
      else if (credits >= 75) return "orange";
      else return "red";
    }
  },

  created() {
    fb.auctionCollection.onSnapshot(snap => {
      this.playerstype["gold"] = snap.docs[1].data().players;
      this.cards[0]["pleft"] = snap.docs[1].data().players.length;
      this.playerstype["silver"] = snap.docs[2].data().players;
      this.cards[1]["pleft"] = snap.docs[2].data().players.length;
      this.playerstype["bronze"] = snap.docs[0].data().players;
      this.cards[2]["pleft"] = snap.docs[0].data().players.length;
      this.playerstype["unsold"] = snap.docs[3].data().players;
      this.cards[3]["pleft"] = snap.docs[3].data().players.length;
    });

    fb.teamsCollection.onSnapshot(snap => {
      this.dataload = true;
      this.teamstats = [];
      snap.forEach(res => {
        var teamdetails = {};
        teamdetails["name"] = res.data().name;
        teamdetails["credits"] = res.data().credits;
        teamdetails["players"] = res.data().player_ids.length;
        this.teamstats.push(teamdetails);
      });
      this.dataload = false;
    });
  }
};
</script>

<style scoped>
.catfont {
  /* font-family: 'Bungee Inline', cursive !important; */
  font-size: 2.5em;
}

.playleft {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 300;
}
</style>
