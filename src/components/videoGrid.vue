<template>
  <v-container>
    <v-row>
      <v-col v-for="item in streams" :key="item">
        <VideoPlayer :options="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoPlayer from './VideoPlayer';

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
  components: { VideoPlayer },
  methods: {

  },
  mounted() {
  }
}
</script>

<style scoped>

</style>