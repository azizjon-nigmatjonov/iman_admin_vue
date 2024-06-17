/* eslint-disable no-undef */
import myIcons from '@/core/icons'
const finance = {
    path: '/wings',
    name: 'wings',
    redirect: '/wings/inquiries',
    meta: { title: 'Wings', keepAlive: true, icon: myIcons.wings, permission: [ 'dashboard' ] },
      children: [
        {
            path: '/wings/inquiries',
            name: 'wings-inquiries-list',
            hideChildrenInMenu: true,
            component: {
              name: 'RouteView',
              render: (h) => h('router-view')
            },
            redirect: '/wings/inquiries/list',
            meta: { title: 'Inquiries', keepAlive: true },
            children: [
                {
                  path: '/wings/inquiries/list',
                  name: 'new wings-inquiries',
                  component: () => import('../../custom/Wings'),
                  meta: { title: 'Inquiries', keepAlive: true }
                },
                {
                  path: '/wings/inquiries/new',
                  name: 'new wings-inquiries create',
                  component: () => import('../../custom/Wings/Form'),
                  meta: { title: 'Inquiries', keepAlive: true }
                },
                {
                  path: '/wings/inquiries/update/:id',
                  name: 'wings-inquiries-update',
                  component: () => import('../../custom/Wings/Form'),
                  meta: { title: 'Inquiries', keepAlive: true }
                }
            ]
        }
    ]
  }

export default finance
