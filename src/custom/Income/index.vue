<template>
  <div>
    <a-navigation :list="[{ name: $t('Приход') }]" :isBack="{ flag: false, link: '/income'}" noBorder>
      <a-button type="primary" style="float: right" @click="download" icon="file-excel">{{ $t('Export to excel') }}</a-button>
    </a-navigation>
    <a-card class="no-space-tab">
      <!-- <a-tabs :activeKey="currentTab" @change="onTabChange">
        <a-tab-pane :tab="$t(item)" :key="item" v-for="item in typeList"> -->
      <a-card>
        <div class="mb-3">
          <a-form-model :colon="false" layout="horizontal" :rules="rules" :model="form" ref="ruleForm">
            <a-row type="flex" justify="space-between" :gutter="[16, 16]">
              <a-col :md="8">
                <a-form-model-item>
                  <div style="display: flex; align-items: center">
                    <span style="margin-right: 10px">{{ $t('search') }}:</span>
                    <a-input v-model="searcher.search" :placeholder="$t('search')" @change="filterInput" />
                  </div>
                </a-form-model-item>
              </a-col>
              <!-- <a-col :md="6">
                    <a-form-model-item>
                      <a-input v-model="searcher.num" :placeholder="$t('Телефон клиента')" @change="filterInput1" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="6">
                    <a-form-model-item>
                      <a-input v-model="searcher.posNum" :placeholder="$t('Номер телефона Пос агент')" @change="filterInput2" />
                    </a-form-model-item>
                  </a-col> -->
              <a-col :md="6">
                <a-form-model-item prop="date">
                  <a-range-picker
                    style="width: 100%"
                    :format="'YYYY-MM-DD'"
                    :show-time="{
                      hideDisabledOptions: false
                    }"
                    v-model="form.date"
                    @change="filterInput3"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </div>
        <a-table
          :columns="columns"
          :data-source="installment_list"
          :row-key="(record) => record.guid"
          @change="getPagination"
          :pagination="pagination"
          :loading="spinning"
          :scroll="{ x: 1500 }"
          :rowClassName="(record) => record.verified ? 'table-row-green' : ''"
          bordered
        >
          <span slot="customer.birthday" slot-scope="text">
            {{ text.customer.birthday | moment($dateFormat) }}
          </span>
          <span slot="created_at" slot-scope="text">
            {{ text.created_at | moment($dateTimeFormat) }}
          </span>
          <span slot="pos_agent" slot-scope="text">
            {{ text.pos_agent.first_name + ' ' + text.pos_agent.last_name }} <br> {{ text.pos_agent.phone_number }}
          </span>
          <span slot="merchant_branch" slot-scope="text">
            {{ text.merchant.merchant.name + ' ' + '/ ' + ' ' + text.merchant.merchant_branch.name }}
          </span>
          <span slot="contract_number" slot-scope="text">
            {{ text.contract_number.slice(3) }}
          </span>
          <span slot="money" slot-scope="text">
            {{ $moneyFormat(text) }}
          </span>
          <span slot="amount_per_month" slot-scope="text">
            {{ $moneyFormat(text.amount_per_month) }}
          </span>
          <span slot="installment_amount" slot-scope="text">
            {{ $moneyFormat(text.installment_amount) }}
          </span>
          <span slot="status" slot-scope="text">
            <a-tag :color="getStatusColor(text.status)">{{ $t(text.status) }}</a-tag>
          </span>
          <span slot="scoring_status" slot-scope="text">
            <a-tag :color="getStatusColor(text.scoring_status)">{{ text.scoring_status }}</a-tag>
          </span>

          <span slot="actions" slot-scope="text">
            <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
              <a-button @click="$router.push({name:'edit scroing', params: { id: text.guid } })" class="mx-1" type="primary" icon="edit" />
            </a-tooltip>
          </span>
        </a-table>
      </a-card>
      <!-- </a-tab-pane>
      </a-tabs> -->
    </a-card>
  </div>
</template>

