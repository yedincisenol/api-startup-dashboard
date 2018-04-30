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
import VeeValidate from 'vee-validate';

//Components
import MenuComponent from './components/Menu';

sync(store, router)

Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.use(VueSession);
Vue.use(Toasted, {
  duration: 5000
});

Vue.use(VuejsDialog)
Vue.http.interceptors.push(function(request) {
  request.headers.set('client-id',  Config.API_CLIENT_ID);
  request.headers.set('client-secret',  Config.API_CLIENT_SECRET);
  if (app.$session.get('access_token')) {
    request.headers.set('Authorization', "Bearer " + app.$session.get('access_token'));
  }
});

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
