<template>
  <div >
    <a-navigation
      :list="[{ name: $t('Список Пос агенты'), link: ''},
              { name: $t('Форма Пос агенты'), link: ''}]"
      :isBack="{ return: true, flag: true }"
      noBorder
    />
    <a-card>
      <a-divider orientation="left">{{ $t('Form') }}</a-divider>
      <a-form-model :colon="false" ref="ruleForm" :model="form" :rules="rules">
        <a-row class="form-row" :gutter="16">
          <a-col :span="8">
            <a-form-model-item :label="$t('First_name')" prop="first_name">
              <a-input :placeholder="$t('first_name')" v-model="form.first_name" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item :label="$t('Last_name')" prop="last_name">
              <a-input :placeholder="$t('last_name')" v-model="form.last_name" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item :label="$t('patronymic')" prop="patronymic">
              <a-input :placeholder="$t('patronymic')" v-model="form.patronymic" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item :label="$t('phone_number')" prop="phone_number">
              <a-input :placeholder="$t('phone_number')" @keypress="onPhoneNumber" v-model="form.phone_number" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item :label="$t('merchant_branches')" prop="merchant_branches">
              <auto-complete style="width: 100%" :value="form.merchant_branches[0]" v-model="form.merchant_branches[0]" @search="searchBranch" :data-source="computedMerchantBranch" >
              </auto-complete>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
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
        </a-row>
        <a-row type="flex" justify="end">
          <a-col span="auto">
            <a-button @click="cancelPost" type="grey" style="margin-right: 6px">{{
              $t('button.cancel')
            }}</a-button>
            <a-button @click="postPosAgents" v-if="isNewForm" type="primary">{{ $t('button.create') }}</a-button>
            <a-button @click="updatePosAgents" v-else type="primary">{{ $t('button.save') }}</a-button>
          </a-col>
        </a-row>
      </a-form-model>
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
      merchant_branch: [],
      searchText: '',
      merchant: [],
      isNewForm: false,
      form: {
        first_name: '',
        last_name: '',
        patronymic: '',
        photo: '',
        merchant_branches: [],
        accounts: {
        phone_number: '998',
        is_active: true
        }
      },
      rules: ruleForm
    }
  },
  methods: {
      callback () {
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
    dust () {
        return {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            merchant_branches: this.form.merchant_branches,
            patronymic: this.form.patronymic,
            photo: this.fileList.length ? this.fileList[0].uid : this.form.photo,
            accounts: [{
                is_active: true,
                phone_number: this.form.phone_number
            }]
        }
    },
    dust1 () {
        return {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            merchant_branches: this.form.merchant_branches,
            photo: this.fileList.length ? this.fileList[0].uid : this.form.photo,
            guid: this.form.guid
        }
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
    branchSelectHandler (val) {
      this.form.merchant_branches = [val]
    },
    searchBranch (val) {
      this.searchText = val
    },
    postPosAgents () {
      if (this.checkPost() === false) return -1
      // console.log('here Iam dust function', this.dust())
      this.$store.dispatch('postPosAgents', this.dust()).then((res) => {
        this.$message.success('Pos agent  added successfully')
        this.$router.go(-1)
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    getPosAgent (guid) {
      this.$store.dispatch('getPosAgent', this.$route.params.id).then((res) => {
        this.fileList = [{ uid: res.pos_agent.photo.split('/').pop(), url: res.pos_agent.photo, status: 'done', name: res.pos_agent.photo }]
        // console.log(this.fileList)
        // console.log('hello resopnse', res)
        this.form = {
            ...res.pos_agent,
            merchant_branches: [res.pos_agent.merchant_branches[0]?.guid]
        }
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
     getBranches () {
      this.$store.dispatch('getBranchByMerchant', { data: {}, id: this.$route.query.merchant_id }).then((res) => {
        this.merchant_branch = res.list.map(branch => ({ value: branch.guid, text: `${branch.name}` }))
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    getMerchantUser (id) {
      this.$store.dispatch('getMerchantUser', id).then((res) => {
        this.merchant = res.merchant
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
      return this.merchant.name
    },
    updatePosAgents () {
      if (this.checkPost() === false) return -1
      // console.log('here iam updating the agent', this.dust1())
      this.$store.dispatch('updatePosAgents', this.dust1()).then((res) => {
        this.$message.success('Pos agents has Успешно обновлено')
        this.$router.go(-1)
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    cancelPost () {
      this.$router.go(-1)
    }
  },
  computed: {
    computedMerchantBranch () {
      return this.merchant_branch.filter(branch => branch.text.toLowerCase().includes(this.searchText))
    }
  },
  created () {
    if (this.$isEmptyObj(this.$route.params)) {
      this.isNewForm = true
    } else {
         this.getPosAgent(this.$route.params.id)
    }
    this.getBranches()
  },
  watch: {
    merchant_branch (val) {
      console.log('BBBB --->', val)
    }
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
