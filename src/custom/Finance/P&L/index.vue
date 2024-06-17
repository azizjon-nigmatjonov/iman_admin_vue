<template>
  <div>
    <a-navigation :list="[{ name: $t('P&L'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <div style="float: right">
        <a-form-model layout="inline">
          <!-- <a-form-model-item :label="'Royal fee'">
            <a-input-number v-model="formFilter.number" @change="onNumberChange"/>
          </a-form-model-item> -->
          <a-form-model-item>
            <a-select
              style="width: 200px"
              placeholder="Год"
              :options="years"
              @change="onYearSelect"
              v-model="selectedYear"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-select
              style="width: 200px"
              placeholder="Месяцы"
              :options="months"
              @change="onMonthSelect"
              v-model="selectedMonth"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-range-picker
              style="width: 250px"
              format="YYYY-MM-DD"
              v-model="formFilter.dates"
              @change="onDateChange"
            />
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-navigation>
    <a-card>
      <a-table
        :columns="columns"
        :loading="loading"
        :pagination="false"
        :data-source="pl"
        :row-key="record => record.guid"
        size="middle"
        bordered
      >
        <span slot="customer.birthday" slot-scope="text">
          {{ text.customer.birthday | moment($dateTimeFormat) }}
        </span>
        <span slot="expiry_date" slot-scope="text">
          {{ text.expiry_date | moment($dateTimeFormat) }}
        </span>
        <span slot="created_at" slot-scope="text">
          {{ text.created_at | moment($dateTimeFormat) }}
        </span>
        <span slot="status" slot-scope="text"><a-tag color="pink">{{ text.status }}</a-tag></span>
        <span slot="investment_amount" slot-scope="text">
          {{ $moneyFormat(text.investment_amount) }}
        </span>
        <span slot="money" slot-scope="text">
          {{ $moneyFormat(text) || 0 }}
        </span>
        <span slot="interest_percent" slot-scope="text"><strong>{{ text.interest_percent + '% ' }}</strong></span>
        <span slot="actions" slot-scope="text">
          <icon-btn icon="eye" @click="showModal(text)" :tooltip="$t('button.preview')" />
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
              <a-button @click="showModal(text)" type="primary" icon="eye" />
            </a-tooltip> -->
        </span>
      </a-table>
    </a-card>
    <!-- <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 20px">
      <a-button type="primary" @click="visible = true"> {{ $t('recognizeProfit') }} </a-button>
    </div> -->
    <a-modal
      v-model="visible"
      :title="$t('Investor')"
      :footer="null"
      size="small"
      :closable="!sending"
      :maskClosable="!sending"
    >
      <a-form-model :colon="false" :model="form" :rules="rules" layout="horizontal" ref="ruleForm">
        <a-form-model-item ref="announce_date" :label="$t('Дата')" prop="announce_date">
          <a-date-picker
            placeholder="Select Time"
            :format="$dateFormat"
            v-model="form.announce_date"
            style="width: 100%"
          />
        </a-form-model-item>
      </a-form-model>
      <a-form-model-item>
        <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 20px">
          <a-button type="primary" :loading="sending" @click="sendNetProfit"> {{ $t('announce') }} </a-button>
        </div>
      </a-form-model-item>
    </a-modal>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import moment from 'moment'
