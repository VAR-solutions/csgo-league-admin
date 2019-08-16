<template>
  <v-layout wrap>
    <v-row class="mx-auto">
      <v-col>
        <v-card dark max-width="800" class="mx-auto">
          <v-card-text class="white--text" pa-0>
            <div class="overline mb-0">{{this.date}}</div>
            <v-list >
              <v-list-item>
                <v-list-item-title>{{ this.data.announcement }}</v-list-item-title>
                <v-list-item-subtitle class="text-right">
                  <v-icon @click="deleteAnnouncement">mdi-delete</v-icon>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
import VueMoment from "vue-moment"

const fb = require('../firebaseConfig')
export default {
  name: "Announcement",
  props: ["data"],
  data() {
      date: moment().format("dddd, MMMM Do YYYY")
  },
  created() {
  },
  methods: {
      deleteAnnouncement() {
          fb.announcementsCollection.doc(this.data.id).delete();   
      }
  }
};
</script>