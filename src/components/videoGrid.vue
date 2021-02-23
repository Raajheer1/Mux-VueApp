<template>
  <v-container>
    <v-row>
      <v-col v-for="item in streams" :key="item">
        <div v-if="item.status == 'active'">
          <VideoPlayer :options="item" />
        </div>
        <div v-else>
          Idle Stream
        </div>
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