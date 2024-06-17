/* eslint-disable no-undef */
const bonds = {
    path: '/bonds',
    name: 'bonds',
    hideChildrenInMenu: true,
    redirect: '/bonds/list',
    meta: { title: 'Облигации', keepAlive: true, icon: 'folder-open', permission: [ 'dashboard' ] },
      children: [
        {
            path: '/bonds/list',
            name: 'Облигации_',
            component: () => import('../../custom/Bonds'),
            meta: { title: 'Облигации_', keepAlive: true }
            // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/bonds/list/preview/:id',
          name: 'preview bond',
          component: () => import('../../custom/Bonds/Preview'),
          hidden: true,
          meta: { title: 'Просмотр облигация', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        }
    ]
  }

export default bonds
