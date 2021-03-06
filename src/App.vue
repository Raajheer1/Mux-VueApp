<template>
  <v-app id="inspire">
    <v-app-bar
        app
        clipped-right
        flat
        height="72"
    >
      <h1>
        <div v-if="overview">
          Overview
        </div>
        <div v-else-if="analytics">
          Analytics
        </div>
        <div v-else-if="setting">
          Settings
        </div>
        <div v-else-if="assetspage">
          Assets
        </div>
        <div v-else>
          Stream {{ this.title }}
        </div>
      </h1>
      <v-spacer></v-spacer>
      <v-responsive max-width="156">
        <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
        width="200"
    >

      <v-sheet
          color="grey lighten-5"
          height="128"
          width="100%"
      >
        <div class="text-center pt-6">
          <h1 style="color: black;">
            CEAVCO
            LIVE CONTROL
          </h1>
        </div>
      </v-sheet>
<!--      LEFT BAR      -->
      <v-list
          class="pl-0"
          shaped
      >
        <v-list-item link>
          <v-list-item-content @click="OverviewButton">
            <v-list-item-title>Overview</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content @click="AnalyticsButton">
            <v-list-item-title>Stream Analytics</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content @click="newVideo">
            <v-list-item-title>New Stream</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content @click="AssetsButton">
            <v-list-item-title>Assets</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content @click="SettingsButton">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
        app
        clipped
        right
    >
      <v-list v-if="this.overview == true">
        <v-list-item v-for="item, key in streams" :key="key" link>
          <v-list-item-content @click="StreamButton(item, key+1)">
            <v-list-item-title>Stream {{ key+1 }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div v-if="this.streamkey != null">
        <VideoPlayer :options="this.streamkey" />
      </div>
      <div v-else-if="loading">
        <v-row no-gutters class="pt-3">
          <v-col cols="4">

          </v-col>
          <v-col cols="4">
            <v-card color="#363636" dark>
              <v-card-text>
                Loading...
                <v-progress-linear
                    indeterminate
                    color="#05ffbc"
                    class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">

          </v-col>
        </v-row>
      </div>
      <div v-else-if="analytics">
        Analytics Page Place Holder
      </div>
      <div v-else-if="setting">
        Settings Page Place Holder
      </div>
      <div v-else-if="assetspage">
        <asset-grid v-bind:streams="this.assets" />
      </div>
      <video-grid v-else v-bind:streams="streams"></video-grid>
    </v-main>

    <v-footer
        app
        color="transparent"
        height="72"
        inset
    >
      <v-text-field
          background-color="grey lighten-1"
          dense
          flat
          hide-details
          rounded
          solo
      ></v-text-field>
    </v-footer>
    <notifications group="newStream" position="bottom right"/>
  </v-app>
</template>

<script>
import axios from 'axios';
import videoGrid from './components/videoGrid';
import assetGrid from './components/assetGrid';
import VideoPlayer from './components/VideoPlayer';

export default {
  name: 'App',
  data() {
    return {
      appURL: "https://muxpresman.herokuapp.com/",
      drawer: null,
      overview: true,
      analytics: false,
      setting: false,
      assetspage: false,
      assets: null,
      title: null,
      streamkey: null,
      interval: null,
      streams: null,
      loading: true,
      sheet: false,
    }
  },
  watch: {},
  computed: {},
  components: { videoGrid, VideoPlayer, assetGrid },
  methods: {
    getVideo(){
      axios.get(`${this.appURL}list`).then(response => {
        this.streams = response.data;
      });
    },
    getAssets(){
      axios.get(`${this.appURL}listasset`).then(response => {
        this.assets = response.data;
      });
    },
    newVideo(){
      this.loading = true;
      axios.get(`${this.appURL}create`).then(response => {
        this.$notify({
          type: 'success',
          duration: 30000,
          group: 'newStream',
          title: 'New Stream Created!',
          text: `Stream Key: ${response.data["stream_key"]} <br> Playback URL: https://stream.mux.com/${response.data["playback_ids"][0]["id"]}.m3u8`
        });
        this.getVideo();
      });
      this.loading = false;
    },
    StreamButton(item, key){
      if(item.status == 'active') {
        this.streamkey = item;
        this.overview = false;
        this.analytics = false;
        this.setting = false;
        this.assetspage = false;
        this.title = key;
      }else{
        this.$notify({
          type: 'error',
          duration: 5000,
          group: 'newStream',
          title: 'Error no Stream.',
          text: `The stream is not being used.`
        });
      }
    },
    OverviewButton(){
      this.overview = true;
      this.analytics = false;
      this.analytics = false;
      this.setting = false;
      this.assetspage = false;
      this.streamkey = null;
    },
    AnalyticsButton(){
      this.overview = false;
      this.analytics = true;
      this.setting = false;
      this.assetspage = false;
      this.streamkey = null;
    },
    SettingsButton(){
      this.overview = false;
      this.analytics = false;
      this.setting = true;
      this.assetspage = false;
      this.streamkey = null;
    },
    AssetsButton(){
      this.getAssets();
      this.overview = false;
      this.analytics = false;
      this.setting = false;
      this.streamkey = null;
      this.assetspage = true;
    },
  },
  mounted() {
  },
  created() {
    axios.get(`${this.appURL}list`).then(response => {
      this.streams = response.data;
      this.loading = false;
    });
    this.interval = setInterval(() => this.getVideo(), 5000);

    //DEBUG CODE --- REMOVE ---
    // this.streams = [{"test":true,"stream_key":"8d4cea18-3280-912e-44b8-86eabe1f818a","status":"active","recording":true,"reconnect_window":10,"playback_ids":[{"policy":"public","id":"j17P6NIIoVxbK5WtEaIH5LTPKA02B8I291V02uJVJ42TE"}],"new_asset_settings":{"playback_policies":["public"]},"id":"0233zRH1dm8QtD7ZUYxwRS2cQwpu7Ky101tAIDczmG4bg","created_at":"1614067398","connected":true,"active_asset_id":"4YuOppfhr2c96WpspeKEhs4Y9omlQAZIk4ayxXYJ00MI"},{"test":true,"stream_key":"3a2f3b9a-ffaa-f726-cc01-2736ed64cc6a","status":"disabled","reconnect_window":60,"recent_asset_ids":["LvHASF8HHxCqpZ01wxNII02fGCOjBs02QFu00uG002ZJhEFM"],"playback_ids":[{"policy":"public","id":"dj8uVpl11KYuBCvMXCTDcySgEZttY2ijroh93Rj5tlA"}],"new_asset_settings":{"playback_policies":["public"]},"id":"GYg00NOHPpsyQaCWYhBx4cY8013vxOkxIOTTGGko6m4HI","created_at":"1614066822"},{"test":true,"stream_key":"abe07022-a237-9338-faa8-7e5a0e0b5d80","status":"idle","reconnect_window":60,"recent_asset_ids":["z02xSAPFFWnlS02A1yrHOgoipDHp94tt4yiHJSDNZ00SEY"],"playback_ids":[{"policy":"public","id":"GhCnersYODwP40100l60100k85IuDE1ZRu02pBwNQ3U02APxs"}],"new_asset_settings":{"playback_policies":["public"]},"id":"BtVUYuzy00fTovn25zwaKHbSo2H01kKycrvEOfYU1uk8E","created_at":"1614049129"},{"test":true,"stream_key":"596b4cdb-2c1d-9a20-bad8-3946ddc65b2e","status":"idle","reconnect_window":10,"recent_asset_ids":["R01Q02UlplIRHqwGmdA66LEXrDcna00wYgM01vIVv328G4w"],"playback_ids":[{"policy":"public","id":"H5C9SSX00yK7rtZXVV00WwI8U0200ouk01zZp9bDbsMV01lcM"}],"new_asset_settings":{"playback_policies":["public"]},"id":"iiINfhY4qBACE00UEm01ls7aAZ0001UDaMbCV99eL4IIp5U","created_at":"1612933712"},{"test":true,"stream_key":"142a24ae-800d-9078-5dca-0c95714ca904","status":"idle","reconnect_window":10,"playback_ids":[{"policy":"public","id":"gGZBBsT2ZsPiEE9tasV84FmaoG4cnLKqa5N88p5ICRc"}],"new_asset_settings":{"playback_policies":["public"]},"id":"ww3qu4uhm1cK00QOR8bXG12EWFCgqyqNCu5rnfQvcOGQ","created_at":"1612933676"},{"test":true,"stream_key":"63a2f2f4-12d9-58c8-a708-80c33e5decc0","status":"idle","reconnect_window":10,"playback_ids":[{"policy":"public","id":"w00wvf2FpaerevN26BYgfaztLxwGZt9wsDui1tDg1ZNQ"}],"new_asset_settings":{"playback_policies":["public"]},"id":"00hu4UlJQao6i2g6ZfWrN00d00jWPovDVYd7Bd02U01qkYoA","created_at":"1612933641"},{"test":true,"stream_key":"18a132eb-4d0e-2d8d-9b60-9f6c3c872681","status":"idle","reconnect_window":10,"playback_ids":[{"policy":"public","id":"sRjfAyuEorw6fIzevTGlPj02EbLGjRzFHG3qBlYkwwrc"}],"new_asset_settings":{"playback_policies":["public"]},"id":"fWksBb3p4a4301sMf8v02tKXLxUpOn6BSJi3AW9mwpbLY","created_at":"1612932743"},{"test":true,"stream_key":"10ab4f7d-7032-1103-1861-e67839577189","status":"idle","reconnect_window":10,"playback_ids":[{"policy":"public","id":"GxLUHfc01n8piaO2b00fd95IZ7Inm0002D3gMpsHGEaVzIk"}],"new_asset_settings":{"playback_policies":["public"]},"id":"5KFhOQNH1kPCvJuglrIPncLS8CyVRZqqU7subOGDM8U","created_at":"1612912131"},{"test":true,"stream_key":"e2ab206a-a701-66e7-5242-c86ac443d690","status":"idle","reconnect_window":10,"playback_ids":[{"policy":"public","id":"8Q02Xt00lPY02fefFyLh3Y2BCKvNR3HLOBkvSwnZY1VLYU"}],"new_asset_settings":{"playback_policies":["public"]},"id":"wMHjkIpIuy01EVBauVjCJqND3NAiCxTncs1Gor9600FzI","created_at":"1612501563"},]
    // this.loading = false;
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>