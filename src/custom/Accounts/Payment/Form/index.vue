
<template>
  <div>
    <a-navigation
      :list="[
        { name: $t('Accounts'), link: '' },
        { name: $t('paymentGateways'), link: '' },
        { name: $t('Детальная информация'), link: '' }
      ]"
      :isBack="{ flag: true, return: true }"
    />
    <a-card>
      <a-form-model :colon="false" layout="horizontal" ref="ruleForm">
        <a-card :title="$t('Информация по счету')" class="no-border-card no-space-tab">
          <a-row type="flex" :gutter="16">
            <a-col :span="8">
              <a-form-model-item ref="name" :label="$t('Название')" prop="title.en">
                <a-input :placeholder="$t('Введите название')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Логин')" prop="description.en">
                <a-input :placeholder="$t('Введите логин')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Пароль')" prop="description.en">
                <a-input :placeholder="$t('Введите пароль')" />
              </a-form-model-item>
            </a-col>
            <!-- <a-col :span="8">
                    <a-form-model-item :label="$t('Portfolio.create.Decription')" ref="description" prop="description">
                        <a-textarea :auto-size="{ minRows: 10, maxRows: 10 }" placeholder="запишите описание" v-model="portfolio.description"/>
                    </a-form-model-item>
                    </a-col> -->
          </a-row>
          <a-row type="flex" :gutter="16">
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Логотип')" prop="description.en">
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  style="width: 100%"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                  <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">
                      Upload
                    </div>
                  </div>
                </a-upload>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('URL')" prop="description.en">
                <a-input :placeholder="$t('Введите URL')" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form-model>
    </a-card>
    <a-row class="edit-btns mt-4">
      <a-col span="24">
        <a-form-model-item>
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button type="grey" style="margin-right: 6px">{{
                $t('button.cancel')
              }}</a-button>
              <!-- <a-button type="primary">{{ $t('button.create') }}</a-button> -->
              <a-button type="primary">{{ $t('button.save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
  </div>
</template>
<script>
// import formRule from './formRules'
// import imageUpload from '@/mixins/imageUpload'
// import debounce from 'lodash/debounce'
// import request from '@/utils/request'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  // mixins: [imageUpload],
  data () {
    return {
      loading: false,
      imageUrl: ''
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
  }
}
</script>

<style lang="less">
.category {
  padding:20px,
}
.picture-card {
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 200px;
  }
}
</style>
