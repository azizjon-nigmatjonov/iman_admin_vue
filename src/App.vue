<template>
  <div>
    <!-- <div v-if="$store.state.Auth.loader" class="overlay">
      <div class="overlay__inner">
        <div class="overlay__content"><span class="spinner"></span></div>
      </div>
    </div> -->
    <a-config-provider :locale="locale">
      <div id="app">
        <router-view/>
      </div>
    </a-config-provider>
  </div>

</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'
export default {
  data () {
    return {
    }
  },
  computed: {
    locale () {
      const { title } = this.$route.meta
      title && (setDocumentTitle(`${i18nRender(title)} - ${domTitle}`))

      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  }
}
</script>
<style scoped>
/* .overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10000;
    background: rgba(53, 53, 53, 0.219);
}

.overlay__inner {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}

.overlay__content {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.spinner {
    width: 75px;
    height: 75px;
    display: inline-block;
    border-width: 2px;
    border-color: rgba(255, 255, 255, 0.404);
    border-top-color: rgb(37, 37, 37);
    animation: spin 1s infinite linear;
    border-radius: 100%;
    border-style: solid;
} */

/* @keyframes spin {
  100% {
    transform: rotate(360deg);
  }
} */
</style>
