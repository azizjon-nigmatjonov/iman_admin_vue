import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/ru'
// import defaults
import { tableRu } from './Defaults/table'
import { loginRu } from './Defaults/login'
import { buttonRu } from './Defaults/buttons'
import { drawerRu } from './Defaults/drawer'

// import asdasdas
import { courseRu } from './Course'
import { portfolioRu } from './Portfolio'
import { investmentRu } from './Investments'
import { investorsRu } from './Investors'
import { categoryRu } from './Category'
import { bondsRu } from './Bonds'
import { ScoringRu } from './Scoring'
import { MerchantRu } from './merchant'
import { posAgentsRu } from './PosAgents'
import { billingRu } from './Billing'
import { mudarabaRu } from './Mudaraba'
import { accountsRu } from './Accounts'
import { financeRu } from './Finance'
import { wingsRu } from './Wings'
const components = {
  antLocale: antdEnUS,
  momentName: 'eu',
  momentLocale: momentEU
}

const locale = {
  lang: 'ru',
  en: 'Aнглийский',
  ru: 'Русский',
  uz: 'Узбекский',
  enterSystem: 'Войти в систему',
  ...tableRu,
  ...loginRu,
  ...buttonRu,
  ...portfolioRu,
  ...drawerRu,
  ...courseRu,
  ...investmentRu,
  ...investorsRu,
  ...categoryRu,
  ...bondsRu,
  ...ScoringRu,
  ...MerchantRu,
  ...billingRu,
  ...posAgentsRu,
  ...mudarabaRu,
  ...accountsRu,
  ...financeRu,
  ...wingsRu
}

export default {
  ...components,
  ...locale
}
