import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'
// import custom langs
import { portfolioEn } from './Portfolio'
import { investmentEn } from './Investments'
import { investorsEn } from './Investors'
import { categoryEn } from './Category'
import { bondsEn } from './Bonds'
import { ScoringEn } from './Scoring'
import { MerchantEn } from './merchant'
import { billingEn } from './Billing'
import { posAgentsEn } from './PosAgents'
import { mudarabaEn } from './Mudaraba'
import { accountsEn } from './Accounts'
import { financeEn } from './Finance'
import { wingsEn } from './Wings'
const components = {
  antLocale: antdEnUS,
  momentName: 'eu',
  momentLocale: momentEU
}
const locale = {
  lang: 'en',
  en: 'English',
  ru: 'Russian',
  uz: 'Uzbek',
  enterSystem: 'Enter the system',
  ...portfolioEn,
  ...investmentEn,
  ...investorsEn,
  ...categoryEn,
  ...bondsEn,
  ...ScoringEn,
  ...MerchantEn,
  ...billingEn,
  ...posAgentsEn,
  ...mudarabaEn,
  ...accountsEn,
  ...financeEn,
  ...wingsEn
}

export default {
  ...components,
  ...locale
}
