<template>
  <v-container>

    <v-row v-for="column, value in columns" :key="column.id" class="v-row__border">
      <v-col v-for="item, key in column" :key="item.id" class="v-col__border">
        <div v-if="item.status == 'active'">
          <VideoPlayer :options="item" />
        </div>
        <div v-else>
          {{ item.status[0].toUpperCase() + item.status.substring(1) }} Stream {{ value * 3 + key + 1 }}
          <v-btn
              :loading="deleting"
              class="ma-1"
              color="error"
              plain
              @click="delVideo(item)"
          >
            Delete
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoPlayer from './VideoPlayer';
import axios from 'axios';

export default {
  name: "videoGrid",
  data() {
    return {
      stuff: null,
      cols: 3,
      deleting: false
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
    delVideo(item){
      this.loading = true;
      axios.get(`${this.appURL}del/${item.id}`).then(response => {
        this.$notify({
          type: 'error',
          duration: 10000,
          group: 'newStream',
          title: 'Stream Deleted!',
          text: `The stream has been successfully deleted.`
        });
        console.log(response.data);
      });
      this.loading = false;
    }
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