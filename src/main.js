import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://192.168.0.47:1337"
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
