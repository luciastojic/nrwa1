import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faStar);

createApp(App).use(router).use(VueAxios,axios).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
