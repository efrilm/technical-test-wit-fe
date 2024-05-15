//import createApp from Vue
import { createApp } from "vue";
import PieCharts from "./components/PieChart.vue";
import Toast from "vue-toastification";
import Vue3EasyDataTable from "vue3-easy-data-table";
import App from "./App.vue";

// CSS
import "vue3-easy-data-table/dist/style.css";
import "vue-toastification/dist/index.css";
import "./style.css";

//import config router
import router from "./router";

//create App Vue
const app = createApp(App);

const options = {};

// Use
app.use(router);
app.use(Toast, options);

// Component
app.component("PieCharts", PieCharts);
app.component("EasyDataTable", Vue3EasyDataTable);

app.mount("#app");
