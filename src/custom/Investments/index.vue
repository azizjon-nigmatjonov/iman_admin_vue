<template>
  <div>
    <a-navigation :list="[{ name: $t('Список инвестиций'), link: ''}]" :isBack="{ flag: false, link: ''}" />
    <a-card>
      <a-form layout="horizontal" :form="form" @submit="download">
        <a-row class="buttons">
          <a-col :span="8">
          </a-col>
          <a-col :span="8" class="buttons">
            <a-range-picker
              style="width: 100%"
              format="YYYY-MM-DD"
              :show-time="{
                hideDisabledOptions: false
              }"
              v-model="form.date"
            />
          </a-col>
          <a-col :span="4" class="buttons">
            <a-form-item style="margin-top: -5px">
              <a-button id="buttonSearch" type="primary" html-type="submit" icon="file-excel">{{ $t('Export to excel') }}</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        <a-table
          :columns="columns"
          @change="getPagination"
          :pagination="pagination"
          :data-source="investments"
          :row-key="record => record.guid"
          size="middle"
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
          <span slot="interest_percent" slot-scope="text"><strong>{{ text.interest_percent + '% ' }}</strong></span>
          <span slot="actions" slot-scope="text">
            <icon-btn icon="eye" @click="showModal(text)" :tooltip="$t('button.preview')" />
            <!-- <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
              <a-button @click="showModal(text)" type="primary" icon="eye" />
            </a-tooltip> -->
          </span>
        </a-table>
        <a-modal
          v-model="visible.flag"
          :title="$t('Investments')"
          :footer="null"
        ><template>
          <a-descriptions
            bordered
            :column="{ xxl: 3, xl: 1, lg: 1, md: 16, sm: 1, xs: 1 }"
          >
            <a-descriptions-item label="Investment type">
              {{ visible.data.investment_type }}
            </a-descriptions-item>
            <a-descriptions-item label="Total money">
              {{ visible.data.investment_amount }}
            </a-descriptions-item>
          </a-descriptions>
        </template>
        </a-modal>
      </a-form>
    </a-card>
  </div>
</template>

<script>
 import { downloadfile } from '@/utils/request'
export default {
data () {
  return {
    date_begin: '',
    date_end: '',
    visible: {
      flag: false,
      data: {}
    },
    pagination: {
      current: 1,
      showQuickJumper: true
    },
    investments: [],
    columns: [
      {
        title: this.$t('Investor'),
        dataIndex: 'investor.first_name',
        key: 'investor.first_name',
        width: 100
      },
      // {
      //   title: this.$t('Last_name'),
      //   dataIndex: 'investor.first_name',
      //   key: 'investor.first_name',
      //   width: 100
      // },
      {
        title: this.$t('investment.table.created_at'),
        scopedSlots: { customRender: 'created_at' },
        key: 'created_at',
        width: 100
      },
      // {
      //   title: this.$t('investment.table.investment_type'),
      //   dataIndex: 'investment_type',
      //   key: 'investment_type',
      //   width: 100
      // },
       {
        title: this.$t('investment.table.investment_amount'),
        scopedSlots: { customRender: 'investment_amount' },
        key: 'investment_amount',
        width: 100
      },
        {
        title: this.$t('investment.table.interest_percent'),
        scopedSlots: { customRender: 'interest_percent' },
        key: 'interest_percent',
        width: 100
      },
       {
        title: this.$t('investment.table.status'),
        scopedSlots: { customRender: 'status' },
        key: 'status',
        width: 100
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
      this.$store.dispatch('getInvestmentReports', a).then((response) => {
        console.log(response)
        downloadfile.get(response.filename).then((res) => {
        var fileURL = window.URL.createObjectURL(new Blob([res.data]))
        var fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', `File`)
        document.body.appendChild(fileLink)
        fileLink.click()
        window.location.href = response.filename
      })
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
  getPagination (e) {
    this.$router.push({ path: this.$router.fullPath, query: { page: e.current, limit: 10 } })
    this.getInvestments({ page: e.current, limit: 10 })
    this.pagination.current = e.current
  },

  showModal (obj) {
    this.visible.flag = true
    this.visible.data = { ...obj }
    },

  getInvestments (query) {
      this.$store.dispatch('getInvestments', query).then(res => {
        console.log(res)
      this.investments = res.investments
        const pagination = { ...this.pagination }
        pagination.total = res.count
        this.pagination = pagination
  }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
  }
},
created () {
  let query = null
  if (this.$isEmptyObj(this.$route.query)) {
  query = { limit: 10, page: 1 }
    } else {
      query = this.$route.query
      this.pagination.current = parseInt(this.$route.query.page)
    }
    this.getInvestments(query)
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
