/* eslint-disable no-undef */
import myIcons from '@/core/icons'
const scoring = {
  path: '/installment',
  name: 'installment',
  // hideChildrenInMenu: true,
  redirect: '/installment/list',
  meta: { title: 'Мусавамa', keepAlive: true, icon: myIcons.musavama, permission: ['dashboard'] },
  children: [
    {
      path: '/installment/list/application',
      name: 'installment-applications',
      hidden: true,
      component: () => import('../../custom/Installment/Applications'),
      meta: { title: 'Заявки', keepAlive: false }
      // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
    },
    {
      path: '/installment',
      name: 'installment',
      hideChildrenInMenu: true,
      component: {
        name: 'RouteView',
        render: (h) => h('router-view')
      },
      redirect: '/installment/list',
      meta: { title: 'Заявки', keepAlive: false },
      children: [
        {
          path: '/installment/list',
          name: 'installment-list',
          component: () => import('../../custom/Installment'),
          meta: { title: 'Заявки', keepAlive: false }
        },
        {
          path: '/installment/list/:id',
          name: 'edit scroing',
          component: () => import('../../custom/Installment/Form'),
          meta: { title: 'форма', keepAlive: true }
        },
        {
          path: '/installment/list/:id/products',
          name: 'products-list',
          component: () => import('../../custom/Installment/Form/Preview.vue'),
          meta: { title: 'форма', keepAlive: true }
        },
        {
          path: '/arrival/list',
          name: 'arrival-list',
          component: () => import('../../custom/Installment'),
          meta: { title: 'Приход', keepAlive: true }
        },
        {
          path: '/successful/list',
          name: 'successful-list',
          component: () => import('../../custom/Installment'),
          meta: { title: 'Успешный', keepAlive: true }
        }
      ]
    },
    {
      path: '/sale',
      name: 'sale',
      hideChildrenInMenu: true,
      component: {
        name: 'RouteView',
        render: (h) => h('router-view')
      },
      redirect: '/sale/list',
      meta: { title: 'Продажа', keepAlive: false },
      children: [
        {
          path: '/sale/list',
          name: 'sale-list',
          component: () => import('../../custom/Sales'),
          meta: { title: 'Продажа', keepAlive: true }
        },
        {
          path: '/sale/list/:id',
          name: 'edit scoring sale',
          component: () => import('../../custom/Sales/Form'),
          meta: { title: 'Продажа', keepAlive: true }
        },
        {
          path: '/sale/list/:id/products',
          name: 'sale-product-list',
          component: () => import('../../custom/Sales/Form/Preview.vue'),
          meta: { title: 'Продажа', keepAlive: true }
        }
      ]
    }
    // {
    //   path: '/clients',
    //   name: 'Clients',
    //   component: {
    //     name: 'RouteView',
    //     render: (h) => h('router-view')
    //   },
    //   redirect: '/clients/list',
    //   meta: { title: 'Clients', keepAlive: true },
    //   hideChildrenInMenu: true,
    //   children: [
    //     {
    //       path: '/clients/list',
    //       name: 'Clients-list',
    //       component: () => import('../../custom/Clients'),
    //       meta: { title: 'Clients', keepAlive: true }
    //     },
    //     {
    //       path: '/clients/list/create',
    //       name: 'new clients',
    //       hidden: true,
    //       component: () => import('../../custom/Clients/Form'),
    //       meta: { title: 'Clients create', keepAlive: true }
    //     },
    //     {
    //       path: '/clients/list/:id',
    //       name: 'edit clients',
    //       component: () => import('../../custom/Clients/Form'),
    //       hidden: true,
    //       meta: { title: 'Редактировать Пос агенты ', keepAlive: true }
    //       // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
    //     }
    //   ]
    // }
    // {
    //   path: '/posAgents',
    //   name: 'PosAgents',
    //   hideChildrenInMenu: true,
    //   component: {
    //     name: 'RouteView',
    //     render: (h) => h('router-view')
    //   },
    //   redirect: '/posAgents/list',
    //   meta: { title: 'Пос агенты', keepAlive: true },
    //   children: [
    //     {
    //       path: '/posAgents/list',
    //       name: 'PosAgents-list',
    //       component: () => import('../../custom/PosAgents'),
    //       meta: { title: 'Пос агенты', keepAlive: true }
    //     },
    //     {
    //       path: '/posAgents/list/new',
    //       name: 'new posAgents',
    //       hidden: true,
    //       component: () => import('../../custom/PosAgents/Form/createPosAgent.vue'),
    //       meta: { title: 'новые Пос агент', keepAlive: true }
    //     },
    //     {
    //       path: '/posAgents/:id/accountList',
    //       name: 'posAgent - accountList',
    //       hidden: true,
    //       component: () => import('../../custom/PosAgents/Preview'),
    //       meta: { title: 'Список аккаунтов', keepAlive: true }
    //     },
    //     {
    //       path: '/posAgents/list/edit/:id',
    //       name: 'edit posAgents',
    //       component: () => import('../../custom/PosAgents/Form'),
    //       hidden: true,
    //       meta: { title: 'Редактировать Пос агенты ', keepAlive: true }
    //       // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
    //     },
    //     {
    //       path: '/posAgents/list/preview/:id',
    //       name: 'preview portfolio',
    //       component: () => import('../../custom/PosAgents/Preview'),
    //       hidden: true,
    //       meta: { title: 'Превью Пос агенты ', keepAlive: true }
    //       // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
    //     }
    //   ]
    // }
  ]
}
export default scoring
