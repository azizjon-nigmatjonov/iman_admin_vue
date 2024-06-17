// with polyfills
import 'core-js/stable'
import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import i18n from './locales'
import router from './router'
import 'regenerator-runtime/runtime'
import { VueAxios } from './utils/request'
import themePluginConfig from '../config/themePluginConfig'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import Navigation from './custom/Resuable/Navigation.vue'

import myIcons from './core/icons'
import deleteBtn from './components/deleteBtn.vue'
import editBtn from './components/editBtn.vue'
import iconBtn from './components/iconBtn.vue'
import MyVideoPlayer from './components/VideoPlayer'

import VueObserveVisibility from 'vue-observe-visibility'

// import VueJsonPretty from 'vue-json-pretty'
// import 'vue-json-pretty/lib/styles.css'
// import numFormat from 'vue-filter-number-format'
// import VueCoreVideoPlayer from 'vue-core-video-player'
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'
import { FormModel } from 'ant-design-vue'
import CKEditor from 'ckeditor4-vue'
import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './global.less'
import './plugins/GlobalFunctions'
import './plugins/Converters'
Vue.use(FormModel)
Vue.use(CKEditor)
// Vue.component('vue-json-pretty', VueJsonPretty)
// Vue.filter('numFormat', numFormat)
Vue.config.productionTip = false
Vue.prototype.$myIcons = myIcons
Vue.prototype.$dateFormat = 'DD.MM.YYYY'
Vue.prototype.$dateValueFormat = 'YYYY-MM-DD'
Vue.prototype.$dateTimeFormat = 'DD.MM.YYYY HH:mm:ss'
// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)

Vue.use(VueObserveVisibility)

Vue.component('my-video-player', MyVideoPlayer)
Vue.component('icon-btn', iconBtn)
Vue.component('edit-btn', editBtn)
Vue.component('delete-btn', deleteBtn)
Vue.component('pro-layout', ProLayout)
Vue.component('a-navigation', Navigation)
Vue.component('page-header-wrapper', PageHeaderWrapper)
window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
