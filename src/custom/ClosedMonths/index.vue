<template>
  <div>
    <a-navigation :list="[{ name: $t('closedMonths'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <!-- <a-range-picker
            style="float: right"
            format="YYYY-MM-DD"
            @change="onDateChange"
        /> -->
      <a-row type="flex" justify="end" :gutter="[8,8]">
        <a-col span="cols">Отключить приложение</a-col>
        <a-col span="cols"><a-switch @change="updateAppController" v-model="is_stop"></a-switch></a-col>
      </a-row>
    </a-navigation>
    <a-card>
      <a-table
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        :data-source="months"
        :row-key="record => record.guid"
        size="middle"
        bordered
        :customRow="onRowClick"
      >
        <span slot="index" slot-scope="text, item, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-tag :color="getStatusColor(text)">{{ getStatusName(text) }}</a-tag>
        </span>
        <span slot="date" slot-scope="text">
          {{ text | moment($dateFormat) }}
        </span>
        <span slot="closed_at" slot-scope="row">
          {{ row.closed }}
        </span>
        <span slot="creator" slot-scope="text">
          {{ text }}
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import newMoment from 'moment'
export default {
  data () {
    return {
      date_begin: '',
      date_end: '',
      is_stop: false,
      loading: false,
      pagination: {
        current: 1,
        limit: 10,
        showQuickJumper: true
      },
      months: [
        {
          status: 'test'
        }
      ],
      columns: [
          {
              title: '№',
              scopedSlots: { customRender: 'index' },
              key: 'index',
              align: 'center',
              width: 60
          },
          {
              title: this.$t('date'),
              dataIndex: 'period',
              scopedSlots: { customRender: 'date' },
              key: 'date'
          },
          {
              title: this.$t('closed_at'),
              scopedSlots: { customRender: 'closed_at' },
              key: 'closed_at'
          },
          {
              title: this.$t('numberOfInvestors'),
              dataIndex: 'investors_count',
              key: 'investors_count'
          },
          {
              title: this.$t('status'),
              dataIndex: 'status',
              scopedSlots: { customRender: 'status' },
              key: 'status'
          },
          {
              title: this.$t('creator'),
              dataIndex: 'user.name',
              key: 'creator'
          }
      ],
      form: { date: [] }
    }
  },
  mounted () {
    this.getEndOfMonthList({ page: this.pagination.current, limit: 10 })
  },
  created () {
    this.getAppController()
  },
  methods: {
    getAppController () {
      this.$store.dispatch('getAppController').then(res => {
        console.log(res)
        this.is_stop = res.is_stop
      })
    },
    updateAppController (e) {
      // console.log('updateAppController', { is_stop: e })
      this.$store.dispatch('updateAppController', { is_stop: e }).then(res => {
      this.$alertMessage('success', 'Updated', 'App access has been changed', this)
      })
    },
    getStatusColor (color) {
      var selected
      switch (color) {
        case 'in-process':
          selected = 'orange'
          break
        case 'closed':
          selected = 'blue'
          break
        default:
          selected = ''
      }
      return selected
    },
    getStatusName (name) {
      var selected
      switch (name) {
        case 'in-process':
          if (this.$t('lang') === 'ru') {
            selected = 'В обработке '
          } else {
            selected = 'In process'
          }
          break
        case 'closed':
          if (this.$t('lang') === 'ru') {
            selected = 'Месяц закрыт'
          } else {
            selected = 'Month closed'
          }
          break
        default:
          selected = ''
      }
      return selected
    },
      getPagination (e) {
          this.getEndOfMonthList({ page: e.current, limit: 10 })
          this.pagination.current = e.current
      },
      onRowClick (record, index) {
          return {
              on: {
                  click: (e) => {
                      console.log('FOrmat', `/closed-months/preview/${record.guid}/${newMoment(record.period).format('YYYY-MM-DD')}?status=${record.status}`)
                      this.$router.push(`/closed-months/preview/${record.guid}/${newMoment(record.period).format('YYYY-MM-DD')}?status=${record.status}&period=${newMoment(record.period).format('YYYY-MM-DD')}`)
                  }
              }
          }
      },
      getEndOfMonthList (query) {
          this.loading = true
          this.$store.dispatch('getEndOfMonthList', query)
              .then(res => {
                  console.log(res)
                  this.months = res && res.data.map(item => {
                    return {
                      ...item,
                      closed: item.closed_at ? newMoment(item.closed_at).format(this.$dateFormat) : ''
                    }
                  }) || []
                  this.pagination.total = res.count
              })
              .catch(reject => {
                  console.log(reject.response.data)
                  this.$message.warning(reject.response.data.message)
              })
              .finally(() => {
                  this.loading = false
              })
      }
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
