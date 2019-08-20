<template>
  <v-container mt-5>
    <vue-element-loading
      is-full-screen
      :active="showCustomizeLoader"
      background-color="rgba(100, 100, 100, 1)"
    >
      <img
        src="https://firebasestorage.googleapis.com/v0/b/csgo-auction.appspot.com/o/side-03.png?alt=media&token=91ce7293-e061-4a46-8929-d72bb6917499"
        class="my-3 rotate-vert-center"
        height="250px"
      />
    </vue-element-loading>
    <v-card pa-2 width="90%" class="mx-auto">
      <v-row>
        <v-col cols="12" md="5" xs="12" justify="center" align="center">
          <img
            width="50%"
            src="https://firebasestorage.googleapis.com/v0/b/csgo-auction.appspot.com/o/side-03.png?alt=media&token=91ce7293-e061-4a46-8929-d72bb6917499"
          />
        </v-col>
        <v-col cols="12" md="7" xs="12" justify="center" align="center" class="mt-5">
          <h1 class="fin">{{ data.tag }}</h1>
          <v-card-text>
            <p class="lexend" style="font-size: 25px">{{ data.name }}</p>
            <p class="size lexend">Primary Weapon: {{ data.primary_weapon }}</p>
            <p class="size lexend">Secondary Weapon: {{ data.secondary_weapon }}</p>
            <p class="size lexend" v-if="data.category">Category: {{ data.category }}</p>
            <p class="size lexend" v-if="data.team">Team: {{ data.team }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = true">Assign Category</v-btn>
            <v-btn @click="dialog2 = true">Sold to</v-btn>
            <v-btn @click="unsold">Unsold</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline align-center">Player Category</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-select v-model="k" :items="items" dark label="Category"></v-select>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn text @click="saveCategory">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline align-center">Auction</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field label="Credit" v-model="credit"></v-text-field>
            <v-select v-model="team" :items="team_names" dark label="Team"></v-select>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog2 = false">Close</v-btn>
          <v-btn text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
const fb = require("../firebaseConfig");
import VueElementLoading from "vue-element-loading";
import { functions } from "firebase";
import axios from "axios";
export default {
  name: "profile",
  props: ["id"],
  data() {
    return {
      data: {},
      showCustomizeLoader: true,
      dialog: false,
      dialog2: false,
      items: ["Gold", "Silver", "Bronze"],
      k: "",
      team: "",
      credit: null,
      teams: [],
      team_names: []
    };
  },
  components: {
    VueElementLoading
  },

  created() {
    setTimeout(() => {
      this.showCustomizeLoader = false;
    }, 2000);
    fb.playersCollection
      .doc(this.$route.params.id)
      .get()
      .then(res => {
        this.data = res.data();
      });
    fb.teamsCollection
      .get()
      .then(res => {
        res
          .forEach(doc => {
            // console.log(doc.data())
            this.teams.push(doc.data());
          })
          .catch(err => {
            console.log(err);
          });
        this.teams.forEach(element => {
          this.team_names.push(element.name);
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    saveCategory() {
      var predata = [];
      var d = [];
      var dd = [];
      var id = this.$route.params.id;
      var cat = this.data.category;
      var new_cat = this.k;
      this.showCustomizeLoader = true;
      if (this.data.category == "") {
        fb.auctionCollection
          .doc(this.k.toLowerCase())
          .get()
          .then(res => {
            // console.log(res.data().players)
            predata = res.data().players;
            predata.push(parseInt(this.$route.params.id));
            fb.auctionCollection
              .doc(this.k.toLowerCase())
              .set({
                players: predata
              })
              .catch(err => {
                console.log(err);
              });
            this.data.category = this.k;
            fb.playersCollection
              .doc(this.$route.params.id)
              .update({
                category: this.k
              })
              .catch(err => {
                console.log(err);
              });
            this.showCustomizeLoader = false;
            this.dialog = false;
            this.data.category = this.k;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        fb.auctionCollection
          .doc(this.data.category.toLowerCase())
          .get()
          .then(res => {
            d = res.data().players;
            dd = d.filter(function(player) {
              return player != parseInt(id);
            });
            fb.auctionCollection
              .doc(this.data.category.toLowerCase())
              .set({
                players: dd
              })
              .catch(err => {
                console.log(err);
              });
            fb.auctionCollection
              .doc(this.k.toLowerCase())
              .get()
              .then(r => {
                predata = r.data().players;
                predata.push(parseInt(id));
                fb.auctionCollection.doc(this.k.toLowerCase()).set({
                  players: predata
                });
                this.showCustomizeLoader = false;
                this.dialog = false;
                this.data.category = this.k;
              })
              .catch(err => {
                console.log(err);
              });
            fb.playersCollection
              .doc(id)
              .update({
                category: this.k
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    save() {
      if (this.data.category && !this.data.team) {
        let announcement = {};
        announcement["announcement"] =
          this.data.name +
          " (" +
          this.data.tag +
          ") " +
          " bought by " +
          this.team +
          " for " +
          this.credit +
          " credits";
        announcement["time"] = Date.now();
        var d = [];
        var dd = [];
        var url =
          "https://us-central1-csgo-auction.cloudfunctions.net/sendMail?dest=" +
          this.data.email +
          "&team=" +
          this.team +
          "&credit=" +
          this.credit;
        this.showCustomizeLoader = true;
        var id = this.$route.params.id;
        var tid;
        this.teams.forEach(ele => {
          if (ele.name === this.team) {
            tid = ele.tid;
          }
        });
        var ids = [];
        fb.auctionCollection
          .doc(this.data.category.toLowerCase())
          .get()
          .then(res => {
            d = res.data().players;
            dd = d.filter(function(player) {
              return player != parseInt(id);
            });
            fb.auctionCollection
              .doc(this.data.category.toLowerCase())
              .set({
                players: dd
              })
              .catch(err => {
                console.log(err);
              });
            this.showCustomizeLoader = false;
            this.dialog2 = false;
            this.$router.push({ name: "Auction" });
          })
          .catch(err => {
            console.log(err);
          });

        fb.teamsCollection
          .doc(tid.toString())
          .get()
          .then(res => {
            ids = res.data().player_ids;
            ids.push(id);
            fb.teamsCollection.doc(tid).update({
              player_ids: ids
            });
          })
          .catch(err => {
            console.log(err);
          });
        fb.playersCollection
          .doc(id)
          .update({
            team: this.team
          })
          .catch(err => {
            console.log(err);
          });
        fb.announcementsCollection.add(announcement).catch(err => {
          console.log(err);
        });

        axios.get(url).then(res => {
          console.log(res);
        });
      } else {
        this.dialog2 = false;
      }
    },
    unsold() {
      if (this.data.category) {
        var id = this.$route.params.id;
        var d = [];
        var dd = [];
        var us = [];
        fb.auctionCollection
          .doc(this.data.category.toLowerCase())
          .get()
          .then(res => {
            d = res.data().players;
            dd = d
              .filter(function(player) {
                return player != parseInt(id);
              })
              .catch(err => {
                console.log(err);
              });
            fb.auctionCollection
              .doc(this.data.category.toLowerCase())
              .set({
                players: dd
              })
              .catch(err => {
                console.log(err);
              });
            fb.auctionCollection
              .doc("unsold")
              .get()
              .then(r => {
                us = r.data().players;
                us.push(parseInt(id));
                fb.auctionCollection
                  .doc("unsold")
                  .update({
                    players: us
                  })
                  .then(re => {
                    this.$router.push({ name: "Auction" });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
