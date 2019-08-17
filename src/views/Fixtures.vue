<template>
    <v-container>
        <p> This is Fixtures Page</p>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
    ...mapState(["currentUser"])
  },
}
</script>