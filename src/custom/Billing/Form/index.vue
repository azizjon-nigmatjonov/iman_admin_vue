<template>
  <div>
    <a-navigation :list="[{ name: $t('торговые долги'), link: ''}]" :isBack="{ flag: false, link: '/category/list'}" />
    <a-card>
      <!-- <a-row type="flex" justify="end" class="mb-2">
        <a-col span="auto">
          <a-button v-if="false" type="primary" @click="$router.push('/bonds/list/new')">{{ $t('button.create') }}</a-button>
        </a-col>
      </a-row> -->
      <a-table
        :columns="columns"
        :data-source="debts"
        :row-key="record => record.id"
        size="middle"
        :pagination="pagination"
        :scroll="{ x: 700, y: 400 }"
        @change="getPagination"
        bordered>
        <span slot="birth_day" slot-scope="text">
          {{ text.birth_day | moment($dateTimeFormat) }}
        </span>
        <!-- <span slot="expiry_date" slot-scope="text">
          {{ text.expiry_date | moment('DD/MM/YY HH:mm') }}
        </span> -->
        <span slot="actions" slot-scope="text">
          <a-tooltip placement="bottomLeft" :title="$t('button.transaction')">
            <a-button @click="$router.push({ name: 'billing-list', params: { id: text.merchant.id }})" type="danger" icon="transaction" class="mx-1"/>
          </a-tooltip>
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
            <a-button @click="showModal(text)" type="primary" icon="eye" />
          </a-tooltip> -->
        </span>
      </a-table>
      <a-modal
        v-if="selectedInvestors"
        v-model="visible"
        :title="$t('Investor')"
        :footer="null"
        :width="700"
      >
      </a-modal>
    </a-card>
  </div>
</template>

<script>

export default {
data () {
  return {
    debts: [],
    merchant: [],
    visible: false,
    selectedInvestors: null,
    pagination: {
      current: 1,
      showQuickJumper: true
    },
    columns: [
      {
        title: this.$t('merchant.name'),
        dataIndex: 'merchant.name',
        key: 'merchant.name'
      },
      // {
      //   title: this.$t('merchant.username'),
      //   dataIndex: 'merchant.user_name',
      //   key: 'merchant.user_name'
      // },
      {
        title: this.$t('merchant.phone'),
        dataIndex: 'merchant.phone',
        key: 'merchant.phone'
      },
      // {
      //   title: this.$t('merchant.title'),
      //   dataIndex: 'merchant.title',
      //   key: 'merchant.title'
      // },
       {
        title: this.$t('debt'),
        dataIndex: 'debt',
        key: 'debt'
      }
      // {
      //   title: this.$t('investors.table.actions'),
      //   scopedSlots: { customRender: 'actions' },
      //   key: 'actions',
      //   width: 150,
      //   fixed: 'right'
      // }
    ]
  }
},
methods: {
  getPagination (e) {
    this.$router.push({ path: this.$router.fullPath, query: { page: e.current, limit: 10 } })
    this.getMerchantDebts({ page: e.current, limit: 10 })
    this.pagination.current = e.current
  },

  showModal (text) {
    this.selectedInvestors = { ...text }
    this.visible = true
  },
  getMerchantDebts (query) {
    console.log(query)
      this.$store.dispatch('getMerchantDebts', query).then(res => {
       console.log(res)
      this.debts = res.debts
      this.merchant = this.debts.merchant
      const pagination = { ...this.pagination }
      pagination.total = res.count
      this.pagination = pagination
  }).catch(er => {
    this.$message.error(er.response.data.message)
  })
  }
},
created () {
  let query = null
  if (this.$isEmptyObj(this.$route.query)) {
  query = { limit: 10, page: 1 }
    } else query = { limit: parseInt(this.$route.query.limit), page: parseInt(this.$route.query.page) }
    this.getMerchantDebts(query)
}
}
</script>

<style>
.imageClass {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
