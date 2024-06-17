a<template>
  <div>
    <a-navigation :list="[{ name: $t('Inquiries'), link: '' }]" :isBack="{ flag: true, link: '/wings/inquiries/list', return: true }" noBorder/>
    <a-card class="no-space-tab">
      <a-tabs v-model="activeTab" class="no-margin-bar">
        <a-tab-pane key="1" :tab="$t('Запрос')">
          <a-card class="no-border-card">
            <pre>
                {{ data.internal_request }}
            </pre>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('Ответ')">
          <a-card class="no-border-card">
            {{ data.wings_response }}
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
// import { delete } from 'node_modules/vue/types/umd'
import imageUpload from '@/mixins/imageUpload'
export default {
  mixins: [imageUpload],
  data () {
    return {
        loading: false,
        data: {},
        activeTab: '1'
    }
  },
  mounted () {
    this.getInquiry()
  },
  methods: {
    getInquiry () {
      this.loading = true
      this.$store.dispatch('getInquiryData', { id: this.$route.params.id })
      .then(res => {
          this.data = res
      })
      .finally(() => {
          this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.first {
  margin-bottom: 30px;
  overflow: hidden;
}
.buttons {
  display: flex;
  justify-content: flex-end;
}
.mx {
  margin: 0 5px;
}
.balance {
  margin-left: auto;
  margin: 5px;
  display: flex;
  justify-content: flex-end;
}
.imageClass {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
