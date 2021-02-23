<template>
  <v-container>

    <v-row v-for="column in columns" :key="column.id">
      <v-col v-for="item in column" :key="item.id">
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
      cols: 3
    }
  },
  props: {
    streams: Array
  },
  watch: {},
  computed: {
    columns () {
      let columns = []
      columns.push([])
      this.streams.forEach((item, key) => {
        columns[Math.floor(key/this.cols)].push(item);
        if(key%3 == 2){
          columns.push([]);
        }
      })
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