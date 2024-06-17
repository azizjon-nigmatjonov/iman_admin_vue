<template>
  <div>
    <a-navigation :list="[{ name: $t('Finance'), link: ''}, { name: $t('TreasuryDep'), link: ''}]" :isBack="{ flag: false, link: ''}" noBorder>
      <a-button
        type="primary"
        @click="$router.push('/finance/partners/new')"
        icon="plus"
        style="float: right"
      >{{ $t('button.create') }}</a-button>
    </a-navigation>
    <a-card class="no-pt-body-card">
      <a-form-model ref="ruleForm" slot="extra" layout="inline">
        <a-form-model-item :label="$t('search')" prop="search_args">
          <a-input v-model="search_args" :placeholder="$t('search')" @change="onSearch" />
        </a-form-model-item>
      </a-form-model>
      <a-table
        bordered
        :loading="loading"
        :scroll="{ x: 200 }"
        :pagination="pagination"
        :columns="columns"
        :data-source="partners"
        @change="getPagination"
        :customRow="onRowClick"
      >
        <span slot="order_number" slot-scope="text, row, index">
          {{ $orderNumber(pagination, index) }}
        </span>
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
    </a-card>
  </div>
</template>

<script>
// import moment from 'moment's
import debounce from 'lodash/debounce'
export default {
    data () {
        this.onSearch = debounce(this.onSearch, 500)
        return {
            loading: false,
            query: '',
            date: undefined,
            tab: '1',
            search_args: '',
            columns: [
                {
                    title: this.$t('Порядковый номер'),
                    scopedSlots: { customRender: 'order_number' },
                    key: 'created_at3',
                    width: 100
                },
                {
                    title: this.$t('created_at'),
                    scopedSlots: { customRender: 'dateTime' },
                    dataIndex: 'created_at',
                    key: 'created_at',
                    width: 160
                },
                {
                    title: this.$t('name'),
                    dataIndex: 'name',
                    key: 'name',
                    width: 160
                },
                {
                    title: this.$t('address'),
                    dataIndex: 'address',
                    key: 'address',
                    width: 160
                },
                {
                    title: this.$t('email'),
                    dataIndex: 'email',
                    key: 'email',
                    width: 160
                }
                // {
                //     title: this.$t('category.table.Actions'),
                //     scopedSlots: { customRender: 'actions' },
                //     key: 'actions',
                //     width: 165
                // }
            ],
            partners: [],
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
              search_args: this.$route.query.search_args
          }
          this.pagination.current = query.page
          this.getPartners(query)
        },
        deep: true
      }
    },
    methods: {
      onSearch () {
        const query = {
          ...this.$route.query,
          page: 1,
          search_args: this.search_args
        }
        this.$router.push({ query: query })
        this.pagination.current = 1
      },
        onRowClick (record, index) {
            return {
                on: {
                    click: (event) => {
                        console.log(record, index)
                        this.$router.push(`/finance/partners/` + record.id)
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
        getPartners (query) {
          this.loading = true
          this.$store.dispatch('getPartners', query).then(res => {
              console.log(res)
              this.partners = res.partners
              const pagination = { ...this.pagination }
              pagination.total = parseInt(res.Count)
              this.pagination = pagination
          })
          .finally(() => {
          this.loading = false
          })
        }
    },
    created () {
      console.log('partners check')
      const query = {
          page: parseInt(this.$route.query.page) || 1,
          limit: 10,
          search_args: this.$route.query.search_args || undefined
      }
      this.pagination.current = query.page
      this.search_args = query.search_args
      this.getPartners(query)
    }
}
</script>

<style>

</style>
