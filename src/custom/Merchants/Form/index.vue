<template>
  <div >
    <a-navigation :list="[{ name: $t('Список продавцов'), link: '/merchants/list'}, { name: $t('Форма продавца'), link: ''}]" :isBack="{ flag: true, link: '/merchants/list'}" />
    <a-card>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Детали">
          <a-row type="flex">
            <a-col :span="22" :offset="1">
              <a-form-model :colon="false" ref="rules" :model="formData" :rules="rules">
                <a-row class="form-row" :gutter="16">
                  <a-divider class="divider" orientation="left">{{ $t('Информация о торговце') }}</a-divider>
                  <a-col :span="24" :md="8">
                    <a-form-model-item ref="name" :label="$t('name')" prop="name">
                      <a-input v-model="formData.name" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('Email')" prop="email">
                      <a-input v-model="formData.email" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('Phone number')" prop="phone_number">
                      <a-input v-model="formData.phone_number" @keypress="onPhoneNumber"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('Adress')" prop="address">
                      <a-input v-model="formData.address.title" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('Country')" prop="country_">
                      <a-input v-model="formData.address.country" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('City')" prop="city_">
                      <a-input v-model="formData.address.city" />
                    </a-form-model-item>
                  </a-col>
                  <a-divider class="div" orientation="left">{{ $t('Реквизит') }}</a-divider>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('Bank name')" prop="requisite.bank_name">
                      <a-input v-model="formData.requisite.bank_name" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('Account number')" prop="requisite.account_number">
                      <a-input type="number" v-model="formData.requisite.account_number" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('Legal adress')" prop="requisite.legal_address">
                      <a-input v-model="formData.requisite.legal_address" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('Inn')" prop="requisite.inn">
                      <a-input type="number" v-model="formData.requisite.inn" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('Mfo code')" prop="requisite.mfo_code">
                      <a-input v-model="formData.requisite.mfo_code" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item ref="requisite.has_nds" :label="$t('hasVAT')">
                      <a-switch v-model="formData.has_nds" />
                    </a-form-model-item>
                  </a-col>
                  <a-divider class="divider" orientation="left">{{ $t('Договор') }}</a-divider>
                  <a-col :md="8">
                    <a-form-model-item :label="$t('File upload')">
                      <a-upload
                        :customRequest="uploadImage"
                        list-type="picture-card"
                        :file-list="fileList"
                        @preview="handlePreview"
                        :before-upload="beforeUpload"
                        @change="handleChange"
                      >
                        <div v-if="fileList.length < 1">
                          <a-icon :type="uploadingImage ? 'loading' : 'plus'" />
                          <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                        </div>
                      </a-upload>
                      <p v-if="errorContructImg" class="error">Пожалуйста, загрузите файл</p>
                    </a-form-model-item>
                  </a-col>
                  <a-col class="mx" :md="6">
                    <a-form-model-item ref="contract.date" :label="$t('date1')" prop="contract_date">
                      <a-date-picker v-model="formData.contract.started_at" format="YYYY-MM-DD"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col class="mx" :md="6">
                    <a-form-model-item ref="contract_expire_date" :label="$t('expire_date')" prop="contract_expire_date">
                      <a-date-picker v-model="formData.contract.expired_at" format="YYYY-MM-DD"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="10">
                    <a-form-model-item ref="contract.number" :label="$t('number')" prop="contract.number">
                      <a-input v-model="formData.contract.number" />
                    </a-form-model-item>
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
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('owners')">
          <AddOwners />
        </a-tab-pane>
        <a-tab-pane key="3" :tab="$t('profit_and_discount')">
          <ProfitAndDiscountSet />
        </a-tab-pane>
        <!-- <a-tab-pane key="4" :tab="$t('Password_recovery')">
          <PasswordSet :username="formData.name"/>
        </a-tab-pane> -->
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import PasswordSet from './components/PasswordSet.vue'
import ProfitAndDiscountSet from '@/custom/Merchants/Form/components/ProfitAndDiscountSet'
import AddOwners from '@/custom/Merchants/Form/components/AddOwners.vue'
import Vue from 'vue'
export default {
  data () {
    return {
      errorContructImg: false,
      BASE_URL: 'https://cdn.iman.uz/documents/',
      fileList: [],
      fileListContruct: '',
      previewImage: '',
      previewVisible: false,
      uploadingImage: false,
      rules: {
        'name': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
        'email': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
        'phone_number': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
        'address': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
        // 'country_': [{ required: true, message: 'Пожалуйста, напишите 1', trigger: 'change' }],
        // 'city_': [{ required: true, message: 'Пожалуйста, напишите 2', trigger: 'change' }],
        'requisite.bank_name': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
        'requisite.account_number': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
        'requisite.legal_address': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
        'requisite.inn': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
        'requisite.mfo_code': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
        // 'contract_date': [{ required: true, message: 'Пожалуйста, напишите 3 ', trigger: 'change' }],
        // 'contract_expire_date': [{ required: true, message: 'Пожалуйста, напишите 4' }],
        'contract.number': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
        'fileListContruct': [{ required: true, trigger: 'change' }]
      },
      isNewForm: false,
      merchantTypeOptions: [
        { label: this.$t('product'), value: 'product' },
        { label: this.$t('service'), value: 'service' }
      ],
      formData: {
        guid: this.$route.params.id,
        email: '',
        name: '',
        phone_number: '',
        has_nds: true,
        created_at: '',
        updated_at: '',
        address: {
          guid: '',
          city: '',
          country: '',
          title: ''
        },
        requisite: {
          guid: '',
          inn: '',
          mfo_code: '',
          bank_name: '',
          legal_address: '',
          account_number: ''
        },
        contract: {
          id: null,
          merchant_id: '',
          expired_at: '',
          file_name: '',
          number: '',
          started_at: '',
          created_at: '',
          updated_at: ''
        },
        type_id: 2
      },
      discounts: {
        percentage: 0,
        period_month: 0
      },
      form: {
        address: '',
        margin_list: [],
        city: '',
        country: '',
        email: '',
        name: '',
        phone_number: '',
        merchant_type: '',
        has_nds: true,
        requisite: {
          account_number: '',
          bank_name: '',
          inn: '',
          legal_address: '',
          mfo_code: '',
          swift: ''
        },
        contract: {
            date: '',
            expire_date: '',
            file_name: '',
            number: ''
            },
            director: {
                FirstName: '',
                LastName: '',
                PhoneNumber: ''
            },
             discount: [
                {
                  discount: 0,
                  month: 0,
                  id: Math.random()
                }
            ]
      }
    }
  },
  components: {
   PasswordSet,
   ProfitAndDiscountSet,
   AddOwners
    // merchanTransaction,
  },
  watch: {
    'usersList': (val) => {
      console.log('marchant val', val)
    }
  },
  methods: {
    changeHandler (e, index, max, min) {
      const value = e.target.value
      if (value < min || value > max) return null
      this.form.discount[index].discount = parseFloat(value.replace(',', '.').replace(' ', ''))
    },
    addNewDiscount () {
      Vue.set(this.form.discount, this.form.discount.length, { discount: 0, month: 0, id: Math.random() })
    },
    addNewMargin () {
      this.form.margin_list = [ ...this.form.margin_list, { margin: 0, month: 0, id: Math.random() + '4d' } ]
    },
    onPhoneNumber (evt) {
      var theEvent = evt || window.event
      var key = theEvent.keyCode || theEvent.which
      console.log('check', evt, key)
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
    beforeUpload (file) {
      console.log(file.type)
      const isJpgOrPng = ['application/pdf', 'application/msword', '.doc', '.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
      if (!isJpgOrPng) {
        this.$message.error('You can only upload file!')
      }
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   this.$message.error('File must smaller than 2MB!')
      // }
      // return isJpgOrPng && isLt2M
      return isJpgOrPng
    },
    async uploadImage (data) {
        this.uploadingImage = true
        const formData = new FormData()
        formData.append('file', data.file)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('uploadFile', formData).then(res => {
        console.log(res)
        this.fileList.push({
          uid: res.filename,
          name: res.filename,
          status: 'done',
          url: url
        })
        if (this.fileList.length) {
          this.errorContructImg = false
        }
        // console.log('aaa', fileList)
        this.fileListContruct = res.filename
        // console.log(fileList)
      }).catch(err => console.log(err))
      .finally(() => {
        this.uploadingImage = false
      })
    },
    handleChange ({ fileList }) {
        if (fileList.length === 0) { this.fileList = fileList }
    },
    async handlePreview (file) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        // this.previewImage = file.url || file.preview
        // this.previewVisible = true
        var element = document.createElement('a')
        element.setAttribute('href', this.BASE_URL + file.img || file.url)
        element.setAttribute('download', file.name)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
    },
    callback () {
    },
    checkPost () {
      let flag = null
      this.$refs.rules.validate((valid) => {
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
    postMerchantUsers () {
      if (this.checkPost() === false) return -1
      if (!this.fileList.length) {
        this.errorContructImg = true
        return -1
      }
      const newForm = { ...this.form }
      newForm.contract.file_name = this.fileList[0] && this.fileList[0].name
      this.$store.dispatch('postMerchantUsers', newForm).then((res) => {
        console.log(res)
        this.$message.success('Merchant added successfully')
        this.$router.go(-1)
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    updateMerchantUsers () {
      if (this.checkPost() === false) return -1
      if (!this.fileList.length) {
        this.errorContructImg = true
        return -1
      }
      const newForm = { ...this.formData }
      newForm.contract.file_name = this.fileList[0] && this.fileList[0].name
      newForm.contract.created_at = this.formData.contract.created_at ? this.formData.contract.created_at.substr(0, 10) : ''
      newForm.contract.expired_at = this.formData.contract.expired_at ? this.formData.contract.expired_at.substr(0, 10) : ''
      newForm.contract.started_at = this.formData.contract.started_at ? this.formData.contract.started_at.substr(0, 10) : ''
      newForm.contract.updated_at = this.formData.contract.updated_at ? this.formData.contract.updated_at.substr(0, 10) : ''
      newForm.created_at = this.formData.created_at ? this.formData.created_at.substr(0, 10) : ''
      newForm.updated_at = this.formData.updated_at ? this.formData.updated_at.substr(0, 10) : ''
      this.$store.dispatch('updateMerchantUsers', newForm).then((res) => {
        this.$message.success('Продавец успешно обновлен')
        this.$router.go(-1)
      }).catch(reject => {
        if (reject.response.data.errors) {
          this.$alertMessage('error', 'Ошибка проверки (' + reject.response.status + ')', 'Пожалуйста проверьте и попробуйте снова', this)
        } else {
          this.$alertMessage('error', reject.response.status, reject.response.data.error, this)
        }
      })
    },
    getMerchantUser (id) {
      this.$store.dispatch('getMerchantUser', id).then((res) => {
        this.formData = res.data
        if (res.data.contract.file_name) {
          this.fileList = [{ uid: res.data.contract.file_name.split('/').pop(), url: require('@/assets/pdf.png'), img: res.data.contract.file_name, status: 'done', name: res.data.contract.file_name.split('/').pop() }]
        }
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    cancelPost () {
      this.$router.go(-1)
    }
  },
  created () {
    if (this.$isEmptyObj(this.$route.params)) {
      this.isNewForm = true
    } else this.getMerchantUser(this.$route.params.id)
  }
}
</script>

<style scoped>
.divider {
  font-size: 20px !important;
}
.error {
  color: red;
}
</style>
