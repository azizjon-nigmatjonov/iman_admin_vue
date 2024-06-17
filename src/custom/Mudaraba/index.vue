<template>
  <div>
    <a-navigation :list="[{ name: $t('Mudaraba'), link: ''}]" :isBack="{ flag: false, link: '/category/list'}" noBorder>
      <div class="inputs">
        <span>{{ $t('payment_type') }}: </span>
        <a-select class="filter__input" v-model="paymentType" @change="onStatusChange" :allowClear="true">
          <a-select-option v-for="(item, index) in paymentTypes" :key="index" :value="item.value" >
            {{ $t(item.label) }}
          </a-select-option>
        </a-select>
        <span>{{ $t('statuses') }}: </span>
        <a-select class="filter__input" v-model="status" @change="onStatusChange" :allowClear="true">
          <a-select-option v-for="item in statusList" :key="item.status_id" :value="item.status" >
            {{ $t(item.status) }}
          </a-select-option>
        </a-select>
      </div>
    </a-navigation>
    <a-card class="no-border-card">
      <a-form-model ref="ruleForm2" :model="form" layout="inline" :rules="rules">
        <div style="display: flex; justify-content: space-between">
          <div>
            <a-form-model-item>
              <div style="display: flex; align-items: center">
                <span style="margin-right: 10px">{{ $t('search') }}:</span>
                <a-input v-model="search_args" :placeholder="$t('search')" @change="filterInput" />
              </div>
            </a-form-model-item>
          </div>
          <div>
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
              <a-button style="float: right; margin: 3px" type="primary" @click="download" :loading="downloading" icon="file-excel">{{ $t('Export to excel') }}</a-button>
            </a-form-model-item>
          </div>
        </div>
      </a-form-model>
    </a-card>
    <a-card class="no-space-tab">
      <a-tabs :activeKey="type" @change="onTabChange">
        <a-tab-pane :tab="$t(item.title)" :key="item.key" v-for="item in typeList">
          <a-card>
            <a-row type="flex" justify="end" class="mb-2">
              <a-col span="auto">
                <a-button v-if="false" type="primary" @click="$router.push('/bonds/list/new')">{{ $t('button.create') }}</a-button>
              </a-col>
            </a-row>
            <a-table
              :columns="columns"
              :data-source="investors"
              :row-key="record => record.claim_id"
              size="middle"
              @change="getPagination"
              :pagination="paramsPagination"
              :loading="loading"
              bordered
            >
              <span slot="payment_type" slot-scope="text">
                {{ $t(text) }}
              </span>
              <span slot="type" slot-scope="text">
                {{ $t(text.type) }}
              </span>
              <span slot="strategy_amount" slot-scope="text">
                {{ $moneyFormat(text.data.strategy && text.data.strategy.amount) }}
              </span>
              <span slot="created_at" slot-scope="text">
                {{ text.created_at | moment($dateTimeFormat) }}
              </span>
              <span slot="amount" slot-scope="text">
                {{ $moneyFormat(+text.data.amount) }}
              </span>
              <span slot="index" slot-scope="text, column, index">
                {{ (paramsPagination.current - 1) * 10 + index + 1 }}
              </span>
              <span slot="residency" slot-scope="text">
                {{ text ? 'Резидент' : 'Нерезидент' }}
              </span>
              <span slot="fullname" slot-scope="text, row">
                {{ `${row.investor && row.investor.passport_data && row.investor.passport_data.first_name || ''}  ${ row.investor && row.investor.passport_data && row.investor.passport_data.last_name || ''}` }}
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
              <span slot="actions" slot-scope="text">
                <delete-btn @confirm="deleteInvestor(text)"/>
                <!-- <a-popconfirm
                            :title="$t('Вы хотите это удалить?')"
                            :ok-text="$t('Да')"
                            :cancel-text="$t('Нет')"
                            @confirm="deleteInvestor(text)"
                            @cancel="cancel => null"
                        >
                            <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
                            <a-button type="danger" icon="delete" class="mx-1"/>
                            </a-tooltip>
                        </a-popconfirm> -->
                <!-- <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
                        <a-button @click="showModal(text)" type="primary" icon="eye" />
                    </a-tooltip> -->
              </span>
            </a-table>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import moment from 'moment'
