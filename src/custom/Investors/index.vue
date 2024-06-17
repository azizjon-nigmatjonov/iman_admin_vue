<template>
  <div>
    <a-navigation :list="[{ name: $t('Список инвесторов'), link: ''}]" :isBack="{ flag: false, link: '/category/list'}" noBorder>
      <div style="float: right">
        <a-form-model ref="ruleForm" layout="inline">
          <a-form-model-item v-if="type === 'new'" :label="$t('Есть инвестиции ?  ')">
            <a-switch v-model="investmentStatus" @change="onChangeSwitch" />
          </a-form-model-item>
          <a-form-model-item :label="$t('search')" prop="search_args">
            <a-input v-model="search_args" @change="onPhoneChange"/>
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-navigation>

    <a-card class="no-border-card">
      <template slot="extra">
        <a-form-model ref="ruleForm2" :model="form" layout="inline" :rules="rules">
          <a-form-model-item prop="date">
            <a-range-picker
              style="width: 100%"
              :format="'YYYY-MM-DD'"
              :show-time="{
                hideDisabledOptions: false
              }"
              @change="filterDate"
              v-model="form.date"
            />
          </a-form-model-item>
          <a-form-model-item >
            <!-- <a-button style="float: right; margin: 3px" type="primary" @click="download($event, 'cgu')" :loading="downloadingCGU" icon="file-excel">{{ $t('Export CGU') }}</a-button> -->
            <a-button style="float: right; margin: 3px" type="primary" @click="download($event, 'default')" :loading="downloading" icon="file-excel">{{ $t('Export to excel') }}</a-button>
          </a-form-model-item>
        </a-form-model>
      </template>
    </a-card>
    <a-card class="no-space-tab">
      <a-tabs :activeKey="type" @change="onTabChange">
        <a-tab-pane :tab="$t(item)" :key="item" v-for="item in typeList">
          <a-card>
            <a-table
              :columns="columns"
              :data-source="investors"
              :row-key="record => record.id"
              @change="getPagination"
              :pagination="pagination"
              :loading="loading"
              bordered
            >
              <span slot="index" slot-scope="text, column, index">
                {{ (pagination.current - 1) * 10 + index + 1 }}
              </span>
              <span slot="residency" slot-scope="text">
                {{ text ? 'Резидент' : 'Нерезидент' }}
              </span>
              <span slot="created_at" slot-scope="text">
                {{ text.created_at | moment($dateTimeFormat) }}
              </span>
              <span slot="fullname" slot-scope="text, row">
                {{ `${row.passport_data && row.passport_data.first_name || ''}  ${row.passport_data && row.passport_data.last_name || ''}` }}
              </span>
              <span slot="birth_day" slot-scope="text">
                {{ text.birth_day | moment($dateTimeFormat) }}
              </span>
              <!-- <span slot="expiry_date" slot-scope="text">
                    {{ text.expiry_date | moment('DD/MM/YY HH:mm') }}
                    </span> -->
              <span slot="status" slot-scope="text">
                <a-tag :color="getStatusColor(text.status)">{{ $t(text.status) }}</a-tag>
              </span>
              <span slot="balance" slot-scope="text">
                <span>{{ $moneyFormat(text.balance) }}</span>
              </span>
              <span slot="invest_sum" slot-scope="text">
                <span>{{ $moneyFormat(text.invest_sum ) }}</span>
              </span>
              <span slot="actions" slot-scope="text">

                <delete-btn @confirm="deleteInvestor(text)"/>
                <!-- <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
                        <a-button @click="showModal(text)" type="primary" icon="eye" />
                    </a-tooltip> -->
              </span>
            </a-table>
          </a-card>
        </a-tab-pane>

        <a-tab-pane :tab="$t('changeRequests')" key="changeRequests">
          <change-requests-tab />
        </a-tab-pane>

      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import moment from 'moment'
