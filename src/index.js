import Vue from "vue";
import App from './views/app.vue';
// import Home from './components/home.vue';
// import Table from './components/table.vue';
// import Canvas from './components/canvas.vue';
import {i18n} from './plugins/i18n';
import FlagIcon from 'vue-flag-icon';

Vue.use(FlagIcon);



const app = new Vue({
    el : '#app',
    render: h => h(App),
    i18n
}).$mount('#app');