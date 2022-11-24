import Vue from 'vue'

import 'normalize.css/normalize.css'
import './styles/element-variables.scss' // a modern alternative to CSS resets

//Css Main
import '@/styles/index.scss' // global css
import 'element-ui/lib/theme-chalk/display.css'

import Element from 'element-ui'
import App from './App.vue'
import store from "./store";
import router from "./router";
import i18n from './lang' // internationalization
import * as filters from './filters' // global filters


//Icon
import './icons' // icon
import './permission' // permission control
import './utils/axios'

Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)

})

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})
