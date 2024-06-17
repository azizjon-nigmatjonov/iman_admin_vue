
<template>
  <div>
    <a-navigation
      :list="[
        { name: $t('Finance'), link: '' },
        { name: $t('TreasuryDep'), link: '/finance/treasury/list' },
        { name: $t('Cash Out'), link: '' }
      ]"
      :isBack="{ flag: true, return: true }"
    />
    <a-card>
      <a-form-model :colon="false" :model="form" :rules="rules" ref="ruleForm">
        <a-card :title="$t('Cash out')" class="no-border-card no-space-tab no-padding-title">
          <a-row type="flex" :gutter="16">
            <a-col :span="8">
              <a-form-model-item ref="name" :label="$t('contract_date')" prop="contract_date">
                <a-date-picker
                  placeholder="Select Time"
                  valueFormat="YYYY-MM-DD"
                  v-model="form.contract_date"
                  :format="$dateFormat"
                  style="width: 100%"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="name" :label="$t('date')" prop="date">
                <a-date-picker
                  placeholder="Select Time"
                  valueFormat="YYYY-MM-DD"
                  v-model="form.date"
                  :format="$dateFormat"
                  style="width: 100%"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('amount')" prop="amount">
                <a-input type="number" v-model="form.amount" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('contrAgent')" prop="partner_id">
                <!-- <a-input v-model="form.partner_id" /> -->
                <a-select
                  style="width: 100%;"
                  v-model="form.partner_id"
                  @popupScroll="onScrollBottom"
                  placeholder="Выберите тип операции"
                >
                  <a-select-option v-for="item in partners" :key="item.id" :value="item.id" >
                    {{ item.name }}
                  </a-select-option>
                  <a-select-option key="partnersFetching" v-if="partnersParams.total > partners.length || partnersFetching">
                    <a-spin size="small" />
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Дт')" prop="account_from">
                <a-input v-model="form.account_from" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Кт')" prop="account_to">
                <a-input v-model="form.account_to"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Тип операции')" prop="operation_id">
                <a-select style="width: 100%;" v-model="form.operation_id" placeholder="Выберите тип операции">
                  <a-select-option v-for="item in operations" :key="item.id" :value="item.id" >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Платежная система')" prop="payment_gateway">
                <a-select style="width: 100%;" v-model="form.payment_gateway" :placeholder="$t('Введите платежный шлюз')">
                  <a-select-option v-for="item in paymentGateways" :key="item.id" :value="item.id" >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item :label="$t('contract_number')" prop="contract_number">
                <a-input v-model="form.contract_number" />
              </a-form-model-item>
            </a-col>
            <!-- <a-col :span="8">
                  <a-form-model-item :label="$t('Portfolio.create.Decription')" ref="description" prop="description">
                    <a-textarea :auto-size="{ minRows: 10, maxRows: 10 }" placeholder="запишите описание" v-model="portfolio.description"/>
                  </a-form-model-item>
                </a-col> -->
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
              <a-button type="primary" @click="updateCashIn">{{ $t('button.save') }}</a-button>
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
import moment from 'moment'
export default {
  // mixins: [imageUpload],
  data () {
    return {
      loading: false,
      form: {
        account_from: '',
        account_to: '',
        amount: null,
        contract_date: '',
        contract_number: '',
        date: '',
        operation_id: null,
        payment_gateway: null,
        partner_id: ''
      },
      rules: {
        'account_from': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'account_to': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'amount': [{ required: true, message: `Пожалуйста, заполните поле`, trigger: 'blur' }],
        'partner_id': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'contract_date': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }],
        'contract_number': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'date': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }],
        'payment_gateway': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }],
        'operation_id': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }]
      },
      accounts: [],
      operations: [],
      partners: [],
      partnersFetching: false,
      partnersParams: {
        limit: 100,
        page: 1,
        total: 1
      },
      paymentGateways: [],
      accountsParams: {
        count: null,
        limit: 10
      },
      operationsParams: {
        count: null,
        limit: 10
      },
      paymentGatewaysParams: {
        count: null,
        limit: 10
      }
    }
  },
  mounted () {
    this.getOperations()
    this.getPartners()
    this.getPaymentGateways()
    if (this.$route.params.id) {
      this.$store.dispatch('getCashInOutDetail', this.$route.params.id).then(res => {
        console.log(res)
        this.form = {
          account_from: res.gl.account_from,
          account_to: res.gl.account_to,
          amount: res.gl.amount,
          contract_date: moment(res.gl.subconto_credit.title2.split(',').pop()).format('YYYY-MM-DD'),
          contract_number: res.gl.subconto_credit.title2.split(',')[0].slice(3),
          date: moment(res.gl.date_at).format('YYYY-MM-DD'),
          operation_id: `${res.gl.credit_operation_id}`,
          payment_gateway: res.gl.payment_gateway.id,
          partner_id: res.gl.partner_id,
          id: res.gl.guid
        }
      })
      .finally(() => {
        this.loading = false
      })
    }
  },
  methods: {
    onScrollBottom (event) {
      console.log('event', event.target)
      var target = event.target
      if (!this.partnersFetching && target.scrollTop + target.offsetHeight === target.scrollHeight) {
        if (this.partnersParams.total > this.partners.length) {
          this.partnersParams.page += 1
          target.scrollTo(0, target.scrollHeight)
          this.getPartners()
        }
      }
    },
    updateCashIn () {
      this.$refs.ruleForm.validate((valid, values) => {
        if (valid) {
          this.loading = true
          const _form = JSON.parse(JSON.stringify(this.form))
          _form.amount = parseInt(_form.amount)
          _form.operation_id = parseInt(_form.operation_id)
          _form.payment_gateway = parseInt(_form.payment_gateway)
          this.$store.dispatch('createOrUpdateCashOut', _form).then(res => {
            console.log(res)
            this.$router.go(-1)
          })
          .finally(() => {
            this.loading = false
          })
        }
      })
    },
    getPartners () {
      this.partnersFetching = true
        this.$store.dispatch('getPartners', this.partnersParams).then(res => {
            console.log(res)
            // this.operations = res.operations
            // this.partnersFetching = false
            this.partners.push(...res.partners)
            this.partnersParams.total = parseInt(res.Count)
        })
        .finally(() => {
          this.partnersFetching = false
        })
    },
    getOperations () {
      this.loading = true
        this.$store.dispatch('getOperations').then(res => {
            console.log(res)
            this.operations = res.operations
        })
        .finally(() => {
          this.loading = false
        })
    },
    getPaymentGateways () {
      this.loading = true
      this.$store.dispatch('getPaymentGatewaysList', { limit: 1000 }).then(res => {
        console.log(res)
        this.paymentGateways = res.payment_gateways
      })
      .finally(() => {
        this.loading = false
      })
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
