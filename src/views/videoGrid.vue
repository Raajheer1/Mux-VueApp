<template>
  <v-container>

    <v-row v-for="column, value in columns" :key="column.id" class="v-row__border">
      <v-col v-for="item, key in column" :key="item.id" class="v-col__border">
        <v-card elevation="15" class="pa-4">
          <div v-if="item.status == 'active'">
            <VideoPlayer :options="item" />
            <v-spacer></v-spacer>
            <v-btn
                class="ma-1"
                color="success"
                plain
                @click="copyURL(item)"
            >
              PlaybackURL
            </v-btn>
            <v-btn
                class="ma-1"
                color="error"
                plain
                @click="delVideo(item)"
            >
              Delete
            </v-btn>
            <v-btn
                class="ma-1"
                color="success"
                plain
                @click="copy(item)"
            >
              StreamKey
            </v-btn>
          </div>
          <div v-else class="text-center">
            {{ item.status[0].toUpperCase() + item.status.substring(1) }} Stream {{ value * 3 + key + 1 }}
            <v-spacer></v-spacer>
            <v-btn
                class="ma-1"
                color="success"
                plain
                @click="copyURL(item)"
            >
              PlaybackURL
            </v-btn>
            <v-btn
                class="ma-1"
                color="error"
                plain
                @click="delVideo(item)"
            >
              Delete
            </v-btn>
            <v-btn
                class="ma-1"
                color="success"
                plain
                @click="copy(item)"
            >
              StreamKey
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer';
import axios from 'axios';

export default {
  name: "videoGrid",
  data() {
    return {
      stuff: null,
      cols: 3,
      deleting: false,
      dialog: false,
    }
  },
  props: {
  },
  watch: {},
  computed: {
    columns () {
      let columns = []
      columns.push([])
      this.$store.state.streams.forEach((item, key) => {
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
      axios.get(`${this.$store.state.appURL}del/${item.id}`).then(response => {
        this.$notify({
          type: 'error',
          duration: 10000,
          group: 'newStream',
          title: 'Stream Deleted!',
          text: `The stream has been successfully deleted.`
        });
        console.log(response.data);
      });
    },
    copy(item){
      this.$copyText(item["stream_key"]).then(() => {
        this.$notify({
          type: 'success',
          duration: 3000,
          group: 'newStream',
          title: 'Copied StreamKey!',
          text: `The StreamKey has been copied to your clipboard.`
        });
      }), () => {
        this.$notify({
          type: 'error',
          duration: 3000,
          group: 'newStream',
          title: 'StreamKey copy error!',
          text: `The StreamKey could not be copied to your clipboard.`
        });
      }
    },
    copyURL(item){
      this.$copyText(`https://stream.mux.com/${item['playback_ids'][0]['id']}.m3u8`).then(() => {
        this.$notify({
          type: 'success',
          duration: 3000,
          group: 'newStream',
          title: 'Copied PlaybackURL!',
          text: `The PlaybackURL has been copied to your clipboard.`
        });
      }), () => {
        this.$notify({
          type: 'error',
          duration: 3000,
          group: 'newStream',
          title: 'PlaybackURL copy error!',
          text: `The PlaybackURL could not be copied to your clipboard.`
        });
      }
    }
  },
  mounted() {
  },
  created() {
    if(!this.$store.state.login){
      this.$router.push("/");
    }
    //console.log(this.$route.path);
  }
}
</script>

<style scoped>

</style>