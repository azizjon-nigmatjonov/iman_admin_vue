/* eslint-disable no-undef */
const category = {
    path: '/branches',
    name: 'branches',
    hidden: true,
     hideChildrenInMenu: true,
    redirect: '/branches/list',
    meta: { title: ' филиалы', keepAlive: true, icon: 'folder-open', permission: [ 'dashboard' ] },
      children: [
        {
            path: '/branches/list/:id',
            name: 'branches-list',
            component: () => import('../../custom/Branches'),
            meta: { title: 'филиалы', keepAlive: true }
            // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/branches/list/:id/new',
          name: 'new-branch',
          hidden: true,
          component: () => import('../../custom/Branches/Form'),
          meta: { title: 'Новая филиал', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
      },
      {
        path: '/branches/list/:id/edit/:branch_id',
        name: 'edit-branch',
        hidden: true,
        component: () => import('../../custom/Branches/Form'),
        meta: { title: 'Изменить филиал', keepAlive: true }
        // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
    },
    {
      path: '/posAgents',
      name: 'PosAgents',
      hideChildrenInMenu: true,
      component: {
        name: 'RouteView',
        render: (h) => h('router-view')
      },
      redirect: '/posAgents/list',
      meta: { title: 'Пос агенты', keepAlive: true },
      children: [
        {
          path: '/posAgents/list',
          name: 'PosAgents-list',
          component: () => import('../../custom/PosAgents'),
          meta: { title: 'Пос агенты', keepAlive: true }
        },
        {
          path: '/posAgents/list/new',
          name: 'new posAgents',
          hidden: true,
          component: () => import('../../custom/PosAgents/Form/createPosAgent.vue'),
          meta: { title: 'новые Пос агент', keepAlive: true }
        },
        {
          path: '/posAgents/:id/accountList',
          name: 'posAgent - accountList',
          hidden: true,
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
    ]
  }

export default category
