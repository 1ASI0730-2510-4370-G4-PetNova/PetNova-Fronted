import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n.js";

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from "primevue/card";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Badge from "primevue/badge";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import SelectButton from "primevue/selectbutton";
import Dialog from "primevue/dialog";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

import router from "./router";
import "./style.css";

import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(i18n);
app.use(ToastService);

app.component("PvButton", Button);
app.component("PvCard", Card);
app.component("PvMenu", Menu);
app.component("PvMenubar", Menubar);
app.component("PvBadge", Badge);
app.component("PvAvatar", Avatar);
app.component("PvSelectButton", SelectButton);
app.component("PvDialog", Dialog);
app.component("PvInputText", InputText);
app.component("PvToast", Toast);

app.provide("toast", app.config.globalProperties.$toast);

app.mount("#app");
