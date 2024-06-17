
/* eslint-disable no-undef */
const roles = {
    path: '/system',
    name: 'system',
    redirect: '/system/list',
    component: {
      name: 'RouteView',
      render: (h) => h('router-view')
    },
    meta: { title: 'Управление доступом', keepAlive: true, permission: [ 'dashboard' ] },
      children: [
        {
            path: '/system/roles',
            name: 'roles-list',
            component: () => import('../../custom/System/Roles'),
            meta: { title: 'Роли', keepAlive: true }
            // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/system/roles/new',
          name: 'role-new',
          hidden: true,
          component: () => import('../../custom/System/Roles/Form'),
          meta: { title: 'Список разрешений', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
      },
      {
        path: '/system/roles/:id',
        name: 'role-edit',
        hidden: true,
        component: () => import('../../custom/System/Roles/Form'),
        meta: { title: 'Role edit', keepAlive: true }
        // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/system/roles/assign-permission/:id',
          name: 'role-permissions',
          hidden: true,
          component: () => import('../../custom/System/Roles/UserPermissions'),
          meta: { title: 'Назначить разрешение', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
          },
        {
            path: '/system/system-users',
            name: 'system-users-list',
            component: () => import('../../custom/System/SystemUser'),
            meta: { title: 'Список пользователей', keepAlive: true }
            // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/system/system-users/new-user',
          name: 'system-users-new',
          hidden: true,
          component: () => import('../../custom/System/SystemUser/Form'),
          meta: { title: 'new пользователей', keepAlive: false }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/system/system-users/:id',
          name: 'system-users-edit',
          hidden: true,
          component: () => import('../../custom/System/SystemUser/Form'),
          meta: { title: 'edit пользователей', keepAlive: false }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        }
      //   {
      //       path: '/system/permissions',
      //       name: 'permissions-list',
      //       component: () => import('../../custom/System/Permissions'),
      //       meta: { title: 'Список разрешений', keepAlive: true }
      //       // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
      //   },
      //   {
      //     path: '/system/permissions/new',
      //     name: 'permissions-list',
      //     hidden: true,
      //     component: () => import('../../custom/System/Permissions/Form'),
      //     meta: { title: 'Список разрешений', keepAlive: true }
      //     // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
      // },
      // {
      //   path: '/system/permissions/:id',
      //   name: 'permissions-list',
      //   hidden: true,
      //   component: () => import('../../custom/System/Permissions/Form'),
      //   meta: { title: 'Список разрешений', keepAlive: true }
      //   // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
      // }
        // {
        //   path: '/scoring/list/new',
        //   name: 'new scroing',
        //   hidden: true,
        //   component: () => import('../../custom/Scoring/Form'),
        //   meta: { title: 'Новая форма', keepAlive: false }
        // },
        // {
        //   path: '/scoring/list/:id',
        //   name: 'edit scroing',
        //   hidden: true,
        //   component: () => import('../../custom/Scoring/Form'),
        //   meta: { title: 'форма', keepAlive: false }
        // }
    ]
  }
export default roles
