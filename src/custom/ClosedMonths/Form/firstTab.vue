<template>
  <div>
    <a-table
      bordered
      :scroll="{ x: 2000 }"
      :columns="firstTabColumn"
      :pagination="true"
      :data-source="computedTableData"
      :rowKey="(row, index) => index"
      :loading="loading"
    >
      <template slot="orderNumber" slot-scope="text, record, index">
        {{ CountNumber(index) }}
      </template>
      <span slot="titleCol" slot-scope="text, rec, index">
        <b v-if="CountNumber(index) < 6">
          {{ text.column_A }}
        </b>
        <span v-else>
          {{ text.column_A }}
        </span>
      </span>
      <span slot="status" slot-scope="text">
        {{ $t(text.status) }}
      </span>
      <span slot="residence" slot-scope="text">
        {{ text ? 'Резидент' : ( text === false ? 'Нерезидент' : '') }}
      </span>
      <span slot="money" slot-scope="text">
        {{ typeof(text) === 'number' ? $moneyFormat(text) : text }}
      </span>
    </a-table>
  </div>
</template>

<script>
    export default {
        props: {
            searchText: {
                type: String,
                default: ''
            },
            excelFile: {
                type: Object,
                default: () => {}
            }
        },
        data () {
            return {
              cout: 0,
              fulldata: [],
                loading: false,
              pagination: { current: 1, pageSize: 10, total: null },
                excelData: [],
                data: [],
                keys: {
                    column_D: '',
                    column_E: 'Сумма',
                    column_F: '% в УК (всего)',
                    column_G: 'Доля Инвестора (с учетом партенерства)',
                    column_H: '% в партнерстве Инвестор',
                    column_I: '% в партнерстве (ООО)',
                    column_J: 'РП по % в УК (всего)',
                    column_K: 'Прыбиль до налогов (ООО)',
                    column_L: 'РП  по % в УК + по % в Партнерстве до IRR (для инвестора)',
                    column_M: 'Резерв Обесценения (IRR)',
                    column_N: 'Прибыль до налогов (инвестор)',
                    column_P: 'Сумма налога от дивидендов',
                    column_Q: 'Сумма налога от дивидендов',
                    column_R: 'Сумма налога от дивидендов',
                    column_S: 'Прибыль после налогов (инвестор)',
                    column_T: 'Прибыль после налогов (ООО)',
                    column_V: 'К выплате',
                    column_W: 'К капитализации',
                    investor_object_id: 'Идентификатор инвестора'
                },
                firstTabColumn: [
                    {
                        title: 'No',
                        width: 60,
                        align: 'center',
                        scopedSlots: { customRender: 'orderNumber' },
                        key: 'orderNumber',
                        fixed: 'left'
                    },
                    {
                        title: '',
                        width: 160,
                        scopedSlots: { customRender: 'titleCol' },
                        key: 'no1'
                    },
                    {
                        title: '',
                        width: 130,
                        dataIndex: 'column_D',
                        key: 'column_D'
                    },
                    {
                        title: 'Сумма',
                        width: 160,
                        dataIndex: 'column_E',
                        scopedSlots: { customRender: 'money' },
                        key: 'column_E'
                    },
                    {
                        title: '% в УК (всего)',
                        width: 130,
                        dataIndex: 'column_F',
                        // scopedSlots: { customRender: 'money' },
                        key: 'column_F'
                    },
                    {
                        title: 'Доля Инвестора (с учетом партенерства)',
                        width: 256,
                        dataIndex: 'column_G',
                        // scopedSlots: { customRender: 'money' },
                        key: 'column_G'
                    },
                    {
                        title: '% в партнерстве Инвестор',
                        scopedSlots: { customRender: 'money' },
                        width: 160,
                        dataIndex: 'column_H',
                        key: 'column_H'
                    },
                    {
                        title: '% в партнерстве (ООО)',
                        scopedSlots: { customRender: 'money' },
                        width: 160,
                        dataIndex: 'column_I',
                        key: 'column_I'
                    },
                    {
                        title: 'РП по % в УК (всего)',
                        scopedSlots: { customRender: 'money' },
                        width: 160,
                        dataIndex: 'column_J',
                        key: 'column_J'
                    },
                    {
                        title: 'Прыбиль до налогов (ООО)',
                        scopedSlots: { customRender: 'money' },
                        width: 160,
                        dataIndex: 'column_K',
                        key: 'column_K'
                    },
                    {
                        title: 'РП  по % в УК + по % в Партнерстве до IRR (для инвестора)',
                        scopedSlots: { customRender: 'money' },
                        width: 256,
                        dataIndex: 'column_L',
                        key: 'column_L'
                    },
                    {
                        title: 'Резерв Обесценения (IRR)',
                        scopedSlots: { customRender: 'money' },
                        width: 160,
                        dataIndex: 'column_M',
                        key: 'column_M'
                    },
                    {
                        title: 'Прибыль до налогов (инвестор)',
                        scopedSlots: { customRender: 'money' },
                        width: 160,
                        dataIndex: 'column_N',
                        key: 'column_N'
                    },
                    {
                        title: 'Сумма налога от дивидендов',
                        scopedSlots: { customRender: 'money' },
                        width: 125,
                        colSpan: 3,
                        key: 'column_P',
                        dataIndex: 'column_P'
                    },
                    {
                        title: 'Сумма налога от дивидендов',
                        scopedSlots: { customRender: 'money' },
                        width: 125,
                        colSpan: 0,
                        key: 'column_Q',
                        dataIndex: 'column_Q'
                    },
                    {
                        title: 'Сумма налога от дивидендов',
                        scopedSlots: { customRender: 'money' },
                        width: 125,
                        colSpan: 0,
                        key: 'column_R',
                        dataIndex: 'column_R'
                    },
                    {
                        title: 'Прибыль после налогов (инвестор)',
                        scopedSlots: { customRender: 'money' },
                        width: 160,
                        dataIndex: 'column_S',
                        key: 'column_S'
                    },
                    {
                        title: 'Прибыль после налогов (ООО)',
                        scopedSlots: { customRender: 'money' },
                        width: 160,
                        dataIndex: 'column_T',
                        key: 'column_T'
                    },
                    {
                        title: 'Дивиденды',
                        key: 'dividends',
                        children: [
                            {
                                title: 'Предыдущие',
                                width: 160,
                                dataIndex: 'previous_dividend',
                                scopedSlots: { customRender: 'money' },
                                key: 'previous_dividend'
                            },
                            {
                                title: 'К выплате',
                                width: 160,
                                dataIndex: 'column_V',
                                scopedSlots: { customRender: 'money' },
                                key: 'column_V'
                            },
                            {
                                title: 'К капитализации',
                                width: 160,
                                dataIndex: 'column_W',
                                scopedSlots: { customRender: 'money' },
                                key: 'column_W'
                            }
                        ]
                    },
                    {
                        width: 160,
                        title: 'Месячный лимит',
                        dataIndex: 'month_limit',
                        key: 'month_limit'
                    },
                    {
                        title: 'Идентификатор инвестора',
                        width: 300,
                        align: 'center',
                        key: 'investor_object_id',
                        dataIndex: 'investor_object_id'
                    }
                ]
            }
        },
        computed: {
            computedTableData () {
                return this.data.filter(row => {
                    if (row.column_A?.toLowerCase().includes(this.searchText.toLowerCase()) || row.investor_object_id.includes(this.searchText)) return true
                    return false
                })
            }
        },
        watch: {
          data () {
            this.data[0].isBold = true
            this.data[1].isBold = true
            this.data[2].isBold = true
            this.data[4].isBold = true
            let count = 0
            this.excelData = this.data.map(el => {
                if (el.investor_object_id) count += 1
                return {
                    ...el,
                    number: el.investor_object_id ? count : null
                }
            })
          }
        },
        mounted () {
            this.getProfitDistribution()
        },
        methods: {
          CountNumber (index) {
            if (this.cout === 0 || this.cout === 1) {
              return (index + 1)
            } else {
              return ((this.cout * this.pagination.pageSize - this.pagination.pageSize) + index + 1)
            }
          },
          getPagination (pag, fil, sorser) {
            // this.loading = true
            this.pagination.current = pag.current
            this.cout = pag.current
            // console.log(pag, fil, sorser, this.fulldata.length)
            // this.data = this.fulldata.splice((pag.current * pag.pageSize - pag.pageSize - 1), pag.pageSize)
            // console.log(this.data, pag.current * pag.pageSize - pag.pageSize, (pag.current * pag.pageSize - pag.pageSize) + 10)
            // if (this.data && this.data.length) {
            //   this.data[0].column_P = 'Для инвесторов нерезидентов'
            //   this.data[0].column_Q = 'Для инвесторов резидентов'
            //   this.data[0].column_R = 'Для ООО резидент'
            //
            //   this.data[1].column_P = 'Не резидент'
            //   this.data[1].column_Q = 'Резидент'
            //   this.data[1].column_R = 'Резидент'
            //   this.data = this.data.map((item, index) => {
            //     if (![0, 1].includes(index)) {
            //       const obj = {}
            //       Object.keys(item).forEach(key => {
            //         obj[key] = item[key] === 0 ? '0' : item[key]
            //       })
            //       return obj
            //     }
            //     return item
            //   })
            //   this.loading = false
            // }
            // console.log(this.data)
          },
            getProfitDistribution () {
                console.log('aaaa')
                this.loading = true
                this.$store.dispatch('getProfitDistribution', { 'month_id': this.$route.params.id }).then((res) => {
                    console.log('Profit distribution', res)
                    this.excelFile.xlsx1 = res.xlsx
                    console.log('this.excelFile.xlsx', this.excelFile.xlsx)
                    if (res.data && res.data.length) {
                        // this.data.splice(4, 0, res.data[0])
                        this.fulldata = res.data
                        this.data = res.data
                        this.data[0].column_P = 'Для инвесторов нерезидентов'
                        this.data[0].column_Q = 'Для инвесторов резидентов'
                        this.data[0].column_R = 'Для ООО резидент'

                        this.data[1].column_P = 'Не резидент'
                        this.data[1].column_Q = 'Резидент'
                        this.data[1].column_R = 'Резидент'
                        this.data = this.data.map((item, index) => {
                            if (![0, 1].includes(index)) {
                                const obj = {}
                                Object.keys(item).forEach(key => {
                                    obj[key] = item[key] === 0 ? '0' : item[key]
                                })
                                return obj
                            }
                            return item
                        })

                      this.pagination.total = res.data.length
                    //   this.data = this.globalSort(this.data)
                      const localData = this.data
                      this.data = [
                          ...localData.splice(0, 5),
                          ...this.globalSort(localData)
                      ]
                        // this.data.push(...res.data.slice(1, res.data.length))
                    }
                }).catch(reject => {
                    console.log(reject)
                })
                .finally(() => {
                    this.loading = false
                })
            },
            globalSort (array) {
                const sortarray = array.sort((a, b) => (a.column_A.trim() > b.column_A.trim()) ? 1 : ((b.column_A.trim() > a.column_A.trim()) ? -1 : 0))
                return sortarray
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
