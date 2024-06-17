<template>
  <div >
    <a-navigation
      :list="[{ name: $t('Список Пос агенты'), link: '/PosaAgents/list'},
              { name: $t('Форма Пос агенты'), link: ''}]"
      :isBack="{ flag: true, link: '/posAgents/list'}"
      noBorder
    />
    <a-card class="no-space-tab">
      <a-tabs @change="callback">
        <a-tab-pane key="1" :tab="$t('main')">
          <a-card>
            <!-- <a-divider orientation="left">{{ $t('Form') }}</a-divider> -->
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
                <!-- <a-col :span="8">
                  <a-form-model-item :label="$t('phone_number')" prop="accounts.phone_number">
                    <a-input type="number" :placeholder="$t('phone_number')" v-model="form.accounts.phone_number" />
                  </a-form-model-item>
                </a-col> -->
                <!-- <a-col span="8">
            <a-form-model-item :label="$t('category.create.Lang')" style="padding: 50px'" prop="lang">
              <a-select
                v-model="form.lang"
              >
                <a-select-option v-for="item in $store.state.langs" :key="item.key" :value="item.key" >
                  {{ item.title }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col> -->
                <a-col :span="24">
                  <a-form-model-item :label="$t('merchant_branches')" prop="merchant_branches">
                    <auto-complete style="width: 100%" :value="form.merchant_branches[0]" v-model="form.merchant_branches[0]" @search="searchBranch" :data-source="computedMerchantBranch" >
                    </auto-complete>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
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
                    <!-- <a-popconfirm
                      :title="$t('Are you sure？')"
                      :visible="visible"
                      ok-text="Yes"
                      cancel-text="No"
                      @cancel="stop"
                      @confirm="handleChange">
                    </a-popconfirm> -->
                    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                      <img :alt="previewImage" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <!-- <a-row class="row" type="flex" v-for="(item, i) in form.accounts" :key="i">
            <a-col :xs="24" :md="11" style="padding: 0 15px" v-if="isNewForm">
              <a-form-model-item :label="$t('posAgent_number')" prop="posAgent_number">
                <a-input
                  v-model="item.phone_number"
                />
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :md="11" style="padding: 0 15px" v-if="isNewForm">
              <a-form-model-item :label="$t('Status')" prop="status">
                <a-switch default-checked v-model="item.is_active" @change="onChange()" />
              </a-form-model-item>
            </a-col>
            <a-col v-if="form.accounts.length>1" :xs="24" :md="2">
              <a-button class="delete" @click="deleteRow(item)" shape="circle" type="link" icon="close"></a-button>
            </a-col>
          </a-row> -->
              <!-- <a-button
            class="button"
            style="padding: 0 15px"
            block
            type="dashed"
            @click="addTimeslot"
            v-if="isNewForm"
            :md="12"
          >Новый слот</a-button> -->
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
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('phoneNumbers')">
          <a-card>
            <index/>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import ruleForm from './ruleForm'
import index from '../Preview/index.vue'
import imageUpload from '@/mixins/imageUpload'
import { AutoComplete } from 'ant-design-vue'

export default {
  mixins: [imageUpload],
  data () {
    return {
    merchant_branch: [],
      isNewForm: false,
      visible: false,
      searchText: '',
      form: {
        first_name: '',
        last_name: '',
        photo: '',
        patronymic: '',
        merchant_branches: [],
        accounts: [{
        phone_number: '',
        is_active: true
        }]
      },
      rules: ruleForm
    }
  },
  components: {
      index,
      AutoComplete
  },
  watch: {
    'form.merchant_branches': (val) => {
      console.log('VALLLLL ====> ', val)
    }
  },
  methods: {
    visible1 () {
      this.visible = true
    },
    stop () {
      this.visible = false
    },
      callback () {
    },
//       deleteRow (row) {
//       console.log(row)
//    this.form.accounts.splice(this.form.accounts.findIndex(el => el.id === row.id), 1)
//         // this.from.accounts = this.form.accounts.filter(el => el.id !== row.id)
//     },
//      addTimeslot () {
//       this.form.accounts.push(
//         {
//         phone_number: '',
//         is_active: false,
//         id: Math.random() * 200
//         }
//       )
//     },
    dust () {
        return {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            patronymic: this.form.patronymic,
            merchant_branches: this.form.merchant_branches,
            photo: this.fileList.length ? this.fileList[0].uid : this.form.photo
        }
    },
    dust1 () {
        return {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            merchant_branches: this.form.merchant_branches,
            patronymic: this.form.patronymic,
            photo: this.fileList.length ? this.fileList[0].uid : this.form.photo,
            guid: this.form.guid,
            accounts: [{
            phone_number: this.form.accounts.phone_number,
            is_active: true
            }]
        }
    },
    searchBranch (val) {
      this.searchText = val
    },
    branchSelectHandler (val) {
      this.form.merchant_branches = [val]
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
    postPosAgents () {
      if (this.checkPost() === false) return -1
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
        console.log(this.fileList)
        console.log('hello resopnse', res)
        this.form = {
            ...res.pos_agent,
            merchant_branches: [res.pos_agent.merchant_branches[0]?.guid],
            accounts: res.pos_agent.accounts[0]
        }
        console.log('MERCHANT ===> ', res.pos_agent.merchant_branches[0]?.guid)
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
     getBranches () {
      this.$store.dispatch('getBranches').then((res) => {
        this.merchant_branch = res.merchant_branches.map(branch => ({ value: branch.guid, text: `${branch.merchant_name} / ${branch.name}` }))
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    // stringToInt () {
    //   return { ...this.form,
    //     min_investment_amount: parseInt(this.form.min_investment_amount),
    //     max_investment_amount: parseInt(this.form.max_investment_amount),
    //     max_percent: parseInt(this.form.max_percent),
    //     min_percent: parseInt(this.form.min_percent)
    //   }
    // },
    updatePosAgents () {
      if (this.checkPost() === false) return -1
      this.$store.dispatch('updatePosAgents', this.dust1()).then((res) => {
        this.$message.success('Pos agents has Успешно обновлено')
        this.$router.go(-1)
      }).catch(er => {
        this.$message.error(er.message)
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
