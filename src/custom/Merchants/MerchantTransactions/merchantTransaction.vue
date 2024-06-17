<template>
  <div>
    <!-- <a-navigation :list="[{ name: 'Список Сделки', link: ''}]" :isBack="{ flag: true, link: '/merchants'}" /> -->
    <a-row type="flex" justify="end" class="mb-2">
      <a-col span="auto">
        <a-button type="primary" @click="$router.push({ name: 'billing-list', params: { id: $route.params.id }})" icon="transaction">{{ $t('button.transfer') }}</a-button>
      </a-col>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="transactions"
      :row-key="record => record.id"
      @change="getPagination"
      :pagination="pagination"
      size="middle"
      :scroll="{ x: 700, y: 400 }"
    >
      <span slot="created_at" slot-scope="text">
        {{ text.created_at | moment($dateTimeFormat) }}
      </span>
      <span slot="type" slot-scope="text">
        <a-tag :color="getStatusColor(text.type)">{{ text.type }}</a-tag>
      </span>
      <span slot="amount" slot-scope="text">
        <a-tag :color="getStatusColor(text.type)">{{ text.amount }}</a-tag>
      </span>
    </a-table>
    <h1> {{ $t('your_debt:') }} : {{ $moneyFormat(this.total_debt) }}</h1>
  </div>
</template>

<script>
export default {
 data () {
     return {
         pagination: {
            current: 1,
            showQuickJumper: true
         },
         staticRouteId: this.$route.params.id,
         columns: [
        //      {
        //      title: this.$t('category.table.name'),
        //      dataIndex: 'title.ru',
        //      key: 'title'
        //  },
        //  {
        //      title: 'Language',
        //      dataIndex: 'lang',
        //      key: 'lang'
        //  },
          {
             title: this.$t('amount'),
             scopedSlots: { customRender: 'amount' },
             key: 'amount',
             customCell: (record, index) => {
              return {
                on: {
                  click: (event) => {
                    console.log(record, index)
                    if (record.type === 'debt') {
                    this.$router.push({ name: 'transactions-merchant-products', params: { id: record.bond_id }, query: { parent_id: this.staticRouteId } })
                    }
                  }
                }
              }
          }
         },
         {
             title: this.$t('created_at'),
             scopedSlots: { customRender: 'created_at' },
             key: 'created_at',
             customCell: (record, index) => {
              return {
                on: {
                  click: (event) => {
                    console.log(record, index)
                    if (record.type === 'debt') {
                    this.$router.push({ name: 'transactions-merchant-products', params: { id: record.bond_id }, query: { parent_id: this.staticRouteId } })
                    }
                  }
                }
              }
          }
         },
        //   {
        //      title: this.$t('merchant'),
        //      dataIndex: 'merchant.name',
        //      key: 'merchant.name'
        //  },
         {
             title: this.$t('prepayment_percent'),
             dataIndex: 'prepayment_percent',
             key: 'prepayment_percent',
             customCell: (record, index) => {
              return {
                on: {
                  click: (event) => {
                    console.log(record, index)
                    console.log(record.bond_id)
                    if (record.type === 'debt') {
                    this.$router.push({ name: 'transactions-merchant-products', params: { id: record.bond_id }, query: { parent_id: this.staticRouteId } })
                    }
                  }
                }
              }
          }
         },
         {
             title: this.$t('prepayment_type'),
             dataIndex: 'prepayment_type',
             key: 'prepayment_type',
             customCell: (record, index) => {
              return {
                on: {
                  click: (event) => {
                    console.log(record.bond_id)
                    if (record.type === 'debt') {
                    this.$router.push({ name: 'transactions-merchant-products', params: { id: record.bond_id }, query: { parent_id: this.staticRouteId } })
                    }
                  }
                }
              }
          }
         },
        //  {
        //      title: this.$t('status'),
        //      dataIndex: 'status',
        //      key: 'status'
        //  },
        {
             title: this.$t('type'),
             scopedSlots: { customRender: 'type' },
             key: 'type',
             customCell: (record, index) => {
              return {
                on: {
                  click: (event) => {
                    console.log(record, index)
                    if (record.type === 'debt') {
                    this.$router.push({ name: 'transactions-merchant-products', params: { id: record.bond_id }, query: { parent_id: this.staticRouteId } })
                    }
                  }
                }
              }
          },
            width: 150
      }
         ],
         transactions: [],
         balance: 0,
         total_debt: 0
     }
 },
 methods: {
     getStatusColor (color) {
      var selected
      switch (color) {
        case 'transfer':
          selected = 'green'
          break
        case 'debt':
          selected = 'red'
          break
        default:
          selected = ''
      }
      return selected
    },
    getStatusColorAmount (num) {
      var a
      if (this.transactions.type === 'transfer') {
        a = 'green'
      } else if (this.transactions.type === 'debt') {
        a = 'red'
      }
      return a
    },
     getPagination (e) {
    this.$router.push({ path: this.$router.fullPath, query: { page: e.current, limit: 10 } })
    this.getMerchantTransaction({ query: { page: e.current, limit: 10 }, id: this.$route.params.id })
    this.pagination.current = e.current
  },
     getMerchantTransaction (query) {
         this.$store.dispatch('getMerchantTransaction', query).then(res => {
             console.log(res)
             this.balance = res.balance
             this.total_debt = res.total_debt
             this.transactions = res.transactions
             const pagination = { ...this.pagination }
             pagination.total = res.count
             this.pagination = pagination
         })
     }
 },
 created () {
     this.getMerchantTransaction({ query: { page: 1, limit: 10 }, id: this.$route.params.id })
 }
}
</script>

<style>
.balance {
   margin-left: auto;
   margin: 5px;
   display: flex;
   justify-content: flex-end;
 }
</style>
