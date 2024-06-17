<template>
  <div>
    <a-navigation :list="[{ name: $t('Finance'), link: ''}, { name: $t('TreasuryDep'), link: ''}]" :isBack="{ flag: false, link: ''}" noBorder>
    </a-navigation>
    <a-card class="no-pt-body-card">
      <a-tabs v-model="tab" @change="onTabChange">
        <a-tab-pane tab="Cash In" key="cash_in">
          <div class="mb-3">
            <a-row type="flex" :gutter="[16, 16]">
              <a-col :md="6">
                <a-range-picker
                  style="width: 100%"
                  :format="'YYYY-MM-DD'"
                  :valueFormat="'YYYY-MM-DD'"
                  :show-time="{
                    hideDisabledOptions: false
                  }"
                  v-model="date"
                  @change="onDateChange"
                />
              </a-col>
              <a-col :md="8">

              </a-col>
              <a-col :md="6">
                <!-- <a-input @change="onSearch" v-model="query" :placeholder="$t('search')"/> -->
              </a-col>
              <a-col :md="4">
                <a-button
                  type="primary"
                  @click="$router.push('/finance/treasury/cashin/new')"
                  icon="plus"
                  style="float: right"
                >{{ $t('button.create') }}</a-button>
              </a-col>
            </a-row>
          </div>
          <a-table
            bordered
            :loading="loading"
            :scroll="{ x: 200 }"
            :pagination="pagination"
            :columns="cashInCol"
            :data-source="gl"
            @change="getPagination"
            :customRow="onRowClick"
          >
            <span slot="dateTime" slot-scope="text"> {{ text | moment($dateTimeFormat) }}</span>
            <span slot="date" slot-scope="text"> {{ text | moment($dateFormat) }}</span>
            <span slot="contract_number" slot-scope="text"> {{ text.split(',')[0] }}</span>
            <span slot="contract_date" slot-scope="text"> {{ text.date_at | moment($dateFormat) }}</span>
            <span slot="order_number" slot-scope="text, row, index" style="color: #01CAB0">
              {{ pagination.current * 10 - 10 + index + 1 }}
            </span>
            <span slot="money" slot-scope="text">
              {{ $moneyFormat(+text) }}
            </span>
            <span slot="id" slot-scope="text" style="color: #01CAB0">
              {{ text }}
            </span>
            <span slot="actions" slot-scope="text">
              <edit-btn @click="$router.push('/finance/treasury/cashin/' + text.id)" />
              <delete-btn @confirm="deletePortfolio(text)"/>
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="Cash Out" key="cash_out">
          <div class="mb-3">
            <a-row type="flex" :gutter="[16, 16]">
              <a-col :md="6">
                <a-range-picker
                  style="width: 100%"
                  :format="'YYYY-MM-DD'"
                  :show-time="{
                    hideDisabledOptions: false
                  }"
                  v-model="date"
                  @change="onDateChange"
                />
              </a-col>
              <a-col :md="8">

              </a-col>
              <a-col :md="6">
                <!-- <a-input v-model="query" @change="onSearch" :placeholder="$t('search')"/> -->
              </a-col>
              <a-col :md="4">
                <a-button
                  type="primary"
                  @click="$router.push('/finance/treasury/cashout/new')"
                  icon="plus"
                  style="float: right"
                >{{ $t('button.create') }}</a-button>
              </a-col>
            </a-row>
          </div>
          <a-table
            bordered
            :loading="loading"
            :scroll="{ x: 200 }"
            :pagination="pagination"
            :columns="cashOutCol"
            :data-source="gl"
            @change="getPagination"
            :customRow="onRowClick"
          >
            <span slot="contract_number" slot-scope="text"> {{ text.split(',')[0] }}</span>
            <span slot="contract_date" slot-scope="text"> {{ text.date_at | moment($dateFormat) }}</span>
            <span slot="order_number" slot-scope="text, row, index" style="color: #01CAB0">
              {{ pagination.current * 10 - 10 + index + 1 }}
            </span>
            <span slot="dateTime" slot-scope="text"> {{ text | moment($dateTimeFormat) }}</span>
            <span slot="date" slot-scope="text"> {{ text | moment($dateFormat) }}</span>
            <span slot="money" slot-scope="text">
              {{ $moneyFormat(+text) }}
            </span>
            <span slot="id" slot-scope="text" style="color: #01CAB0">
              {{ text }}
            </span>
            <span slot="actions" slot-scope="text">
              <edit-btn @click="$router.push('/finance/treasury/cashout/' + text.id)" />
              <delete-btn @confirm="deletePortfolio(text)"/>
            </span>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import debounce from 'lodash/debounce'
