<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row
          align="center"
          justify="center"
        >
          <v-card
            class="ma-4 pa-6"
            outlined
            tile
            :to="{ name: 'Players'}"
          >
            Players
          </v-card>
          <v-card
            class="ma-3 pa-6"
            outlined
            tile
          >
            Teams
          </v-card>
          <v-card
            class="ma-3 pa-6"
            outlined
            tile
          >
            Auction
          </v-card>
          <v-card
            class="ma-3 pa-6"
            outlined
            tile
            :to="{ name: 'Announcements' }"
          >
            Announcements
          </v-card>
          <v-card
            class="ma-3 pa-6"
            outlined
            tile
          >
            Fixtures
          </v-card>
          <v-card
            class="ma-3 pa-6"
            outlined
            tile
          >
            Points Table
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
// import { mapState } from 'vuex'
// const fb = require('../firebaseConfig')
// export default {
//   name: "Home",
//   data: () => {},
//   computed: {
//     ...mapState(['userProfile', 'currentUser'])
//   }
// }
export default {
    data () {
      return {
        
      }
    },
  }
</script>

<style scoped>

</style>