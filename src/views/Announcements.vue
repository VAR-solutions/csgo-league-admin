<template>
  <v-container>
    <v-layout text-center wrap>
      <v-row justify="center">
        <v-col cols="12" xl="4" lg="4" sm="10" md="10" xs="10">
          <v-btn
            color="white"
            :outlined="true"
            :minWidth="120"
            :minHeight="40"
            @click="addAnnouncement"
            >{{ this.addBtnText }}</v-btn
          >
        </v-col>
      </v-row>
    </v-layout>
    <v-layout text-center wrap v-if="addEnable">
      <v-row justify="center">
        <v-col cols="12" xl="8" lg="8" md="8" sm="10">
          <v-text-field
            v-model="message"
            solo
            label="Solo"
            clearable
          ></v-text-field>
          <v-btn @click="publish">Publish</v-btn>
        </v-col>
      </v-row>
    </v-layout>

    <Announcement v-for="(ex, k) in this.announcements" :key="k" :data="ex" />
  </v-container>
</template>

<script>
import Announcement from "../components/Announcement";
const fb = require("../firebaseConfig");
import { mapState } from "vuex";
import { currentUser } from "../firebaseConfig";
export default {
  name: "Announcements",
  components: {
    Announcement
  },
  data: () => {
    return {
      announcements: [],
      addEnable: false,
      message: "",
      addBtnText: "Add Announcement"
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    fb.announcementsCollection.orderBy("time", "desc").onSnapshot(res => {
      this.announcements = [];
      res.forEach(doc => {
        let announcement = doc.data();
        announcement["id"] = doc.id;
        this.announcements.push(announcement);
      });
    });
  },
  methods: {
    addAnnouncement() {
      this.addEnable = !this.addEnable;
      if (this.addEnable) {
        this.addBtnText = "Close";
      } else {
        this.addBtnText = "Add Announcement";
      }
    },

    publish() {
      if (this.message != "") {
        let announcement = {};
        announcement["announcement"] = this.message;
        announcement["time"] = Date.now();
        this.announcements.push(announcement);
        fb.announcementsCollection
          .add(announcement)
          .then()
          .catch(err => {
            console.log(err);
          });
        this.addEnable = !this.addEnable;
        if (this.addEnable) {
          this.addBtnText = "Close";
        } else {
          this.addBtnText = "Add Announcement";
        }
        this.message = "";
      }
    }
  }
};
</script>
