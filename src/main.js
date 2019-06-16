import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import './assets/css/material-kit.css'
import vueCountryRegionSelect from 'vue-country-region-select'

Vue.use(vueCountryRegionSelect)

export default Vue.extend({
    data: () => ({
        country: '',
        region: ''
    })
})
Vue.config.productionTip = false;
window.$ = require('jquery');
window.JQuery = require('jquery');

const config = {
    apiKey: 'AIzaSyDqbKz8c1-imn7rSoS8AMVqICB4cCFU3-Q',
    authDomain: 'groupproject-803cc.firebaseapp.com',
    databaseURL: 'https://groupproject-803cc.firebaseio.com',
    projectId: 'groupproject-803cc',
    storageBucket: 'groupproject-803cc.appspot.com',
    messagingSenderId: '197639915597',
    appId: '1:197639915597:web:734a57fd73e2567e'
};
firebase.initializeApp(config);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
