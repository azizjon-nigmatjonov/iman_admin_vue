<template>
  <div >
    <a-navigation :list="[{ name: $t('Список продавцов'), link: '/merchants/list'}, { name: $t('Форма продавца'), link: ''}]" :isBack="{ flag: true, link: '/merchants/list'}" />
    <a-card>
      <a-row type="flex">
        <a-col :span="22" :offset="1">
          <a-form-model :colon="false" ref="ruleForm" :rules="rules" :model="form">
            <a-row class="form-row" :gutter="16">
              <a-divider class="div" orientation="left">{{ $t('Информация о торговце') }}</a-divider>
              <a-col :span="24" :md="8">
                <a-form-model-item ref="name" :label="$t('name')" prop="name">
                  <a-input v-model="form.name" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item :label="$t('Email')" prop="email">
                  <a-input v-model="form.email" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item :label="$t('Phone number')" prop="phone_number">
                  <a-input v-model="form.phone_number" @keypress="onPhoneNumber"/>
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item :label="$t('Adress')" prop="address.title">
                  <a-input v-model="form.address.title" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item :label="$t('Country')" prop="address.country">
                  <a-input v-model="form.address.country" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item :label="$t('City')" prop="address.city">
                  <a-input v-model="form.address.city" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item ref="type_id" :label="$t('merchant.type')" prop="type_id">
                  <a-select :placeholder="$t('status')" v-model="form.type_id">
                    <a-select-option :value="item.id" v-for="item in merchantTypeOptions" :key="item.id">
                      {{ $t(item.name) }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-divider class="div" orientation="left">{{ $t('Реквизит') }}</a-divider>
              <a-col :md="8">
                <a-form-model-item :label="$t('Bank name')" prop="requisite.bank_name">
                  <a-input v-model="form.requisite.bank_name" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item :label="$t('Account number')" prop="requisite.account_number">
                  <a-input type="number" v-model="form.requisite.account_number" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item :label="$t('Legal adress')" prop="requisite.legal_address">
                  <a-input v-model="form.requisite.legal_address" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item :label="$t('inn')" prop="requisite.inn">
                  <a-input type="number" v-model="form.requisite.inn" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item :label="$t('Mfo code')" prop="requisite.mfo_code">
                  <a-input v-model="form.requisite.mfo_code" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item ref="requisite.has_nds" :label="$t('hasVAT')">
                  <a-switch v-model="form.has_nds" />
                </a-form-model-item>
              </a-col>
              <a-divider class="div" orientation="left">{{ $t('Договор') }}</a-divider>
              <a-col :md="8">
                <a-form-model-item :label="$t('Image upload')">
                  <a-upload
                    :customRequest="uploadImage"
                    list-type="picture-card"
                    :file-list="fileList"
                    @preview="handlePreview"
                    @change="handleChange"
                  >
                    <div v-if="fileList.length < 1">
                      <a-icon :type="uploadingImage ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                    </div>
                  </a-upload>
                  <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                    <img :alt="previewImage" style="width: 100%" :src="previewImage" />
                  </a-modal>
                </a-form-model-item>
              </a-col>
              <a-col class="mx" :md="6">
                <a-form-model-item :label="$t('date1')" prop="contract.date">
                  <a-date-picker v-model="form.contract.started_at" @change="handleStartDate" format="YYYY-MM-DD" />
                </a-form-model-item>
              </a-col>
              <a-col class="mx" :md="6">
                <a-form-model-item :label="$t('expire_date')" prop="contract.expire_date">
                  <a-date-picker v-model="form.contract.expired_at" @change="handleExiredDate" format="YYYY-MM-DD" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item :label="$t('number')" prop="contract.number">
                  <a-input v-model="form.contract.number" />
                </a-form-model-item>
              </a-col>
              <a-col class="mx" :md="16" offset="8">
                <!-- <a-row :gutter="[8,8]" type="flex" v-for="(item, i) in form.discount" :key="Math.random() + i">
                a
                </a-row> -->
              </a-col>

              <a-col span="24">
                <a-form-model-item label=" ">
                  <a-row type="flex" justify="end">
                    <a-col span="auto">
                      <a-button class="mx-1" @click="cancelPost" type="grey">{{
                        $t('button.cancel')
                      }}</a-button>
                      <a-button @click="postMerchantUsers" v-if="isNewForm" type="primary">{{ $t('button.create') }}</a-button>
                      <a-button @click="updateMerchantUsers" v-else type="primary">{{ $t('button.save') }}</a-button>
                    </a-col>
                  </a-row>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import formRule from './formRules'
export default {
  data () {
    return {
      fileList: [],
      previewImage: '',
      previewVisible: false,
      uploadingImage: false,
      rules: formRule,
      isNewForm: false,
      merchantTypeOptions: [],
      form: {
        email: '',
        name: '',
        phone_number: '',
        has_nds: true,
        address: {
          city: '',
          country: '',
          title: ''
        },
        requisite: {
          inn: '',
          mfo_code: '',
          bank_name: '',
          legal_address: '',
          account_number: ''
        },
        contract: {
          expired_at: '',
          file_name: '',
          number: '',
          started_at: ''
        },
        type_id: null
      }
    }
  },
  methods: {
    postMerchantUsers () {
      if (this.checkPost() === false) return -1
      this.$store.dispatch('postMerchantUsers', this.form).then((res) => {
        this.$message.success('Merchant added successfully')
        this.$router.go(-1)
      }).catch(reject => {
        this.$alertMessage('error', reject.response.data.error, 'Пожалуйста, проверьте поля ввода и повторите попытку', this)
      })
    },
    // post end
    beforeUpload (file) {
      const isJpgOrPng = ['application/pdf', 'application/msword'].includes(file.type)
      if (!isJpgOrPng) {
        this.$message.error('You can only upload file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('File must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    async uploadImage (data) {
        this.uploadingImage = true
        const formData = new FormData()
        formData.append('file', data.file)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('uploadFileMerchant', formData).then(res => {
        this.fileList.push({
          uid: res.filename,
          name: res.filename,
          status: 'done',
          url: url
        })
        this.form.contract.file_name = res.filename
      }).catch(err => console.log(err))
      .finally(() => {
        this.uploadingImage = false
      })
    },
    handleChange ({ fileList }) {
        if (!fileList.length) {
          this.fileList = fileList
        }
    },
    async handlePreview (file) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
        var element = document.createElement('a')
        element.setAttribute('href', file.img || file.url)
        element.setAttribute('download', file.name)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
    },
    onPhoneNumber (evt) {
      var theEvent = evt || window.event
      var key = theEvent.keyCode || theEvent.which
      if (theEvent.type === 'paste') {
          key = event.clipboardData.getData('text/plain')
      } else {
          key = String.fromCharCode(key)
      }
      var regex = /[0-9]|\./
      if (!regex.test(key)) {
        theEvent.returnValue = false
        if (theEvent.preventDefault) theEvent.preventDefault()
      }
      if (evt.target.value.length >= 12) {
        theEvent.returnValue = false
        if (theEvent.preventDefault) theEvent.preventDefault()
      }
    },
    callback () {
    },
    checkPost () {
      let flag = null
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          flag = true
          return true
        } else {
          flag = false
          return false
        }
      })
      return flag
    },
    // getMerchantUser (id) {
    //   this.$store.dispatch('getMerchantUser', id).then((res) => {
    //     console.log('merchant single', res.data)
    //     // this.fileList = [{ uid: res.pos_agent.photo.split('/').pop(), url: res.pos_agent.photo, status: 'done', name: res.pos_agent.photo }]
    //     // this.form = res.data
    //   }).catch(reject => {
    //     this.$alertMessage('error', 'Произошла ошибка', '', this)
    //   })
    // },
    getMerchanTypes () {
      this.$store.dispatch('getMerchanTypes').then((res) => {
        this.merchantTypeOptions = res.list
        // this.fileList = [{ uid: res.pos_agent.photo.split('/').pop(), url: res.pos_agent.photo, status: 'done', name: res.pos_agent.photo }]
        // this.form = res.data
      }).catch(reject => {
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    updateMerchantUsers () {
      if (this.checkPost() === false) return -1
      this.$store.dispatch('updateMerchantUsers', this.form).then((res) => {
        this.$message.success('Merchant has Успешно обновлено')
        this.$router.go(-1)
      }).catch(reject => {
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    handleStartDate (e) {
      this.form.contract.started_at = e.format('YYYY-MM-DD')
    },
    handleExiredDate (e) {
      this.form.contract.expired_at = e.format('YYYY-MM-DD')
    },
    cancelPost () {
      this.$router.go(-1)
    }
  },
  created () {
    if (this.$isEmptyObj(this.$route.params)) {
      this.isNewForm = true
    }
    this.getMerchanTypes()
  }
}
</script>

<style scoped>
.div {
    font-size: 20px !important;
}
</style>
