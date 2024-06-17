<template>
  <div>
    <a-navigation :list="[{ name: $t('Finance'), link: ''}, { name: $t('GL'), link: ''}]" :isBack="{ flag: false, link: ''}">
      <div style="display: flex; justify-content: flex-end; gap: 10px">
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
      </div>
    </a-navigation>
    <a-card>
      <a-table
        class="gl-table"
        bordered
        :scroll="{ x: 300 }"
        :pagination="pagination"
        :columns="staticColumn"
        :loading="loading"
        :data-source="gl"
        :customRow="onRowClick"
        @change="getPagination"
      >
        <span slot="dateTime" slot-scope="text"> {{ text | moment($dateTimeFormat) }}</span>
        <span slot="date" slot-scope="text"> {{ text | moment($dateFormat) }}</span>
        <span slot="money" slot-scope="text">
          {{ $moneyFormat(+text) }}
        </span>
        <span slot="id" slot-scope="text" style="color: #01CAB0">
          {{ text }}
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import excelFormatter from '@/utils/excelDataFormatter'
import excelFormat from '@/utils/glExcelFormats'
import writeXlsxFile from 'write-excel-file'

export default {
data () {
    return {
        beginDate: null,
        endDate: null,
        loading: false,
        downloading: false,
        dateRangeValue: [],
        selectedMonth: undefined,
        selectedYear: undefined,
        months: this.$store.state.app.months,
        years: this.$store.state.app.years,
        keys: {
           created_at: 'Cоздано в',
           date_at: 'Дата',
           account_from: 'Счет Дт',
           subconto_debit: 'Субконто Дт',
           count_debit: 'Количество Дт',
           account_to: 'Счет Кт',
           subconto_credit: 'Субконто Кт',
           count_credit: 'Количество Кт',
           amount: 'Сумма',
           operation_type: 'Тип операции',
           payment_gateway: 'Платежный шлюз',
           object_id: 'Идентификатор объекта'
        },
        gl: [],
        staticColumn: [
        {
            title: '№',
            dataIndex: 'data',
            width: 80,
            align: 'center',
            fixed: 'left',
            customRender: (value, row, index) => {
                const obj = {
                    children: index / 3 + 1 + (this.pagination.current - 1) * 10,
                    attrs: {}
                }
                if (index % 3 === 0) {
                    obj.attrs.rowSpan = 3
                } else {
                    obj.attrs.rowSpan = 0
                }
                return obj
            }
        },
        {
            title: 'Дата',
            dataIndex: 'date_at',
            key: 'date_at',
            align: 'center',
            width: 160,
            customRender: (value, row, index) => {
                const obj = {
                    children: moment(value).format(this.$dateFormat),
                    attrs: {}
                }
                if (index % 3 === 0) {
                    obj.attrs.rowSpan = 3
                } else {
                    obj.attrs.rowSpan = 0
                }
                return obj
            }
        },
        {
            title: 'Счет Дт',
            dataIndex: 'account_from',
            key: 'account_from',
            align: 'center',
            width: 160,
            customRender: (value, row, index) => {
                const obj = {
                    children: value,
                    attrs: {}
                }
                if (index % 3 === 0) {
                    obj.attrs.rowSpan = 3
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
                                if (index % 3 === 0 && row.subconto_debit && row.subconto_debit.title) {
                                    obj.children = row.subconto_debit.title
                                }
                                if (index % 3 === 1 && row.subconto_debit && row.subconto_debit.title2) {
                                    obj.children = row.subconto_debit.title2
                                }
                                return obj
                            }
                        }
                    ]

                }
            ]
        },
        {
            title: 'Количество Дт',
            dataIndex: 'count_debit',
            width: 160,
            align: 'center',
            children: [
                {
                    title: 'Валюта Дт',
                    dataIndex: 'data32',
                    width: 160,
                    align: 'center',
                    children: [
                        {
                            title: 'Вал. сумма Дт',
                            dataIndex: 'data33',
                            width: 160,
                            align: 'center',
                            customRender: (value, row, index) => {
                                const obj = {
                                    children: value,
                                    attrs: {}
                                }
                                if (index % 3 === 0 && row.count_debit) {
                                    obj.children = row.count_debit
                                }
                                if (index % 3 === 1 && row.data32) {
                                    obj.children = row.data32
                                }
                                return obj
                            }
                        }
                    ]

                }
            ]
        },
        {
            title: 'Счет Кт',
            dataIndex: 'account_to',
            width: 160,
            align: 'center',
            customRender: (value, row, index) => {
                const obj = {
                    children: value,
                    attrs: {}
                }
                if (index % 3 === 0) {
                    obj.attrs.rowSpan = 3
                } else {
                    obj.attrs.rowSpan = 0
                }
                return obj
            }
        },
        {
            title: 'Субконто Кт',
            width: 160,
            align: 'center',
            children: [
                {
                    title: '',
                    width: 160,
                    align: 'center',
                    children: [
                        {
                            title: '',
                            dataIndex: 'subconto_credit',
                            width: 160,
                            align: 'center',
                            customRender: (value, row, index) => {
                                const obj = {
                                    children: value,
                                    attrs: {}
                                }
                                if (index % 3 === 0 && row.subconto_credit && row.subconto_credit.title) {
                                    obj.children = row.subconto_credit.title
                                }
                                if (index % 3 === 1 && row.subconto_credit && row.subconto_credit.title2) {
                                    obj.children = row.subconto_credit.title2
                                }
                                return obj
                            }
                        }
                    ]

                }
            ]
        },
        {
            title: 'Количество Кт',
            dataIndex: 'count_credit',
            width: 160,
            align: 'center',
            children: [
                {
                    title: 'Валюта Кт',
                    dataIndex: 'data62',
                    width: 160,
                    align: 'center',
                    children: [
                        {
                            title: 'Вал. сумма Кт',
                            dataIndex: 'data63',
                            width: 160,
                            align: 'center',
                            customRender: (value, row, index) => {
                                const obj = {
                                    children: value,
                                    attrs: {}
                                }
                                if (index % 3 === 0 && row.count_credit) {
                                    obj.children = row.count_credit
                                }
                                if (index % 3 === 1 && row.data62) {
                                    obj.children = row.data62
                                }
                                return obj
                            }
                        }
                    ]

                }
            ]
        },
        {
            title: 'Сумма',
            dataIndex: 'amount',
            width: 160,
            align: 'center',
            children: [
                {
                    title: 'Содержание',
                    dataIndex: 'data72',
                    width: 160,
                    align: 'center',
                    children: [
                        {
                            title: 'Номер журнала',
                            dataIndex: 'data73',
                            width: 160,
                            align: 'center',
                            customRender: (value, row, index) => {
                                const obj = {
                                    children: value,
                                    attrs: {}
                                }
                                if (index % 3 === 0 && row.amount) {
                                    obj.children = this.$moneyFormat(+row.amount)
                                }
                                if (index % 3 === 1 && row.data72) {
                                    obj.children = row.data72
                                }
                                return obj
                            }
                        }
                    ]

                }
            ]
        }
        ],
        pagination: {
            current: 1,
            pageSize: 30,
            showQuickJumper: true
        },
        query: {
            begin_date: '',
            end_date: ''
        }
     }
 },
 methods: {
    download (e) {
        this.downloading = true
        this.$store.dispatch('getGL', {
            page: 1,
            all: true,
            limit: 1000000,
            begin_date: this.beginDate,
            end_date: this.endDate
        }).then(res => {
            const data = res.gl_list.map(element => ({
                ...element,
                created_at: moment(element.created_at).format('DD.MM.YYYY HH:mm:ss'),
                date_at: moment(element.date_at).format('DD.MM.YYYY'),
                subconto_credit: { title: element.subconto_credit?.title || '', title2: element.subconto_credit?.title2 || '' },
                subconto_debit: { title: element.subconto_debit?.title || '', title2: element.subconto_debit?.title2 || '' }
                // count_debit: `${element.count_debit || '---'} / ${element.data32 || '---'} / ${element.data33 || '---'}`,
                // count_credit: `${element.count_credit || '---'} / ${element.data62 || '---'} / ${element.data63 || '---'}`
            }))
            const formattedData = excelFormatter(data, excelFormat)
            writeXlsxFile(formattedData, {
              columns: excelFormat.columns.map(() => ({ width: 28 })),
              fileName: 'GL.xlsx'
            })
        })
        .finally(() => {
            this.downloading = false
        })
    },
    onDateSelect (e, value) {
        console.log(e, value)
        this.dateRangeValue = e
        this.pagination.current = 1
        this.beginDate = value[0]
        this.endDate = value[1]
        this.getGL()
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
        this.getGL()
    },
    getGL (query) {
      this.loading = true
        this.$store.dispatch('getGL', {
                limit: 10,
                page: this.pagination.current,
                begin_date: this.beginDate,
                end_date: this.endDate
            }).then(res => {
            console.log(res)
            // let elemOrder = 0
            this.gl = [...res.gl_list]
            if (res.gl_list && res.gl_list.length) {
                res.gl_list.forEach((element, index) => {
                    this.gl.splice((index + 1) * 3 - 2, 0, element)
                    this.gl.splice((index + 1) * 3 - 1, 0, element)
                    // this.gl.splice(index + 1, 0, element)
                    console.log('GL', this.gl)
                })
            }
            const pagination = { ...this.pagination }
            pagination.total = res.count * 3
            this.pagination = pagination
        })
        .finally(() => {
          this.loading = false
        })
    }
 },
 created () {
//    let query = null
//   if (this.$isEmptyObj(this.$route.query)) {
//   query = { limit: 10, page: 1 }
//     } else query = this.$route.query
//      this.getMerchantUsers(query)
   console.log('GL check')
   this.getGL({ page: 1, limit: 10 })
 }
}
</script>

<style lang="less" scoped>

</style>
