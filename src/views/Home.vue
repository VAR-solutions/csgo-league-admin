<template>
  <v-container>
    <v-layout text-center fill-height wrap>
      <v-flex xs12>
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/csgo-auction.appspot.com/o/side-03.png?alt=media&token=91ce7293-e061-4a46-8929-d72bb6917499"
          class="my-3"
          contain
          height="250"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="fin titlefont mb-3">ARCADIA</h1>
        <p class="subheading font-weight-regular">Gaming Club of IIIT Vadodara</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
// const fb = require('../firebaseConfig')
// export default {
//   name: "Home",
//   data: () => {},
//   computed: {
//     ...mapState(['userProfile', 'currentUser'])
//   }
// }
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userProfile", "currentUser"])
  }
};
</script>

<style>

</style>