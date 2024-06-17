<template>
  <div>
    <a-navigation :list="[{ name: $t('Finance'), link: ''}, { name: $t('Incomes'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <div style="display: flex; justify-content: flex-end; gap: 10px; padding-top: 20px">
        <a-input
          style="width: 100px"
          placeholder="Cчет Дт"
          v-model="accountFrom"
        />
        <a-select
          style="width: 200px"
          placeholder="Год"
          :options="years"
          @change="onYearSelect"
          v-model="selectedYear"
        />
        <a-select
          style="width: 200px"
          placeholder="Месяцы"
          :options="months"
          @change="onMonthSelect"
          v-model="selectedMonth"
        />
        <a-range-picker
          style="width: 250px"
          format="YYYY-MM-DD"
          :value="dateRangeValue"
          @change="onDateSelect"
        />
        <a-button type="primary" @click="download" :loading="downloading" icon="file-excel">{{ $t('Export to excel') }}</a-button>
        <a-button type="primary" @click="$router.push('/finance/income/new')" icon="plus" style="float: right">{{ $t('button.create') }}</a-button>
      </div>
    </a-navigation>
    <a-card>
      <a-table
        bordered
        :scroll="{ x: 1500 }"
        :columns="columns"
        :data-source="incomes"
        :row-key="record => record.guid + Math.random()"
        @change="getPagination"
        :customRow="onRowClick"
        :pagination="pagination"
        :loading="loading"
      >
        <span slot="order_number" style="text-align: center; display: none" >
          {{ text }}
        </span>
        <span slot="date" slot-scope="text"> {{ text | moment($dateFormat) }}</span>
        <span slot="lang" slot-scope="text"> {{ $t(text) }}</span>
        <span slot="money" slot-scope="text">
          {{ $moneyFormat(text) || 0 }}
        </span>
        <span slot="actions" slot-scope="text" class="span">
          <delete-btn @confirm="deleteMerchantUsers(text)"/>
          <!-- <a-popconfirm
            :title="$t('Вы хотите это удалить?')"
            :ok-text="$t('Да')"
            :cancel-text="$t('Нет')"
            @confirm="deleteMerchantUsers(text)"
            @cancel="cancel => null"
          >
            <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
              <a-button type="danger" icon="delete" />
            </a-tooltip>
          </a-popconfirm> -->
          <edit-btn @click="$router.push({ name: 'edit-merchant', params: { id: text.guid} })" />
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
            <a-button class="mx-1" @click="$router.push({ name: 'edit-merchant', params: { id: text.guid} })" type="primary" icon="edit" />
          </a-tooltip> -->
          <!-- <a-tooltip placement="bottomLeft" :title="$t('transactions')">
            <a-button @click="$router.push({ name: 'transactions-merchant', params: { id: text.guid } })" type="primary" icon="transaction" />
          </a-tooltip> -->
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import writeXlsxFile from 'write-excel-file'
import excelFormat from '@/utils/financeExcelFormats'
import excelFormatter from '@/utils/excelDataFormatter'

