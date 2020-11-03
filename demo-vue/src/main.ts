import Vue from 'nativescript-vue'
import App from './components/App.vue'

Vue.registerElement('PDFView', () => require('@finanzritter/nativescript-pdf-view').PDFView)
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  render: h => h('frame', [h(App)])
}).$start()
