<template>
  <div>
    <a-card>
      <a-card size="small" class="mb-1">
        <a-breadcrumb>
          <a-breadcrumb-item><a-button @click="$router.go(-1)" icon="left" size="small" type="link">{{ $t('Список Пос агенты') }}</a-button></a-breadcrumb-item>
          / {{ $t('Форма Пос агенты') }}
        </a-breadcrumb>
      </a-card>
      <a-card>
        <a-form-model :colon="false" ref="ruleForm" :model="form" :rules="rules">
          <a-row class="form-row" :gutter="16">
            <a-col :span="8">
              <a-form-model-item :label="$t('First_name')" prop="first_name">
                <a-input :placeholder="$t('first_name')" v-model="form.first_name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item :label="$t('Отчества')" prop="middle_name">
                <a-input :placeholder="$t('Отчества')" v-model="form.middle_name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item :label="$t('Last_name')" prop="last_name">
                <a-input :placeholder="$t('last_name')" v-model="form.last_name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item :label="$t('Gender')" prop="gender">
                <a-select style="width: 100%" v-model="form.gender">
                  <a-select-option v-for="item in genderList" :key="item.slug" :value="item.slug" >
                    {{ $t(item.name) }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="birth_date" :label="$t('День рождения')" prop="birth_date">
                <a-date-picker
                  placeholder="День рождения"
                  :format="$dateFormat"
                  :valueFormat="$dateValueFormat"
                  v-model="form.birth_date"
                  style="width: 100%"
                />
              </a-form-model-item>
            </a-col>
            <!-- <a-col :span="8">
              <a-form-model-item :label="$t('patronymic')" prop="patronymic">
                <a-input :placeholder="$t('patronymic')" v-model="form.patronymic" />
              </a-form-model-item>
            </a-col> -->
            <a-col :span="8">
              <a-form-model-item :label="$t('phone_number')" prop="phone_number">
                <a-input :placeholder="$t('phone_number')" @keypress="onPhoneNumber" v-model="form.phone_number" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item :label="$t('password')" prop="password">
                <a-input :placeholder="$t('password')" v-model="form.password" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item :label="$t('confirm_password')" prop="confirm_password">
                <a-input :placeholder="$t('confirm_password')" v-model="form.confirm_password" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item :label="$t('merchant_branches')" prop="branch_guid">
                <auto-complete style="width: 100%" :value="form.branch_guid" v-model="form.branch_guid" @search="searchBranch" :data-source="computedMerchantBranch" >
                </auto-complete>
              </a-form-model-item>
            </a-col>
          </a-row>
          <!-- <a-row class="form-row" :gutter="8">
            <a-col :span="8">
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
          </a-row> -->
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button @click="cancelPost" type="grey" style="margin-right: 6px">{{
                $t('button.cancel')
              }}</a-button>
              <a-button @click="post" v-if="$route.params.action == 'create'" type="primary">{{ $t('button.create') }}</a-button>
              <a-button @click="updatePosAgents" v-else type="primary">{{ $t('button.save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import ruleForm from './ruleForm'
import imageUpload from '@/mixins/imageUpload'
import { AutoComplete } from 'ant-design-vue'

export default {
  mixins: [imageUpload],
  components: { AutoComplete },
  data () {
    return {
      rules: ruleForm,
      merchant_branch_list: [],
      searchText: '',
      merchant: [],
      form: {
        birth_date: '',
        branch_guid: '',
        first_name: '',
        gender: '',
        last_name: '',
        middle_name: '',
        password: '',
        confirm_password: '',
        phone_number: ''
      },
      genderList: [
        {
          name: 'male',
          slug: 'male'
        },
        {
          name: 'female',
          slug: 'female'
        }
      ]
    }
  },
  methods: {
    post () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('postMerchantPosAgent', { data: this.form, id: this.$route.params.id }).then((res) => {
          this.$message.success('Pos агент успешно добавлен')
          this.$router.go(-1)
          }).catch(reject => {
            this.$alertMessage('error', 'Произошла ошибка', '', this)
          })
        }
      })
    },
    getBranches () {
      this.$store.dispatch('getBranchByMerchant', { data: {}, id: this.$route.params.id }).then((res) => {
        this.merchant_branch_list = res.list.map(branch => ({ value: branch.guid, text: `${branch.name}` }))
      }).catch(reject => {
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    searchBranch (val) {
      this.searchText = val
    },
    onPhoneNumber (evt) {
      var theEvent = evt || window.event
      var key = theEvent.keyCode || theEvent.which
      // console.log('check', evt, key)
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
      if (this.form.phone_number.length >= 12) {
        theEvent.returnValue = false
        if (theEvent.preventDefault) theEvent.preventDefault()
      }
    },
    cancelPost () {
      this.$router.go(-1)
    }
  },
  computed: {
    computedMerchantBranch () {
      return this.merchant_branch_list.filter(branch => branch.text.toLowerCase().includes(this.searchText))
    }
  },
  created () {
    this.getBranches()
  }
}
</script>

<style scoped>
.button {
  margin-bottom: 20px;
}
.delete {
  margin-top: 30px;
}
</style>
