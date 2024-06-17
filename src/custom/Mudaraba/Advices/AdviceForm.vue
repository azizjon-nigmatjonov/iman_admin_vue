<template>
  <div>
    <a-navigation
      :list="[{ name: $t('Advices'), link: `/advices/categories/${$route.params.categoryId}/subcategories/${$route.params.subcategoryId}/list`}, { name: $route.params.id ? $t('edit') : $t('create'), link: ''}]"
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
        <!-- ----------DESCRIPTIONS--------------- -->
        <a-row class="form-row" :gutter="16">
          <a-tabs :activeKey="activeTabKey" @change="e => activeTabKey = e">
            <a-tab-pane key="en" :tab="$t('en')">
              <a-col :span="8">
                <a-form-model-item ref="title.en" :label="$t('title_en')" prop="title.en">
                  <a-input
                    :placeholder="$t('title_en')"
                    v-model="form.title.en"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="description.en" :label="$t('description_en')">
                  <ckeditor v-model="form.description.en"></ckeditor>
                </a-form-model-item>
              </a-col>
            </a-tab-pane>
            <a-tab-pane key="ru" :tab="$t('ru')" forceRender>
              <a-col :span="8">
                <a-form-model-item ref="title.ru" :label="$t('title_ru')" prop="title.ru">
                  <a-input
                    :placeholder="$t('title_ru')"
                    v-model="form.title.ru"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="description.ru" :label="$t('description_ru')">
                  <ckeditor v-model="form.description.ru"></ckeditor>
                </a-form-model-item>
              </a-col>
            </a-tab-pane>
            <a-tab-pane key="uz" :tab="$t('uz')" forceRender>
              <a-col :span="8">
                <a-form-model-item ref="title.uz" :label="$t('title_uz')" prop="title.uz">
                  <a-input
                    :placeholder="$t('title_uz')"
                    v-model="form.title.uz"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item ref="description.uz" :label="$t('description_uz')" >
                  <ckeditor v-model="form.description.uz"></ckeditor>
                </a-form-model-item>
              </a-col>
            </a-tab-pane>
          </a-tabs>
        </a-row>

        <!-- ----------SWITCHES ----------------- -->

        <a-row class="form-row" :gutter="16">
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
          <a-col :span="4">
            <a-form-model-item ref="send_notification" :label="$t('send_notification')" prop="send_notification">
              <a-switch
                v-model="form.send_notification"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-model-item :label="$t('preview_type')" ref="type" prop="type">
              <a-radio-group v-model="form.type" @change="handleRadio">
                <a-radio :value="'video'">
                  Видео
                </a-radio>
                <a-radio :value="'audio'">
                  Аудио
                </a-radio>
                <a-radio :value="'advice'">
                  Советы
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item v-if="radio === 'video' " :label="$t('Загрузить видео')" prop="thumbnail" ref="thumbnail">
              <a-upload
                accept="video/*"
                name="file"
                :customRequest="uploadMedia"
                :multiple="false"
                :file-list="media"
                :list-type="'text'"
                :remove="onRemoveMediaClick"
              >
                <a-button :disabled="!!youtubeUrl" v-if="!media.length" > <a-icon :type="mediaLoader ? 'loading' : 'upload'" /> Нажмите, чтобы загрузить видео</a-button>
              </a-upload>
              <my-video-player v-if="media.length" width="100%" :src="media[0]" controls style="margin-top: 20px" >
                unreadable format by your browser
              </my-video-player>
              <a-col span="10">
                <a-input :disabled="!!media.length" addonBefore="Youtube 🔗" v-model.lazy="youtubeUrl"></a-input>
                <!-- <iframe v-if="youtubeUrl" width="420" height="345" :src="youtubeUrl"></iframe> -->
              </a-col>
            </a-form-model-item>
            <a-form-model-item v-if="radio === 'audio' " :label="$t('thumbnail')" prop="thumbnail" ref="thumbnail">
              <a-upload
                accept="audio/*"
                name="file"
                :customRequest="uploadMedia"
                :multiple="false"
                :file-list="audio"
                :list-type="'text'"
                :remove="onRemoveAudioClick"
              >
                <a-button v-if="!audio.length " > <a-icon :type="mediaLoader ? 'loading' : 'upload'" /> Нажмите, чтобы загрузить аудио</a-button>
              </a-upload>
              <audio style="margin-top: 20px" v-if="audio.length" :src="audio[0].url" controls></audio>
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
      youtubeUrl: null,
      radio: '',
      loading: false,
      value: 1,
      editorConfig: {
        // The configuration of the editor.
      },
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
        },
        subcategory_id: this.$route.params.subcategoryId,
        send_notification: false,
        type: ''
      },
      preview: [],
      media_link: [],
      previewLoader: false,
      previewImage: null,
      previewImageVisible: false,
      media: [],
      audio: [],
      mediaLoader: false,
      mediaImage: null,
      mediaImageVisible: false,
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
      this.getAdviceDetail()
    }
  },
  methods: {
    getAdviceDetail () {
      this.loading = true
      this.$store.dispatch('getAdviceDetail', this.$route.params.id).then(res => {
        this.form.title = res.title
        this.form.description = res.description
        this.form.type = res.type
        this.radio = res.type
        if (res.type === 'video') {
          if (res.media_link.includes('www.youtube.com')) {
              this.youtubeUrl = res.media_link
          } else {
          this.media = [{
            uid: res.media_link,
            name: res.media_link,
            status: 'done',
            url: `${process.env.VUE_APP_CDN_URL}${res.media_link}`
          }]
          }
          // this.media = [{
          //   uid: res.media_link,
          //   name: res.media_link,
          //   status: 'done',
          //   url: `${process.env.VUE_APP_CDN_URL}${res.media_link}`
          // }]
        }
        if (res.type === 'audio') {
          this.audio = [{
            uid: res.media_link,
            name: res.media_link,
            status: 'done',
            url: `${process.env.VUE_APP_CDN_URL}${res.media_link}`
          }]
        }
        this.preview = [{
          uid: res.preview,
          name: res.preview,
          status: 'done',
          url: res.preview
        }]
      })
      .finally(() => {
        this.loading = false
      })
    },
    saveCategory () {
      if (!this.$isValid(this)) {
        this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
        this.findTab()
        return -1
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            ...this.form,
            preview: this.preview[0]?.name.split('/').pop(),
            media_link: this.youtubeUrl ? this.youtubeUrl : (this.radio === 'video' ? this.media[0]?.name : this.audio[0]?.name)
          }
          if (this.$route.params.id) {
            this.$store.dispatch('updateAdvice', { data, id: this.$route.params.id }).then(res => {
              this.$router.push(`/advices/categories/${this.$route.params.categoryId}/subcategories/${this.$route.params.subcategoryId}/list`)
            }).finally(() => {
              this.loading = false
            })
          } else {
            this.$store.dispatch('createAdvice', data).then(res => {
              this.$router.push(`/advices/categories/${this.$route.params.categoryId}/subcategories/${this.$route.params.subcategoryId}/list`)
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
        console.log('file', data.file)
        // const url = await this.$getBase64(data.file)
        this.$store.dispatch('upload', formData).then(res => {
        console.log(res.filename)
        this.radio === 'video' ? this.media[0] = {
          uid: res.filename,
          name: res.filename,
          status: 'done',
          url: `${process.env.VUE_APP_CDN_URL}${res.filename}`
        } : this.radio === 'audio' ? this.audio[0] = {
          uid: res.filename,
          name: res.filename,
          status: 'done',
          url: `${process.env.VUE_APP_CDN_URL}${res.filename}`
        } : this.radio = 'advice'
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
    onRemoveAudioClick () {
      this.audio = []
    },
    handleSubmit (e) {
      console.log(e)
    },
    handleRadio (e) {
      this.radio = e.target.value
    }
  },
  watch: {
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
