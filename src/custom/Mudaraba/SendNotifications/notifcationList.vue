<template>
  <div>
    <a-navigation
      :list="[{ name: $t('News'), link: '' }]"
      :isBack="{ flag: false, link: '/category/list' }"
      noBorder
    >
        <a-button style="float: right" type="primary" @click="$router.push('/news/list/new')">{{
            $t('button.create')
        }}</a-button>
    </a-navigation>
    <a-card class="no-space-tab">
      <a-card>
        <a-table
          :columns="columns"
          :data-source="notifications"
          :row-key="record => record.claim_id"
          size="middle"
          @change="getPagination"
          :pagination="pagination"
          :loading="loading"
          bordered
        >
          <span slot="payment_type" slot-scope="text">
            {{ $t(text) }}
          </span>
          <span slot="type" slot-scope="text">
            {{ $t(text.type) }}
          </span>
          <span slot="created_at" slot-scope="text">
            {{ text.created_at | moment($dateTimeFormat) }}
          </span>
          <span slot="amount" slot-scope="text">
            {{ $moneyFormat(+text.data.amount) }}
          </span>
          <span slot="index" slot-scope="text, column, index">
            {{ (pagination.current - 1) * 10 + index + 1 }}
          </span>
          <span slot="residency" slot-scope="text">
            {{ text ? 'Резидент' : 'Нерезидент' }}
          </span>
          <span slot="fullname" slot-scope="text, row">
            {{
              `${(row.investor && row.investor.passport_data && row.investor.passport_data.first_name) ||
                ''}  ${(row.investor && row.investor.passport_data && row.investor.passport_data.last_name) || ''}`
            }}
          </span>
          <span slot="birth_day" slot-scope="text">
            {{ text.birth_day | moment($dateTimeFormat) }}
          </span>
          <span slot="status" slot-scope="text">
            <a-tag :color="getStatusColor(text.status)">{{ $t(text.status) }}</a-tag>
          </span>
          <span slot="actions" slot-scope="text">
            <delete-btn @confirm="deleteNotification(text)" />
          </span>
        </a-table>
      </a-card>
    </a-card>
  </div>
</template>

<script>
// import debounce from 'lodash/debounce'
export default {
  watch: {
    $route: {
      handler () {
        this.getNotifications()
        // this.getStatus()
      },
      deep: true
    }
  },
  data () {
    // this.filterInput = debounce(this.filterInput, 500)
    return {
      form: {
        date: undefined
      },
      rules: {
        date: [{ required: true, message: 'Пожалуйста, заполните поле дату', trigger: 'change' }]
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
      notifications: [],
      statusList: [],
      visible: false,
      loading: false,
      passport_data: {},
      selectedInvestors: null,
      pagination: {
        current: 1,
        showQuickJumper: true
      },
      status: undefined,
      columns: [
        {
          title: '№',
          key: 'index',
          scopedSlots: { customRender: 'index' },
          customCell: this.onRowClick
        },
        {
            title: this.$t('created_at'),
          key: 'created_at',
            scopedSlots: { customRender: 'created_at' },
          customCell: this.onRowClick
        },
        {
          title: this.$t('table.title'),
          key: 'title',
          dataIndex: `title.${this.$t('lang')}`,
          customCell: this.onRowClick
        },
        // {
        //   title: this.$t('Portfolio.create.Decription'),
        //   key: 'description',
        //   dataIndex: `description.${this.$t('lang')}`,
        //   customCell: this.onRowClick
        // },
        {
          title: this.$t('username'),
          key: 'username',
          dataIndex: `user.username`,
          customCell: this.onRowClick
        },
        {
            title: this.$t('investors.table.actions'),
            scopedSlots: { customRender: 'actions' },
            key: 'actions',
            width: 100,
            fixed: 'right'
        }
      ]
    }
  },
  methods: {
    onRowClick (record, index) {
      return {
        on: {
          click: event => {
            this.$router.push(`/news/list/new?id=${record.guid}`)
          }
        }
      }
    },
    getPagination (e) {
      const query = {
        page: e.current,
        limit: 10
      }
      this.getNotifications(query)
      this.pagination.current = e.current
    },
    getNotifications (query) {
      console.log(query)
      this.loading = true
      this.$store
        .dispatch('getNotifications', query)
        .then(res => {
          // console.log(res)
          this.notifications = res.news
          console.log('Claims', res)
          const pagination = { ...this.pagination }
          pagination.total = res.count
          this.pagination = pagination
          this.loading = false
        })
        .catch(reject => {
          console.log(reject.response.data)
          this.$alertMessage('error', 'Произошла ошибка', '', this)
          this.loading = false
        })
    },
    deleteNotification (e) {
      console.log(e) // pro/list
      this.$store
        .dispatch('deleteNotification', e.guid)
        .then(res => {
          console.log(res)
          this.$alertMessage('success', 'Deleted', 'Notification has deleted successfully', this)
          const query = {
            page: this.pagination.current,
            limit: 10
          }
          this.getNotifications(query)
        })
        .catch(reject => {
          console.log(reject.response.data)
          if (reject.response.data) {
            this.$alertMessage('error', 'Произошла ошибка', '', this)
          }
        })
    },
    getList () {
      const query = {
        page: this.pagination.current,
        limit: 10
      }
      this.getNotifications(query)
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style></style>
