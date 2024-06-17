<template>
  <div>
    <a-navigation
      :list="[
        { name: $t('Finance'), link: '' },
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
                />
              </a-form-model-item>
            </a-col>
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
              <a-button type="grey" :loading="loading" style="margin-right: 6px" @click="$router.go(-1)">{{
                $t('button.cancel')
              }}</a-button>
              <!-- <a-button type="primary">{{ $t('button.create') }}</a-button> -->
              <a-button type="primary" :loading="loading" @click="updateGl">{{ $t('button.save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
        <ModalCompanents ref="partners"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import formRules from './formRules'
export default {
  data () {
    return {
      loading: false,
      partners: [],
      operations: [],
      form: {
        'account_from': '',
        'account_to': '',
        'created_at': '',
        'credit': 0,
        'date_at': '',
        'debit': 0,
        'description': '',
        'guid': '',
        'object_id': '',
        'object_type': '',
        'operation_type': '',
        'partner_id': '',
        'payment_gateway': ''
      },
      rules: formRules
    }
  },
  methods: {

    getCashInOutDetail (id) {
      this.$store.dispatch('getCashInOutDetail', id).then(res => {
        console.log(res)
        this.form = res.gl
      })
    },
    getActions () {
      this.$store.dispatch('getPartners').then(res => {
        console.log(res)
        this.partners = res.partners
      })
      this.$store.dispatch('getOperations').then(res => {
        this.operations = res.operations
      })
    },
      updateGl () {
        if (!this.$isValid(this)) {
          return
        }
        this.loading = true
        const payload = { ...this.form }
        this.$store.dispatch('updateGl', payload).then(res => {
          console.log(res)
          this.$router.go(-1)
        }).finally(() => {
          this.loading = false
        })
      }
   },
  created () {
    this.getActions()
    this.getCashInOutDetail(this.$route.params.id)
  }
}
</script>

<style>

</style>
