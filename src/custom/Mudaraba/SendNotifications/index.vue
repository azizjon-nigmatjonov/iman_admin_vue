<template>
  <div>
    <a-navigation
      :list="[{ name: $t('News'), link: ''}]"
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
          <a-tabs :activeKey="activeTabKey" @change="e => activeTabKey = e">
            <a-tab-pane key="en" :tab="$t('en')">
              <a-col :span="8">
                <a-form-model-item ref="title.en" :label="$t('title_en')" prop="title.en">
                  <a-textarea
                    :placeholder="$t('message_en')"
                    v-model="form.title.en"
                    :disabled="$route.params.id"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="content.en" :label="$t('message_en')" prop="content.en">
                  <vue-editor :editor-toolbar="customToolbar" v-model="form.content.en" @text-change="onChange($event, 'en')"></vue-editor>
                </a-form-model-item>
              </a-col>
            </a-tab-pane>
            <a-tab-pane key="ru" :tab="$t('ru')" forceRender>
              <a-col :span="8">
                <a-form-model-item ref="title.ru" :label="$t('title_ru')" prop="title.ru">
                  <a-textarea
                    :placeholder="$t('message_ru')"
                    v-model="form.title.ru"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="content.ru" :label="$t('message_ru')" prop="content.ru">
                  <vue-editor :editor-toolbar="customToolbar" v-model="form.content.ru" @text-change="onChange($event, 'ru')"></vue-editor>
                </a-form-model-item>
              </a-col>
            </a-tab-pane>
            <a-tab-pane key="uz" :tab="$t('uz')" forceRender>
              <a-col :span="8">
                <a-form-model-item ref="title.uz" :label="$t('title_uz')" prop="title.uz">
                  <a-textarea
                    :placeholder="$t('message_uz')"
                    v-model="form.title.uz"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="content.uz" :label="$t('message_uz')" prop="content.uz">
                  <vue-editor :editor-toolbar="customToolbar" v-model="form.content.uz" @text-change="onChange($event, 'uz')"></vue-editor>
                </a-form-model-item>
              </a-col>
            </a-tab-pane>
          </a-tabs>
          <a-col :span="12">
            <a-form-model-item ref="fileList" :label="$t('picture')" prop="files">
              <a-upload
                :customRequest="uploadImage"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div>
                  <a-icon :type="uploadingImage ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                <img :alt="previewImage" style="width: 100%" :src="previewImage" />
              </a-modal>
            </a-form-model-item>
          </a-col>
          <a-col :span="12" v-if="!$route.query.id">
            <a-form-model-item :label="$t('statuses')"  prop="statuses">
              <a-select
                mode="multiple"
                placeholder="Select statuses"
                v-model="selectedItems"
                style="width: 100%"
                @change="changeStatus"
              >
                <a-select-option v-for="item in filteredOptions" :key="item" :value="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-row class="edit-btns mt-4">
      <a-col span="24">
        <a-form-model-item>
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button @click="sendNotificationToInvestors" :loading="loading" style="width: unset" type="primary">{{ resend ? $t('delete and resend') : $t('send news') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  data () {
    return {
      resend: !!this.$route.query.id,
      loading: false,
      statuses: ['in_process', 'new', 'cancelled', 'confirmed', 'current', 'all'],
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ['bold', 'italic', 'underline', 'strike', 'link'], // toggled buttons
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' }
        ],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ color: [] }, { background: [] }]
      ],
      fileList: [],
      activeTabKey: 'en',
      previewImage: '',
      previewVisible: false,
      uploadingImage: false,
      form: {
        description: {
          en: '',
          ru: '',
          uz: ''
        },
        content: {
          en: '',
          ru: '',
          uz: ''
        },
        files: [],
        statuses: [],
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
        'content.en': [
          { required: true, message: `${this.$t('please_fill')} ${this.$t('message_en').toLowerCase()}`, trigger: 'change' }
        ],
        'content.ru': [
          { required: true, message: `${this.$t('please_fill')} ${this.$t('message_ru').toLowerCase()}`, trigger: 'change' }
        ],
        'content.uz': [
          { required: true, message: `${this.$t('please_fill')} ${this.$t('message_uz').toLowerCase()}`, trigger: 'change' }
        ],
        'files': [
          { required: true, message: this.$t('required'), trigger: 'change' }
        ],
         'statuses': [
           { required: true, message: this.$t('required'), trigger: 'change' }
         ]
      }
    }
  },
  mounted () {
    if (this.$route.query && this.$route.query.id) {
      this.getNotificationDetail()
    }
  },
  methods: {
    changeStatus (selectedItems) {
      this.form.statuses = selectedItems
    },
    onChange (e, lang) {
      // console.log(e, lang)
      const description = this.form.description[lang].split('') || []
      if (e.ops.length === 1) {
        if (Object.keys(e.ops[0]).includes('delete')) {
          description.splice(0, e.ops[0].delete)
        } else if (Object.keys(e.ops[0]).includes('insert')) {
          description.splice(0, 0, e.ops[0].insert)
        }
      } else {
        if (Object.keys(e.ops[1]).includes('delete')) {
          description.splice(e.ops[0].retain, e.ops[1].delete)
        } else if (Object.keys(e.ops[1]).includes('insert')) {
          description.splice(e.ops[0].retain, 0, e.ops[1].insert)
        }
      }
      this.form.description[lang] = description.join('')
    },
    async uploadImage (data) {
        this.uploadingImage = true
        const formData = new FormData()
        formData.append('file', data.file)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('uploadImage', formData).then(res => {
          console.log(res)
          this.fileList[0] = {
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
          }
          this.form.files[0] = {
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
          }
          console.log(this.fileList)
        }).catch(err => console.log(err))
        .finally(() => {
          this.uploadingImage = false
        })
    },
    handleChange ({ fileList, file }) {
      if (file.status === 'uploading') {
        return
      }
      this.fileList = [ ...fileList[0] ] || []
      this.form.files = [ ...fileList[0] ] || []
      if (file.status === 'done') {
        this.form.files = [ ...fileList[0] ] || []
      }
    },
    async handlePreview (file) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
    },
    getNotificationDetail () {
      this.loading = true
      this.$store.dispatch('getNotificationDetail', this.$route.query.id).then(res => {
        this.form.title = res.news.title
        this.form.description = res.news.description
        this.form.content = res.news.content
        this.form.files = res.news.files
        this.fileList = res.news.files.filenames.map(item => {
          return { uid: item.split('/').pop(), url: item, status: 'done', name: item }
        })
        // this.form.user_id = this.$store.info.id
      })
      .finally(() => {
        this.loading = false
      })
    },
    findTab () {
      if (!this.form.title.en || !this.form.description.en) {
        this.activeTabKey = 'en'
      } else if (!this.form.title.ru || !this.form.description.ru) {
        this.activeTabKey = 'ru'
      } else if (!this.form.title.uz || !this.form.description.uz) {
        this.activeTabKey = 'uz'
      }
    },
    sendNotificationToInvestors () {
      console.log('form', this.form)
      if (!this.$isValid(this)) {
        this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
        this.findTab()
        return -1
      }
      this.loading = true
      const newForm = {
        ...this.form
      }
      this.$route.query.id && delete newForm.statuses
      newForm.files = this.fileList.map(item => {
        return item.uid
      })
      // newForm.user_id = this.$store.state.user.info.id
      if (this.resend) {
        this.$store.dispatch('deleteNotification', this.$route.query.id)
      }
      this.$store.dispatch('sendNotificationToInvestors', newForm).then(res => {
        this.$alertMessage('success', 'Message', this.resend ? 'Message successfully resent to investors' : 'Message successfully sent to investors', this)
        this.$router.go(-1)
      })
      .finally(() => {
        this.loading = false
      })
    },
    cancelPost () {
      this.$router.go(-1)
    },
    handleSubmit (e) {
      console.log(e)
    }
  },
  computed: {
    filteredOptions () {
      return this.statuses.filter(el => !this.form.statuses.includes(el))
    }
  }
}
</script>

<style>
.ql-tooltip {
  transform: translateX(125px) !important;
}
</style>
