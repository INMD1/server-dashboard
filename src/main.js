import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import VuetifyDialog from 'vuetify-dialog'

import "../src/assets/sidbars.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


Vue.use(VuetifyDialog)
const app = createApp(App);
app.use(router);

app.mount("#app");
