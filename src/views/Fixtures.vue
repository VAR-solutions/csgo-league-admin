<template>
  <v-container>
    <h1 class="fin" align="center">COMING SOON...</h1>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>
