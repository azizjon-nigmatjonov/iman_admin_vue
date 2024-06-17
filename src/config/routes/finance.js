/* eslint-disable no-undef */
// import myIcons from '@/core/icons'
const finance = {
    path: '/finance',
    name: 'finance',
    redirect: '/finance/expenses',
    meta: { title: 'Finance', keepAlive: true, icon: 'money-collect', permission: [ 'dashboard' ] },
      children: [
        {
          path: '/finance/expenses',
          name: 'finance-costs-list',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/finance/expenses/list',
          meta: { title: 'Expenses', keepAlive: true },
          children: [
            {
              path: '/finance/expenses/list',
              name: 'new finance-costs',
              component: () => import('../../custom/Finance/Costs'),
              meta: { title: 'Expenses', keepAlive: true }
            },
            {
              path: '/finance/expenses/new',
              name: 'new finance-costs create',
              component: () => import('../../custom/Finance/Costs/Shared'),
              meta: { title: 'Expenses', keepAlive: true }
            },
            {
              path: '/finance/expenses/update/:id',
              name: 'finance-costs update',
              component: () => import('../../custom/Finance/Costs/Shared'),
              meta: { title: 'Expenses', keepAlive: true }
            }
          ]
        },
        {
          path: '/finance/income',
          name: 'finance-income-list',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/finance/income/list',
          meta: { title: 'Incomes', keepAlive: true },
          children: [
            {
              path: '/finance/income/list',
              name: 'new finance-Income',
              component: () => import('../../custom/Finance/Income'),
              meta: { title: 'Incomes', keepAlive: true }
            },
            {
              path: '/finance/income/new',
              name: 'new finance-Income create',
              component: () => import('../../custom/Finance/Income/Form'),
              meta: { title: 'Incomes', keepAlive: true }
            },
            {
              path: '/finance/income/update/:id',
              name: 'finance-Income update',
              component: () => import('../../custom/Finance/Income/Form'),
              meta: { title: 'Incomes', keepAlive: true }
            }
          ]
        },
        {
            path: '/finance/pandl',
            name: 'finance-pandl-list',
            hideChildrenInMenu: true,
            component: {
              name: 'RouteView',
              render: (h) => h('router-view')
            },
            redirect: '/finance/pandl/list',
            meta: { title: 'P&L', keepAlive: true },
            children: [
                {
                  path: '/finance/pandl/list',
                  name: 'new finance-pandl',
                  component: () => import('../../custom/Finance/P&L'),
                  meta: { title: 'P&L', keepAlive: true }
                },
                {
                  path: '/finance/pandl/new',
                  name: 'new finance-pandl create',
                  component: () => import('../../custom/Finance/P&L/Form'),
                  meta: { title: 'P&L', keepAlive: true }
                },
                {
                  path: '/finance/pandl/update',
                  name: 'new finance-pandl update',
                  component: () => import('../../custom/Finance/P&L/Form'),
                  meta: { title: 'P&L', keepAlive: true }
                }
            ]
        },
        // {
        //     path: '/finance/gl',
        //     name: 'finance-gl-list',
        //     hideChildrenInMenu: true,
        //     component: {
        //       name: 'RouteView',
        //       render: (h) => h('router-view')
        //     },
        //     redirect: '/finance/gl/list',
        //     meta: { title: 'GL', keepAlive: true },
        //     children: [
        //         {
        //           path: '/finance/gl/list',
        //           name: 'new GL',
        //           component: () => import('../../custom/Finance/GL'),
        //           meta: { title: 'GL', keepAlive: true }
        //         },
        //         {
        //           path: '/finance/gl/new',
        //           name: 'new finance-GL create',
        //           component: () => import('../../custom/Finance/GL/Form'),
        //           meta: { title: 'GL', keepAlive: true }
        //         },
        //         {
        //           path: '/finance/gl/update',
        //           name: 'new finance-GL update',
        //           component: () => import('../../custom/Finance/GL/Form'),
        //           meta: { title: 'GL', keepAlive: true }
        //         }
        //     ]
        // },
        {
          path: '/finance/gl/list',
          name: 'new GL ',
          component: () => import('../../custom/Finance/GL/Static.vue'),
          meta: { title: 'GL ', keepAlive: true }
        },
        {
          path: '/finance/shared/update/:id',
          name: 'update_shared',
          hidden: true,
          component: () => import('../../custom/Finance/Shared'),
          meta: { title: 'GL ', keepAlive: false }
        },
        {
          path: '/closed-months',
          name: 'closed-months',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/closed-months/list',
          meta: { title: 'closedMonths', keepAlive: true },
          children: [
            {
              path: '/closed-months/list',
              name: 'closed-months-list',
              component: () => import('../../custom/ClosedMonths'),
              meta: { title: 'closedMonths', keepAlive: true }
              // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
            },
            {
                path: '/closed-months/preview/:id/:date',
                name: 'closed-months-preview',
                hidden: true,
                component: () => import('../../custom/ClosedMonths/Form'),
                meta: { title: 'closedMonths', keepAlive: true }
                // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
            }
          ]
        },
        {
          path: '/finance/treasury',
          name: 'finance-treasury-list',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/finance/treasury/list',
          meta: { title: 'TreasuryDep', keepAlive: true },
          children: [
            {
              path: '/finance/treasury/list',
              name: 'new finance-treasury',
              component: () => import('../../custom/Finance/TreasuryDep'),
              meta: { title: 'TreasuryDep', keepAlive: true }
            },
            {
              path: '/finance/treasury/cashin/new',
              name: 'new finance-treasury-cashin create',
              component: () => import('../../custom/Finance/TreasuryDep/CashIn'),
              meta: { title: 'TreasuryDep', keepAlive: true }
            },
            {
              path: '/finance/treasury/cashin/:id',
              name: 'new finance-treasury-cashin create',
              component: () => import('../../custom/Finance/TreasuryDep/CashIn'),
              meta: { title: 'TreasuryDep', keepAlive: true }
            },
            {
              path: '/finance/treasury/cashout/new',
              name: 'new finance-treasury-cashout create',
              component: () => import('../../custom/Finance/TreasuryDep/CashOut'),
              meta: { title: 'TreasuryDep', keepAlive: true }
            },
            {
              path: '/finance/treasury/cashout/:id',
              name: 'new finance-treasury-cashout update',
              component: () => import('../../custom/Finance/TreasuryDep/CashOut'),
              meta: { title: 'TreasuryDep', keepAlive: true }
            }
          ]
        },
        {
          path: '/finance/partners',
          name: 'finance-partners-list',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/finance/partners/list',
          meta: { title: 'Partners', keepAlive: true },
          children: [
            {
              path: '/finance/partners/list',
              name: 'new finance-partners',
              component: () => import('../../custom/Partners'),
              meta: { title: 'Partners', keepAlive: true }
            },
            {
              path: '/finance/partners/new',
              name: 'new finance-partners create',
              component: () => import('../../custom/Partners/Form'),
              meta: { title: 'Partners', keepAlive: true }
            },
            {
              path: '/finance/partners/:id',
              name: 'finance-partners update',
              component: () => import('../../custom/Partners/Form'),
              meta: { title: 'Partners', keepAlive: true }
            }
          ]
        }
    ]
  }

export default finance