const customRender = (value, row, index) => {
  const obj = {
      children: value,
      attrs: {}
  }
  if (index % 2 === 0) {
      obj.attrs.rowSpan = 2
  } else {
      obj.attrs.rowSpan = 0
  }
  return obj
}
export default {
  data () {
    return {
      accountFrom: '',
      accountTo: '',
      downloading: false,
      beginDate: null,
      endDate: null,
      selectedMonth: undefined,
      selectedYear: undefined,
      months: this.$store.state.app.months,
      years: this.$store.state.app.years,
      dateRangeValue: [],
      columns: [
        {
            title: this.$t('Порядковый номер'),
            key: 'created_at3',
            width: 120,
            align: 'center',
            customRender: (value, row, index) => {
              const obj = {
                  children: null,
                  attrs: {}
              }
              if (index % 2 === 0) {
                  obj.children = (this.pagination.current - 1) * 10 + (index / 2) + 1
                  obj.attrs.rowSpan = 2
              } else {
                  obj.attrs.rowSpan = 0
              }
              return obj
            }
        },
        {
            title: this.$t('Дата создания'),
            key: 'created_at',
            dataIndex: 'created_at',
            scopedSlots: { customRender: 'date' },
            customCell: this.onRowClick,
            customRender: (value, row, index) => {
              const obj = {
                  children: moment(value).format(this.$dateTimeFormat),
                  attrs: {}
              }
              if (index % 2 === 0) {
                  obj.attrs.rowSpan = 2
              } else {
                  obj.attrs.rowSpan = 0
              }
              return obj
            }
        },
    //  {
    //      title: 'Language',
    //      dataIndex: 'lang',
    //      key: 'lang'
    //  },
        {
            title: this.$t('Дата'),
            key: 'date_at',
            dataIndex: 'date_at',
            scopedSlots: { customRender: 'date' },
            customCell: this.onRowClick,
            customRender: (value, row, index) => {
              const obj = {
                  children: moment(value).format(this.$dateFormat),
                  attrs: {}
              }
              if (index % 2 === 0) {
                  obj.attrs.rowSpan = 2
              } else {
                  obj.attrs.rowSpan = 0
              }
              return obj
            }
        },
        {
          title: 'Субконто Дт',
          width: 160,
          children: [
            {
              title: '',
              data: 'subconto_debit',
              width: 160,
              customRender: (value, row, index) => {
                const obj = {
                    children: value,
                    attrs: {}
                }
                if (index % 2 === 0 && row.subconto_debit && row.subconto_debit.title) {
                    obj.children = row.subconto_debit.title
                }
                if (index % 2 === 1 && row.subconto_debit && row.subconto_debit.title2) {
                    obj.children = row.subconto_debit.title2
                }
                return obj
              }
            }
          ]
        },
        {
          title: 'Субконто Кт',
          width: 160,
          children: [
            {
              title: '',
              data: 'subconto_credit',
              width: 160,
              customRender: (value, row, index) => {
                const obj = {
                    children: value,
                    attrs: {}
                }
                if (index % 2 === 0 && row.subconto_credit && row.subconto_credit.title) {
                    obj.children = row.subconto_credit.title
                }
                if (index % 2 === 1 && row.subconto_credit && row.subconto_credit.title2) {
                    obj.children = row.subconto_credit.title2
                }
                return obj
              }
            }
          ]
        },
        {
            title: this.$t('debitAccount'),
            dataIndex: 'account_from.account_number',
            key: 'account_from',
            customCell: this.onRowClick,
            customRender: customRender
        },
        {
            title: this.$t('creditAccount'),
            dataIndex: 'account_to.account_number',
            key: 'account_to',
            customCell: this.onRowClick,
            customRender: customRender
        },
        {
            title: this.$t('debitOperation'),
            dataIndex: 'debit_operation.name',
            key: 'debit_operation',
            scopedSlots: { customRender: 'lang' },
            customCell: this.onRowClick,
            customRender: this.customRenderLang
        },
        {
            title: this.$t('creditOperation'),
            dataIndex: 'credit_operation.name',
            key: 'credit_operation',
            scopedSlots: { customRender: 'lang' },
            customCell: this.onRowClick,
            customRender: this.customRenderLang
        },
        {
            title: this.$t('Сумма'),
            dataIndex: 'amount',
            scopedSlots: { customRender: 'money' },
            key: 'amount',
            customCell: this.onRowClick,
            customRender: (value, row, index) => {
              const obj = {
                  children: this.$moneyFormat(value) || 0,
                  attrs: {}
              }
              if (index % 2 === 0) {
                  obj.attrs.rowSpan = 2
              } else {
                  obj.attrs.rowSpan = 0
              }
              return obj
            }
        },
        {
            title: this.$t('Description'),
            dataIndex: 'description',
            key: 'description',
            customCell: this.onRowClick,
            customRender: customRender
        }
        // {
        //     title: this.$t('category.table.Actions'),
        //     scopedSlots: { customRender: 'actions' },
        //     key: 'actions',
        // }
      ],
      incomes: [],
      pagination: {
        current: 1,
        pageSize: 20,
        showQuickJumper: true
      },
      loading: false
    }
  },
  methods: {
    onDateSelect (e, value) {
      console.log(e, value)
      this.dateRangeValue = e
      this.pagination.current = 1
      this.beginDate = value[0]
      this.endDate = value[1]
      this.getIncomes()
    },
    onMonthSelect (val) {
        const date = moment().set('month', val)
        const selectedYear = this.selectedYear ?? moment().format('YYYY')
        date.set('year', selectedYear)
        const range = [date.startOf('month').format('YYYY-MM-DD'), date.endOf('month').format('YYYY-MM-DD')]
        const momentRange = [moment(range[0]), moment(range[1])]
        this.onDateSelect(momentRange, range)
      },
      onYearSelect (val) {
        const date = moment().set('year', val)
        const selectedMonth = this.selectedMonth ?? moment().format('M') - 1
        date.set('month', selectedMonth)
        const range = [date.startOf('month').format('YYYY-MM-DD'), date.endOf('month').format('YYYY-MM-DD')]
        const momentRange = [moment(range[0]), moment(range[1])]
        this.onDateSelect(momentRange, range)
    },
    customRenderLang (value, row, index) {
        const obj = {
            children: this.$t(value),
            attrs: {}
        }
        if (index % 2 === 0) {
            obj.attrs.rowSpan = 2
        } else {
            obj.attrs.rowSpan = 0
        }
        return obj
    },
      onRowClick (record, index) {
          return {
              on: {
                  click: (event) => {
                      console.log(record, index)
                      this.$router.push({ name: 'update_shared', params: { id: record.guid } })
                  }
              }
          }
      },
      getPagination (e) {
        this.pagination.current = e.current
        this.getIncomes()
      },
      getIncomes () {
        this.loading = true
        this.$store.dispatch('getIncomes', {
          account_from: this.accountFrom || null,
          account_to: this.accountTo || null,
          limit: 10,
          page: this.pagination.current,
          begin_date: this.beginDate,
          end_date: this.endDate
        }).then(res => {
          console.log(res)
          this.incomes = res.incomes
          if (res.incomes && res.incomes.length) {
              res.incomes.forEach((element, index) => {
                  this.incomes.splice((index + 1) * 2 - 1, 0, element)
                  // this.incomes.splice(index + 1, 0, element)
                  console.log('GL', this.incomes)
              })
          }
          const pagination = { ...this.pagination }
          pagination.total = res.count * 2
          this.pagination = pagination
        })
        .finally(() => {
          this.loading = false
        })
      },
      download () {
        this.downloading = true
        this.$store.dispatch('getIncomes', {
            account_from: this.accountFrom || null,
            account_to: this.accountTo || null,
            page: 1,
            begin_date: this.beginDate,
            end_date: this.endDate,
            all: true
          })
          .then(res => {
            const data = res.incomes.map(element => ({
              ...element,
              subconto_credit: `${element.subconto_credit?.title || '---'}  /  ${element.subconto_credit?.title2 || '---'}`,
              subconto_debit: `${element.subconto_debit?.title || '---'}  /  ${element.subconto_debit?.title2 || '---'}`,
              created_at: moment(element.created_at).format('DD.MM.YYYY HH:mm:ss'),
              date_at: moment(element.created_at).format('DD.MM.YYYY')
            }))
            const formattedData = excelFormatter(data, excelFormat)
            writeXlsxFile(formattedData, {
              columns: excelFormat.columns.map(() => ({ width: 28 })),
              fileName: 'Доходы.xlsx'
            })
          }).finally(() => { this.downloading = false })
      },
      deleteMerchantUsers (e) {
          this.$store.dispatch('deleteMerchantUsers', e.guid).then(res => {
            this.incomes.splice(this.incomes.findIndex(el => el.guid === e.guid), 1)
              // this.$deleteFromList(this.incomes, e.guid)
              console.log(e.guid)
              this.$message.success('Merchant deleted successfully')
            })
      }
  },
  watch: {
    accountFrom () {
      this.pagination.current = 1
        this.getIncomes({ page: 1, limit: 10, begin_date: this.dateRangeValue[0], end_date: this.dateRangeValue[1] })
    },
    accountTo () {
      this.pagination.current = 1
        this.getIncomes({ page: 1, limit: 10, begin_date: this.dateRangeValue[0], end_date: this.dateRangeValue[1] })
    }
  },
  created () {
     let query = null
    if (this.$isEmptyObj(this.$route.query)) {
      query = { limit: 10, page: 1 }
    } else {
      query = this.$route.query
      this.pagination.current = query.page
    }
    this.getIncomes(query)
  }
}
</script>

<style>

</style>
