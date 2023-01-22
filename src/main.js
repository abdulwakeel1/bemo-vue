import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueDraggable from 'vuedraggable'
import VModal from 'vue-js-modal'

import App from './App.vue'
import router from './router'

import './assets/main.css'

Vue.use(PiniaVuePlugin)
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.component('vuedraggable', VueDraggable)
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app')
