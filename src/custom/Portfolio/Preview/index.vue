<template>
  <div>
    <a-navigation :list="[{ name: 'Список инвесторов', link: ''}]" :isBack="{ flag: true, link: '/portfolio/list'}" />
    <a-card>
      <a-table
        :columns="columns"
        :data-source="investments"
        :row-key="(record, i) => i"
        size="middle"
        :scroll="{ x: 1400, y: 700 }"
        bordered
      >
        <span slot="actions" slot-scope="text ,row" >
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.list')">
            <a-button @click="showModal(row)" type="primary" icon="eye" />
          </a-tooltip> -->
          <icon-btn icon="eye" @click="showModal(row)" :tooltip="$t('button.list')" />
        </span>
      </a-table>
      <a-modal v-model="visible.flag" :footer="null">
        <a-table
          :columns="columns1"
          :data-source="visible.data"
          :row-key="(record) => record.id"
          size="middle"
          :scroll="{ x: 300, y: 400 }"
          bordered
        >
        </a-table>
      </a-modal>
    </a-card >
  </div>
</template>
<script>

export default {
  data () {
    return {
      investments: null,
      visible: {
        flag: false,
        data: null
      },
      columns1: [
           {
            title: this.$t('investor.Percent'),
            dataIndex: 'percent_per_bond',
            key: 'percent_per_bond'
          },
           {
            title: this.$t('investor.Amount'),
            dataIndex: 'amount',
            key: 'amount'
          }
      ],
      columns: [
        {
        title: this.$t('Investor'),
        children: [
          {
            title: this.$t('investor.First_Name'),
            dataIndex: 'investor.first_name',
            key: 'first_name'
          },
          {
            title: this.$t('investor.Phone_Number'),
            dataIndex: 'investor.phone_number',
            key: 'phone_number'
          }
        ]
        },
        {
        title: this.$t('Investments'),
        children: [
          {
            title: this.$t('investor.interest_percent'),
            dataIndex: 'investment.interest_percent',
            key: 'interest_percent'
          },
          {
            title: this.$t('investor.investment_amount'),
            dataIndex: 'investment.investment_amount',
            key: 'investment_amount'
          },
          {
            title: this.$t('investor.month_limit'),
            dataIndex: 'investment.month_limit',
            key: 'month_limit'
          },
          {
            title: this.$t('investor.status'),
            dataIndex: 'investment.status',
            key: 'status'
          }
        ]
        },
        {
          title: this.$t('Portfolio.table.Actions'),
          scopedSlots: { customRender: 'actions' },
          key: 'actions',
          width: 150,
          fixed: 'right'
        }
      ]
    }
  },
  methods: {
    showModal (text) {
      console.log(text)
      this.visible.flag = true
      this.visible.data = text.bonds
    },
    getInvestments (id) {
      this.$store.dispatch('getPortfolioInvestment', id).then((res) => {
        this.investments = res.investments
        console.log(res)
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    }
  },
  created () {
    this.getInvestments(this.$route.params.id)
  }
}
</script>
