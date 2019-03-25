import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import { axios } from './config/index';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
import './assets/font-awesome/scss/font-awesome.scss';
import './assets/style.scss';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
