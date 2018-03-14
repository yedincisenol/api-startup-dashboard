import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import VueResource from 'vue-resource';
import VueSession from 'vue-session';
import Toasted from 'vue-toasted';
import VuejsDialog from "vuejs-dialog"

import App from './components/App'
import router from './router'
import store from './store'

import Helper from './helper';
import Config from '../config';

//Components
import MenuComponent from './components/Menu';

sync(store, router)

Vue.use(VueResource);
Vue.use(VueSession);
Vue.use(Toasted, {
  duration: 5000
});
Vue.use(VuejsDialog)

Vue.toasted.register('error', {
  type: 'error',
  icon : 'error_outline',
  theme: 'bubble'
})

Vue.component('menu-component', MenuComponent );

const app = new Vue({
  router,
  store,
  ...App,
});

window.app = app;
window.Helper = new Helper();
window.Config = Config;

export { app, router, store }
