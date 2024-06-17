import Categories from './categories'
import roles from './roles'
import myIcons from '@/core/icons'
/* eslint-disable no-undef */
const category = {
    path: '/settings',
    name: 'settings',
    // hideChildrenInMenu: true,
    redirect: '/system/roles',
    meta: { title: 'Настройки', keepAlive: true, icon: myIcons.settings, permission: [ 'dashboard' ] },
    children: [
      {
        path: '/settings/constants',
        name: 'settings-constants',
        hideChildrenInMenu: true,
        component: {
          name: 'RouteView',
          render: (h) => h('router-view')
        },
        redirect: '/settings/constants/list',
        meta: { title: 'Константы', keepAlive: true, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/settings/constants/list',
            name: 'settings-constants-list',
            component: () => import('../../custom/Constants'),
            meta: { title: 'Константы', keepAlive: true }
          },
          {
            path: '/settings/constants/list/new',
            name: 'settings-constants-list-new',
            component: () => import('../../custom/Constants/Form'),
            meta: { title: 'Константы', keepAlive: true }
          },
          {
            path: '/settings/constants/list/:id',
            name: 'settings-constants-list-update',
            component: () => import('../../custom/Constants/Form'),
            meta: { title: 'Константы', keepAlive: true }
          }
        ]
      },
      Categories,
      roles
    ]
  }

export default category
