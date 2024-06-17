/* eslint-disable no-undef */
import myIcons from '@/core/icons'
const accounts = {
    path: '/accounts',
    name: 'accounts',
    redirect: '/accounts/groups',
    meta: { title: 'Accounts', keepAlive: true, icon: myIcons.accounts, permission: [ 'dashboard' ] },
      children: [
        {
            path: '/accounts/groups',
            name: 'accounts-groups-list',
            hideChildrenInMenu: true,
            component: {
              name: 'RouteView',
              render: (h) => h('router-view')
            },
            redirect: '/accounts/groups/list',
            meta: { title: 'accountGroups', keepAlive: true },
            children: [
                {
                  path: '/accounts/groups/list',
                  name: 'new accounts-groups',
                  component: () => import('../../custom/Accounts/Groups'),
                  meta: { title: 'accountGroups', keepAlive: true }
                },
                {
                  path: '/accounts/groups/new',
                  name: 'new accounts-groups',
                  component: () => import('../../custom/Accounts/Groups/Form'),
                  meta: { title: 'accountGroups', keepAlive: true }
                },
                {
                  path: '/accounts/groups/update',
                  name: 'new accounts-groups',
                  component: () => import('../../custom/Accounts/Groups/Form'),
                  meta: { title: 'accountGroups', keepAlive: true }
                }
            ]
        },
        {
            path: '/accounts/accounts',
            name: 'accounts-accounts-list',
            hideChildrenInMenu: true,
            component: {
              name: 'RouteView',
              render: (h) => h('router-view')
            },
            redirect: '/accounts/accounts/list',
            meta: { title: 'Accounts', keepAlive: true },
            children: [
                {
                  path: '/accounts/accounts/list',
                  name: 'new accounts',
                  component: () => import('../../custom/Accounts/Accounts'),
                  meta: { title: 'Accounts', keepAlive: true }
                },
                {
                  path: '/accounts/accounts/new',
                  name: 'new accounts-accounts',
                  component: () => import('../../custom/Accounts/Accounts/Form'),
                  meta: { title: 'Accounts', keepAlive: true }
                },
                {
                  path: '/accounts/accounts/update',
                  name: 'new accounts-accounts update',
                  component: () => import('../../custom/Accounts/Accounts/Form'),
                  meta: { title: 'Accounts', keepAlive: true }
                }
            ]
        },
        {
            path: '/accounts/payment-gateways',
            name: 'accounts-list',
            hideChildrenInMenu: true,
            component: {
              name: 'RouteView',
              render: (h) => h('router-view')
            },
            redirect: '/accounts/payment-gateways/list',
            meta: { title: 'paymentGateways', keepAlive: true },
            children: [
                {
                  path: '/accounts/payment-gateways/list',
                  name: 'new accounts',
                  component: () => import('../../custom/Accounts/Payment'),
                  meta: { title: 'paymentGateways', keepAlive: true }
                },
                {
                  path: '/accounts/payment-gateways/new',
                  name: 'new accounts-payment',
                  component: () => import('../../custom/Accounts/Payment/Form'),
                  meta: { title: 'paymentGateways', keepAlive: true }
                },
                {
                  path: '/accounts/payment-gateways/update',
                  name: 'new accounts-payment update',
                  component: () => import('../../custom/Accounts/Payment/Form'),
                  meta: { title: 'paymentGateways', keepAlive: true }
                }
            ]
        },
        {
            path: '/accounts/operations',
            name: 'operations-list',
            hideChildrenInMenu: true,
            component: {
              name: 'RouteView',
              render: (h) => h('router-view')
            },
            redirect: '/accounts/operations/list',
            meta: { title: 'operations', keepAlive: true },
            children: [
                {
                  path: '/accounts/operations/list',
                  name: 'new operations-list',
                  component: () => import('../../custom/Accounts/Operations'),
                  meta: { title: 'operations', keepAlive: true }
                }
            ]
        }
    ]
  }

export default accounts
