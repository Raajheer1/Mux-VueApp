import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appURL: "https://muxpresman.herokuapp.com/",
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
  }
})
