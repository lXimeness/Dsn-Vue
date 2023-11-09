import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUsers, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import 'bootstrap/dist/css/bootstrap.css';



import 'vuetify/dist/vuetify.css';

library.add(faUsers, faShoppingCart);

const app = createApp(App);

app.use(router);
app.use(Vuetify); 
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');


