export default {
  navTheme: 'light', // theme for nav menu
  primaryColor: '#01CAB0', // primary color of ant design
  layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fixed', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: true, // sticky header
  fixSiderbar: true, // sticky siderbar
  colorWeak: false,
  menu: {
    locale: true
  },
  title: 'IMAN INVESTOR',
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
  yandexMapApiKey: '3139e085-2545-4b92-8675-de14e4912af4'
}
