<template>
  <div>
    <a-navigation :list="[{ name: $t('Продажа') }]" :isBack="{ flag: false, link: '/sale'}" noBorder>
      <a-button type="primary" style="float: right" @click="download" :disabled="!form.date.length" icon="file-excel">{{ $t('Export to excel') }}</a-button>
    </a-navigation>
    <a-card class="no-space-tab">
      <a-card>
        <div class="mb-3">
          <a-form-model :colon="false" layout="horizontal" :rules="rules" :model="form" ref="ruleForm">
            <a-row type="flex" justify="space-between" :gutter="[16, 16]">
              <a-col :span="16">
                <a-row type="flex" justify="space-center" :gutter="[8, 8]">
                  <a-col>
                    <a-form-model ref="ruleForm" layout="inline">
                      <a-form-model-item :label="$t('Искать по')">
                        <a-select style="width: 210px" v-model="currentOption" :defaultValue="currentOption" @change="hanldeFilterOption">
                          <a-select-option v-for="item in selectOptions" :key="item.title" :value="item.title" >
                            {{ $t(item.title) }}
                          </a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-form-model>
                  </a-col>
                  <a-col :span="10">
                    <a-form-model-item v-if="currentOption == 'client_name'">
                      <auto-complete
                        style="width: 100%"
                        :value="searcher.customer_id"
                        v-model="searcher.customer_id"
                        @search="searchCustomer"
                        @select="selectCustomer"
                        :data-source="customersList"
                        :placeholder="$t('client_name')">
                      </auto-complete>
                    </a-form-model-item>
                    <a-form-model-item v-else-if="currentOption == 'contruct_number'">
                      <a-input v-model="searcher.search" :placeholder="$t('contruct_number')" @change="filterInput" />
                    </a-form-model-item>
                    <a-form-model-item v-else>
                      <auto-complete
                        style="width: 100%"
                        :value="searcher.customer_passport"
                        v-model="searcher.customer_passport"
                        @search="searchCustomerPassport"
                        :placeholder="$t('passport_number')">
                      </auto-complete>
                    </a-form-model-item>
                  </a-col>
                </a-row>
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
                    @change="getDatePicker"
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
          :scroll="{ x: 'auto' }"
          bordered
          :rowClassName="(record) => record.verified ? 'table-row-green' : ''"
        >
          <span slot="created_at" slot-scope="text" v-if="text.created_at">
            {{ text.created_at | moment($dateTimeFormat) }}
          </span>
          <span v-else slot="created_at">
            {{ '-' }}
          </span>
          <span slot="contract_number" slot-scope="text">
            {{ text.contract_number }}
          </span>
          <span slot="installment_amount" slot-scope="text">
            {{ $moneyFormat(text.installment_amount) }}
          </span>
          <span slot="status" slot-scope="text">
            <a-tag :color="getStatusColor(text.status)">{{ $t(text.status) }}</a-tag>
          </span>

          <span slot="actions" slot-scope="text">
            <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
              <a-button @click="$router.push({name:'edit scroing', params: { id: text.guid } })" class="mx-1" type="primary" icon="edit" />
            </a-tooltip>
          </span>
        </a-table>
        <div v-if="installment_list.length > 14" v-observe-visibility="handleScrolledToBottm"></div>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import moment from 'moment'
