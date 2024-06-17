/* eslint-disable no-undef */
import myIcons from '@/core/icons'
const strategy = {
    path: '/strategy',
    name: 'strategy',
    hideChildrenInMenu: true,
    redirect: '/strategy/list',
    meta: { title: 'Стратегия', keepAlive: true, icon: myIcons.strategy, permission: [ 'dashboard' ] },
      children: [
        {
            path: '/strategy/list',
            name: 'strategy-list',
            component: () => import('../../custom/Portfolio'),
            meta: { title: 'Стратегия', keepAlive: true }
        },
      //   {
      //     path: '/portfolio/investorList/:id',
      //     name: 'portfolio-investor-list',
      //     component: () => import('../../custom/Portfolio/Preview'),
      //     meta: { title: 'Портфолио_ pool', keepAlive: true }
      // },
        {
          path: '/strategy/list/new',
          name: 'new strategy',
          component: () => import('../../custom/Portfolio/Form'),
          meta: { title: 'Новое стратегия', keepAlive: true }
        },
        {
          path: '/strategy/list/edit/:id',
          name: 'edit strategy',
          component: () => import('../../custom/Portfolio/Form'),
          hidden: true,
          meta: { title: 'Редактировать стратегия', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/strategy/list/preview/:id',
          name: 'preview strategy',
          component: () => import('../../custom/Portfolio/Prev'),
          hidden: true,
          meta: { title: 'Превью cтратегия', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        }
    ]
  }

export default strategy
