import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Notification from 'vue-notification';

Vue.config.productionTip = false
Vue.use(Notification)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
