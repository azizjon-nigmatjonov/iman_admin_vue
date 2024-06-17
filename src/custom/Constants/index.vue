<template>
  <div>
    <a-navigation :list="[{ name: $t('Константы') }]" :isBack="{ flag: false, link: '/installments'}" noBorder>
      <!-- <div style="float: right">
        <a-select style="margin-right: 10px; width: 200px" :placeholder="$t('status')" v-model="status" @change="onFilterStatus">
          <a-select-option :value="''">
            {{ $t('all') }}
          </a-select-option>
          <a-select-option :value="item.status" v-for="item in statusList" :key="item.status">
            {{ $t(item.status) }}
          </a-select-option>
        </a-select>
        <a-button type="primary" @click="download" icon="file-excel">{{ $t('Export to excel') }}</a-button>
      </div> -->
      <a-button type="primary" @click="$router.push('/settings/constants/list/new')" icon="plus" style="float: right">{{ $t('button.create') }}</a-button>
    </a-navigation>
    <a-card class="no-space-tab">
      <a-card>
        <!-- <div class="mb-3">
          <a-form-model :colon="false" layout="horizontal" :rules="rules" :model="form" ref="ruleForm">
            <a-row type="flex" justify="space-between" :gutter="[16, 16]">
              <a-col :md="8">
                <a-form-model-item>
                  <div style="display: flex; align-items: center">
                    <span style="margin-right: 10px">{{ $t('search') }}:</span>
                    <a-input v-model="searcher.search" :placeholder="$t('search')" @change="filterInput" />
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
        </div> -->
        <a-table
          :columns="columns"
          :data-source="constants"
          :row-key="(record) => record.guid"
          @change="getPagination"
          :pagination="pagination"
          :loading="spinning"
          bordered
          :rowClassName="(record) => record.status === 'done' ? 'table-row-green' : ''"
        >
          <span slot="customer.birthday" slot-scope="text">
            {{ text.customer.birthday | moment($dateFormat) }}
          </span>
          <span slot="created_at" slot-scope="text">
            {{ text.created_at | moment($dateTimeFormat) }}
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
            <delete-btn @confirm="deleteConstant(text)"/>
          </span>
        </a-table>
      </a-card>
      <!-- </a-tab-pane>
      </a-tabs> -->
    </a-card>
  </div>
</template>

<script>
// import _ from 'lodash'
//  import { downloadfile } from '@/utils/request'
// import debounce from 'lodash/debounce'
// import moment from 'node_modules/moment/ts3.1-typings/moment'
// import moment from 'moment'
export default {
  data () {
    // this.filterInput = debounce(this.filterInput, 500)
    return {
      spinning: false,
      vis: false,
      rules: {
        'date': [{ required: true, message: 'Пожалуйста, заполните поле дату', trigger: 'blur' }]
      },
      pagination: {
        current: 1,
        showQuickJumper: true
      },
      constants: [],
      columns: [
          {
            title: this.$t('Created_at'),
            scopedSlots: { customRender: 'created_at' },
            key: 'created_at',
            customCell: this.onRowCLickFunc
          },
          {
            title: this.$t('name'),
            dataIndex: 'name',
            key: 'name',
            customCell: this.onRowCLickFunc
          },
          {
            title: this.$t('key'),
            dataIndex: 'data.key',
            key: 'key',
            customCell: this.onRowCLickFunc
          },
          {
            title: this.$t('value'),
            dataIndex: 'data.value',
            key: 'value',
            customCell: this.onRowCLickFunc
          }
          // {
          //     title: this.$t('investors.table.actions'),
          //     scopedSlots: { customRender: 'actions' },
          //     align: 'center',
          //     width: 100,
          //     key: 'actions'
          // }
      ]
    }
  },
  watch: {
    '$route.query': {
      handler () {
        let query = null
        if (this.$isEmptyObj(this.$route.query)) {
          query = { limit: 10, page: 1 }
        } else {
          query = this.$route.query
          this.pagination.current = parseInt(this.$route.query.page)
        }
        this.getConstants(query)
      }
    }
  },
  methods: {
    onRowCLickFunc (record, index) {
      return {
        on: {
          click: (event) => {
            console.log(record, index)
              this.$router.push({ name: 'settings-constants-list-update', params: { id: record.id } })
          }
        }
      }
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
    getPagination (e) {
        this.$router.push({ path: this.$router.fullPath, query: { ...this.$route.query, page: e.current } })
        this.pagination.current = e.current
    },
    getConstants (query) {
        this.spinning = true
      this.$store.dispatch('getConstants', query).then((res) => {
        console.log(res)
        this.constants = res.constants || []
        const pagination = { ...this.pagination }
        pagination.total = res.count
        this.pagination = pagination
      }).finally(() => {
        this.spinning = false
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    deleteConstant (e) {
        console.log(e) // pro/list
        this.$store.dispatch('deleteConstant', e.id).then(res => {
        console.log(res)
        this.$alertMessage('success', 'Deleted', 'Constant has been deleted successfully', this)
        }).catch(reject => {
            console.log(reject.response.data)
            if (reject.response.data) {
                this.$alertMessage('error', 'Произошла ошибка', '', this)
            }
        })
        .finally(() => {
          this.getConstants(this.$route.query)
        })
    }
  },
  created () {
    let query = null
    if (this.$isEmptyObj(this.$route.query)) {
      query = { limit: 10, page: 1 }
    } else {
      query = this.$route.query
      this.pagination.current = parseInt(this.$route.query.page)
    }
    this.getConstants(query)
  }
}
</script>

<style scoped >
.span {
  padding: 10px;
  padding-block: 10px;
}
/* .buttons {
   margin-left: auto;
   display: flex;
   justify-content: flex-end;
 } */
</style>
