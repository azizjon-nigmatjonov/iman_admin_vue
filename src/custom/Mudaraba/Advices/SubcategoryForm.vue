<template>
  <div>
    <a-navigation
      :list="[{ name: $t('Subcategories'), link: `/advices/categories/${this.$route.params.categoryId}/subcategories`}, { name: $route.params.id ? $t('edit') : $t('create'), link: ''}]"
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
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="title.ru" :label="$t('title_ru')" prop="title.ru">
              <a-input
                :placeholder="$t('title_ru')"
                v-model="form.title.ru"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="title.uz" :label="$t('title_uz')" prop="title.uz">
              <a-input
                :placeholder="$t('title_uz')"
                v-model="form.title.uz"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- ----------DESCRIPTIONS--------------- -->
        <a-row class="form-row" :gutter="16">
          <a-col :span="8">
            <a-form-model-item ref="description.en" :label="$t('description_en')" prop="description.en">
              <a-textarea
                :placeholder="$t('description_en')"
                v-model="form.description.en"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="description.ru" :label="$t('description_ru')" prop="description.ru">
              <a-textarea
                :placeholder="$t('description_ru')"
                v-model="form.description.ru"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="description.uz" :label="$t('description_uz')" prop="description.uz">
              <a-textarea
                :placeholder="$t('description_uz')"
                v-model="form.description.uz"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-model-item :label="$t('thumbnail')" prop="thumbnail" ref="thumbnail">
              <a-upload
                accept="image/*"
                :customRequest="uploadPreview"
                list-type="picture-card"
                :file-list="preview"
                @preview="handlePreview"
                :remove="onRemovePreviewClick"
              >
                <div v-if="!preview.length">
                  <a-icon :type="previewLoader ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                </div>
              </a-upload>
              <a-modal :visible="previewImageVisible" :footer="null" @cancel="previewImageVisible = false">
                <img :alt="previewImage" style="width: 100%" :src="previewImage" />
              </a-modal>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item :label="$t('media')" prop="media" ref="media">
              <a-upload
                accept="image/*"
                :customRequest="uploadMedia"
                list-type="picture-card"
                :file-list="media"
                @preview="handleMedia"
                :remove="onRemoveMediaClick"
              >
                <div v-if="!media.length">
                  <a-icon :type="mediaLoader ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                </div>
              </a-upload>
              <a-modal :visible="mediaImageVisible" :footer="null" @cancel="mediaImageVisible = false">
                <img :alt="mediaImage" style="width: 100%" :src="mediaImage" />
              </a-modal>
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
        },
        description: {
          en: '',
          ru: '',
          uz: ''
        }
      },
      preview: [],
      previewLoader: false,
      previewImage: null,
      previewImageVisible: false,
      media: [],
      mediaLoader: false,
      mediaImage: null,
      mediaImageVisible: false,
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
      this.getSubcategoryDetailt()
    }
  },
  methods: {
    getSubcategoryDetailt () {
      this.$store.dispatch('getAdviceSubcategoryDetail', this.$route.params.id).then(res => {
        this.form.title = res.title
        this.form.description = res.description
        // console.log('CDDDDDDNNNN =====>', process.env.VUE_APP_CDN_URL)
        if (res.preview) {
          this.preview = [{
            uid: res.preview,
            name: res.preview,
            status: 'done',
            url: process.env.VUE_APP_CDN_URL + res.preview
          }]
        }

        if (res.media) {
          this.media = [{
            uid: res.media,
            name: res.media,
            status: 'done',
            url: process.env.VUE_APP_CDN_URL + res.media
          }]
        }
      })
      .finally(() => {
        this.loading = false
      })
    },
    saveCategory () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            ...this.form,
            category_id: this.$route.params.categoryId,
            preview: this.preview[0]?.name ?? '',
            media: this.media[0]?.name ?? ''
          }
          if (this.$route.params.id) {
            this.$store.dispatch('updateAdviceSubcategory', { data, id: this.$route.params.id }).then(res => {
              console.log(res)
              this.$router.push(`/advices/categories/${this.$route.params.categoryId}/subcategories`)
            }).finally(() => {
              this.loading = false
            })
          } else {
            this.$store.dispatch('createAdviceSubcategory', data).then(res => {
              console.log(res)
              this.$router.push(`/advices/categories/${this.$route.params.categoryId}/subcategories`)
            }).finally(() => {
              this.loading = false
            })
          }
        }
      })
    },
    async uploadPreview (data) {
        this.previewLoader = true
        const formData = new FormData()
        formData.append('file', data.file)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('upload', formData).then(res => {
          console.log(res)
          this.preview[0] = {
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
            }
        }).catch(err => console.log(err))
        .finally(() => {
          this.previewLoader = false
        })
    },
    async uploadMedia (data) {
        this.mediaLoader = true
        const formData = new FormData()
        formData.append('file', data.file)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('upload', formData).then(res => {
          console.log(res)
          this.media[0] = {
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
            }
        }).catch(err => console.log(err))
        .finally(() => {
          this.mediaLoader = false
        })
    },
    async handlePreview (file) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewImageVisible = true
    },
    async handleMedia (file) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        this.mediaImage = file.url || file.preview
        this.mediaImageVisible = true
    },
    onRemovePreviewClick () {
      this.preview = []
    },
    onRemoveMediaClick () {
      this.media = []
    },
    handleSubmit (e) {
      console.log(e)
    }
  }
}
</script>

<style>

</style>
