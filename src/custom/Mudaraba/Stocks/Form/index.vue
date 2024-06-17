<template>
  <div>
    <a-navigation
      :list="[{ name: $t('stock'), link: `/stocks/list`}, { name: $route.params.id ? $t('edit') : $t('create'), link: ''}]"
      :isBack="{ flag: false }"
      noBorder
    />
    <a-card class="no-border-card no-pt-body-card" v-if="!loading">
      <a-form-model
        :colon="false"
        ref="ruleForm"
        :model="form"
        :rules="rules"
      >
        <!-- ----------DESCRIPTIONS--------------- -->
        <a-row class="form-row" :gutter="16">
          <a-tabs :activeKey="activeTabKey" @change="e => activeTabKey = e">
            <a-tab-pane key="en" :tab="$t('en')">
              <a-col :span="8">
                <a-form-model-item ref="name.en" :label="$t('title_en')" prop="name.en">
                  <a-input
                    :placeholder="$t('title_en')"
                    v-model="form.name.en"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="description.en" :label="$t('description_en')">
                  <ckeditor style="width: 100%" v-model="form.description.en"></ckeditor>
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="short_description.en" :label="$t('short_description_en')">
                  <ckeditor v-model="form.short_description.en"></ckeditor>
                </a-form-model-item>
              </a-col>
            </a-tab-pane>
            <a-tab-pane key="ru" :tab="$t('ru')" forceRender>
              <a-col :span="8">
                <a-form-model-item ref="name.ru" :label="$t('title_ru')" prop="name.ru">
                  <a-input
                    :placeholder="$t('title_ru')"
                    v-model="form.name.ru"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="description.ru" :label="$t('description_ru')">
                  <ckeditor v-model="form.description.ru"></ckeditor>
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="short_description.ru" :label="$t('short_description_ru')">
                  <ckeditor v-model="form.short_description.ru"></ckeditor>
                </a-form-model-item>
              </a-col>
            </a-tab-pane>
            <a-tab-pane key="uz" :tab="$t('uz')" forceRender>
              <a-col :span="8">
                <a-form-model-item ref="name.uz" :label="$t('title_uz')" prop="name.uz">
                  <a-input
                    :placeholder="$t('title_uz')"
                    v-model="form.name.uz"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="description.uz" :label="$t('description_uz')" >
                  <ckeditor v-model="form.description.uz"></ckeditor>
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="short_description.uz" :label="$t('short_description_uz')">
                  <ckeditor v-model="form.short_description.uz"></ckeditor>
                </a-form-model-item>
              </a-col>
            </a-tab-pane>
          </a-tabs>
        </a-row>
        <a-row>
          <a-col span="12">
            <a-form-model-item ref="deadline.uz" :label="$t('Срок')" >
              <a-input v-model.number="form.deadline" min="0" type="number"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col span="12">
            <a-form-model-item ref="min_price" :label="$t('Минимальная цена')" >
              <a-input v-model.number="form.min_price" min="0" type="number"></a-input>
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
              <a-button @click="saveData" :loading="loading" style="width: unset" type="primary">{{ $t('save') }}</a-button>
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
// This page has been copied from the original component

export default {
  data () {
    return {
      loading: false,
      value: 1,
      editorConfig: {
        // The configuration of the editor.
      },
      form: {
        min_price: 0,
        name: {
          en: '',
          ru: '',
          uz: ''
        },
        description: {
          en: '',
          ru: '',
          uz: ''
        },
        short_description: {
          en: '',
          ru: '',
          uz: ''
        },
        deadline: 0
      },
      activeTabKey: 'en',
       rules: {
        'title.ru': [
          { required: true, message: `${this.$t('required')}`, trigger: 'change' }
        ],
        'title.uz': [
          { required: true, message: `${this.$t('required')}`, trigger: 'change' }
        ],
        'title.en': [
          { required: true, message: `${this.$t('required')}`, trigger: 'change' }
        ],
         'description.ru': [
           { required: true, message: `${this.$t('required')}`, trigger: 'change' }
         ],
         'description.uz': [
           { required: true, message: `${this.$t('required')}`, trigger: 'change' }
         ],
         'description.en': [
           { required: true, message: `${this.$t('required')}`, trigger: 'change' }
         ]
      }
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.id) {
      this.getSingleStock(this.$route.params.id)
    }
  },
  methods: {

    getSingleStock (id) {
      this.loading = true
      this.$store.dispatch('getStock', id).then(res => {
        this.form = { ...res.stock }
      })
      .finally(() => {
        this.loading = false
      })
    },
    saveData () {
      if (!this.$isValid(this)) {
        this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
        return -1
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            ...this.form
          }
          if (this.$route.params.id) {
            this.$store.dispatch('putStock', { data, id: this.$route.params.id }).then(res => {
              this.$router.go(-1)
            }).finally(() => {
              this.loading = false
            })
          } else {
            this.$store.dispatch('postStock', data).then(res => {
              this.$router.go(-1)
            }).finally(() => {
              this.loading = false
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.radio__group{
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.hover__img{
  transition: all 0.7s ease;
  padding: 2px;
  height: 100%;
  cursor: pointer;
}
.hover__img:hover{
  background:rgba(31, 31, 31, 0.788);
  height: 100%;
}
.img_layout {
  width: 200px;
  height: 200px;
  object-fit:cover
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 2px;
  color: #666;
}

.notify_style {
  color: #ffffff;
  background: rgb(209, 42, 42);

.ant-notification-notice-message {
  color: rgb(255, 255, 255);
}

}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.114);
  }
  100% {
    transform: scale(1);
  }
}
</style>
