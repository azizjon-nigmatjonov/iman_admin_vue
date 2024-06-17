<template>
  <div>
    <a-navigation :list="[{ name: $t('Список инвестиций'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <a-range-picker
        style="float: right"
        format="YYYY-MM-DD"
        @change="onDateChange"
      />
    </a-navigation>
    <a-card>
      <a-table
        :columns="columns"
        @change="getPagination"
        :pagination="pagination"
        :data-source="pl"
        :row-key="record => record.guid"
        size="middle"
        bordered
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
        :title="$t('pl')"
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
    </a-card>
  </div>
</template>

<script>
export default {
data () {
  return {
    date_begin: '',
    date_end: '',
    loading: false,
    visible: {
      flag: false,
      data: {}
    },
    pagination: {
      current: 1,
      limit: 10,
      showQuickJumper: true
    },
    pl: [],
    columns: [
        {
            title: this.$t('title'),
            dataIndex: 'title',
            key: 'title',
            width: 600
        },
        {
            title: this.$t('account_code'),
            dataIndex: 'account_code',
            align: 'center',
            key: 'account_code'
        },
        {
            title: this.$t('code'),
            dataIndex: 'code',
            align: 'center',
            key: 'code'
        },
        {
            title: this.$t('reportingPeriod'),
            children: [
                {
                    title: this.$t('profit'),
                    dataIndex: 'profit',
                    align: 'center',
                    key: 'profit'
                },
                {
                    title: this.$t('loss'),
                    dataIndex: 'loss',
                    align: 'center',
                    key: 'loss'
                }
            ]
        }
    ],
    form: { date: [] }
  }
},
methods: {
    getPagination (e) {
        this.getPandlList({ page: e.current, limit: 10 })
        this.pagination.current = e.current
    },
    getPandlList (query) {
        this.loading = true
        this.$store.dispatch('getPandlList', query)
            .then(res => {
                console.log(res)
                this.pl = res.length && res[0].pl || []
                // this.pagination.total = res.count
            })
            .catch(reject => {
                console.log(reject.response.data)
                this.$message.warning(reject.response.data.message)
            })
            .finally(() => {
                this.loading = true
            })
    },
    onDateChange (e, val) {
        console.log('on date change', e, val)
        const pagination = { ...this.pagination }
        pagination.current = 1
        pagination.date_begin = val[0]
        pagination.date_end = val[1]
        this.getPandlList(pagination)
    }
},
created () {
    this.getPandlList({})
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
