<template>
  <div>
    <a-tabs @change="Tabcallback">
      <a-tab-pane key="1" tab="Полный товарищ">
        <Tabcompanents
          :columname="column"
          :data="oneTabData"
          :loading="loading"
          :total="totalfull.onelistTotal"
          :searchText="searchText"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Вышедшие инвесторы">
        <div>
          <Tabcompanents
            :columname="column"
            :data="twoTabdata"
            :loading="loading"
            :total="totalfull.twolistTotal"
            :searchText="searchText"
          /></div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Текущие инвесторы">
        <div>
          <Tabcompanents
            :columname="column"
            :data="theeTabdata"
            :loading="loading"
            :total="totalfull.theelistTotal"
            :searchText="searchText"
          />
        </div>
      </a-tab-pane>
      <a-tab-pane key="4" tab="Новые инвесторы">
        <div>
          <Tabcompanents
            :columname="column"
            :data="fourData"
            :loading="loading"
            :total="totalfull.fourlistTotal"
            :searchText="searchText"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Tabcompanents from './thirdtabinsideOneTab'
    export default {
        components: { Tabcompanents },
        props: {
            searchText: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
              oneTabData: [],
              fulldata: [],
              totalfull: {
                onelistTotal: null,
                twolistTotal: null,
                theelistTotal: null,
                fourlistTotal: null
              },
              twoTabdata: [],
              theeTabdata: [],
              fourData: [],
                data: [],
                excelData: [],
              pagination: { current: 1, pageSize: 10, total: null },
                types: {
                  exists: 'Текущий',
                  new: 'Новый'
                },
                colors: {
                  exists: 'cyan',
                  new: 'green'
                },
                loading: false,
                keys: {
                  name: 'Наименовие Ф.И.О участника',
                  type: 'Тип инвестора',
                  investor_id: 'Идентификатор инвестора',
                  column_A: 'Номинальная стоимость доли (сум)',
                  column_B: 'Размер доли в УФ %',
                  column_C: 'Сумма причитающейся прыбилы',
                  column_D: 'Сумма прыбыли, получаемая в виде дивидендов',
                  column_E: 'Сумма прыбыли, направляемая на увелечения УФ',
                  column_F: 'Новые инвестиции в УФ (сум)',
                  column_G: 'Номинальная стоимость доли новый размер',
                  column_H: 'Размер доли в УФ (Новый размер)',
                  column_I: 'Новая доля инвестора (с учётом партнёрства)',
                  column_J: '% в партнёрстве инвестор',
                  column_K: '% партнёрства IMAN'
                },
                column: [
                    {
                        title: 'No',
                        width: 60,
                        align: 'center',
                        scopedSlots: { customRender: 'orderNumber' },
                        key: 'orderNumber',
                        fixed: 'left'
                    },
                    {
                        title: 'Наименовие Ф.И.О участника',
                        key: 'name',
                        dataIndex: 'name',
                        width: 160,
                        customRender: (text, row, index) => {
                          // console.log('Table check', text, row, index)
                          if (row && row.mainRow) {
                            return {
                              children: <b>{ text }</b>,
                              attrs: {
                                colSpan: 13
                              }
                            }
                          }
                          return text
                        }
                    },
                    {
                        title: 'Тип инвестора',
                        scopedSlots: { customRender: 'type' },
                        key: 'type',
                        dataIndex: 'type',
                        width: 120
                    },
                  {
                        title: 'Месячный лимит',
                        scopedSlots: { customRender: 'limit' },
                        key: 'type',
                        dataIndex: 'month_limit',
                        width: 120
                    },
                    {
                        title: 'Номинальная стоимость доли (сум)',
                        scopedSlots: { customRender: 'money' },
                        key: 'sarePerValue',
                        dataIndex: 'column_A',
                        customRender: this.renderContent,
                        width: 160
                    },
                    {
                        title: 'Размер доли в УФ %',
                        scopedSlots: { customRender: 'percent' },
                        key: 'shareSize',
                        dataIndex: 'column_B',
                        customRender: this.renderContent,
                        width: 160
                    },
                    {
                        title: 'Сумма причитающейся прыбилы',
                        scopedSlots: { customRender: 'money' },
                        dataIndex: 'column_C',
                        key: 'amountDue',
                        customRender: this.renderContent,
                        width: 160
                    },
                    {
                        title: 'Сумма прыбыли, получаемая в виде дивидендов',
                        scopedSlots: { customRender: 'money' },
                        dataIndex: 'column_D',
                        key: 'profitAmountDividend',
                        customRender: this.renderContent,
                        width: 224
                    },
                    {
                        title: 'Сумма прыбыли, направляемая на увелечения УФ',
                        scopedSlots: { customRender: 'money' },
                        dataIndex: 'column_E',
                        key: 'lostAmount',
                        customRender: this.renderContent,
                        width: 160
                    },
                    {
                        title: 'Новые инвестиции в УФ (сум)',
                        scopedSlots: { customRender: 'money' },
                        dataIndex: 'column_F',
                        key: 'lostAmount1',
                        customRender: this.renderContent,
                        width: 160
                    },
                    {
                        title: 'Номинальная стоимость доли новый размер',
                        scopedSlots: { customRender: 'money' },
                        dataIndex: 'column_G',
                        key: 'lostAmount2',
                        customRender: this.renderContent,
                        width: 160
                    },
                    {
                        title: 'Размер доли в УФ (Новый размер)',
                        scopedSlots: { customRender: 'percent' },
                        dataIndex: 'column_H',
                        key: 'lostAmount3',
                        customRender: this.renderContent,
                        width: 160
                    },
                    {
                        title: 'Новая доля инвестора (с учётом партнёрства)',
                        scopedSlots: { customRender: 'percent' },
                        dataIndex: 'column_I',
                        key: 'lostAmount4',
                        customRender: this.renderContent,
                        width: 160
                    },
                    {
                        title: '% в партнёрстве инвестор',
                        scopedSlots: { customRender: 'percent' },
                        dataIndex: 'column_J',
                        key: 'lostAmount5',
                        customRender: this.renderContent,
                        width: 160
                    },
                    {
                        title: '% партнёрства IMAN',
                        scopedSlots: { customRender: 'percent' },
                        dataIndex: 'column_K',
                        key: 'lostAmount6',
                        customRender: this.renderContent,
                        width: 160
                    },
                    {
                        title: 'Идентификатор инвестора',
                        width: 300,
                        align: 'center',
                        key: 'investor_id',
                        dataIndex: 'investor_id'
                    }
                ]
            }
        },
        watch: {
            data () {
              let count = 0
              this.excelData = this.data?.map(element => {
                if (element?.mainRow) {
                    return {
                      name: element.name,
                      type: '',
                      column_A: '',
                      column_B: '',
                      column_C: '',
                      column_D: '',
                      column_E: '',
                      column_F: '',
                      column_G: '',
                      column_H: '',
                      column_I: '',
                      column_J: '',
                      column_K: '',
                      investor_id: '',
                      month_limit: '',
                      is_resident: false,
                      isBold: true,
                      number: null
                  }
                } else {
                  count++
                  return {
                    ...element,
                    number: count
                  }
                }
              })
            }
          },
        mounted () {
          this.getCashInReport()
        },
        methods: {
          Tabcallback (key) {
            console.log(key)
          },
          renderContent (value, row, index) {
            const obj = {
              children: value,
              attrs: {}
            }
            // console.log('CHECK table', index, value, row)
            if (row && row.mainRow) {
              obj.attrs.colSpan = 0
              return obj
            }
            if (typeof value === 'number') {
              obj.children = value || 0
            }
            return obj
          },
          getCashInReport () {
            this.loading = true
            this.$store.dispatch('getCashInReport', { month_id: this.$route.params.id, date: this.$route.params.date }).then((res) => {
                console.log('getCashInReport', res)
                const owners = [
                  {
                    name: 'Полный товарищ',
                    mainRow: true,
                    isBold: true
                  }
                ]
                owners.push(...this.GlobalSorts(res.owners))
              const leftInvestors = [
                {
                  name: 'Вышедшие инвесторы',
                  mainRow: true,
                  isBold: true
                }
              ]
              leftInvestors.push(...this.GlobalSorts(res.left_investors))
              const newInvestors = [
                {
                  name: 'Новые инвесторы',
                  mainRow: true,
                  isBold: true
                }
              ]
              newInvestors.push(...this.GlobalSorts(res.new_investors))
              const investors = [
                {
                  name: 'Текущие инвесторы',
                  mainRow: true,
                  isBold: true
                }
              ]
              investors.push(...this.GlobalSorts(res.investors))
              this.oneTabData = res.owners
              this.totalfull.onelistTotal = this.oneTabData.length
              this.twoTabdata = this.GlobalSorts(res.left_investors)
              this.totalfull.twolistTotal = this.twoTabdata.length
              this.fourData = this.GlobalSorts(res.new_investors)
              this.totalfull.fourlistTotal = this.fourData.length
              this.theeTabdata = this.GlobalSorts(res.investors)
              this.totalfull.theelistTotal = res.investors.length
              this.data = [ ...owners, ...leftInvestors, ...investors, ...newInvestors ]
              this.loading = false
            }).catch(reject => {
                console.log(reject)
            })
            .finally(() => {
                this.loading = false
            })
          },
          GlobalSorts (array) {
            const sortarray = array.sort((a, b) => (a.name.trim() > b.name.trim()) ? 1 : ((b.name.trim() > a.name.trim()) ? -1 : 0))
            return sortarray
          }
        }
    }
</script>

<style lang="less" scoped>

</style>
