
// import investments from './investments'
// import investors from './investors'
import strategy from './strategy'
// import Categories from './categories'
import installment from './installment'
// import roles from './roles'
import settings from './settings'
import merchantUsers from './merchantUsers'
// import posAgents from './posAgents'
import branches from './branches'
import cabinet from './cabinet'
import mudaraba from './mudaraba'
import accounts from './accounts'
import finance from './finance'
// import wings from './wings'
const children = [
  strategy,
  installment,
  // investments,
  mudaraba,
  merchantUsers,
  accounts,
  finance,
  // wings,
  settings,
  // roles,
  // Categories,
  // posAgents,
  cabinet,
  branches

]

export default children.map(el => ({ ...el,
component: {
    name: 'RouteView',
    render: (h) => h('router-view')
  }
}))
