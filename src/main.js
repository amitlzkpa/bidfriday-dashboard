import Vue from 'vue';
import App from './App.vue';
import mondaySdk from 'monday-sdk-js';
import axios from 'axios';

Vue.prototype.wait = async function(ms) {
	return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

// Vue.prototype.BIDSERVER_URL="https://bidfriday.herokuapp.com";
Vue.prototype.BIDSERVER_URL="http://localhost:7003";

Vue.prototype.$api = axios.create();

Vue.prototype.monday = mondaySdk();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
