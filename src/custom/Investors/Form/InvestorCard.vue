<template>
  <a-card>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :row-key="(record, index) => index"
      size="middle"
      :scroll="{ x: 'auto' }"
      :pagination="false"
      :loading="loading"
      bordered
    >
      <span slot="calculated_sums" slot-scope="text">
        <span>{{ $moneyFormat(text.calculated_sums ) }}</span>
      </span>
      <span slot="share_in_uk" slot-scope="text">
        <span>{{ $moneyFormat(text.share_in_uk ) }}</span>
      </span>
      <span slot="withdrawn_amounts" slot-scope="text">
        <span>{{ $moneyFormat(text.withdrawn_amounts ) }}</span>
      </span>
      <span slot="calculated_dividends" slot-scope="text">
        <span>{{ $moneyFormat(text.calculated_dividends ) }}</span>
      </span>
      <span slot="reserve_irr" slot-scope="text">
        <span>{{ $moneyFormat(text.reserve_irr ) }}</span>
      </span>
      <span slot="taxes" slot-scope="text">
        <span>{{ $moneyFormat(text.taxes ) }}</span>
      </span>
      <span slot="profit_after_tax" slot-scope="text">
        <span>{{ $moneyFormat(text.profit_after_tax ) }}</span>
      </span>
      <span slot="paid_amount" slot-scope="text">
        <span>{{ $moneyFormat(text.paid_amount ) }}</span>
      </span>
      <span slot="total_amount" slot-scope="text">
        <span>{{ $moneyFormat(text.total_amount ) }}</span>
      </span>
      <span slot="investment_amount" slot-scope="text">
        <span>{{ $moneyFormat(text.investment_amount ) }}</span>
      </span>
      <span slot="dividend_amount" slot-scope="text">
        <span>{{ $moneyFormat(text.dividend_amount ) }}</span>
      </span>
    </a-table>
  </a-card>
</template>

<script>

export default {
  data () {
    return {
      tableData: [],
      loading: false,
       columns: [
        {
          title: this.$t('dateOfOperation'),
          align: 'center',
          dataIndex: 'operation_date'
        },
        {
          title: this.$t('contentsOfOperation'),
          align: 'center',
          dataIndex: 'operation_content'
        },
        {
          title: this.$t('terms'),
          align: 'center',
          dataIndex: 'deadlines'
        },
        {
          title: this.$t('calculated'),
          align: 'center',
          key: 'calculated_sums',
          scopedSlots: { customRender: 'calculated_sums' }
        },
        {
          title: this.$t('capitalization'),
          align: 'center',
          key: 'share_in_uk',
          scopedSlots: { customRender: 'share_in_uk' }
        },
        {
          title: this.$t('toDecrease'),
          align: 'center',
          key: 'withdrawn_amounts',
          scopedSlots: { customRender: 'withdrawn_amounts' }
        },
        {
          title: this.$t('payout'),
          align: 'center',
          children: [
            {
              title: this.$t('accruedDividends'),
              align: 'center',
              key: 'calculated_dividends',
              scopedSlots: { customRender: 'calculated_dividends' }
            },
            {
              title: this.$t('reserves'),
              align: 'center',
              key: 'reserve_irr',
              scopedSlots: { customRender: 'reserve_irr' }
            },
            {
              title: this.$t('tax'),
              align: 'center',
              key: 'taxes',
              scopedSlots: { customRender: 'taxes' }
            },
            {
              title: this.$t('profit_after_tax'),
              align: 'center',
              key: 'profit_after_tax',
              scopedSlots: { customRender: 'profit_after_tax' }
            },
            {
              title: this.$t('paidUp'),
              align: 'center',
              key: 'paid_amount',
              scopedSlots: { customRender: 'paid_amount' }
            }
          ]
        },
        {
          title: this.$t('dividendPeriods'),
          key: 'dividendPeriods',
          align: 'center',
          dataIndex: 'for_which_period'
        },
        {
          title: this.$t('partnership_share'),
          key: 'partnership_share',
          align: 'center',
          dataIndex: 'partnership_share'
        },
        {
          title: this.$t('dividendPeriods'),
          key: 'dividendPeriods',
          align: 'center',
          children: [
            {
              title: this.$t('total_amount'),
              align: 'center',
              key: 'total_amount',
              scopedSlots: { customRender: 'total_amount' }
            },
            {
              title: this.$t('investment_amount'),
              align: 'center',
              key: 'investment_amount',
              scopedSlots: { customRender: 'investment_amount' }
            },
            {
              title: this.$t('dividend_amount'),
              align: 'center',
              key: 'dividend_amount',
              scopedSlots: { customRender: 'dividend_amount' }
            }
          ]
        }
      ]
    }
  },
  methods: {
    getTableData (query) {
      this.loading = true
      this.$store
        .dispatch('getInvestorCard', this.$route.params.id)
        .then(res => {
          this.tableData = res.data

          const total = res.total

          this.tableData.push({
            operation_date: '',
            operation_content: '',
            deadlines: 'Итого',
            calculated_sums: total.total_calculated_sums,
            share_in_uk: total.total_share_in_uk,
            withdrawn_amounts: total.total_withdrawn_amounts,
            calculated_dividends: total.total_calculated_dividends,
            reserve_irr: total.total_reserve_irr,
            taxes: total.total_taxes,
            profit_after_tax: total.total_profit_after_tax,
            paid_amount: total.total_paid_amount,
            for_which_period: '',
            partnership_share: '',
            total_amount: total.total_amount,
            investment_amount: total.total_investment_amount,
            dividend_amount: total.total_dividend_amount
          })
          this.loading = false
        })
        .catch(reject => {
          this.$alertMessage('error', 'Произошла ошибка', '', this)
          this.loading = false
        })
    }
  },
  created () {
    this.getTableData()
  }
}
</script>

<style>
</style>