export default {
data () {
  this.getPandlList = debounce(this.getPandlList, 400)
  return {
    formFilter: {
      dates: [],
      number: 30
    },
    date_begin: '',
    date_end: '',
    modalDate: '',
    loading: false,
    visible: false,
    pagination: {
      // current: 1,
      // limit: 10
    },
    selectedMonth: undefined,
    selectedYear: undefined,
    months: this.$store.state.app.months,
    years: this.$store.state.app.years,
    rules: {
      'announce_date': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }]
    },
    pl: [],
    columns: [
      {
        title: this.$t('title'),
        dataIndex: 'title',
        key: 'title',
        width: 600
      },
      {
        title: this.$t('account_code'),
        dataIndex: 'AccountCode',
        align: 'center',
        key: 'account_code'
      },
      {
        title: this.$t('code'),
        dataIndex: 'code',
        align: 'center',
        key: 'code'
      },
      {
        title: this.$t('reportingPeriod'),
        children: [
            {
                title: this.$t('profit'),
                dataIndex: 'profit',
                align: 'center',
                scopedSlots: { customRender: 'money' },
                key: 'profit'
            },
            {
                title: this.$t('loss'),
                dataIndex: 'loss',
                scopedSlots: { customRender: 'money' },
                align: 'center',
                key: 'loss'
            }
        ]
      }
    ],
    sending: false,
    form: {
      announce_date: '',
      amount: ''
    }
  }
},
methods: {
    // getPagination (e) {
    //     this.getPandlList({ page: e.current, limit: 10 })
    //     this.pagination.current = e.current
    // },
    onMonthSelect (val) {
        const date = moment().set('month', val)
        const selectedYear = this.selectedYear ?? moment().format('YYYY')
        date.set('year', selectedYear)
        const range = [date.startOf('month').format('YYYY-MM-DD'), date.endOf('month').format('YYYY-MM-DD')]
        const momentRange = [moment(range[0]), moment(range[1])]
        this.formFilter.dates = momentRange
        this.onDateChange(momentRange, range)
      },
      onYearSelect (val) {
        const date = moment().set('year', val)
        const selectedMonth = this.selectedMonth ?? moment().format('M') - 1
        date.set('month', selectedMonth)
        const range = [date.startOf('month').format('YYYY-MM-DD'), date.endOf('month').format('YYYY-MM-DD')]
        const momentRange = [moment(range[0]), moment(range[1])]
        this.formFilter.dates = momentRange
        this.onDateChange(momentRange, range)
    },
    checkPost () {
      let flag = null
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          flag = true
          return true
        } else {
          this.$message.warning('Please enter date')
          flag = false
          return false
        }
      })
      return flag
    },
    sendNetProfit () {
      if (this.checkPost() === false) return -1
      this.sending = true
      this.$store.dispatch('postNetProfitAnnounce', this.form)
        .then(res => {
            console.log(res)
            this.$message.success('Announced successfully')
            this.form.announce_date = ''
            this.visible = false
        })
        .catch(reject => {
            console.log(reject.response.data)
            this.$message.warning(reject.response.data.message)
        })
        .finally(() => {
            this.sending = false
        })
    },
    getPandlList (query) {
        this.loading = true
        this.$store.dispatch('getPandlList', query)
            .then(res => {
                console.log(res)
                this.pl = res.profit_list && res.profit_list.length && res.profit_list[0].pl || []
                // this.pagination.total = res.count
                this.form.amount = res.profit_list[0].pl[this.pl.length - 1].profit
            })
            .catch(reject => {
                console.log(reject.response.data)
                this.$message.warning(reject.response.data.message)
            })
            .finally(() => {
                this.loading = false
            })
    },
    onNumberChange (val) {
        const pagination = { ...this.pagination }
        // pagination.current = 1
        if (this.formFilter.dates.length) {
          pagination.date_begin = moment(this.formFilter.dates[0]).format('YYYY-MM-DD')
          pagination.date_end = moment(this.formFilter.dates[1]).format('YYYY-MM-DD')
        }
        // pagination.royalty_fee = val
        this.getPandlList(pagination)
    },
    onDateChange (e, val) {
        console.log('on date change', e, val)
        const pagination = { ...this.pagination }
        // pagination.current = 1
        // if (this.formFilter.number !== null) {
        //   pagination.royalty_fee = this.formFilter.number
        // }
        pagination.date_begin = val[0]
        pagination.date_end = val[1]
        this.getPandlList(pagination)
    }
},
created () {
    this.getPandlList({
      // royalty_fee: 30
    })
}
}
</script>

<style scoped>
 .buttons {
   margin-left: auto;
   margin: 5px;
   display: flex;
   justify-content: flex-end;
 }
</style>
