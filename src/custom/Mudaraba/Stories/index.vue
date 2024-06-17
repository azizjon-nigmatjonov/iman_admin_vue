<template>
  <div>
    <a-navigation
      :list="[{ name: $t('Stories'), link: ''}]"
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
              <a-textarea
                :placeholder="$t('message_en')"
                v-model="form.title.en"
                :disabled="disable"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="title.ru" :label="$t('title_ru')" prop="title.ru">
              <a-textarea
                :placeholder="$t('message_ru')"
                v-model="form.title.ru"
                :disabled="disable"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="title.uz" :label="$t('title_uz')" prop="title.uz">
              <a-textarea
                :placeholder="$t('message_uz')"
                v-model="form.title.uz"
                :disabled="disable"
              />
            </a-form-model-item>
          </a-col>
          <!-- <a-col :span="8">
            <a-form-model-item ref="description.en" :label="$t('message_en')" prop="description.en">
              <a-textarea
                :placeholder="$t('message_en')"
                v-model="form.description.en"
                :disabled="disable"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="description.ru" :label="$t('message_ru')" prop="description.ru">
              <a-textarea
                :placeholder="$t('message_ru')"
                v-model="form.description.ru"
                :disabled="disable"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="description.uz" :label="$t('message_uz')" prop="description.uz">
              <a-textarea
                :placeholder="$t('message_uz')"
                v-model="form.description.uz"
                :disabled="disable"
              />
            </a-form-model-item>
          </a-col> -->
          <a-col :xs="24" style="padding: 0 15px">
            <a-form-model-item :label="$t('media file')" prop="media" ref="media">
              <a-upload
                accept="video/*, image/*"
                name="file"
                :customRequest="uploadFile"
                :multiple="true"
                :file-list="form.media"
                @change="handleChangeFile"
                :list-type="'text'"
                :remove="onRemoveClick"
                :beforeUpload="onBeforeUpload"
              >
                <a-button> <a-icon :type="uploadingFile ? 'loading' : 'upload'" /> Click to Upload </a-button>
              </a-upload>
              <my-video-player v-for="video in filteredVIdeos" :key="video.uid" width="100%" :src="video" controls>
                unreadable format by your browser
              </my-video-player>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" style="padding: 0 15px">
            <a-upload
              name="photo"
              :file-list="filteredPhotos"
              :list-type="'picture-card'"
              :showUploadList="{
                showRemoveIcon: false
              }"
              @preview="handlePreview"
              :remove="onRemoveClick"
            ></a-upload>
          </a-col>
          <a-col :span="24">
            <a-form-model-item :label="$t('thumbnail')" prop="thumbnail" ref="thumbnail">
              <a-upload
                accept="image/*"
                :customRequest="uploadImage"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleChange"
                :remove="onRemoveThumbnailClick"
              >
                <div v-if="!fileList.length">
                  <a-icon :type="uploadingImage ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                <img :alt="previewImage" style="width: 100%" :src="previewImage" />
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
              <a-button @click="sendStories" :loading="loading" style="width: unset" type="primary">{{ $t('send stories') }}</a-button>
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
              <a-button @click="saveStories" :loading="loading" style="width: unset" type="primary">{{ $t('save') }}</a-button>
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
      fileList: [],
      previewImage: '',
      previewVisible: false,
      uploadingImage: false,
      uploadingFile: false,
      disable: !!this.$route.query.id,
      form: {
        // description: {
        //   en: '',
        //   ru: '',
        //   uz: ''
        // },
        media: [],
        media_type: '',
        thumbnail: '',
        title: {
          en: '',
          ru: '',
          uz: ''
        }
      },
      mainVideo: {
        videos: [],
        photo: '',
        format: '',
        videoUrl: '',
        imageUrlMain: '',
        uploadedFile: '',
        displayFilename: 'none',
        movieLoading: false,
        loadingMain: false,
        percentage: 0
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
        ],
        'media': [
          { required: true, message: `${this.$t('required')}`, trigger: 'change' }
        ],
        'thumbnail': [
          { required: true, message: `${this.$t('required')}`, trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    if (this.$route.query && this.$route.query.id) {
      this.getStoriesDetail()
    }
  },
  computed: {
    filteredVIdeos () {
      return this.form.media.filter(item => item.media_type === 'video')
    },
    filteredPhotos () {
      return this.form.media.filter(item => item.media_type === 'photo')
    }
  },
  methods: {
    onBeforeUpload (file, fileList) {
      // this.form.media = []
      console.log('Before', file)
      this.form.media_type = file.type.slice(0, 5) === 'image' ? 'photo' : 'video'
    },
    saveStories () {
      this.loading = true
      const form = {
          ...this.form,
          guid: this.$route.query.id,
          media: this.form.media.map(el => ({
            'link': el.url.split('/').pop(),
            'media_type': el.media_type
          })),
          thumbnail: this.form.thumbnail.split('/').pop()
      }
      delete form.title
      delete form.media_type

      this.$store.dispatch('patchStories', form).then(res => {
        console.log(res)
        this.$router.go(-1)
      }).finally(() => {
        this.loading = false
        })
    },
    onRemoveClick (file) {
        // this.form.media = []
        console.log(file.uid)
        // const index = this.form.media.indexOf(item => item.uid === file.uid)
        // this.form.media.splice(index, 1)
        this.form.media = this.form.media.filter(el => file.uid !== el.uid)
    },
    onRemoveThumbnailClick (file) {
        this.fileList = []
        console.log(file.uid)
    },
    async uploadFile (data) {
        this.uploadingFile = true
        const formData = new FormData()
        formData.append('file', data.file)
        console.log('file', data.file)
        // const url = await this.$getBase64(data.file)
        this.$store.dispatch('upload', formData).then(res => {
        console.log(res)
        this.form.media.push({
          uid: res.filename,
          name: res.filename,
          status: 'done',
          url: `${process.env.VUE_APP_CDN_URL}/${res.filename}`,
          type: data.file.type,
          media_type: this.form.media_type
        })
        // console.log(fileList)
      }).catch(err => console.log(err))
      .finally(() => {
        this.uploadingFile = false
      })
    },
    handleChangeFile (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
        // this.form.media = info.fileList
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    async uploadImage (data) {
        this.uploadingImage = true
        const formData = new FormData()
        formData.append('file', data.file)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('upload', formData).then(res => {
          console.log(res)
          this.fileList[0] = {
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
            }
          this.form.thumbnail = res.filename
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
      this.fileList[0] = file
      this.form.thumbnail[0] = file
      if (file.status === 'done') {
        this.form.thumbnail[0] = file
      }
    },
    async handlePreview (file) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
    },
    getStoriesDetail () {
      this.$store.dispatch('getStoriesDetail', this.$route.query.id).then(res => {
        console.log(res)
        this.form.title = res.title
        // this.form.description = res.description
        this.form.thumbnail = res.thumbnail
        // this.form.media_type = res.media_type
        this.fileList = [
            { uid: res.thumbnail.split('/').pop(), url: res.thumbnail, status: 'done', name: res.thumbnail }
        ]
        this.form.media = res.media.map(item => (
            { uid: item.link.split('/').pop(), url: item.link, status: 'done', name: item.link, type: `video/${item.link.split('.').pop()}`, media_type: item.media_type }
        ))
        // this.form.user_id = this.$store.info.id
      })
      .finally(() => {
        this.loading = false
      })
    },
    sendStories () {
      if (!this.$isValid(this)) {
        this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
        return -1
      }
      const { files, ...newForm } = this.form
      newForm.thumbnail = this.fileList[0].uid
      delete newForm.media_type
      newForm.media = this.form.media.map(item => ({ link: item.uid, media_type: item.media_type }))
      // newForm.user_id = this.$store.state.user.info.id
      this.$store.dispatch('sendStories', newForm).then(res => {
        this.$alertMessage('success', 'Message', 'Message successfully send to investors', this)
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
  }
}
</script>

<style>

</style>
