import Vue from 'vue'
import Vuex from 'vuex'
// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import app from './modules/app'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
// custom module import panel
import Auth from './modules/Custom/Auth'
import Bonds from './modules/Custom/Bonds'
import Uploads from './modules/Custom/Uploads'
import Portfolio from './modules/Custom/Portfolio'
import UserRoles from './modules/Custom/UserRoles'
import Investors from './modules/Custom/Investors'
import SystemUser from './modules/Custom/SystemUser'
import Categories from './modules/Custom/Categories'
import Investments from './modules/Custom/Investments'
import Installments from './modules/Custom/Installments'
import MerchantUsers from './modules/Custom/MerchantUser'
import Permissions from './modules/Custom/Permissions'
import Billing from './modules/Custom/Billing'
import Report from './modules/Custom/Report'
import PosAgents from './modules/Custom/PosAgents'
import branches from './modules/Custom/branches'
import Mudaraba from './modules/Custom/Mudaraba'
import Pandl from './modules/Custom/Pandl'
import Finance from './modules/Custom/Finance'
import Wings from './modules/Custom/Wings'
import Accounts from './modules/Custom/Accounts'
import Clients from './modules/Custom/Clients'
import Constants from './modules/Custom/Constants'
import Stories from './modules/Custom/Stories'
import Catalogue from './modules/Custom/Catalogue'
import YandexMap from './modules/Custom/YandexMap'
import Questions from './modules/Custom/Question'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    permission,
    user,
    app,
    Auth,
    Bonds,
    Uploads,
    Portfolio,
    UserRoles,
    Stories,
    Investors,
    Questions,
    SystemUser,
    Categories,
    Permissions,
    Investments,
    Installments,
    MerchantUsers,
    Catalogue,
    Billing,
    Report,
    PosAgents,
    branches,
    Mudaraba,
    Pandl,
    Finance,
    Wings,
    Accounts,
    Clients,
    Constants,
    YandexMap
  },
  state: {
    langs: [{
      title: 'English',
      key: 'en'
    },
    {
      title: 'Russian',
      key: 'ru'
    },
    {
      title: 'Uzbek',
      key: 'uz'
    },
    {
      title: 'Kazak',
      key: 'kz'
    },
    {
      title: 'French',
      key: 'fr'
    },
    {
      title: 'Spain',
      key: 'sp'
    }
  ]

  },
  mutations: {

  },
  actions: {

  },
  getters
})
