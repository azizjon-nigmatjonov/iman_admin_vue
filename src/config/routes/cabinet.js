/* eslint-disable no-undef */
const cabinet = {
    path: '/profile',
    name: 'profile',
    hidden: true,
    redirect: '/profile/user',
    meta: { title: 'Profiles', keepAlive: true, icon: 'coffee', permission: [ 'dashboard' ] },
    children: [
      {
        path: '/profile/user',
        name: 'profiles',
        hidden: true,
        component: () => import('../../custom/Cabinet'),
        meta: { title: 'profile', keepAlive: true, icon: 'audit', permission: [ 'dashboard' ] }
      }
      // {
      //   path: '/profile/user',
      //   name: 'profile',
      //   component: { name: 'RouteView', render: (h) => h('router-view') },
      //   meta: { title: 'Profil', keepAlive: true, icon: 'audit', permission: [ 'dashboard' ] },
      //   redirect: '/profiles',
      //   children: [
      //     {
      //       path: '/profiles/another',
      //       name: 'another',
      //       component: () => import('../../custom/UI/EmptyComments.vue'),
      //       meta: { title: 'another', keepAlive: true, icon: 'audit', permission: [ 'dashboard' ] }
      //     }
      //   ]
      // }
    ]
  }

export default cabinet
