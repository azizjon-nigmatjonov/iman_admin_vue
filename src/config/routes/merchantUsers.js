
/* eslint-disable no-undef */
import myIcons from '@/core/icons'
const category = {
    path: '/merchants',
    name: 'merchants',
    hideChildrenInMenu: false,
    redirect: '/merchants/list',
    meta: { title: 'Торговцы', keepAlive: true, icon: myIcons.sellers, permission: [ 'dashboard' ] },
      children: [
        {
          path: '/merchants/list',
          name: 'merchants-list',
          component: () => import('../../custom/Merchants'),
          meta: { title: 'Список торговцов', keepAlive: true }
        },
        {
          path: '/merchants/list/new',
          name: 'new-category',
          hidden: true,
          component: () => import('../../custom/Merchants/Form/createMerchant.vue'),
          meta: { title: 'New Торговцы', keepAlive: true }
        },
        {
          path: '/merchants/list/edit/:id',
          name: 'edit-merchant',
          hidden: true,
          component: () => import('../../custom/Merchants/Form'),
          meta: { title: 'Edit Торговцы', keepAlive: true }
        },
        {
          path: '/merchants/list/:id/transactions',
          name: 'transactions-merchant',
          hidden: true,
          component: () => import('../../custom/Merchants/MerchantTransactions/merchantTransaction.vue'),
          meta: { title: 'Сделки', keepAlive: true }
        },
        {
          path: '/merchants/list/:id/products',
          name: 'transactions-merchant-products',
          hidden: true,
          component: () => import('../../custom/Merchants/Product'),
          meta: { title: 'Сделки', keepAlive: true }
        },
        {
          path: '/posAgent/:id/:action',
          name: 'create-pos-agent',
          hidden: true,
          component: () => import('../../custom/Merchants/posAgent/Form'),
          meta: { title: 'Сделки', keepAlive: true }
        }
    ]
  }

export default category
