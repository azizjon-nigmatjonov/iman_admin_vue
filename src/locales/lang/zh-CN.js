import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': 'menu home',
  'menu.dashboard': 'menu dashboard',
  'menu.dashboard.analysis': 'menu dashboard analysis',
  'menu.dashboard.monitor': 'menu dashboard monitor',
  'menu.dashboard.workplace': 'menu dashboard workplace'
}

export default {
  ...components,
  ...locale
}