export default {
    data () {
        this.onSearch = debounce(this.onSearch, 500)
        return {
            loading: false,
            query: '',
            date: undefined,
            tab: '1',
            cashInCol: [
                {
                    title: this.$t('Порядковый номер'),
                    scopedSlots: { customRender: 'order_number' },
                    key: 'created_at',
                    width: 160
                },
                {
                    title: this.$t('Дата'),
                    dataIndex: 'date_at',
                    scopedSlots: { customRender: 'date' },
                    key: 'date_at',
                    width: 160
                },
                {
                    title: this.$t('Сумма'),
                    dataIndex: 'amount',
                    scopedSlots: { customRender: 'money' },
                    key: 'amount',
                    width: 160
                },
                {
                    title: this.$t('От кого принято'),
                    dataIndex: 'subconto_debit.title',
                    key: 'subconto_debit.title',
                    width: 160
                },
                {
                    title: this.$t('Операция'),
                    dataIndex: 'operation_type',
                    scopedSlots: { customRender: 'operation_type' },
                    key: 'operation_type',
                    width: 160
                },
                {
                    title: this.$t('Платежная система'),
                    dataIndex: 'payment_gateway.name',
                    key: 'payment_gateway',
                    width: 160
                },
                {
                    title: this.$t('ID номер'),
                    dataIndex: 'subconto_debit.title2',
                    key: 'subconto_debit.title2',
                    scopedSlots: { customRender: 'contract_number' },
                    width: 160
                },
                {
                    title: this.$t('contract_date'),
                    scopedSlots: { customRender: 'contract_date' },
                    key: 'contract_date',
                    width: 160
                },
                {
                    title: this.$t('Дт'),
                    dataIndex: 'account_from',
                    key: 'account_from',
                    width: 160
                },
                {
                    title: this.$t('Кт'),
                    dataIndex: 'account_to',
                    key: 'account_to',
                    width: 160
                }
                // {
                //     title: this.$t('category.table.Actions'),
                //     scopedSlots: { customRender: 'actions' },
                //     key: 'actions',
                //     width: 165
                // }
            ],
            cashOutCol: [
                {
                    title: this.$t('Порядковый номер'),
                    scopedSlots: { customRender: 'order_number' },
                    key: 'created_at',
                    width: 160
                },
                {
                    title: this.$t('Дата'),
                    dataIndex: 'date_at',
                    scopedSlots: { customRender: 'date' },
                    key: 'date_at',
                    width: 160
                },
                {
                    title: this.$t('Сумма'),
                    dataIndex: 'amount',
                    scopedSlots: { customRender: 'money' },
                    key: 'amount',
                    width: 160
                },
                {
                    title: this.$t('Контрагент'),
                    dataIndex: 'subconto_credit.title',
                    key: 'subconto_credit.title',
                    width: 160
                },
                {
                    title: this.$t('Операция'),
                    dataIndex: 'operation_type',
                    scopedSlots: { customRender: 'operation_type' },
                    key: 'operation_type',
                    width: 160
                },
                {
                    title: this.$t('Платежная система'),
                    dataIndex: 'payment_gateway',
                    key: 'payment_gateway',
                    width: 160
                },
                {
                    title: this.$t('Договор/ID'),
                    dataIndex: 'subconto_credit.title2',
                    key: 'subconto_credit.title2',
                    scopedSlots: { customRender: 'contract_number' },
                    width: 160
                },
                {
                    title: this.$t('Дата договор'),
                    scopedSlots: { customRender: 'contract_date' },
                    key: 'contract_date',
                    width: 160
                },
                {
                    title: this.$t('Дт'),
                    dataIndex: 'account_from',
                    key: 'account_from',
                    width: 160
                },
                {
                    title: this.$t('Кт'),
                    dataIndex: 'account_to',
                    key: 'account_to',
                    width: 160
                }
                // {
                //     title: this.$t('category.table.Actions'),
                //     scopedSlots: { customRender: 'actions' },
                //     key: 'actions',
                //     width: 165
                // }
            ],
            gl: [],
            pagination: {
            current: 1,
            showQuickJumper: true
            }
        }
    },
    watch: {
      '$route': {
        handler (newValue, oldValue) {
          const query = {
              page: parseInt(this.$route.query.page) || 1,
              limit: 10,
              object_type: this.$route.query.object_type || 'cash_in',
              query: this.$route.query.query,
              begin_date: this.$route.query.begin_date,
              end_date: this.$route.query.end_date
          }
          console.log('Object type')
          this.tab = query.object_type
          this.pagination.current = query.page
          this.query = query.query
          this.date = [ query.begin_date, query.end_date ]
          this.getGLCashInOut(query)
        },
        deep: true
      }
    },
    methods: {
        onDateChange () {
          const query = {
            ...this.$route.query,
              begin_date: this.date.length ? moment(this.date[0]).format('YYYY-MM-DD') : undefined,
              end_date: this.date.length ? moment(this.date[1]).format('YYYY-MM-DD') : undefined
          }
          this.$router.push({ query: query })
          this.pagination.current = 1
        },
        onSearch () {
          const query = {
            ...this.$route.query,
            query: this.query
          }
          this.$router.push({ query: query })
          this.pagination.current = 1
        },
        onTabChange (val) {
          this.gl = []
          this.query = ''
          this.date = undefined
          const query = {
              page: 1,
              limit: 10,
              object_type: this.tab,
              query: ''
          }
          this.$router.push({ query: query })
          this.pagination.current = 1
        },
        onRowClick (record, index) {
            return {
                on: {
                    click: (event) => {
                        console.log(record, index)
                        this.$router.push(`/finance/treasury/${this.tab === 'cash_in' ? 'cashin' : 'cashout'}/` + record.guid)
                    }
                }
            }
        },
        getPagination (e) {
          const query = {
              page: e.current
          }
          this.$router.push({ query: { ...this.$route.query, ...query } })
          this.pagination.current = e.current
        },
        getGLCashInOut (query) {
          this.loading = true
          this.$store.dispatch('getGLCashInOut', query).then(res => {
              console.log(res)
              this.gl = res.gl_list
              const pagination = { ...this.pagination }
              pagination.total = res.count
              this.pagination = pagination
          })
          .finally(() => {
          this.loading = false
          })
        }
    },
    created () {
      console.log('GL check')
      const query = {
          page: parseInt(this.$route.query.page) || 1,
          limit: 10,
          object_type: this.$route.query.object_type || 'cash_in',
          query: this.$route.query.query,
          begin_date: this.$route.query.begin_date,
          end_date: this.$route.query.end_date
      }
      this.tab = query.object_type
      this.pagination.current = query.page
      this.query = query.query
      this.date = [ query.begin_date, query.end_date ]
      this.getGLCashInOut(query)
    }
}
</script>

<style>

</style>
