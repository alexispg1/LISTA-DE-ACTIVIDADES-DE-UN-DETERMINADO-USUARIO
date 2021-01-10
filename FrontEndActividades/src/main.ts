import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase' ;

  var firebaseConfig = {
    apiKey: "AIzaSyB2eZHE7i3uAxIMkfMpnySpxQO_fhCX64Q",
    authDomain: "actividades-f55a2.firebaseapp.com",
    databaseURL: "https://actividades-f55a2.firebaseio.com",
    projectId: "actividades-f55a2",
    storageBucket: "actividades-f55a2.appspot.com",
    messagingSenderId: "70703078559",
    appId: "1:70703078559:web:f356b905d9f244eb75d6aa",
    measurementId: "G-NLBGVSWBH4"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

Vue.use(BootstrapVue)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
