<template>
  <div>
    <a-navigation :list="[{ name: $t('торговые операции'), link: ''}]" :isBack="{ flag: false, link: '/category/list'}" />
    <a-card>
      <a-row type="flex" :gutter="[8, 8]">
        <a-col :span="8">
          <a-range-picker
            style="width: 100%"
            format="YYYY-MM-DD"
            :show-time="{
              hideDisabledOptions: false
            }"
            v-model="form.date"
          />
        </a-col>
        <a-col span="auto">
          <a-button @click="download" id="buttonSearch" type="primary" icon="file-excel">{{ $t('Export to excel') }}</a-button>
        </a-col>
      </a-row>
      <!-- <a-row type="flex" justify="end" class="mb-2">
        <a-col span="auto">
          <a-button v-if="false" type="primary" @click="$router.push('/bonds/list/new')">{{ $t('button.create') }}</a-button>
        </a-col>
      </a-row> -->
      <a-table
        class="my-1"
        :columns="columns"
        :data-source="transactions"
        :row-key="record => record.id"
        size="middle"
        :scroll="{ x: 800, y: 600 }"
        @change="getPagination"
        :pagination="pagination"
        bordered>
        <span slot="birth_day" slot-scope="text">
          {{ text.birth_day | moment($dateTimeFormat) }}
        </span>
        <span slot="created_at" slot-scope="text">
          {{ text.created_at | moment($dateTimeFormat) }}
        </span>
        <span slot="debt" slot-scope="text">
          {{ $moneyFormat(text.debt) }}
        </span>
        <!-- <span slot="expiry_date" slot-scope="text">
          {{ text.expiry_date | moment('DD/MM/YY HH:mm') }}
        </span> -->
        <!-- <span slot="actions" slot-scope="text">
          <a-tooltip placement="bottomLeft" :title="$t('button.transaction')">
            <a-button @click="$router.push({ name: 'billing-list', params: { id: text.id} })" type="danger" icon="transaction" class="mx-1"/>
          </a-tooltip>
          <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
            <a-button @click="showModal(text)" type="primary" icon="eye" />
          </a-tooltip>
        </span> -->
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
import downloadfile from '@/utils/request'
export default {
data () {
  return {
    transactions: [],
    visible: false,
    selectedInvestors: null,
    date_begin: '',
    date_end: '',
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
        {
        title: this.$t('Created at'),
        scopedSlots: { customRender: 'created_at' },
        key: 'created_at'
      },
      {
        title: this.$t('debt'),
        scopedSlots: { customRender: 'debt' },
        key: 'debt'
      }
    ],
    form: { date: [] }
  }
},
methods: {
  download (e) {
      e.preventDefault()
      this.date_begin = this.form.date[0].format('YYYY-MM-DD')
      this.date_end = this.form.date[1].format('YYYY-MM-DD')
    //   const date = [ this.date_begin, this.date_end ]
    const a = {
        start: this.date_begin,
        end: this.date_end
    }
    //   console.log(date)
      this.$store.dispatch('getMerchantTransactionsReports', a).then((res) => {
        console.log(res)
        // window.location.href = res.filename
        downloadfile.get(res.filename).then((res) => {
        var fileURL = window.URL.createObjectURL(new Blob([res.data]))
        var fileLink = document.createElement('a')
        fileLink.href = fileURL
        console.log('file url', fileURL)
        console.log('filelink', fileLink)
        fileLink.setAttribute('download', `File`)
        document.body.appendChild(fileLink)
        fileLink.click()
        window.location.href = res.filename
        console.log('filename', res.filename)
      })
      })
    },
  getPagination (e) {
    this.$router.push({ path: this.$router.fullPath, query: { page: e.current, limit: 10 } })
    this.getMerchantTransactions({ page: e.current, limit: 10 })
    this.pagination.current = e.current
  },

  showModal (text) {
    this.selectedInvestors = { ...text }
    this.visible = true
  },
  getMerchantTransactions (query) {
    console.log(query)
      this.$store.dispatch('getMerchantTransactions', query).then(res => {
       console.log(res)
      this.transactions = res.transactions
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
    this.getMerchantTransactions(query)
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
