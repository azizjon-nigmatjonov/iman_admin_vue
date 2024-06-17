
/* eslint-disable no-undef */
const portfolio = {
    path: '/posAgents',
    name: 'posAgents',
    hideChildrenInMenu: true,
    redirect: '/posAgents/list',
    meta: { title: 'Пос агенты', keepAlive: true, icon: 'folder-open', permission: [ 'dashboard' ] },
      children: [
        {
            path: '/posAgents/list',
            name: 'PosAgents-list',
            component: () => import('../../custom/PosAgents'),
            meta: { title: 'Список агентов по продажам', keepAlive: true }
        },
      //   {
      //     path: '/portfolio/investorList/:id',
      //     name: 'portfolio-investor-list',
      //     component: () => import('../../custom/Portfolio/Preview'),
      //     meta: { title: 'Портфолио_ pool', keepAlive: true }
      // },
        {
          path: '/posAgents/list/new',
          name: 'new posAgents',
          component: () => import('../../custom/PosAgents/Form/createPosAgent.vue'),
          meta: { title: 'новые Пос агент', keepAlive: true }
      },
      {
        path: '/posAgents/:id/accountList',
        name: 'posAgent - accountList',
        component: () => import('../../custom/PosAgents/Preview'),
        meta: { title: 'Список аккаунтов', keepAlive: true }
    },
      {
        path: '/posAgents/list/edit/:id',
        name: 'edit posAgents',
        component: () => import('../../custom/PosAgents/Form'),
        hidden: true,
        meta: { title: 'Редактировать Пос агенты ', keepAlive: true }
        // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
      },
      {
        path: '/posAgents/list/preview/:id',
        name: 'preview portfolio',
        component: () => import('../../custom/PosAgents/Preview'),
        hidden: true,
        meta: { title: 'Превью Пос агенты ', keepAlive: true }
        // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
      }
    ]
  }

export default portfolio
