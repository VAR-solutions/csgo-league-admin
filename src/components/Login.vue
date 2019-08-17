<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/csgo-auction.appspot.com/o/side-03.png?alt=media&token=91ce7293-e061-4a46-8929-d72bb6917499"
          class="my-3"
          contain
          height="250"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">ARCADIA</h1>
        <p class="subheading font-weight-regular">Gaming Club of IIIT Vadodara</p>
      </v-flex>
    </v-layout>
    <v-layout text-center wrap>
      <v-row justify="center">
        <v-col cols="12" xl="4" lg="4" sm="10" md="10" xs="10">
          
            <v-btn
              color="white"
              :outlined="true"
              :minWidth="150"
              :minHeight="50"
              @click="login"
            >Sign In with Google</v-btn>

          <p v-if="!found">You are not authorized</p>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
const fb = require('../firebaseConfig')
import firebase from 'firebase'
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMsg: '',
      email: '',
      found: true,
      emails: []
    }
  },
  created() {
      fb.adminsCollection.get().then(snp => {
          snp.forEach(doc => {
              this.emails.push(doc.data().email)
          })
      })
  },
  methods: {
    login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        fb.auth.signInWithPopup(provider).then((result) => {
            if(this.emails.indexOf(result.user.email) != -1){
                this.found = true
                this.$store.commit('setCurrentUser', result.user)
                this.$store.dispatch('fetchUserProfile')
                this.$router.push('/')
            }
            else{
                this.found = false
                firebase.auth().signOut().then(() => {
                    this.$store.dispatch('clearData')
                }).catch(err => {
                    console.log(err)
                })
            }

        }).catch((err) => {
            console.log(err.message)
        });

    }
  },
}
</script>
