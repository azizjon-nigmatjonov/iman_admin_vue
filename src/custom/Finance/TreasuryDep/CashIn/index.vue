
<template>
  <div>
    <a-navigation
      :list="[
        { name: $t('Finance'), link: '' },
        { name: $t('TreasuryDep'), link: '/finance/treasury/list' },
        { name: $t('Cash In'), link: '' }
      ]"
      :isBack="{ flag: true, return: true }"
    />
    <a-card>
      <a-form-model :colon="false" :model="form" :rules="rules" ref="ruleForm">
        <a-card :title="$t('Cash in')" class="no-border-card no-space-tab no-padding-title">
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
                <a-input-number
                  style="width: 100%"
                  v-model="form.amount"
                  :formatter="value => value.replace(/(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="value => value.replace(/\s?|(,*)/g, '')"
                />
              </a-form-model-item>
            </a-col>
            <!-- <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('От кого принято')" prop="person_name">
                <a-input v-model="form.person_name" />
              </a-form-model-item>
            </a-col> -->
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
              <a-form-model-item ref="description" :label="$t('contrAgent')" prop="partner_id">
                <a-select style="width: 100%;" v-model="form.partner_id" :placeholder="$t('Выберите партнера')">
                  <a-select-option v-for="item in partners" :key="item.id" :value="item.id" >
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
            <!-- <a-col :span="4">
              <a-form-model-item ref="description" :label="$t('Дт')" prop="description.en">
                <a-input :placeholder="$t('Введите имя')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item ref="description" :label="$t('Кт')" prop="description.en">
                <a-input :placeholder="$t('Введите имя')" />
              </a-form-model-item>
            </a-col> -->
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
              <a-button type="grey" style="margin-right: 6px" @click="$router.go(-1)">{{
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
        // person_name: '',
        partner_id: ''
      },
      rules: {
        'account_from': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'account_to': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'amount': [{ required: true, message: `Пожалуйста, заполните поле`, trigger: 'blur' }],
        // 'person_name': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'contract_date': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }],
        'contract_number': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'date': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }],
        'payment_gateway': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }],
        'operation_id': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }],
        'partner_id': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }]
      },
      accounts: [],
      operations: [],
      paymentGateways: [],
      partners: [],
      accountsParams: {
        count: null,
        limit: 10
      },
      operationsParams: {
        count: null,
        limit: 10
      },
      partnersParams: {
        count: null,
        limit: 10
      }
    }
  },
  mounted () {
    this.getOperations()
    this.getPaymentGateways()
    this.getPartners()
    if (this.$route.params.id) {
      this.$store.dispatch('getCashInOutDetail', this.$route.params.id).then(res => {
        console.log(res)
        this.form = {
          account_from: res.gl.account_from,
          account_to: res.gl.account_to,
          amount: res.gl.amount,
          contract_date: moment(res.gl.subconto_debit.title2.split(',').pop()).format('YYYY-MM-DD'),
          contract_number: res.gl.subconto_debit.title2.split(',')[0].slice(3),
          date: moment(res.gl.date_at).format('YYYY-MM-DD'),
          operation_id: `${res.gl.debit_operation_id}`,
          payment_gateway: res.gl.payment_gateway.id,
          // person_name: res.gl.subconto_debit.title,
          id: res.gl.guid,
          partner_id: res.partner_id
        }
      })
      .finally(() => {
        this.loading = false
      })
    }
  },
  methods: {
    updateCashIn () {
      this.$refs.ruleForm.validate((valid, values) => {
        if (valid) {
          this.loading = true
          const _form = JSON.parse(JSON.stringify(this.form))
          _form.amount = parseInt(_form.amount)
          _form.operation_id = parseInt(_form.operation_id)
          _form.payment_gateway = parseInt(_form.payment_gateway)
          this.$store.dispatch('createOrUpdateCashIn', _form).then(res => {
            console.log(res)
            this.$router.go(-1)
          })
          .finally(() => {
            this.loading = false
          })
        }
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
    },
    getPartners () {
      this.loading = true
      this.$store.dispatch('getPartners', { limit: 1000 }).then(res => {
        console.log(res)
        this.partners = res.partners
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