import ChangeRequestsTab from './ChangeRequestsTab.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ChangeRequestsTab
  },
  created () {
    let query = null
    if (this.$isEmptyObj(this.$route.query)) {
      query = { limit: 10, page: 1, status: '' }
    } else {
      query = this.$route.query
      this.type = query.status || 'all'
      query.status = this.type === 'all' ? '' : this.type
      query.have_investment = this.type === 'new' ? this.investmentStatus : undefined
      this.pagination.current = parseInt(this.$route.query.page)
      this.search_args = this.$route.query.search_args
      this.form.date = this.$route.query.start_date ? [moment(this.$route.query.start_date), moment(this.$route.query.end_date)] : []
    }
    const params = {
      ...query,
      have_investment: this.type === 'new' ? this.investmentStatus : undefined
    }
    this.getInvestors(params)
  },
  data () {
    this.onPhoneChange = debounce(this.onPhoneChange, 700)
     const validatePhone = (rule, value, callback) => {
      if (/^[+][9][9][8]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error(this.$t('incorrectPhone')))
      }
    }
    return {
      downloading: false,
      downloadingCGU: false,
      search_args: '',
      investmentStatus: false,
      form: {
        phone: ''
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'change' }],
        'date': [{ required: true, message: 'Пожалуйста, заполните поле дату', trigger: 'change' }]
      },
      type: 'all',
      typeList: [
        'all',
        'in_process',
        'passport',
        'new',
        'cancelled',
        'confirmed',
        'current',
        'left'
      ],
      investors: [],
      visible: false,
      loading: false,
      passport_data: {},
      selectedInvestors: null,
      pagination: {
          current: 1,
          showQuickJumper: true
      },
      columns: [
          {
              title: '№',
              key: 'index',
              scopedSlots: { customRender: 'index' },
              customCell: this.onRowClick
          },
          {
            title: this.$t('Created_at'),
            scopedSlots: { customRender: 'created_at' },
            key: 'created_at',
            customCell: this.onRowClick
          },
          {
              title: this.$t('fullname'),
              key: 'fullname',
              scopedSlots: { customRender: 'fullname' },
              customCell: this.onRowClick
          },
          {
              title: this.$t('investors.table.phone_number'),
              dataIndex: 'phone_number',
              key: 'phone_number',
              customCell: this.onRowClick
          },
          {
              title: this.$t('residency'),
              dataIndex: 'is_resident',
              scopedSlots: { customRender: 'residency' },
              customCell: this.onRowClick
          },
          {
              title: this.$t('Status'),
              scopedSlots: { customRender: 'status' },
              key: 'status',
              customCell: this.onRowClick
          },
          {
            title: this.$t('Инвестиции'),
            scopedSlots: { customRender: 'balance' },
            key: 'balance'
          },
          {
              title: this.$t('Прибыль за квартал'),
              scopedSlots: { customRender: 'invest_sum' },
              width: 140,
              key: 'invest_sum'
          }
          // {
          //     title: this.$t('investors.table.actions'),
          //     scopedSlots: { customRender: 'actions' },
          //     key: 'actions'
          // }
      ]
    }
  },
  computed: {
    ...mapGetters(['investmentStatus'])
  },
  methods: {
    downloadEXP () {
      console.log('hello world')
    },
    download (e, type) {
      e.preventDefault()
      this.$refs.ruleForm2.validate((valid, values) => {
        if (valid) {
          if (type !== 'cgu') {
            this.downloading = true
          } else this.downloadingCGU = true
          const dateBegin = this.form.date[0].format('YYYY-MM-DD')
          const dateEnd = this.form.date[1].format('YYYY-MM-DD')
          const a = {
              begin_date: dateBegin,
              end_date: dateEnd
          }

          this.$store.dispatch(type === 'cgu' ? 'getInvestorCguReport' : 'getInvestorReports', a).then((response) => {
           console.log(response)
            if (response.filename && response.filename.length) {
              response.filename.forEach((element, index) => {
                console.log('El', element)
                window.open(element)
              })
            }
          }).catch(reject => {
            console.log(reject.response.data)
            this.$message.error(reject.response.data.error)
          })
          .finally(() => {
            if (type !== 'cgu') {
            this.downloading = false
          } else this.downloadingCGU = false
          })
        }
      })
    },
    onPhoneChange (val) {
      console.log('Phone', val.target.value)
      this.$router.push({ query: { status: this.type, page: 1, search_args: this.search_args } })
      this.getInvestors({ ...this.$route.query, status: this.type === 'all' ? '' : this.type, search_args: this.search_args })
      this.pagination.current = 1
    },
    filterDate (val) {
      this.$router.push({ query: {
        ...this.$route.query,
        page: 1,
        start_date: val.length ? this.form.date[0].format('YYYY-MM-DD') : undefined,
        end_date: val.length ? this.form.date[1].format('YYYY-MM-DD') : undefined
      } })
      this.getInvestors({
        status: this.type === 'all' ? '' : this.type,
        search_args: this.search_args,
        start_date: val.length ? this.form.date[0].format('YYYY-MM-DD') : undefined,
        end_date: val.length ? this.form.date[1].format('YYYY-MM-DD') : undefined
      })
      this.pagination.current = 1
      // this.getInstallmentSearch(query)
    },
    // getInvestorsByPhone () {
    //     this.$refs.ruleForm.validate(valid => {
    //       if (valid) {
    //         this.$router.push({ query: { status: this.type, phone: this.form.phone } })
    //         this.loading = true
    //         this.$store.dispatch('getInvestorsByPhone', this.form.phone).then(res => {
    //             console.log(res)
    //             this.investors = res.investors
    //             console.log('investors passport', this.investors)
    //             const pagination = { ...this.pagination }
    //             pagination.total = +res.count
    //             this.pagination = pagination
    //             this.loading = false
    //         }).catch(reject => {
    //             console.log(reject.response.data)
    //             this.$alertMessage('error', 'Произошла ошибка', '', this)
    //             this.loading = false
    //         })
    //       }
    //     })
    // },
    onChangeSwitch (checked) {
      this.investmentStatus = checked
      this.$store.dispatch('hasInvestmentFunction', checked)
      console.log('checked', this.investmentStatus)
      this.getInvestors({ ...this.$route.query, status: this.type === 'all' ? '' : this.type, search_args: this.search_args, have_investment: checked })
      this.pagination.current = 1
    },
    onTabChange (val) {
      console.log('this.$route.query', this.$route.query)
      this.type = val
      this.$store.dispatch('hasInvestmentFunction', false)
      if (val === 'changeRequests') return this.$router.push({ query: { status: this.type } })
      this.form.phone = ''
      this.$router.push({ query: { ...this.$route.query, status: this.type, page: 1, search_args: this.search_args } })
      this.getInvestors({ ...this.$route.query, status: this.type === 'all' ? '' : this.type, search_args: this.search_args, have_investment: this.type === 'new' ? this.investmentStatus : undefined })
      this.pagination.current = 1
    },
    onRowClick (record, index) {
      return {
        on: {
          click: (event) => {
            console.log(record, index)
            this.$router.push({ name: 'invetstors-preview', params: { id: record.id } })
          }
        }
      }
    },
    getStatusColor (color) {
        var selected
        switch (color) {
            case 'new':
                selected = 'cyan'
                break
            case 'in_process':
                selected = 'orange'
                break
            case 'current':
                selected = 'blue'
                break
            case 'left':
                selected = 'red'
                break
            case 'confirmed':
                selected = 'green'
                break
            case 'passport':
                selected = 'purple'
                break
            default:
                selected = ''
        }
        return selected
    },
    getPagination (e) {
        const query = {
            ...this.$route.query,
            page: e.current,
            limit: 10,
            status: this.type === 'all' ? '' : this.type,
            search_args: this.search_args,
            have_investment: this.type === 'new' ? this.investmentStatus : undefined
        }
        this.$router.push({ query: { status: this.type, page: e.current, search_args: this.search_args } })
        this.getInvestors(query)
        this.pagination.current = e.current
    },
    getInvestors (query) {
        console.log('query', query)
        this.loading = true
        this.$store.dispatch('getInvestors', query).then(res => {
            console.log(res)
            this.investors = res.investors
            console.log('investors passport', this.investors)
            const pagination = { ...this.pagination }
            pagination.total = +res.count
            this.pagination = pagination
            this.loading = false
        }).catch(reject => {
            console.log(reject.response.data)
            this.$alertMessage('error', 'Произошла ошибка', '', this)
            this.loading = false
        })
    },
    deleteInvestor (e) {
        console.log(e) // pro/list
        this.$store.dispatch('deleteInvestor', e.id).then(res => {
        console.log(res)
        this.$deleteFromList(this.investors, e.id)
        this.$alertMessage('success', 'Deleted', 'Investor has deleted successfully', this)
        }).catch(reject => {
            console.log(reject.response.data)
            if (reject.response.data) {
                this.$alertMessage('error', 'Произошла ошибка', '', this)
            }
        })
        .finally(() => {
          this.getInvestors({ ...this.$route.query, status: this.type === 'all' ? '' : this.type, search_args: this.search_args })
        })
    }
  }
}
</script>

<style>

</style>