<script>
// import moment from 'node_modules/moment/ts3.1-typings/moment'
// import _ from 'lodash'
//  import { downloadfile } from '@/utils/request'
import debounce from 'lodash/debounce'
import moment from 'moment'
export default {
  data () {
    this.filterInput = debounce(this.filterInput, 700)
    return {
      currentTab: '3аявки',
      typeList: [
        'Все',
        '3аявки',
        'Приход',
        'Продажа',
        'Успешный'
      ],
      status: this.$route.path.split('/')[1],
      spinning: false,
      vis: false,
      visible: {
        flag: false,
        data: {
          customer: {}
        }
      },
      rules: {
        'date': [{ required: true, message: 'Пожалуйста, заполните поле дату', trigger: 'blur' }]
      },
      pagination: {
        current: 1,
        showQuickJumper: true
      },
      installment_list: [],
      searcher: {
        search: ''
      },
      form: {
         date: []
      },
      date_begin: '',
      date_end: '',
      columns: [
        {
          title: this.$t('bonds.table.status'),
          scopedSlots: { customRender: 'status' },
          key: 'status',
          width: 160,
          customCell: this.onRowCLickFunc
        },
        {
            title: this.$t('contract_number'),
            dataIndex: 'contract_number',
            key: 'contract_number',
            customCell: this.onRowCLickFunc
        },
        {
            title: this.$t('Created_at'),
            scopedSlots: { customRender: 'created_at' },
            key: 'created_at',
            customCell: this.onRowCLickFunc
        },
        {
            title: this.$t('Сумма (Общее с рассрочкой)'),
            scopedSlots: { customRender: 'money' },
            dataIndex: 'total_price',
            key: 'total_price',
            customCell: this.onRowCLickFunc
        },
        {
            title: this.$t('first_name'),
            dataIndex: 'customer.passport.first_name',
            key: 'customer.passport.first_name',
            customCell: this.onRowCLickFunc
        },
        {
            title: this.$t('last_name'),
            dataIndex: 'customer.passport.last_name',
            key: 'customer.passport.last_name',
            customCell: this.onRowCLickFunc
        },
        {
            title: this.$t('doc_number'),
            dataIndex: 'customer.passport.doc_number',
            key: 'customer.passport.doc_number',
            customCell: this.onRowCLickFunc
        },
        {
            title: this.$t('pos_agent'),
            scopedSlots: { customRender: 'pos_agent' },
            key: 'pos_agent',
            customCell: this.onRowCLickFunc
        },
        {
            title: this.$t('Merchant_branch'),
            scopedSlots: { customRender: 'merchant_branch' },
            key: 'merchant_branch',
            customCell: this.onRowCLickFunc
        }
      ]
    }
  },
  watch: {
    '$route.query': {
      handler () {
        let query = null
        if (this.$isEmptyObj(this.$route.query)) {
          query = { limit: 10, page: 1 }
        } else {
          query = this.$route.query
          if (query.start_date) {
            this.form.date = [
              moment(query.start_date),
              moment(query.end_date)
            ]
          }
          this.pagination.current = parseInt(this.$route.query.page)
          this.searcher.search = this.$route.query.query
        }
        if (this.searcher.search) {
          query.status = 'done'
          this.getInstallmentsSearch(query)
        } else {
          this.getScoring(query)
        }
      }
    }
  },
  methods: {
    onRowCLickFunc (record, index) {
      return {
        on: {
          click: (event) => {
            console.log(record, index)
              this.$router.push({ name: 'edit scoring income', params: { id: record.guid } })
          }
        }
      }
    },
    getInstallmentsSearch (query) {
      this.spinning = true
      this.$store.dispatch('getInstallmentSearch', query).then((res) => {
        console.log(res)
        this.installment_list = res.installment_list
        const pagination = { ...this.pagination }
        pagination.total = res.count
        this.pagination = pagination
      }).finally(() => {
        this.spinning = false
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    onTabChange (val) {
      console.log(val)
      this.currentTab = val
    },
    filterInput (e) {
      const query = { ...this.$route.query }
      query.query = this.searcher.search
      query.page = 1
      query.status = 'done'
      if (this.form.date.length) {
        query.start_date = this.form.date[0].format('YYYY-MM-DD')
        query.end_date = this.form.date[1].format('YYYY-MM-DD')
      }
      const { status, ...others } = query
      this.$router.push({ path: this.$router.fullPath, query: { ...others, page: 1 } })
      // this.getInstallmentsSearch(query)
    },
    filterInput3 (e) {
      let query = { ...this.$route.query }
      if (e && e.length) {
        query = {
          start_date: e[0].format('YYYY-MM-DD'),
          end_date: e[1].format('YYYY-MM-DD')
        }
      } else {
        query = {
          start_date: undefined,
          end_date: undefined
        }
      }
      if (this.searcher.search) {
        query.status = 'done'
        query.query = this.searcher.search
        const { status, ...others } = query
        this.$router.push({ path: this.$router.fullPath, query: { ...this.$route.query, ...others, page: 1 } })
      } else {
        this.$router.replace({ query: query })
        // this.getScoring(query)
      }
    },
    download (e) {
      e.preventDefault()
      this.$refs.ruleForm.validate((valid, values) => {
        if (valid) {
          this.date_begin = this.form.date[0].format('YYYY-MM-DD')
          this.date_end = this.form.date[1].format('YYYY-MM-DD')
          const a = {
              start: this.date_begin,
              end: this.date_end,
              status: 'done'
          }
          this.$store.dispatch('getInstallmentReports', a).then((response) => {
           console.log(response)
            // downloadfile.get(response.filename).then((res) => {
            var fileURL = response.filename
            var fileLink = document.createElement('a')
            fileLink.href = fileURL
            fileLink.setAttribute('download', `File`)
            document.body.appendChild(fileLink)
            fileLink.click()
            // window.location.href = response.filename
          }).catch(reject => {
            console.log(reject.response.data)
            this.$alertMessage('error', 'Произошла ошибка', '', this)
          })
        }
      })
    },
    getStatusColor (color) {
      var selected
      switch (color) {
        case 'closed':
          selected = 'cyan'
          break
        case 'done':
          selected = 'green'
          break
        case 'reject':
          selected = 'red'
          break
        case 'new':
          selected = 'green'
          break
        case 'pending':
          selected = 'orange'
          break
        case 'passed':
          selected = '#87d068'
          break
        case 'not-passed':
          selected = 'red'
          break
        default:
          selected = ''
      }
      return selected
    },
    getPagination (e) {
      if (!this.searcher.search) {
        this.$router.push({ path: this.$router.fullPath, query: { ...this.$route.query, page: e.current, limit: 10 } })
        // this.getScoring(this.$route.query)
        this.pagination.current = e.current
      } else {
        this.$router.push({ path: this.$router.fullPath, query: { ...this.$route.query, page: e.current, limit: 10, query: this.searcher.search } })
        this.pagination.current = e.current
      }
    },
    showModal (obj) {
      this.visible.flag = true
      this.visible.data = obj
    },
    handleOk (e) {
      console.log(e)
      this.visible.flag = false
    },
    getScoring (query) {
        this.spinning = true
        const newQuery = { ...query }
        newQuery.status = 'done' + ',' + 'agreement_accept'
      this.$store.dispatch('getInstallmentList', newQuery).then((res) => {
        console.log(res)
        this.installment_list = res.installment_list
        const pagination = { ...this.pagination }
        pagination.total = res.count
        this.pagination = pagination
      }).finally(() => {
        this.spinning = false
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    deleteScoring (e) {
      console.log(e) // pro/list
    }
  },
  created () {
    let query = null
    if (this.$isEmptyObj(this.$route.query)) {
      query = { limit: 10, page: 1 }
    } else {
      query = this.$route.query
      if (query.start_date) {
        this.form.date = [
          moment(query.start_date),
          moment(query.end_date)
        ]
      }
      this.pagination.current = parseInt(this.$route.query.page)
      this.searcher.search = this.$route.query.query
    }
    if (this.searcher.search) {
      query.status = 'done'
      this.getInstallmentsSearch(query)
    } else {
      this.getScoring(query)
    }
  }
}
</script>

<style lang="less">
.span {
  padding: 10px;
  padding-block: 10px;
}
.ant-table-tbody > tr.table-row {
    &-red {
        background-color: red;
    }
    &-green {
        background-color: #5afd095c
    }
}
/* .buttons {
   margin-left: auto;
   display: flex;
   justify-content: flex-end;
 } */
</style>
