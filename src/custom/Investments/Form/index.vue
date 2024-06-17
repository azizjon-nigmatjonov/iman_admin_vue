<template>
  <div>
    <a-navigation :list="[{ name: $t('Список доступных денег'), link: ''}]" :isBack="{ flag: false, link: ''}" />
    <a-card>
      <a-table
        :columns="columns"
        :data-source="sortedPool"
        :row-key="record => record.id"
        bordered
      >
        <span slot="pools.max_installment_amount" slot-scope="text"> {{ text.pools[0].max_installment_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }} </span>
        <span slot="pools.max_installment_amount1" slot-scope="text"> {{ text.pools[1].max_installment_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }} </span>
        <span slot="pools.max_installment_amount2" slot-scope="text"> {{ text.pools[2].max_installment_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }} </span>
        <span slot="pools.max_installment_amount3" slot-scope="text"> {{ text.pools[3].max_installment_amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }} </span>
        <!-- <span slot="custom1" slot-scope="text"> {{ text }} </span> -->
        <span slot="min_investment_amount" slot-scope="text"> {{ $moneyFormat(text.min_investment_amount) }}</span>
        <span slot="min_percent" slot-scope="text"> <strong> {{ text.min_percent }}%  ~ {{ text.max_percent }}%</strong></span>
      </a-table>
    </a-card>
  </div>
</template>

<script>

export default {
 data () {
     return {
         columns: [
             {
             title: this.$t('name of Portfolio'),
             dataIndex: 'title',
             key: 'title',
             customCell: (record, index) => {
            return {
              on: {
                click: (event) => {
                  console.log(record, index)
                   this.$router.push({ name: 'portfolio-investor-list', params: { id: record.guid } })
                }
              }
            }
          }
         },
        //   {
        //      title: this.$t('Custom'),
        //      scopedSlots: { customRender: 'custom1' },
        //      key: 'custom1'
        //  },
        //  {
        //      title: 'Language',
        //      dataIndex: 'lang',
        //      key: 'lang'
        //  },
          {
             title: this.$t('total_balance3'),
             scopedSlots: { customRender: 'pools.max_installment_amount' },
             key: 'pools.max_installment_amount',
             customCell: (record, index) => {
            return {
              on: {
                click: (event) => {
                  console.log(record, index)
                   this.$router.push({ name: 'portfolio-investor-list', params: { id: record.guid } })
                }
              }
            }
          }
         },
         {
             title: this.$t('total_balance6'),
             scopedSlots: { customRender: 'pools.max_installment_amount1' },
             key: 'pools.max_installment_amount1',
             customCell: (record, index) => {
            return {
              on: {
                click: (event) => {
                  console.log(record, index)
                   this.$router.push({ name: 'portfolio-investor-list', params: { id: record.guid } })
                }
              }
            }
          }
         },
         {
             title: this.$t('total_balance9'),
             scopedSlots: { customRender: 'pools.max_installment_amount2' },
             key: 'pools.max_installment_amount2',
             customCell: (record, index) => {
            return {
              on: {
                click: (event) => {
                  console.log(record, index)
                   this.$router.push({ name: 'portfolio-investor-list', params: { id: record.guid } })
                }
              }
            }
          }
         },
         {
             title: this.$t('total_balance12'),
             scopedSlots: { customRender: 'pools.max_installment_amount3' },
             key: 'pools.max_installment_amount3',
             customCell: (record, index) => {
            return {
              on: {
                click: (event) => {
                  console.log(record, index)
                   this.$router.push({ name: 'portfolio-investor-list', params: { id: record.guid } })
                }
              }
            }
          }
         }
         ],
         portfolio_pools: [],
         pool: [],
         sortedPool: []
     }
 },
 methods: {
      test (val) {
      if (val === null) {
        return 0
      } else {
        return val
      }
    },
      compare (a, b) {
        if (a.month < b.month) {
            return -1
        }
        if (a.month > b.month) {
            return 1
        }
        return 0
},
    //   for (let j = 0; j < this.pool; j++) {
    //       if (this.pool[j].month === j * 3 + 3) {
    //        return this.pool[j].max_installment_amount
    //       } else {
    //           return 0
    //       }
    //   }
    //   console.log('pool', this.pool)
    // },
     getInvestmentPools () {
         this.$store.dispatch('getInvestmentPools').then(res => {
             console.log(res)
             this.portfolio_pools = res.portfolio_pools
             for (let i = 0; i < this.portfolio_pools.length; i++) {
             this.pool[i] = { pools: this.portfolio_pools[i].pools, title: this.portfolio_pools[i].title.ru, guid: this.portfolio_pools[i].guid }
            }
            var sortedPool = []
            console.log(this.pool)
            this.pool.forEach((element, index) => {
                    sortedPool[index] = { pools: [], title: element.title, guid: element.guid }
                    var exist3 = false
                    var obj3
                    var exist6 = false
                    var obj6
                    var exist9 = false
                    var obj9
                    var exist12 = false
                    var obj12
                    element.pools.forEach((obj) => {
                        if (obj.month === 3) {
                            exist3 = true
                            obj3 = obj
                        }
                        if (obj.month === 6) {
                            exist6 = true
                            obj6 = obj
                        }
                        if (obj.month === 9) {
                            exist9 = true
                            obj9 = obj
                        }
                        if (obj.month === 12) {
                            exist12 = true
                            obj12 = obj
                        }
                    })
                    exist3 ? sortedPool[index].pools.push(obj3) : sortedPool[index].pools.push({ max_installment_amount: 0 })
                    exist6 ? sortedPool[index].pools.push(obj6) : sortedPool[index].pools.push({ max_installment_amount: 0 })
                    exist9 ? sortedPool[index].pools.push(obj9) : sortedPool[index].pools.push({ max_installment_amount: 0 })
                    exist12 ? sortedPool[index].pools.push(obj12) : sortedPool[index].pools.push({ max_installment_amount: 0 })
            })
            this.sortedPool = sortedPool
            console.log('after if statement', this.sortedPool)
         }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
     }
 },
 created () {
     this.getInvestmentPools()
 }
}
</script>

<style>

</style>
