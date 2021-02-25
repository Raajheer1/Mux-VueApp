<template>
  <v-container>

    <v-row v-for="column, value in columns" :key="column.id" class="v-row__border">
      <v-col v-for="item, key in column" :key="item.id" class="v-col__border">
        <div v-if="item.status == 'active'">
          <VideoPlayer :options="item" />
        </div>
        <div v-else>
          {{ item.status[0].toUpperCase() + item.status.substring(1) }} Stream {{ value * 3 + key + 1 }}
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
.v-row__border{
  border-bottom: #272727 1px solid;
}

.v-col__border{
  border-left: #272727 1px solid;
  border-right: #272727 1px solid;
}
</style>