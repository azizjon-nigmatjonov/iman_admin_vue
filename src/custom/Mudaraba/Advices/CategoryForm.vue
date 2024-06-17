<template>
  <div>
    <a-navigation
      :list="[{ name: $t('Categories'), link: `/advices/categories`}, { name: $route.params.id ? $t('edit') : $t('create'), link: ''}]"
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
          <a-col :span="8">
            <a-form-model-item ref="title.en" :label="$t('title_en')" prop="title.en">
              <a-input
                :placeholder="$t('title_en')"
                v-model="form.title.en"
                :disabled="disable"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="title.ru" :label="$t('title_ru')" prop="title.ru">
              <a-input
                :placeholder="$t('title_ru')"
                v-model="form.title.ru"
                :disabled="disable"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="title.uz" :label="$t('title_uz')" prop="title.uz">
              <a-input
                :placeholder="$t('title_uz')"
                v-model="form.title.uz"
                :disabled="disable"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-row class="edit-btns mt-4" v-if="!$route.query.id">
      <a-col span="24">
        <a-form-model-item>
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button @click="saveCategory" :loading="loading" style="width: unset" type="primary">{{ $t('save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row class="edit-btns mt-4" v-else>
      <a-col span="24">
        <a-form-model-item>
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button @click="saveCategory" :loading="loading" style="width: unset" type="primary">{{ $t('save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      form: {
        title: {
          en: '',
          ru: '',
          uz: ''
        }
      },
       rules: {
        'title.ru': [
          { required: true, message: `${this.$t('required')}`, trigger: 'change' }
        ],
        'title.uz': [
          { required: true, message: `${this.$t('required')}`, trigger: 'change' }
        ],
        'title.en': [
          { required: true, message: `${this.$t('required')}`, trigger: 'change' }
        ]
      }
    }
  },
  created () {
    if (this.$route.params && this.$route.params.id) {
      this.getCategoryDetail()
    }
  },
  methods: {
    getCategoryDetail () {
      this.$store.dispatch('getCategoryDetail', this.$route.params.id).then(res => {
        console.log(res)
        this.form.title = res.title
      })
      .finally(() => {
        this.loading = false
      })
    },
    saveCategory () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.$route.params.id) {
            this.$store.dispatch('updateAdviceCategory', { data: this.form, id: this.$route.params.id }).then(res => {
              console.log(res)
              this.$router.push(`/advices/categories`)
            }).finally(() => {
              this.loading = false
            })
          } else {
            this.$store.dispatch('createAdviceCategory', this.form).then(res => {
              console.log(res)
              this.$router.push(`/advices/categories`)
            }).finally(() => {
              this.loading = false
            })
          }
        }
      })
    },
    handleSubmit (e) {
      console.log(e)
    }
  }
}
</script>

<style>

</style>
