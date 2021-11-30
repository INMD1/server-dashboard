import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";


import "../src/assets/sidbars.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


const app = createApp(App);
app.use(router);
app.mount("#app");