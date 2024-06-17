<template>
  <div>
    <a-navigation :list="[{ name: $t('Finance'), link: ''}, { name: $t('GL'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <!-- <a-button type="primary" @click="$router.push('/finance/gl/new')" icon="plus" style="float: right">{{ $t('button.create') }}</a-button> -->
    </a-navigation>
    <a-card>
      <a-table
        bordered
        :loading="loading"
        :scroll="{ x: 200 }"
        :pagination="pagination"
        :columns="columns"
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
      <!-- <a-table
        bordered
        :scroll="{ x: 300 }"
        :pagination="pagination"
        :columns="staticColumn"
        :data-source="staticData"
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
      </a-table> -->
    </a-card>
  </div>
</template>

<script>
export default {
 data () {
     return {
       loading: false,
          columns: [
            {
                title: this.$t('Дата создания'),
                dataIndex: 'created_at',
                scopedSlots: { customRender: 'dateTime' },
                key: 'created_at',
                width: 160
            },
            {
                title: this.$t('Дата'),
                dataIndex: 'date_at',
                scopedSlots: { customRender: 'date' },
                key: 'date_at',
                width: 160
            },
            {
                title: this.$t('От счета'),
                dataIndex: 'account_from',
                key: 'account_from',
                width: 160
            },
            {
                title: this.$t('На счет'),
                dataIndex: 'account_to',
                key: 'account_to',
                width: 160
            },
            {
                title: this.$t('Тип операции'),
                dataIndex: 'operation_type',
                scopedSlots: { customRender: 'operation_type' },
                key: 'operation_type',
                width: 160
            },
            {
                title: this.$t('Платежный шлюз'),
                dataIndex: 'payment_gateway',
                key: 'payment_gateway',
                width: 160
            },
            {
                title: this.$t('Дебет'),
                dataIndex: 'debit',
                key: 'debit',
                scopedSlots: { customRender: 'money' },
                width: 160
            },
            {
                title: this.$t('Кредет'),
                dataIndex: 'credit',
                scopedSlots: { customRender: 'money' },
                key: 'credit',
                width: 160
            },
            {
                title: this.$t('Объект'),
                dataIndex: 'object_type',
                key: 'object_type',
                width: 160
            },
            {
                title: this.$t('ID'),
                dataIndex: 'object_id',
                key: 'object_id',
                scopedSlots: { customRender: 'id' },
                width: 160
            },
            {
                title: this.$t('Description'),
                dataIndex: 'description',
                key: 'description',
                width: 300
            }
            // {
            //     title: this.$t('category.table.Actions'),
            //     scopedSlots: { customRender: 'actions' },
            //     key: 'actions',
            //     width: 165
            // }
         ],
          staticColumn: [
            {
              title: '№',
              dataIndex: 'data',
              width: 160
            },
            {
              title: 'Счет Дт',
              dataIndex: 'data1',
              width: 160
            },
            {
              title: 'Субконто Дт',
              dataIndex: 'data2',
              width: 160
            },
            {
              title: 'Количество Дт',
              dataIndex: 'data3',
              width: 160
            },
            {
              title: 'Валюта Дт',
              dataIndex: 'data4',
              width: 160
            },
            {
              title: 'Вал. сумма Дт',
              dataIndex: 'data5',
              width: 160
            },
            {
              title: 'Счет Дт',
              dataIndex: 'data6',
              width: 160
            },
            {
              title: 'Субконто Кт',
              dataIndex: 'data7',
              width: 160
            },
            {
              title: 'Количество Кт',
              dataIndex: 'data8',
              width: 160
            },
            {
              title: 'Валюта Кт',
              dataIndex: 'data9',
              width: 160
            },
            {
              title: 'Вал. сумма Кт',
              dataIndex: 'data10',
              width: 160
            },
            {
              title: 'Сумма',
              dataIndex: 'data11',
              width: 160
            },
            {
              title: 'Содержание',
              dataIndex: 'data12',
              width: 160
            },
            {
              title: 'Номер журнала',
              dataIndex: 'data13',
              width: 160
            }
            // {
            //   title: this.$t('Объект'),
            //   dataIndex: 'object_type',
            //   key: 'object_type',
            //   width: 160
            // },
            // {
            //   title: this.$t('ID'),
            //   dataIndex: 'object_id',
            //   key: 'object_id',
            //   scopedSlots: { customRender: 'id' },
            //   width: 160
            // },
            // {
            //   title: this.$t('Description'),
            //   dataIndex: 'description',
            //   key: 'description',
            //   width: 300
            // }
            // {
            //     title: this.$t('category.table.Actions'),
            //     scopedSlots: { customRender: 'actions' },
            //     key: 'actions',
            //     width: 165
            // }
          ],
         gl: [],
       staticData: [
         {
           data: '1',
           data1: '9220',
           data2: '',
           data3: '',
           data4: '',
           data5: '',
           data6: '0870',
           data7: 'Samsung A505 Black Основной склад',
           data8: '',
           data9: '',
           data10: '1.000',
           data11: '2 438 836.52',
           data12: '',
           data13: 'Списаны ТМЦ'
         },
         {
           data: '2',
           data1: '9220',
           data2: 'BERDIQULOV ZOPIR \n' +
             '№ 977112134 от 21.12.2021',
           data3: '',
           data4: '',
           data5: '',
           data6: '9220',
           data7: '',
           data8: '',
           data9: '',
           data10: '',
           data11: '2 438 836.52 ',
           data12: '',
           data13: 'Выручка от реализации'
         },
         {
           data: '3',
           data1: '9220',
           data2: 'BERDIQULOV ZOPIR \n' +
             '№ 977112134 от 21.12.2021',
           data3: '',
           data4: '',
           data5: '',
           data6: '6410',
           data7: '15%',
           data8: '',
           data9: '',
           data10: '',
           data11: '365 825.54 ',
           data12: '',
           data13: 'Выделен НДС'
         }
       ],
        pagination: {
          current: 1,
          showQuickJumper: true
        }
     }
 },
 methods: {
    onRowClick (record, index) {
        return {
            on: {
                click: (event) => {
                    console.log(record, index)
                    this.$router.push({ name: 'branches-list', params: { id: record.guid } })
                }
            }
        }
    },
    getPagination (e) {
      this.getGL({ page: e.current, limit: 10 })
      this.pagination.current = e.current
    },
    getGL (query) {
      this.loading = true
        this.$store.dispatch('getGL', query).then(res => {
            console.log(res)
            this.gl = res.gl_list
            const pagination = { ...this.pagination }
            pagination.total = res.count
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

<style>

</style>
