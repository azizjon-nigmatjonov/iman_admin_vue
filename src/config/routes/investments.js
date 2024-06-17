/* eslint-disable no-undef */
const invest = {
    path: '/investments',
    name: 'invest',
    // hideChildrenInMenu: true,
    redirect: '/investments/list',
    meta: { title: 'Музораба', keepAlive: true, icon: 'folder-open', permission: [ 'dashboard' ] },
      children: [
        {
            path: '/investments/list',
            name: 'investment-list',
            component: () => import('../../custom/Investments'),
            meta: { title: 'Потраченные деньги', keepAlive: true }
            // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/investment/pools',
          name: 'investment-pools',
          component: () => import('../../custom/Investments/Form'),
          meta: { title: 'Доступные деньги', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/investors/list',
          name: 'invetstors-list',
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/investors/list/all',
          meta: { title: 'Инвесторы', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
          // children: [
          //   {
          //     path: '/investors/list/all',
          //     name: 'invetstors-list-all',
          //     component: () => import('../../custom/Investors'),
          //     meta: { title: 'Все', keepAlive: true }
          //   },
          //   {
          //     path: '/investors/list/in_process',
          //     name: 'invetstors-list-in_process',
          //     component: () => import('../../custom/Investors'),
          //     meta: { title: 'В Обработке', keepAlive: true }
          //   },
          //   {
          //     path: '/investors/list/new',
          //     name: 'invetstors-list-new',
          //     component: () => import('../../custom/Investors'),
          //     meta: { title: 'Новые', keepAlive: true }
          //   },
          //   {
          //     path: '/investors/list/current',
          //     name: 'invetstors-list-current',
          //     component: () => import('../../custom/Investors'),
          //     meta: { title: 'Текушие', keepAlive: true }
          //   },
          //   {
          //     path: '/investors/list/left',
          //     name: 'invetstors-list-left',
          //     component: () => import('../../custom/Investors'),
          //     meta: { title: 'Вышедшие', keepAlive: true }
          //   }
          // ]
        },
        {
            path: '/investors/preview/:id',
            name: 'invetstors-preview',
          hidden: true,
            component: () => import('../../custom/Investors/Form'),
            meta: { title: 'Список инвесторов', keepAlive: true }
            // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
            path: '/portfolio/investorList/:id',
            name: 'portfolio-investor-list',
            hidden: true,
            component: () => import('../../custom/Investments/Preview'),
            meta: { title: 'Портфолио_ pool', keepAlive: true }
        }
      //   {
      //     path: '/investments/list',
      //     name: 'invetst',
      //     component: () => import('../../custom/Investments'),
      //     meta: { title: 'Список инвестиций', keepAlive: true }
      //     // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
      // }
    ]
  }

export default invest
