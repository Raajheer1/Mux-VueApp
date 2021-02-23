<template>
  <v-container>
    <v-row>
      <v-col v-for="item in streams" :key="item">
        {{ item }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "videoGrid",
  data() {
    return {
      stuff: null,
    }
  },
  props: {
    streams: Array
  },
  watch: {},
  computed: {},
  components: { },
  methods: {

  },
  mounted() {
  }
}
</script>

<style scoped>

</style>