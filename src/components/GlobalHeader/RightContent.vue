<template>
  <div :class="wrpCls">
    <avatar-dropdown :menu="showMenu" :currentUser="currentUser" :class="prefixCls" />
    <select-lang :class="prefixCls" />
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {}
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  created () {
    let name = { name: 'default' }
    if (this.$store.state.Auth.userInfo) {
    name = typeof (this.$store.state.Auth.userInfo) === 'object'
    ? this.$store.state.Auth.userInfo : JSON.parse(this.$store.state.Auth.userInfo)
    }
    setTimeout(() => {
      this.currentUser = {
        name: name.name || ''
      }
    }, 1000)
  }
}
</script>
