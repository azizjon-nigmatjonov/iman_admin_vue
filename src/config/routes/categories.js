
/* eslint-disable no-undef */
const category = {
    path: '/category',
    name: 'category',
    // hideChildrenInMenu: true,
    component: {
      name: 'RouteView',
      render: (h) => h('router-view')
    },
    redirect: '/category/list',
    meta: { title: 'Спаравочники', keepAlive: true, permission: [ 'dashboard' ] },
      children: [
        {
            path: '/category/list',
            name: 'category-list',
            component: () => import('../../custom/Category'),
            meta: { title: 'Список категорий', keepAlive: true }
            // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/category/list/new',
          name: 'new-category',
          hidden: true,
          component: () => import('../../custom/Category/Form'),
          meta: { title: 'Новая категория', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
      },
      {
        path: '/category/list/edit/:id',
        name: 'edit-category',
        hidden: true,
        component: () => import('../../custom/Category/Form'),
        meta: { title: 'Изменить категорию', keepAlive: true }
        // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
    }
    ]
  }

export default category
