
<template>
  <div>
    <a-navigation
      :list="[
        { name: $t('Finance'), link: '' },
        { name: $t('Expenses'), link: '' },
        { name: $t('Детальная информация'), link: '' }
      ]"
      :isBack="{ flag: true, return: true }"
    />
    <a-card>
      <a-form-model :colon="false" layout="horizontal" :rules="rules" :model="form" ref="ruleForm">
        <a-card :title="$t('Информация по счету')" class="no-border-card no-space-tab">
          <a-row type="flex" :gutter="16">
            <a-col :span="8">
              <a-form-model-item ref="date" :label="$t('Дата применения')" prop="date_at">
                <a-date-picker
                  placeholder="Select Time"
                  :format="$dateFormat"
                  valueFormat="YYYY-MM-DD"
                  style="width: 100%"
                  v-model="form.date_at"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="account" :label="$t('debitAccount')" prop="account_from">
                <a-input :placeholder="$t('Введите номер счета')" v-model="form.account_from" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="account" :label="$t('creditAccount')" prop="account_to">
                <a-input :placeholder="$t('Введите номер счета')" v-model="form.account_to" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="operation" :label="$t('debitOperation')" prop="debit_operation_id">
                <a-select style="width: 100%;" placeholder="Выберите тип операции" v-model="form.debit_operation_id">
                  <a-select-option v-for="op in operations" :key="op.id" :value="+op.id">
                    {{ $t(op.name) }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="operation" :label="$t('creditOperation')" prop="credit_operation_id">
                <a-select style="width: 100%;" placeholder="Выберите тип операции" v-model="form.credit_operation_id">
                  <a-select-option v-for="op in operations" :key="op.id" :value="+op.id">
                    {{ $t(op.name) }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-row>
                <a-col :span="20">
                  <a-form-model-item ref="description" prop="partner_id">
                    <span slot="label" style="width: 100%;">
                      <span>{{ $t('Partner') }}</span>
                    </span>
                    <a-select style="width: 100%;" v-model="form.partner_id" :placeholder="$t('Выберите партнера')">
                      <a-select-option v-for="item in partners" :key="item.id" :value="item.id" >
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="4">
                  <a-form-model-item ref="description">
                    <span slot="label" style="width: 100%;">
                    </span>
                    <a-tooltip placement="topLeft">
                      <span slot='title'>Партнер новое добавление</span>
                    <a-button @click="openModal">...</a-button>
                    </a-tooltip>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('nds_amount')" prop="nds_amount">
                <a-input-number
                  style="width: 100%"
                  v-model="form.nds_amount"
                  :formatter="value => value.replace(/(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="value => value.replace(/\s?|(,*)/g, '')"
                  :placeholder="$t('Введите сумму')"
                />
              </a-form-model-item>
            </a-col>
            <!-- <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Платежный шлюз')" prop="description.en">
                <a-input :placeholder="$t('Введите платежный шлюз')" />
              </a-form-model-item>
            </a-col> -->
            <a-col :span="8">
              <a-form-model-item ref="amount" :label="$t('Сумма без НДС')" prop="amount">
                <a-input-number style="width: 100%" :placeholder="$t('Введите сумму')" v-model="form.amount"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="monthly" :label="$t('monthly')" prop="monthly">
                <a-switch v-model="form.monthly" />
              </a-form-model-item>
            </a-col>
            <!-- <a-col :span="8">
                  <a-form-model-item :label="$t('Portfolio.create.Decription')" ref="description" prop="description">
                    <a-textarea :auto-size="{ minRows: 10, maxRows: 10 }" placeholder="запишите описание" v-model="portfolio.description"/>
                  </a-form-model-item>
                </a-col> -->
          </a-row>
          <a-row type="flex" :gutter="16">
            <a-col :span="24">
              <a-form-model-item ref="description" :label="$t('Portfolio.create.Decription')" prop="description">
                <a-textarea :placeholder="$t('Введите описание')" size="large" :maxLength="200" v-model="form.description" />
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
              <a-button type="grey" :loading="submitting" style="margin-right: 6px" @click="$router.go(-1)">{{
                $t('button.cancel')
              }}</a-button>
              <!-- <a-button type="primary">{{ $t('button.create') }}</a-button> -->
              <a-button type="primary" :loading="submitting" @click="submitExpense">{{ $t('button.save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
        <ModalCompanents ref="partners"/>
      </a-col>
    </a-row>
  </div>
</template>
<script>
// import formRule from './formRules'
// import imageUpload from '@/mixins/imageUpload'
// import debounce from 'lodash/debounce'
// import request from '@/utils/request'
import ModalCompanents from '../../../../components/PartnersModal/partnersModal'
export default {
  // mixins: [imageUpload],
  components: {
    ModalCompanents
  },
  data () {
    return {
      loading: false,
      submitting: false,
      accounts: [],
      operations: [],
      paymentGateways: [],
      accountsParams: {
        count: null,
        limit: 10
      },
      operationsParams: {
        count: null,
        limit: 10
      },
      partners: [],
      paymentGatewaysParams: {
        count: null,
        limit: 10
      },
      form: {
        account_from: null,
        amount: null,
        date_at: '',
        debit_operation_id: undefined,
        description: undefined,
        monthly: false,
        partner_id: '',
        nds_amount: null
      },
      rules: {
        'date_at': [{ required: true, message: 'Пожалуйста, заполните поле дату', trigger: 'change' }],
        'account_from': [{ required: true, message: 'Пожалуйста, заполните поле номер счета', trigger: 'change' }],
        'account_to': [{ required: true, message: 'Пожалуйста, заполните поле номер счета', trigger: 'change' }],
        'amount': [{ required: true, message: 'Пожалуйста, заполните поле cумма', trigger: 'change' }],
        'nds_amount': [{ required: true, message: 'Пожалуйста, заполните поле cумма', trigger: 'change' }],
        'debit_operation_id': [{ required: true, message: 'Пожалуйста, заполните поле тип операции', trigger: 'change' }],
        'credit_operation_id': [{ required: true, message: 'Пожалуйста, заполните поле тип операции', trigger: 'change' }],
        'description': [{ required: true, message: 'Пожалуйста, заполните поле описание', trigger: 'change' }],
        'partner_id': [{ required: true, message: 'Пожалуйста, выберите', trigger: 'change' }]
      }
    }
  },
  mounted () {
    // this.getAccounts()
    this.getPartners()
    this.getOperations()
    // this.getPaymentGateways()
  },
  methods: {
    openModal () {
      this.$refs.partners.showModal()
      this.getPartners()
    },
    submitExpense () {
      this.$refs.ruleForm.validate((valid, values) => {
        if (valid) {
          this.submitting = true
          this.$store.dispatch('postExpense', this.form).then((res) => {
            // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)
            this.$message.success('Expense has added successfully')
            this.$router.go(-1)
          })
          .finally(() => {
            this.submitting = false
          })
        }
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