export default {
    watch: {
        '$route': {
            handler () {
                this.getInvestors()
                this.getStatus()
            },
            deep: true
        }
    },
  data () {
    this.filterInput = debounce(this.filterInput, 500)
    return {
        form: {
          date: undefined
        },
        rules: {
          'date': [{ required: true, message: 'Пожалуйста, заполните поле дату', trigger: 'change' }]
        },
        downloading: false,
        search_args: '',
        type: 'cash_in',
        typeList: [
            {
                title: 'moneyInput',
                key: 'cash_in'
            },
            {
                title: 'moneyWWithdrawal',
                key: 'cash_out'
            }
        ],
        investors: [],
        statusList: [],
        paymentTypes: [
          { label: 'Банковский перевод', value: 'bank_transfer' },
          { label: 'Карта', value: 'card' }
        ],
        visible: false,
        loading: false,
        passport_data: {},
        selectedInvestors: null,
        pagination: {
          current: 1,
          showQuickJumper: true
        },
        status: undefined,
        paymentType: '',
        columns: [
            {
                title: '№',
                key: 'index',
                scopedSlots: { customRender: 'index' },
              customCell: this.onRowClick
            },
            {
                title: 'Номер запроса',
                key: 'claim_number',
                dataIndex: 'claim_number'
            },
            {
              title: this.$t('Created_at'),
              scopedSlots: { customRender: 'created_at' },
              key: 'created_at',
              customCell: this.onRowClick
            },
            {
                title: this.$t('investor'),
                key: 'fullname',
                scopedSlots: { customRender: 'fullname' },
                customCell: this.onRowClick
            },
            // {
            //     title: this.$t('month_limit'),
            //     dataIndex: 'data.month_limit',
            //     customCell: this.onRowClick
            // },
            {
                title: this.$t('phone_number'),
                key: 'phone_number',
                dataIndex: 'investor.phone_number',
                customCell: this.onRowClick
            },
            {
                title: this.$t('type'),
                key: 'type',
                scopedSlots: { customRender: 'type' },
                customCell: this.onRowClick
            },
            {
                title: this.$t('payment_type'),
                dataIndex: 'payment_type',
                scopedSlots: { customRender: 'payment_type' },
                customCell: this.onRowClick
            },
            {
                title: this.$t('currency'),
                key: 'currency',
                dataIndex: 'data.bank.currency',
                customCell: this.onRowClick
            },
            {
                title: this.$t('amount_or_precent'),
                key: 'amount',
                dataIndex: 'data.amount',
                customCell: this.onRowClick
            },
            {
                title: this.$t('strategy_amount'),
                key: 'strategy_amount',
                scopedSlots: { customRender: 'strategy_amount' },
                customCell: this.onRowClick,
                width: 130
            },
            {
                title: this.$t('Status'),
                scopedSlots: { customRender: 'status' },
                key: 'status',
                fixed: 'right',
                width: 120,
                customCell: this.onRowClick
            }
            // {
            //     title: this.$t('investors.table.actions'),
            //     scopedSlots: { customRender: 'actions' },
            //     key: 'actions',
            //     width: 100,
            //     fixed: 'right'
            // }
        ]
    }
  },
  computed: {
    ...mapGetters(['claimsParams']),
    paramsPagination () {
      return {
        current: this.claimsParams.page,
        total: this.claimsParams.total,
        showQuickJumper: true
      }
    }
  },
  methods: {
    download (e) {
      e.preventDefault()
      this.$refs.ruleForm2.validate((valid, values) => {
        if (valid) {
          this.downloading = true
          const dateBegin = this.form.date[0].format('YYYY-MM-DD')
          const dateEnd = this.form.date[1].format('YYYY-MM-DD')
          const a = {
              begin_date: dateBegin,
              end_date: dateEnd
          }
          if (this.type) {
            a['type'] = this.type
          }
          if (this.status) {
            a['status'] = this.status
          }
          if (this.search_args) {
            a['search_args'] = this.search_args
          }
          if (this.paymentType) {
            a['paymentType'] = this.paymentType
          }
          this.$store.dispatch('getClaimsReports', a).then((response) => {
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
            this.$message.error(reject.response.data.error)
          })
          .finally(() => {
            this.downloading = false
          })
        }
      })
    },
    onTabChange (val) {
      this.type = val
      this.status = undefined
      this.paymentType = ''
      this.getInvestors({
        ...this.claimsParams,
        page: 1,
        type: val,
        status: undefined,
        payment_type: '',
        search_args: this.search_args
      })
    },
    filterInput (val) {
      this.getInvestors({
        ...this.claimsParams,
        page: 1,
        type: this.type,
        status: this.status,
        search_args: this.search_args
      })
      this.pagination.current = 1
      // this.getInstallmentSearch(query)
    },
    filterDate (val) {
      this.getInvestors({
        ...this.claimsParams,
        page: 1,
        type: this.type,
        status: this.status,
        search_args: this.search_args,
        start_date: val.length ? this.form.date[0].format('YYYY-MM-DD') : undefined,
        end_date: val.length ? this.form.date[1].format('YYYY-MM-DD') : undefined
      })
      this.pagination.current = 1
      // this.getInstallmentSearch(query)
    },
      getStatus () {
        this.$store.dispatch('getStatuses', { 'is_cash_out': this.type === 'cash_out' }).then(res => {
            console.log(res)
            this.statusList = res.statuses
        })
      },
      onRowClick (record, index) {
            return {
                on: {
                    click: (event) => {
                        console.log(record, index, this.type)
                        this.$router.push(`/mudaraba/${this.type}/${record.claim_id}`)
                    }
                }
            }
        },
        onStatusChange () {
            this.getInvestors({
              ...this.claimsParams,
              page: 1,
              limit: 10,
              status: this.status,
              payment_type: this.paymentType,
              search_args: this.search_args
            })
            this.pagination.current = 1
        },
        getStatusColor (color) {
            var selected
            switch (color) {
                case 'request_sent':
                    selected = 'purple'
                    break
                case 'confirmed':
                    selected = 'blue'
                    break
                case 'check_payment_pending':
                    selected = 'orange'
                    break
                case 'signature_pending':
                    selected = 'yellow'
                    break
                case 'success':
                    selected = 'green'
                    break
                case 'paid':
                    selected = 'cyan'
                    break
                case 'cancelled':
                    selected = 'red'
                    break
                default:
                selected = ''
            }
            return selected
        },
        getPagination (e) {
            const query = {
              ...this.claimsParams,
              page: e.current,
              limit: 10,
              status: this.status,
              search_args: this.search_args
            }
            this.getInvestors(query)
            this.pagination.current = e.current
        },

        // showModal (text) {
        //   this.selectedInvestors = { ...text }
        //   this.visible = true
        // },
        getInvestors (query) {
            this.getStatus()
            console.log(query)
            this.loading = true
            const newQuery = { ...query }
            if (this.type === 'cash_in') newQuery.type = 'cash_in'
            else if (this.type === 'cash_out') newQuery.type = 'cash_out'
            this.$store.dispatch('getMudarabaApplications', newQuery).then(res => {
                // console.log(res)
                this.investors = res.claims
                console.log('Claims', res)
                const pagination = { ...this.pagination }
                pagination.total = res.count
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
        },
        getList () {
          this.status = this.claimsParams.status
          this.type = this.claimsParams.type
          this.search_args = this.claimsParams.search_args
          this.form.date = this.claimsParams.start_date && this.claimsParams.end_date ? [moment(this.claimsParams.start_date), moment(this.claimsParams.end_date)] : []
          this.getInvestors(this.claimsParams)
        }
    },
    created () {
        this.getList()
    }
}
</script>

<style scoped>
  .inputs{
    float: right;
    display: flex;
    gap: 30px;
  }
  .filter__input{
    width: 200px;
  }
</style>
