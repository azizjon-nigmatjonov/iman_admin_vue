<template>
  <div>
    <a-navigation
      :list="[{ name: $t('Notify investors'), link: ''}]"
      :isBack="{ flag: false }"
      noBorder
    />
    <a-card class="no-border-card no-pt-body-card">
      <a-form-model
        :colon="false"
        ref="ruleForm"
        :model="form"
        :rules="rules"
      >
        <a-row class="form-row" :gutter="16">
          <a-col :span="8" >
            <a-form-model-item ref="title.uz" :label="$t('title_uz')" prop="title.uz">
              <a-textarea
                :placeholder="$t('message_uz')"
                v-model="form.title.uz"
                :disabled="$route.params.id"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8" >
            <a-form-model-item ref="title.ru" :label="$t('title_ru')" prop="title.ru">
              <a-textarea
                :placeholder="$t('message_ru')"
                v-model="form.title.ru"
                :disabled="$route.params.id"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8" >
            <a-form-model-item ref="title.en" :label="$t('title_en')" prop="title.en">
              <a-textarea
                :placeholder="$t('message_en')"
                v-model="form.title.en"
                :disabled="$route.params.id"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8" >
            <a-form-model-item ref="status" :label="$t('investor_status')" prop="status">
              <a-select style="width: 100%" v-model="form.status" :allowClear="true">
                <a-select-option v-for="item in statusList" :key="item" :value="item" >
                  {{ $t(item) }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8" >
            <a-form-model-item ref="date" :label="$t('period')" prop="date">
              <a-range-picker
                style="width: 100%"
                :format="'YYYY-MM-DD'"
                :show-time="{
                  hideDisabledOptions: false
                }"
                v-model="form.date"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row class="edit-btns mt-4">
          <a-col span="24">
            <a-form-model-item>
              <a-row type="flex" justify="end">
                <a-col span="auto">
                  <a-button @click="sendNotification" :loading="loading" style="width: unset" type="primary">{{ $t('send notification') }}</a-button>
                </a-col>
              </a-row>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      form: {
        date: [null, null],
        status: null,
        title: {
          en: '',
          ru: '',
          uz: ''
        }
      },
      rules: {
        'title.en': [
          { required: true, message: `${this.$t('please_fill')} ${this.$t('message_en').toLowerCase()}`, trigger: 'change' }
        ],
        'title.ru': [
          { required: true, message: `${this.$t('please_fill')} ${this.$t('message_ru').toLowerCase()}`, trigger: 'change' }
        ],
        'title.uz': [
          { required: true, message: `${this.$t('please_fill')} ${this.$t('message_uz').toLowerCase()}`, trigger: 'change' }
        ],
        'status': [
          { required: true, message: ` `, trigger: 'change' }
        ]
      },
      statusList: ['in_process', 'new', 'cancelled', 'confirmed', 'current', 'left']
    }
  },
  mounted () {
  },
  methods: {
    sendNotification () {
      if (!this.$isValid(this)) {
        this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
        this.findTab()
        return -1
      }
      const form = this.form
      this.$store.dispatch('sendNotification', form).then(res => {
        this.$alertMessage('success', 'Message', this.resend ? 'Message successfully resent to investors' : 'Message successfully sent to investors', this)
        this.form = {
          date: [null, null],
          status: null,
          title: {
            en: '',
            ru: '',
            uz: ''
          }
        }
      })
      .finally(() => {
        this.loading = false
      })
    },
    getStatus () {
      this.$store.dispatch('getStatuses', { 'is_cash_out': this.type === 'cash_out' }).then(res => {
          this.statusList = res.statuses
      })
    }
  }
}
</script>
