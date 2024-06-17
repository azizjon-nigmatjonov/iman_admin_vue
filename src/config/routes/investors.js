/* eslint-disable no-undef */
const investors = {
    path: '/investors',
    name: 'investors',
    hideChildrenInMenu: true,
    redirect: '/investors/list',
    meta: { title: 'Инвесторы', keepAlive: true, icon: 'folder-open', permission: [ 'dashboard' ] },
      children: [
        {
            path: '/investors/list',
            name: 'invetstors-list',
            component: () => import('../../custom/Investors'),
            meta: { title: 'Список инвесторов', keepAlive: true }
            // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/investors/preview/:id',
          name: 'invetstors-preview',
          component: () => import('../../custom/Investors/Form'),
          meta: { title: 'Список инвесторов', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        }
    ]
  }

export default investors
