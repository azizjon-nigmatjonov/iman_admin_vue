<template>
  <div>
    <div style="margin-bottom: 20px">
      <!-- <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('transferDividends')"
            @confirm="updateClaimsStatuses"
            :okText="$t('yes')"
            :cancelText="$t('no')"
        >
            <a-button :loading="loadingBtn">
                {{ $t('transferDividends') }}
            </a-button>
        </a-popconfirm> -->
      <!-- <div style="float: right">
        <a-form-model :colon="false" ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item ref="date" prop="date">
            <a-date-picker v-model="form.date" :format="$dateFormat" valueFormat="YYYY-MM-DD" :placeholder="$t('transferDividendsDate')" />
          </a-form-model-item>
        </a-form-model>
      </div> -->
    </div>
    <a-table
      bordered
      :pagination="false"
      :columns="column"
      :scroll="{ x: 200 }"
      :data-source="data"
      :loading="loading"
      :rowKey="(row, index) => index"
    >
      <template slot="orderNumber" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <span slot="user" slot-scope="text">
        {{ $t((text.user && text.user.name) || '') }}
      </span>
      <span slot="status" slot-scope="text">
        {{ $t(text.status) }}
      </span>
      <span slot="date" slot-scope="text">
        {{ text.created_at | moment($dateFormat) }}
      </span>
      <span slot="money" slot-scope="text">
        {{ $moneyFormat(+text) || '0' }}
      </span>
      <span slot="date" slot-scope="text">
        {{ text.date | moment($dateFormat) }}
      </span>
      <span v-if="text.listed_date" slot="listed_date" slot-scope="text">
        {{ text.listed_date | moment($dateFormat) }}
      </span>
      <span v-else slot="listed_date" slot-scope="text">
        <a-date-picker
          v-model="text.listed_date"
          :format="$dateFormat"
          valueFormat="YYYY-MM-DD"
          :placeholder="$t('transferDividendsDate')"
        />
      </span>
      <span slot="buttonTransfer" slot-scope="text">
        <a-button :loading="text.loading" @click="updateClaimsStatuses(text.claim_id, text)">
          {{ $t('transferDividends') }}
        </a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  props: {
      excelFile: {
        type: Object,
        default: () => {}
  }
  },
  data () {
    return {
      data: [],
      excelData: [],
      loading: false,
      loadingBtn: false,
      keys: {
        investor_name: 'Ф.И.О инвестора',
        period: 'Период',
        dividend_payment: 'Дивиденды к выплате (сум)',
        investment_amount: 'Вывод доли (сум)',
        payment_amount: 'Сумма (сум)',
        claim_id: 'ID',
        'bank_requisite.card_number': 'Номер карты',
        'bank_requisite.bank_name': 'Наименование банка',
        'bank_requisite.mfo': 'МФО',
        'bank_requisite.transit_account': 'Транзитный счёт',
        'bank_requisite.inn': 'ИНН банка'
      },
      column: [
        {
          title: 'No',
          width: 60,
          align: 'center',
          scopedSlots: { customRender: 'orderNumber' },
          key: 'orderNumber',
          fixed: 'left'
        },
        {
          title: 'Ф.И.О инвестора',
          dataIndex: 'investor_name',
          key: 'investorFullname',
          width: 256
        },
        {
          title: 'Дата',
          scopedSlots: { customRender: 'date' },
          key: 'date',
          width: 256
        },
        {
          title: 'Перечесление Дата',
          scopedSlots: { customRender: 'listed_date' },
          key: 'listed_date',
          width: 256
        },
        {
          title: 'Период',
          dataIndex: 'period',
          key: 'period',
          width: 128
        },
        {
          title: 'Дивиденды к выплате (сум)',
          scopedSlots: { customRender: 'money' },
          dataIndex: 'dividend_payment',
          key: 'dividendsPayable',
          width: 192
        },
        {
          title: 'Вывод доли (сум)',
          scopedSlots: { customRender: 'money' },
          dataIndex: 'investment_amount',
          key: 'shareWithdrawal',
          width: 160
        },
        {
          title: 'Сумма (сум)',
          scopedSlots: { customRender: 'money' },
          dataIndex: 'payment_amount',
          key: 'overall',
          width: 192
        },
        {
          title: 'Перечислено',
          scopedSlots: { customRender: 'buttonTransfer' },
          key: 'ov6erall',
          width: 192
        },
        {
          title: 'Банковские реквизиты',
          key: 'status',
          width: 192,
          children: [
            {
              title: 'Номер карты',
              key: 'status1',
              dataIndex: 'bank_requisite.card_number',
              width: 192
            },
            {
              title: 'Наименование банка',
              key: 'status2',
              dataIndex: 'bank_requisite.bank_name',
              width: 192
            },
            {
              title: 'МФО',
              key: 'status3',
              dataIndex: 'bank_requisite.mfo',
              width: 192
            },
            {
              title: 'Транзитный счёт',
              key: 'status4',
              dataIndex: 'bank_requisite.transit_account',
              width: 192
            },
            {
              title: 'ИНН банка',
              key: 'status5',
              dataIndex: 'bank_requisite.inn',
              width: 192
            }
          ]
        },
        {
          title: 'ID',
          width: 300,
          align: 'center',
          key: 'claim_id',
          dataIndex: 'claim_id'
        }
      ],
      form: {
        date: undefined
      },
      rules: {
        date: [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }]
      }
    }
  },
  mounted () {
    this.getCashOutReport()
  },
  methods: {
    // updateClaimsStatuses () {
    //     this.$refs.ruleForm.validate((valid) => {
    //         if (valid) {
    //             this.loadingBtn = true
    //             this.$store.dispatch('updateClaimsStatuses', {
    //                 guid: this.data.map(item => item.claim_id),
    //                 status_id: 7,
    //                 month_id: this.$route.params.id,
    //                 period: this.$route.params.date,
    //                 date_at: this.form.date
    //             }).then(res => {
    //                 this.$alertMessage('success', 'Message', 'Claims\' statuses successfully updated', this)
    //                 this.getCashOutReport()
    //             }).catch(() => {
    //                 this.$alertMessage('error', 'Message', 'Claims\' statuses were not updated', this)
    //             }).finally(() => {
    //                 this.loadingBtn = false
    //             })
    //         }
    //     })
    // },
    updateClaimsStatuses (Id, element) {
      element.loading = true
      this.$store
        .dispatch('updateClaimsStatuses', {
          guid: [Id],
          status_id: 7,
          month_id: this.$route.params.id,
          period: this.$route.params.date,
          date_at: element.listed_date
        })
        .then((res) => {
          this.$alertMessage('success', 'Message', "Claims' statuses successfully updated", this)
          this.getCashOutReport()
        })
        .catch(() => {
          this.$alertMessage('error', 'Message', "Claims' statuses were not updated", this)
        })
        .finally(() => {
          element.loading = false
        })
    },
    getCashOutReport () {
      this.loading = true
      this.$store
        .dispatch('getCashOutReport', { month_id: this.$route.params.id, date: this.$route.params.date })
        .then((res) => {
          console.log('getCashOutReport', res.data)
          if (res.data && res.data.length) {
            this.excelFile.xlsx2 = res.xlsx
            const sortedData = this.globalSort(res.data).map((el, index) => ({
              ...el,
              number: index + 1
            }))
            this.data = sortedData.map((el) => ({ ...el, loading: false })) || []
            this.excelData = sortedData || []
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
        .finally(() => {
          this.loading = false
        })
    },
    globalSort (array) {
      const sortarray = array.sort((a, b) =>
        a.investor_name.trim() > b.investor_name.trim() ? 1 : b.investor_name.trim() > a.investor_name.trim() ? -1 : 0
      )
      return sortarray
    }
  }
}
</script>

<style lang="less" scoped>
</style>
