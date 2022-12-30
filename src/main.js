import Vue from 'vue'
import App from './App.vue'

import ApiService from "@/core/services/api.service";

Vue.config.productionTip = false
import router from "@/core/router/router";
import VueSimpleAlert from "vue-simple-alert";

import vuetify from "@/core/plugins/vuetify";
import 'vuetify/dist/vuetify.min.css';
import store from "@/core/store";
import "@/core/plugins/bootstrap-vue";
import "popper.js";
import "@mdi/font/css/materialdesignicons.css";
import VueConfirmDialog from 'vue-confirm-dialog'

import "@/core/plugins/vuemask";

// import "tooltip.js";
Vue.use(VueSimpleAlert);
Vue.use(VueConfirmDialog);


ApiService.init();


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
