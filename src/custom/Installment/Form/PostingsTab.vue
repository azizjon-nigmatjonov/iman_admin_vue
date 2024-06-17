<template>
  <a-card>
    <a-table
      :pagination="false"
      :columns="columns"
      bordered
      :data-source="dataSource">
      <span slot="subconto_debit" slot-scope="text">{{
        text.subconto_debit.title + `${text.subconto_debit.title2 ? '  |  ' : ''}` + text.subconto_debit.title2
      }}</span>
      <span slot="subconto_credit" slot-scope="text">{{
        text.subconto_credit.title + `${text.subconto_credit.title2 ? '  |  ' : ''}` + text.subconto_credit.title2
      }}</span>
    </a-table>
  </a-card>
</template>

<script>
export default {
    data () {
        return {
            dataSource: [],
            columns: [
                {
                    title: this.$t('Аккаунт от'),
                    dataIndex: 'account_from',
                    key: 'account_from'
                },
                {
                    title: this.$t('Аккаунт на'),
                    dataIndex: 'account_to',
                    key: 'account_to'
                },
                {
                    title: this.$t('amount'),
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: this.$t('date'),
                    dataIndex: 'date_at',
                    key: 'date_at'
                },
                {
                    title: this.$t('Субконто Дт'),
                    scopedSlots: { customRender: 'subconto_debit' },
                    key: 'date_34',
                    width: 260
                },
                {
                    title: this.$t('Субконто Кр'),
                    scopedSlots: { customRender: 'subconto_credit' },
                    key: 'subconto_credit',
                    width: 260
                }
            ]
        }
    },
    methods: {
        getData (id) {
            this.$store.dispatch('getPostings', id).then((res) => {
                this.dataSource = res.postings
            })
        }
    },
    created () {
        this.getData(this.$route.params.id)
    }
}
</script>

<style>

</style>
