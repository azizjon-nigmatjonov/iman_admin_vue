/* eslint-disable no-undef */
import myIcons from '@/core/icons'
const mudaraba = {
    path: '/mudaraba',
    name: 'mudaraba',
    // hideChildrenInMenu: true,
    redirect: '/mudaraba/list',
    meta: { title: 'Mudaraba', keepAlive: true, icon: myIcons.mudaraba, permission: [ 'dashboard' ] },
      children: [
        {
            path: '/mudaraba/list',
            name: 'mudaraba-list',
            hideChildrenInMenu: true,
            component: {
              name: 'RouteView',
              render: (h) => h('router-view')
            },
            redirect: '/mudaraba/application',
            meta: { title: 'Заявки', keepAlive: true },
            children: [
              {
                path: '/mudaraba/application',
                name: 'mudaraba-input-list',
                component: () => import('../../custom/Mudaraba'),
                meta: { title: 'moneyInput', keepAlive: true }
                // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
              },
              {
                path: '/mudaraba/cash_in/:id',
                name: 'mudaraba-input-detail',
                hidden: true,
                component: () => import('../../custom/Mudaraba/Form'),
                meta: { title: 'mudaraba-detail', keepAlive: true }
              },
              {
                path: '/mudaraba/cash_out/:id',
                name: 'mudaraba-withdrawal-detail',
                hidden: true,
                component: () => import('../../custom/Mudaraba/Form'),
                meta: { title: 'mudaraba-detail', keepAlive: true }
              }
            ]
        },
        // {
        //   path: '/pandl/list',
        //   name: 'pandl-list',
        //   component: () => import('../../custom/Pandl'),
        //   meta: { title: 'P&L', keepAlive: true }
        //   // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        // },
        {
          path: '/investors',
          name: 'invetstors',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/investors/list',
          meta: { title: 'Инвесторы', keepAlive: true },
          children: [
            {
              path: '/investors/list',
              name: 'invetstors-list',
              component: () => import('../../custom/Investors'),
              meta: { title: 'Инвесторы', keepAlive: true }
              // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
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
              path: '/investors/edit/:id',
              name: 'invetstors-edit-preview',
              component: () => import('../../custom/Investors/Form/InvestorsEdit'),
              meta: { title: 'Список инвесторов', keepAlive: true }
            }
          ]
        },
        {
          path: '/news',
          name: 'news',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/news/list',
          meta: { title: 'News', keepAlive: true },
          children: [
            {
              path: '/news/list',
              name: 'news-list',
              component: () => import('../../custom/Mudaraba/SendNotifications/notifcationList.vue'),
              meta: { title: 'Notify investors', keepAlive: true }
            },
            {
              path: '/news/list/new',
              name: 'news-create',
              hidden: true,
              component: () => import('../../custom/Mudaraba/SendNotifications'),
              meta: { title: 'Notify investors', keepAlive: true }
            }
          ]
        },
        {
          path: '/notification',
          name: 'Notify investors',
          hideChildrenInMenu: true,
          component: () => import('../../custom/Mudaraba/Notification.vue'),
          meta: { title: 'Notify investors', keepAlive: true }
        },
        {
          path: '/stories',
          name: 'stories',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/stories/list',
          meta: { title: 'Stories', keepAlive: true },
          children: [
            {
              path: '/stories/list',
              name: 'stories-list',
              component: () => import('../../custom/Mudaraba/Stories/storiesList.vue'),
              meta: { title: 'Stories', keepAlive: true }
            },
            {
              path: '/stories/list/new',
              name: 'stories-create',
              hidden: true,
              component: () => import('../../custom/Mudaraba/Stories/index.vue'),
              meta: { title: 'Stories', keepAlive: true }
            }
          ]
        },

        {
          path: '/advices',
          name: 'advices',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/advices/categories',
          meta: { title: 'Advices', keepAlive: true },
          children: [
            {
              path: '/advices/categories',
              name: 'advices-categories-list',
              component: () => import('../../custom/Mudaraba/Advices/CategoriesList.vue'),
              meta: { title: 'Advices', keepAlive: true }
            },
            {
              path: '/advices/categories/new',
              name: 'advices-categories-create',
              component: () => import('../../custom/Mudaraba/Advices/CategoryForm.vue'),
              meta: { title: 'Advices', keepAlive: true }
            },
            {
              path: '/advices/categories/:id',
              name: 'advices-categories-edit',
              component: () => import('../../custom/Mudaraba/Advices/CategoryForm.vue'),
              meta: { title: 'Advices', keepAlive: true }
            },
            {
              path: '/advices/categories/:categoryId/subcategories',
              name: 'advices-subcategories-list',
              component: () => import('../../custom/Mudaraba/Advices/SubcategoriesList.vue'),
              meta: { title: 'Advices', keepAlive: true }
            },
            {
              path: '/advices/categories/:categoryId/subcategories/new',
              name: 'advices-subcategories-create',
              component: () => import('../../custom/Mudaraba/Advices/SubcategoryForm.vue'),
              meta: { title: 'Advices', keepAlive: true }
            },
            {
              path: '/advices/categories/:categoryId/subcategories/:id',
              name: 'advices-subcategories-edit',
              component: () => import('../../custom/Mudaraba/Advices/SubcategoryForm.vue'),
              meta: { title: 'Advices', keepAlive: true }
            },
            {
              path: '/advices/categories/:categoryId/subcategories/:subcategoryId/list',
              name: 'advices-list',
              component: () => import('../../custom/Mudaraba/Advices/AdvicesList.vue'),
              meta: { title: 'Advices', keepAlive: true }
            },
            {
              path: '/advices/categories/:categoryId/subcategories/:subcategoryId/new',
              name: 'advices-create',
              component: () => import('../../custom/Mudaraba/Advices/AdviceForm.vue'),
              meta: { title: 'Advices', keepAlive: true }
            },
            {
              path: '/advices/categories/:categoryId/subcategories/:subcategoryId/:id',
              name: 'advices-edit',
              component: () => import('../../custom/Mudaraba/Advices/AdviceForm.vue'),
              meta: { title: 'Advices', keepAlive: true }
            }
          ]
        },
        {
          path: '/stocks',
          name: 'stocks',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/stocks/list',
          meta: { title: 'stock', keepAlive: true },
          children: [
            {
              path: '/stocks/list',
              name: 'stocks-list',
              component: () => import('../../custom/Mudaraba/Stocks/index.vue'),
              meta: { title: 'list-stock', keepAlive: true }
            },
            {
              path: '/stocks/new',
              name: 'new-stock-list',
              component: () => import('../../custom/Mudaraba/Stocks/Form/index.vue'),
              meta: { title: 'new-stock', keepAlive: true }
            },
            {
              path: '/stocks/:id',
              name: 'edit-stock-list',
              component: () => import('../../custom/Mudaraba/Stocks/Form/index.vue'),
              meta: { title: 'edit-stock', keepAlive: true }
            }
          ]
        },
        {
          path: '/questions',
          name: 'questions',
          hideChildrenInMenu: true,
          component: {
            name: 'RouteView',
            render: (h) => h('router-view')
          },
          redirect: '/questions/list',
          meta: { title: 'questions', keepAlive: true },
          children: [
            {
              path: '/questions/list',
              name: 'questionss-list',
              component: () => import('../../custom/Mudaraba/Questions/index.vue'),
              meta: { title: 'list-questions', keepAlive: true }
            },
            {
              path: '/questions/new',
              name: 'new-question-list',
              component: () => import('../../custom/Mudaraba/Questions/Form/index.vue'),
              meta: { title: 'new-question', keepAlive: true }
            },
            {
              path: '/questions/:id',
              name: 'edit-question-list',
              component: () => import('../../custom/Mudaraba/Questions/Form/index.vue'),
              meta: { title: 'edit-questions', keepAlive: true }
            }
          ]
        },

        // {
        //   path: '/notify',
        //   name: 'notify',
        //   hideChildrenInMenu: true,
        //   component: () => import('../../custom/Mudaraba/SendNotifications'),
        //   meta: { title: 'Notify investors', keepAlive: true }
        // },
        {
            path: '/portfolio/investorList/:id',
            name: 'portfolio-investor-list',
            hidden: true,
            component: () => import('../../custom/Investments/Preview'),
            meta: { title: 'Портфолио_ pool', keepAlive: true }
        }
    ]
  }

export default mudaraba