import { AutoComplete } from 'ant-design-vue'
export default {
  components: { AutoComplete },
  data () {
    this.filterInput = debounce(this.filterInput, 700)
    this.searchCustomerPassport = debounce(this.searchCustomerPassport, 500)
    this.searchCustomer = debounce(this.searchCustomer, 500)
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
      pagination: {
        current: 0,
        limit: 15
      },
      installment_list: [],
      searcher: {
        search: '',
        passport_number: '',
        customer_phone: '',
        customer_passport: '',
        customer_id: ''
      },
      form: {
         date: []
      },
      date_begin: '',
      date_end: '',
      rules: {
        'date': [{ required: true, message: 'Пожалуйста, заполните поле дату', trigger: 'blur' }]
      },
      statusList: [],
      selectedStatus: 'status',
      columns: [
        {
            title: this.$t('contract_number'),
            dataIndex: 'contract_number',
            key: 'contract_number'
        },
        {
            title: this.$t('Сумма (Общее с рассрочкой)'),
            dataIndex: 'installment_amount',
            key: 'total_price',
            customCell: this.onRowCLickFunc
        },
        {
          title: this.$t('Created_at'),
          scopedSlots: { customRender: 'created_at' },
          key: 'created_at',
          customCell: this.onRowCLickFunc
        },
        {
          title: this.$t('bonds.table.status'),
          scopedSlots: { customRender: 'status' },
          key: 'status',
          width: 160,
          customCell: this.onRowCLickFunc
        }
      ],
      selectOptions: [
        {
          title: 'client_name'
        },
        {
          title: 'contruct_number'
        },
        {
          title: 'passport_number'
        }
      ],
      currentOption: 'customers',
      customersList: []
    }
  },
  watch: {
    '$route.query': {
      handler () {
        this.pagination.current = 0
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
          this.searcher.search = this.$route.query.query
        }
        const newQuery = {
            contract_number: query.query,
            limit: this.pagination.limit,
            offset: query.page ? (query.page - 1) : 0,
            customer_id: this.searcher.customer_id,
            start_date: query.start_date,
            end_date: query.end_date,
            status: this.status === 'sale' ? '' : this.status
        }
        this.getInstallmentListSale(newQuery)
      }
    }
  },
  methods: {
    onRowCLickFunc (record, index) {
      return {
        on: {
          click: () => {
            console.log(record, index)
            this.$router.push({ name: 'edit scoring sale', params: { id: record.guid } })
          }
        }
      }
    },
    formatDate (date) {
      return moment(date).format('DD.MM.YYYY')
    },
    onTabChange (val) {
      console.log(val)
      this.currentTab = val
    },
    filterInput (e) {
      this.pagination.current = 0
      const query = { ...this.$route.query }
      query.query = this.searcher.search
      if (this.form.date.length) {
        query.start_date = this.form.date[0].format('YYYY-MM-DD')
        query.end_date = this.form.date[1].format('YYYY-MM-DD')
      }
      const { ...others } = query
      this.$router.push({ path: this.$router.fullPath, query: { ...others } })
    },
    searchCustomerPassport (val) {
      this.searcher.customer_passport = val
      if (val.length === 0) {
        const query = { ...this.$route.query }
        this.$router.push({ path: this.$router.fullPath, query: { ...query, customer_id: val } })
        this.searcher.customer_id = val
      }
      this.getCustomersByPassport()
    },
    hanldeFilterOption (e) {
      this.$router.push({ path: this.$router.fullPath, query: { current_filter: e } })
      this.searcher.search = ''
      this.searcher.passport_number = ''
      this.searcher.customer_phone = ''
      this.searcher.customer_passport = ''
      this.searcher.customer_id = ''
      this.form.date = []
    },
    searchCustomer (val) {
      this.searcher.customer_phone = val
      if (val.length === 0) {
        const query = { ...this.$route.query }
        this.$router.push({ path: this.$router.fullPath, query: { ...query, customer_id: val } })
      }
      this.getCustomers()
    },
    selectCustomer (val) {
      const query = { ...this.$route.query }
      this.$router.push({ path: this.$router.fullPath, query: { ...query, customer_id: val } })
    },
    getCustomersByPassport () {
      const data = {
        passport_number: this.searcher.customer_passport
      }
      this.$store.dispatch('getCustomerByPassportNumber', data).then((res) => {
        if (res.customer_id) {
          const query = { ...this.$route.query }
          this.$router.push({ path: this.$router.fullPath, query: { ...query, customer_id: res.customer_id } })
          this.searcher.customer_id = res.customer_id
        }
      }).catch(reject => {
        this.$alertMessage('error', 'Произошла ошибка', reject.response.data.errors.passport_number ? 'должно быть 9 символов в длину' : '', this)
      })
    },
    getCustomers () {
      const data = {
        offset: 0,
        limit: 100,
        search: this.searcher.customer_phone
      }
      this.$store.dispatch('getCustomerListForInstallments', data).then((res) => {
        this.customersList = res.map(item => ({
          text: item.first_name + ' ' + item.last_name,
          value: item.guid,
          ...item
        }))
      }).catch(reject => {
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    getDatePicker (e) {
      this.pagination.current = 0
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
      if (this.customer !== 'customers') {
        query.customerId = this.customer
      }
      if (this.status !== 'sale') {
        query.status = this.status
      }
      if (this.searcher.search) {
        query.query = this.searcher.search
        const { status, ...others } = query
        this.$router.push({ path: this.$router.fullPath, query: { ...this.$route.query, ...others } })
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
              end: this.date_end,
              status: 'done'
          }
          this.$store.dispatch('getInstallmentReports', a).then((response) => {
            var fileURL = response.filename
            var fileLink = document.createElement('a')
            fileLink.href = fileURL
            fileLink.setAttribute('download', `File`)
            document.body.appendChild(fileLink)
            fileLink.click()
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
    showModal (obj) {
      this.visible.flag = true
      this.visible.data = obj
    },
    handleOk (e) {
      console.log(e)
      this.visible.flag = false
    },
    getInstallmentListSale (query) {
        this.spinning = true
        this.$store.dispatch('getInstallmentListSale', query).then((res) => {
        if (this.pagination.current < 1) {
          this.installment_list = res.installments
        } else {
          this.installment_list.push(...res.installments)
        }
      }).finally(() => {
        this.spinning = false
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    onFilterCustomer (e) {
      const query = { ...this.$route.query }
      query.customerId = e
      if (this.form.date.length) {
        query.start_date = this.form.date[0].format('YYYY-MM-DD')
        query.end_date = this.form.date[1].format('YYYY-MM-DD')
      }
      const others = query
      this.$router.push({ path: this.$router.fullPath, query: { ...others } })
    },
    getInstallSalementStatuses () {
       this.$store.dispatch('getInstallSalementStatuses', {}).then((res) => {
        this.statusList = res
      })
    },
    handleScrolledToBottm (isVisible) {
      if (!isVisible) { return }
      this.pagination.current++
      const newQuery = {
        contract_number: this.$route.query.query,
        limit: this.pagination.limit,
        offset: this.pagination.current * this.pagination.limit,
        customer_id: this.searcher.customer_id,
        start_date: this.form.date[0] ? this.form.date[0].format('YYYY-MM-DD') : '',
        end_date: this.form.date[1] ? this.form.date[1].format('YYYY-MM-DD') : '',
        status: this.status === 'sale' ? '' : this.status
      }
      this.getInstallmentListSale(newQuery)
    }
  },
  created () {
    let query = null
    if (this.$isEmptyObj(this.$route.query)) {
      this.$router.push({ path: this.$router.fullPath, query: { current_filter: this.currentOption } })
    } else {
      query = this.$route.query
      if (query.start_date) {
        this.form.date = [
          moment(query.start_date),
          moment(query.end_date)
        ]
      }
      this.searcher.search = this.$route.query.query
      this.currentOption = this.$route.query.current_filter

      if (this.$route.query.customer_id) {
        this.searcher.customer_id = this.$route.query.customer_id
      }
    }
    if (this.$route.query.query) {
      this.searcher.search = this.$route.query.query
    }
    const newQuery = {
        contract_number: this.searcher.search,
        limit: this.pagination.limit,
        offset: this.pagination.current,
        customer_id: this.searcher.customer_id,
        start_date: this.form.date[0] ? this.form.date[0].format('YYYY-MM-DD') : '',
        end_date: this.form.date[1] ? this.form.date[1].format('YYYY-MM-DD') : '',
        status: this.status === 'sale' ? '' : this.status
    }
    this.getInstallmentListSale(newQuery)
    this.getInstallSalementStatuses()
    this.getCustomers()
  }
}
</script>

<style scoped >
.span {
  padding: 10px;
  padding-block: 10px;
}
</style>
