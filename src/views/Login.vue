<template>
  <v-row no-gutters class="pt-3">
    <v-col cols="4">

    </v-col>
    <v-col cols="4">
      <v-card color="#363636" dark>
        <v-card-text>
          Loading...
<!--          <v-progress-linear-->
<!--              indeterminate-->
<!--              color="#05ffbc"-->
<!--              class="mb-0"-->
<!--          ></v-progress-linear>-->
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
export default {
  name: "Login",
  data() {
    return {
    }
  },
  props: {},
  watch: {},
  computed: {},
  components: { },
  methods: {
    login(){
      this.$store.state.login = true;
      this.$router.push("overview");
    },
  },
  mounted() {
  }
}
</script>

