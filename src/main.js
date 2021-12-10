import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import Notifications from '@kyvg/vue3-notification'

import "../src/assets/sidbars.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);

app.use(Notifications)

app.use(router);

app.mount("#app");
