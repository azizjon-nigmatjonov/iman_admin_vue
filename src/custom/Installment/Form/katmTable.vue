<template>
  <div>
    <a-table
      :row-key="record => record.created_at"
      bordered
      :scroll="{ x: 1500 }"
      :pagination="false"
      :columns="columns"
      :data-source="data">

      <span slot="created_at" slot-scope="text">{{ text.created_at | moment($dateTimeFormat) }} </span>
      <span slot="data.dateBirth" slot-scope="text">{{ text.data.dateBirth | moment($dateFormat) }} </span>
      <span slot="data.dateIssue" slot-scope="text">{{ text.data.dateIssue | moment($dateFormat) }} </span>
      <span slot="data.firstName" slot-scope="text">{{ text.data.firstName + ' ' + text.data.lastName + ' ' + text.data.middleName }} </span>
      <span slot="data.docSeries" slot-scope="text">{{ text.data.docSeries + ' ' + text.data.docNumber }} </span>
      <!-- <span slot="testers" slot-scope="text"><a-tag :color="getStatusName(text.status).color">{{ getStatusName(text.status).text }}</a-tag></span> -->
      <span slot="testers" slot-scope="text"><span :style="`color: white; background: ${getStatusName(text.status).color}; padding: 5px 15px; border-radius: 6px`">{{ getStatusName(text.status).text }}</span></span>
    </a-table>
  </div>
</template>

<script>
export default {
    data () {
        return {
            data: [],
            columns: [
                {
                    title: 'ФИО',
                    scopedSlots: { customRender: 'data.firstName' },
                    key: 'data.firstName'
                },
                {
                    title: 'Дата рождения',
                    scopedSlots: { customRender: 'data.dateBirth' },
                    key: 'data.dateBirth'
                },
                {
                    title: 'Телефонный номер',
                    dataIndex: 'data.phone',
                    key: 'data.phone'
                },
                {
                    title: 'Номер паспорта',
                    scopedSlots: { customRender: 'data.docSeries' },
                    key: 'data.docSeries'
                },
                {
                    title: 'Выданs',
                    dataIndex: 'data.issueBy',
                    key: 'data.issueBy'
                },
                {
                    title: 'Дата выпуска',
                    scopedSlots: { customRender: 'data.dateIssue' },
                    key: 'data.dateIssue'
                },
                {
                    title: 'Дата',
                    scopedSlots: { customRender: 'created_at' },
                    key: 'created_at'
                },
                {
                    title: 'Статус ',
                    scopedSlots: { customRender: 'testers' },
                    key: 'testers',
                    width: '20%'
                }
            ]
        }
    },
    methods: {
        getKatchDetails (id) {
            this.$store.dispatch('getKatchDetails', id).then(res => {
                console.log(res)
                this.data = res.results
            })
        },
        getStatusName (status) {
            let val = {}
            switch (status) {
                case 'claim_registered':
                    val = { text: 'Регистрация кредитной заявки', color: '#1E88E5' }
                    break
                case 'rejected':
                    val = { text: 'Отказ в выдаче кредита', color: '#E53935' }
                    break
                case 'contract_registered':
                    val = { text: 'Регистрация кредита', color: '#FFC107' }
                    break
                case 'contract_schedule_added':
                    val = { text: 'Добавлен графика погашения кредита', color: '#4CAF50' }
                    break

                default:
                    val = { color: '', text: '-' }
                    break
            }
            return val
        }
    },
    created () {
        this.getKatchDetails(this.$route.params.id)
    }
}
</script>

<style>

</style>
