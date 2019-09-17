<template>
  <v-container>
    <!-- <h1 class="fin" align="center">COMING SOON...</h1> -->
    <v-data-table
      :headers="headers"
      :items="teamstats"
      item-key="name"
      hide-default-footer
      :loading="dataload"
      loading-text="Loading... Please wait"
      class="elevation-1"
      sort-by="points"
      sort-desc
    ></v-data-table>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
const fb = require("../firebaseConfig");
export default {
  name: "ptable",
  data() {
    return {
      headers: [
        {
          text: "Team Name",
          align: "left",
          value: "name",
          sortable: false
        },
        { text: "Matches Played", value: "mplayed", sortable: false},
        { text: "Matches Won", value: "mwon", sortable: false },
        { text: "Rounds Won", value: "rwon", sortable: false },
        { text: "Rounds Lost", value: "rlost", sortable: false },
        { text: "Round Difference", value: "rd", sortable: false },
        { text: "Points", value: "points" }
      ],
      teamstats: [],
      dataload: true,
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    fb.teamsCollection.onSnapshot(snap => {
      this.dataload = true;
      this.teamstats = [];
      snap.forEach(res => {
        var teamdetails = {};
        teamdetails["name"] = res.data().name
        teamdetails["mplayed"] = res.data().mplayed
        teamdetails["mwon"] = res.data().mwon
        teamdetails["rwon"] = res.data().rwon
        teamdetails["rlost"] = res.data().rlost
        teamdetails["rd"] = teamdetails["rwon"] - teamdetails["rlost"]
        var point = (teamdetails["mwon"] * 100) + teamdetails["rd"]
        teamdetails["points"] = point
        this.teamstats.push(teamdetails)
      });
      this.dataload = false;
    })
  }
};
</script>
