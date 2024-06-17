<template>
  <div>
    <a-navigation :list="[{ name: $t('Список портфолио'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <a-button type="primary" @click="$router.push('/strategy/list/new')" icon="plus" style="float: right">{{ $t('button.create') }}</a-button>
    </a-navigation>
    <a-card>
      <a-table
        :loading="loader"
        :columns="columns"
        :data-source="portfolios"
        :row-key="(record) => record.id"
        :scroll="{ x: 1000 }"
        :pagination="pagination"
        @change="getPagination"
        bordered
      >
        <span slot="min_percent" slot-scope="text">
          <strong> {{ text.min_percent }}% ~ {{ text.max_percent }}%</strong></span
          >
        <span slot="max_investment_amount" slot-scope="text">
          {{ $moneyFormat(text.max_investment_amount) }}
        </span>
        <span slot="min_investment_amount" slot-scope="text">
          {{ $moneyFormat(text.min_investment_amount) }}
        </span>
        <span slot="expected_profit" slot-scope="text">
          {{ $moneyFormat(text.expected_profit) }}
        </span>
        <span slot="status" slot-scope="text">
          <a-tag :color="getStatusColor(text.status)">{{ $t(text.status) }}</a-tag>
        </span>
        <!-- <span slot="lang" slot-scope="text"><img :src="require(`@/assets/flag/${text.lang}.png`)" width="45" height="23" :alt="text.lang"></span> -->
        <span slot="actions" slot-scope="text">
          <delete-btn @confirm="deletePortfolio(text)"/>
          <!-- <a-popconfirm
            :title="$t('Вы хотите это удалить?')"
            :ok-text="$t('Да')"
            :cancel-text="$t('Нет')"
            @confirm="deletePortfolio(text)"
            @cancel="(cancel) => null"
          >
            <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
              <a-button type="danger" icon="delete" />
            </a-tooltip>
          </a-popconfirm> -->
          <edit-btn @click="$router.push('/strategy/list/edit/' + text.id)" />
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
            <a-button
              class="mx-1"
              @click="$router.push('/strategy/list/edit/' + text.id)"
              type="primary"
              icon="edit"
            />
          </a-tooltip> -->
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
            <a-button @click="$router.push({ name: 'preview portfolio', params: { id: text.id}})" type="primary" icon="eye" />
          </a-tooltip> -->
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.investorlist')">
            <a-button class="mx-1" @click="$router.push('/portfolio/investorList/' + text.id)" type="primary" icon="user" />
          </a-tooltip> -->
        </span>
      </a-table>
    </a-card>
  </div>
</template>
<script>
function getSelected (portfolios, selectedPortfolio) {
  for (let i = 0; i < portfolios.length; i++) {
    if (portfolios[i].id === selectedPortfolio) {
      return portfolios[i]
    }
  }
}
const apie = {
  count: 0,
  portfolios: [
    {
      category: {
        created_at: 'string',
        id: 'string',
        lang: 'string',
        max_investment_amount: 0,
        min_investment_amount: 0,
        title: 'string'
      },
      created_at: 'string',
      description: 'string',
      file_name: '',
      expected_profit: 0,
      id: 'string',
      lang: 'string',
      max_investment_amount: 0,
      min_investment_amount: 0,
      month_count: 0,
      risk_type: 'string',
      title: 'string'
    }
  ]
}
console.log(apie)
export default {
 data () {
    return {
      pagination: {
        current: 1,
        showQuickJumper: true
      },
      loader: false,
      visible: false,
      portfolios: [],
      selectedPortfolio: null,
      columns: [
        {
          title: this.$t('Portfolio.table.title'),
          dataIndex: 'title.ru',
          key: 'title',
          customCell: this.onRowClick
        },
        {
          title: this.$t('Portfolio.table.description'),
          dataIndex: 'description.ru',
          key: 'description',
          customCell: this.onRowClick
        },
        {
          title: this.$t('Portfolio.table.max_investment_amount'),
          scopedSlots: { customRender: 'max_investment_amount' },
          key: 'max_investment_amount',
          customCell: this.onRowClick
        },
        {
          title: this.$t('Portfolio.table.min_investment_amount'),
          scopedSlots: { customRender: 'min_investment_amount' },
          key: 'min_investment_amount',
          customCell: this.onRowClick
        },
        {
          title: this.$t('Portfolio.create.Risk_type'),
          dataIndex: 'risk_type',
          customCell: this.onRowClick
        },
        {
          title: this.$t('Status'),
          scopedSlots: { customRender: 'status' },
          key: 'status',
          fixed: 'right',
          width: 120,
          customCell: this.onRowClick
        },
        {
          title: this.$t('Portfolio.table.Actions'),
          scopedSlots: { customRender: 'actions' },
          key: 'actions',
          width: 120,
          fixed: 'right'
        }
      ]
    }
  },
  methods: {
    onRowClick (record, index) {
      return {
        on: {
          click: (event) => {
            console.log(record, index)
              this.$router.push({ name: 'edit strategy', params: { id: record.id } })
          }
        }
      }
    },
     getPagination (e) {
         this.pagination.current = e.current
         this.getWingsList({ page: e.current })
     },
    getStatusColor (color) {
      var selected
      switch (color) {
        case 'active':
          selected = 'cyan'
          break
        case 'inactive':
          selected = 'red'
          break
        case 'archive':
          selected = 'orange'
          break
        default:
          selected = ''
      }
      return selected
    },
    getSelectedPortfolio (selectedPortfolio) {
    this.selectedPortfolio = getSelected(this.portfolios, selectedPortfolio)
    console.log('selport', this.selectedPortfolio)
  },
  showModal (id) {
      this.getSelectedPortfolio(id)
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    getPortfolios (query) {
      this.loader = true
      this.$store.dispatch('getPortfolios', query).then((res) => {
        this.portfolios = res.strategies
        const pagination = { ...this.pagination }
        pagination.total = +res.count
        this.pagination = pagination
        console.log(res)
      }).finally(() => {
        this.loader = false
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    deletePortfolio (e) {
      this.$store.dispatch('deletePortfolio', e.id).then((res) => {
        this.$deleteFromList(this.portfolios, e.id)
        this.$alertMessage('success', 'Deleted', 'deleted successfully', this)
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
      console.log(e)
    }
  },
  created () {
    this.getPortfolios({ page: this.pagination.current })
  }
}
</script>

<style>
</style>
