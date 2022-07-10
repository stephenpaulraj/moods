import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import VueSocialSharing from "vue-social-sharing";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(Vue3Lottie).use(VueSocialSharing).mount("#app");
