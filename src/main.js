import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Notification from 'vue-notification';
import VueClipboard from 'vue-clipboard2';
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Notification)
Vue.use(VueClipboard)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
