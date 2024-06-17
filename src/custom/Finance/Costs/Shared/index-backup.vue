<template>
  <div>
    <!-- <a-navigation
      :list="[{ name: $t('Finance'), link: '/clients/list'},
              { name: $t('ClientData'), link: ''}]"
      :isBack="{ flag: true, return: true }"
      noBorder
    /> -->
    <a-navigation
      :list="[
        { name: $t('Finance'), link: '' },
        { name: $t('Expenses'), link: '' },
        { name: $t('Детальная информация'), link: '' }
      ]"
      :isBack="{ flag: true, return: true }"
    />
    <a-card :title="$t('Информация по счету')" class="no-border-card no-pt-body-card">
      <a-form-model :colon="false" layout="horizontal" :rules="rules" :model="form" ref="ruleForm">
        <a-row :gutter="16">
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('Дата применения')" prop="date_at">
              <a-date-picker v-model="form.date_at" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('debitAccount')" prop="acount_from">
              <a-input v-model="form.account_from" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('creditAccount')" prop="account_to">
              <a-input v-model="form.account_to" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('amount')" prop="amount">
              <a-input v-model="form.amount" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('count_credit')" prop="count_credit">
              <a-input v-model="form.count_credit" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('count_debit')" prop="count_debit">
              <a-input v-model="form.count_credit" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('operation_type')" prop="operation_type">
              <a-select v-model="form.operation_type" style="width: 100%">
                <a-select-option v-for="item in operations" :key="item.id" :value="item.id" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('partner_id')" prop="partner_id">
              <a-select v-model="form.partner_id" style="width: 100%">
                <a-select-option v-for="item in partners" :key="item.id" :value="item.id" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('description')" prop="description">
              <a-textarea v-model="form.description" style="width: 100%">
              </a-textarea>
            </a-form-model-item>
          </a-col>
          <!-- <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('subconto_credit.title')" prop="subconto_credit.title">
              <a-input v-model="form.subconto_credit.title" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('subconto_credit.title2')" prop="subconto_credit.title2">
              <a-input v-model="form.subconto_credit.title2" style="width: 100%" />
            </a-form-model-item>
          </a-col> -->
          <!-- <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('subconto_debit.title')" prop="subconto_debit.title">
              <a-input v-model="form.subconto_debit.title" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('subconto_debit.title2')" prop="subconto_debit.title2">
              <a-input v-model="form.subconto_debit.title2" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('patronymic')" prop="min_investment_amount">
              <a-input v-model="form.account_from" style="width: 100%" />
            </a-form-model-item>
          </a-col> -->
        </a-row>
        <a-row type="flex" :gutter="[8,8]" justify="end">
          <a-col span="auto"><a-button @click="$router.go(-1)">{{ $t('button.cancel') }}</a-button></a-col>
          <a-col span="auto"><a-button type="primary" :loading="loading" @click="updateGl">{{ $t('button.save') }}</a-button></a-col>
        </a-row>
      </a-form-model>
    </a-card>
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
