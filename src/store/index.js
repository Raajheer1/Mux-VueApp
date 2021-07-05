import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appURL: "https://muxcontrollerapi.ceavco.live/",
    login: false,
    drawer: null,
    overview: true,
    analytics: false,
    setting: false,
    assetspage: false,
    assets: null,
    title: null,
    streamkey: null,
    intervalvideo: null,
    internalasset: null,
    streams: null,
    loading: true,
    sheet: false,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
