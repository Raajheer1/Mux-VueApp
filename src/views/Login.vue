<template>
  <v-row no-gutters class="pt-3">
    <v-col cols="4">

    </v-col>
    <v-col cols="4">
      <v-card color="#363636" dark>
        <v-card-text>
          <v-text-field
              v-model="password"
              label="Password"
              outlined
              color="#1DE9B6"
          ></v-text-field>
          <v-btn @click="login">
            Login
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">

    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      password: null
    }
  },
  props: {},
  watch: {},
  computed: {},
  components: { },
  methods: {
    login(){
      axios.get(`${this.$store.state.appURL}login/${this.password}`).then(response => {
        if(response.data == true){
          this.$store.state.login = true;
          this.$router.push("overview");
        }else{
          this.$notify({
            type: 'error',
            duration: 3000,
            group: 'newStream',
            title: 'Invalid Password',
            text: `Please try again.`
          });
        }
      });
    },
  },
  mounted() {
  }
}
</script>

