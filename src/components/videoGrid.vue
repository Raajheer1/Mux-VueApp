<template>
  <v-container>
    <v-row>
      <v-col v-for="column in columns" :key="column">
        <div v-for="item in column" :key="item">
          <div v-if="item.status == 'active'">
            <VideoPlayer :options="item" />
          </div>
          <div v-else>
            Idle Stream
          </div>
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
      cols: 3
    }
  },
  props: {
    streams: Array
  },
  watch: {},
  computed: {
    columns () {
      console.log(this.streams);
      let columns = []
      let mid = Math.ceil(this.streams.length / this.cols)
      for (let col = 0; col < this.cols; col++) {
        columns.push(this.streams.slice(col * mid, col * mid + mid))
      }
      return columns
    }
  },
  components: { VideoPlayer },
  methods: {

  },
  mounted() {
  }
}
</script>

<style scoped>

</style>