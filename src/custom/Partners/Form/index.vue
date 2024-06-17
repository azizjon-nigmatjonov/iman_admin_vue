
<template>
  <div>
    <a-navigation
      :list="[
        { name: $t('Finance'), link: '' },
        { name: $t('Partners'), link: '/finance/partners/list' },
        { name: $t($route.params.id ? 'update' : 'add'), link: '' }
      ]"
      :isBack="{ flag: true, return: true }"
    />
    <a-card>
      <a-form-model :model="form" :colon="false" layout="horizontal" ref="ruleForm" :rules="rules">
        <a-card :title="$t('Partner')" class="no-border-card no-space-tab no-padding-title">
          <a-row type="flex" :gutter="16">
            <a-col :span="8">
              <a-form-model-item ref="name" :label="$t('name')" prop="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="address" :label="$t('Address')" prop="address">
                <a-input v-model="form.address" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="email" :label="$t('email')" prop="email">
                <a-input v-model="form.email"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="inn" :label="$t('inn')" prop="inn">
                <a-input v-model="form.inn"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="contract" :label="$t('contract_number')" prop="contract">
                <a-input v-model="form.contract"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="date_of_contract" :label="$t('contract_date')" prop="date_of_contract">
                <a-date-picker
                  placeholder="Select Time"
                  :format="$dateFormat"
                  :valueFormat="$dateValueFormat"
                  v-model="form.date_of_contract"
                  style="width: 100%"
                />
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
              <a-button type="grey" style="margin-right: 6px" @click="$router.go(-1)">{{
                $t('button.cancel')
              }}</a-button>
              <!-- <a-button type="primary">{{ $t('button.create') }}</a-button> -->
              <a-button type="primary" @click="submitForm">{{ $t('button.save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
    <PopapCompanents ref='partners'/>
  </div>
</template>
<script>
// import formRule from './formRules'
// import imageUpload from '@/mixins/imageUpload'
// import debounce from 'lodash/debounce'
// import request from '@/utils/request'
// import moment from 'moment'
import PopapCompanents from '../../../components/PartnersModal/partnersModal'
export default {
  // mixins: [imageUpload],
  components: { PopapCompanents },
  data () {
    return {
      loading: false,
      rules: {
        name: [{ required: true, message: this.$t('name') + ' требуется', trigger: 'change' }],
        address: [{ required: true, message: this.$t('Address') + ' требуется', trigger: 'change' }],
        contract: [{ required: true, message: this.$t('contract_number') + ' требуется', trigger: 'change' }],
        date_of_contract: [{ required: true, message: this.$t('contract_date') + ' требуется', trigger: 'change' }],
        inn: [{ required: true, message: this.$t('inn') + ' требуется', trigger: 'change' }]
      },
      form: {
          name: '',
          address: '',
          email: '',
          contract: '',
          date_of_contract: '',
          inn: ''
      }
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.$store.dispatch('getPartnerDetail', this.$route.params.id).then(res => {
        console.log(res)
        this.form = {
          email: res.email,
          address: res.address,
          name: res.name,
          contract: res.contract,
          date_of_contract: res.date_of_contract,
          inn: res.inn,
          id: res.id
        }
      })
      .finally(() => {
        this.loading = false
      })
    }
  },
  methods: {
    createOrUpdatePartner () {
      this.$refs.partners.showModal()
    },
    submitForm () {
      this.$refs.ruleForm.validate((valid, values) => {
        if (valid) {
          const _form = JSON.parse(JSON.stringify(this.form))
          this.$store.dispatch('createOrUpdatePartner', _form).then(res => {
            console.log(res)
            this.$router.go(-1)
            this.$message.success(this.$t('Partners') + ' успешно добавлен')
          })
            .finally(() => {
              this.loading = false
            })
          // this.$store.dispatch('postExpense', this.form).then((res) => {
            // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)
          // })
          //   .finally(() => {
          //     this.submitting = false
          //   })
        }
      })
    }
  }
}
</script>

<style lang="less">
.category {
  padding:20px
}
.picture-card {
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 200px;
  }
}
</style>
