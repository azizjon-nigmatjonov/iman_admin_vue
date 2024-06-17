<template>
  <div>
    <a-navigation :list="[{ name: $t('3аявки') }]" :isBack="{ flag: false, link: '/installments'}" noBorder>
      <div style="float: right">
        <a-select style="margin-right: 10px; width: 200px" :placeholder="$t('status')" v-model="status" @change="onFilterStatus">
          <a-select-option :value="item.Slug" v-for="item in statusList" :key="item.Slug">
            {{ $t(item.Name) }}
          </a-select-option>
        </a-select>
        <a-button type="primary" @click="download" :disabled="!form.date.length" icon="file-excel">{{ $t('Export to excel') }}</a-button>
      </div>
    </a-navigation>
    <a-card class="no-space-tab">
      <a-card>
        <div class="mb-3">
          <a-form-model :colon="false" layout="horizontal" :rules="rules" :model="form" ref="ruleForm">
            <a-row type="flex" justify="space-between" :gutter="[16, 16]">
              <a-col :md="8">
                <a-form-model-item>
                  <div style="display: flex; align-items: center;">
                    <span style="margin-right: 10px">{{ $t('bonds.table.customer') }}:</span>
                    <div style="position: relative; width: 100%">
                      <a-input v-model="searcher.search" :placeholder="$t('search')" @change="filterInput" />
                      <div class="customersList" v-if="customersForSearch.length">
                        <ul>
                          <li v-for="item in customersForSearch" :key="item.guid" @click="filterByCustomerId(item)">
                            {{ item.last_name }}{{ ' ' }}{{ item.first_name }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </a-form-model-item>
              </a-col>
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
          :pagination="false"
          :loading="spinning"
          bordered
          :rowClassName="(record) => record.status === 'done' ? `table-row-green ${record.is_deleted ? 'table-row-orange' : ''}` : `${record.is_deleted ? 'table-row-orange' : ''}`"
        >
          <!-- <span slot="customer.birthday" slot-scope="text">
            {{ text.customer.birthday | moment($dateFormat) }}
          </span> -->
          <span slot="created_at" slot-scope="text" v-if="text.created_at">
            {{ text.created_at | moment($dateTimeFormat) }}
          </span>
          <span v-else slot="created_at">
            {{ '-' }}
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
          <span slot="amount_per_month" slot-scope="text">
            {{ $moneyFormat(text.amount_per_month) }}
          </span>
          <span slot="installment_amount" slot-scope="text">
            {{ $moneyFormat(text.installment_amount) }}
          </span>
          <span slot="status" slot-scope="text">
            <a-tag :color="getStatusColor(text.status)">{{ text.status === 'done' ? 'Проверено' : $t(text.status) }}</a-tag>
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
        <div v-if="installment_list.length" v-observe-visibility="handleScrolledToBottm"></div>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import moment from 'moment'
export default {
  data () {
    this.filterInput = debounce(this.filterInput, 500)
    return {
      statusList: [],
      currentTab: '3аявки',
      customersList: [],
      customer: 'customers',
      typeList: [
        'Все',
        '3аявки',
        'Приход',
        'Продажа',
        'Успешный'
      ],
      status: this.$route.path.split('/')[3],
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
        current: 0,
        limit: 15
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
            title: this.$t('Created_at'),
            scopedSlots: { customRender: 'created_at' },
            key: 'created_at',
            customCell: this.onRowCLickFunc,
            width: 300
          },
          {
            title: this.$t('installment_amount'),
            dataIndex: 'installment_amount',
            key: 'installment_amount'
          },
          {
            title: this.$t('shelf_price'),
            dataIndex: 'shelf_price',
            key: 'shelf_price'
          },
          {
            title: this.$t('bonds.table.status'),
            scopedSlots: { customRender: 'status' },
            key: 'status',
            width: 240,
            customCell: this.onRowCLickFunc
          }
      ],
      customersForSearch: [],
      busy: false
    }
  },
  watch: {
    '$route.query': {
      handler () {
        let query = null
        if (this.$isEmptyObj(this.$route.query)) {
        } else {
          query = this.$route.query
          if (query.start_date) {
            this.form.date = [
              moment(query.start_date),
              moment(query.end_date)
            ]
          }
          this.status = this.$route.query.status
        }
        const newQuery = {
            offset: this.pagination.current,
            limit: this.pagination.limit,
            status: query.status,
            customer_id: query.query,
            branch_id: '',
            pos_agent_id: '',
            start_date: query.start_date,
            end_date: query.end_date
        }
        this.getInstallmentListApp(newQuery)
      }
    }
  },
  methods: {
    moment,
    onFilterStatus (status) {
      this.pagination.current = 0
      const query = { ...this.$route.query }
      query.status = status
      this.status = status
      this.$router.replace({ query: query })
    },
    getStatuses () {
        this.$store.dispatch('getApplicationStatuses', {}).then((res) => {
            this.statusList = res
        }).catch(reject => {
            console.log(reject)
        })
    },
    onRowCLickFunc (record, index) {
      return {
        on: {
          click: () => {
            console.log(record, index)
              this.$router.push({ name: 'edit scroing', params: { id: record.guid } })
          }
        }
      }
    },
    filterInput (e) {
      this.pagination.current = 0
      const params = {
        limit: 100,
        offset: 0,
        search: this.searcher.search
      }
      if (this.searcher.search.length) {
        this.getCustomerListForInstallments(params)
      } else {
        this.$router.replace({ path: this.$router.fullPath })
        this.customersForSearch = []
      }
    },
    filterByCustomerId (customer) {
      this.pagination.current = 0
      this.customersForSearch = []
      const query = { ...this.$route.query }
      query.query = customer.guid
      this.searcher.search = customer.last_name + ' ' + customer.first_name
      if (this.form.date.length) {
        query.start_date = this.form.date[0].format('YYYY-MM-DD')
        query.end_date = this.form.date[1].format('YYYY-MM-DD')
      }
      this.$router.push({ path: this.$router.fullPath, query: { ...query } })
    },
    getCustomerListForInstallments (params) {
      this.$store.dispatch('getCustomerListForInstallments', params).then(res => {
        this.customersForSearch = res
      })
    },
    filterInput3 (e) {
      this.pagination.current = 0
      let query = {}
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
      if (this.status) {
        query.status = this.status
      }
      if (this.searcher.search) {
        query.query = this.searcher.search
        this.$router.push({ path: this.$router.fullPath, query: { ...this.$route.query, ...query } })
      } else {
        this.$router.replace({ query: query })
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
              end: this.date_end
          }
          this.$store.dispatch('getInstallmentReports', a).then((response) => {
           console.log(response)
            var fileURL = response.filename
            var fileLink = document.createElement('a')
            fileLink.href = fileURL
            fileLink.setAttribute('download', `File`)
            document.body.appendChild(fileLink)
            fileLink.click()
          }).catch(reject => {
            console.log(reject.response.data)
            this.$message.error(reject.response.data.error)
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
        case 'accept_by_customer':
          selected = 'purple'
          break
        case 'scoring_failed':
          selected = 'red'
          break
        default:
          selected = ''
      }
      return selected
    },
    showModal (obj) {
      this.visible.flag = true
      this.visible.data = obj
    },
    handleOk (e) {
      console.log(e)
      this.visible.flag = false
    },
    getInstallmentListApp (query) {
        this.spinning = true
        this.$store.dispatch('getInstallmentListApp', query).then((res) => {
         if (this.pagination.current < 1) {
          this.installment_list = res.applications
         } else {
          this.installment_list.push(...res.applications)
         }
      }).finally(() => {
        this.spinning = false
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    handleScrolledToBottm (isVisible) {
      if (!isVisible) { return }

      this.pagination.current++
      const newQuery = {
        contract_number: '',
        offset: this.pagination.current * this.pagination.limit,
        customer_id: this.$route.query.query ? this.$route.query.query : '',
        branch_id: '',
        pos_agent_id: '',
        start_date: this.form.date[0] ? this.form.date[0].format('YYYY-MM-DD') : '',
        end_date: this.form.date[1] ? this.form.date[1].format('YYYY-MM-DD') : '',
        limit: this.pagination.limit,
        status: this.$route.query.status ? this.$route.query.status : ''
      }
      this.getInstallmentListApp(newQuery)
    }
  },
  created () {
    let query = null
    if (this.$isEmptyObj(this.$route.query)) {
    } else {
      query = this.$route.query
      if (this.$route.query.query) {
        this.customersForSearch = this.$route.query.query
      }
      if (query.start_date) {
        this.form.date = [
          moment(query.start_date),
          moment(query.end_date)
        ]
      }
      this.status = this.$route.query.status
    }
    const newQuery = {
      contract_number: '',
      offset: 0,
      customer_id: this.$route.query.query ? this.$route.query.query : '',
      branch_id: '',
      pos_agent_id: '',
      start_date: this.form.date[0] ? this.form.date[0].format('YYYY-MM-DD') : '',
      end_date: this.form.date[1] ? this.form.date[1].format('YYYY-MM-DD') : '',
      limit: this.pagination.limit,
      status: this.$route.query.status ? this.$route.query.status : ''
    }
    this.getInstallmentListApp(newQuery)
    this.getStatuses()
  }
}
</script>

<style scoped >
.span {
  padding: 10px;
  padding-block: 10px;
}
.table-orange {
  background-color: #fadb14;
}
.customersList {
  width: 100%;
  height: 250px;
  background: #fff;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  position: absolute;
  left: 0;
  top: 55px;
  z-index: 999;
  overflow-y: scroll;
}
.customersList ul {
  padding: 5px 0 !important;
}
.customersList ul li {
  cursor: pointer;
  font-weight: 400;
  color: #111;
  transition: 0.3s;
  padding: 0 20px;
}
.customersList ul li:hover {
  background: #e6fff6;
}
/* .buttons {
   margin-left: auto;
   display: flex;
   justify-content: flex-end;
 } */
</style>
