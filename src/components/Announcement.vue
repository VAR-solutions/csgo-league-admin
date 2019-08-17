<template>
  <v-layout wrap>
    <v-row class="mx-auto">
      <v-col>
        <v-card dark max-width="800" class="mx-auto">
          <v-card-text class="white--text" pa-0>
            <div class="overline mb-0">{{timestamp}}</div>
            <v-list>
              <v-list-item>
                <div class="fontover">{{ this.data.announcement }}</div>
                <v-spacer></v-spacer>
                <div class="text-right">
                  <v-icon @click="deleteAnnouncement">mdi-delete</v-icon>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
import moment from "moment";

const fb = require("../firebaseConfig");
export default {
  name: "Announcement",
  props: ["data"],
  computed: {
    timestamp: function() {
      if (this.data.time < Date.now() - 1200000) {
        return moment(this.data.time).calendar();
      } else {
        return moment(this.data.time).fromNow();
      }
    }
  },
  methods: {
    deleteAnnouncement() {
      fb.announcementsCollection.doc(this.data.id).delete();
    }
  }
};
</script>

<style scoped>
.fontover {
  font-family: "Overlock", cursive;
  font-size: 1.4em;
}
</style>