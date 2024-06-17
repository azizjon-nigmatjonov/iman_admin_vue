<template>
  <a-card>
    <a-table
      bordered
      :pagination="false"
      :columns="columns"
      :data-source="logs"
      :loading="loading"
    >
      <span slot="user_id" slot-scope="text">
        {{ text.name }}
      </span>
      <span slot="status" slot-scope="text">
        {{ $t(text.status) }}
      </span>
      <span slot="created_at" slot-scope="text">
        {{ $date(text.created_at) | moment('DD.MM.YYYY') }}
      </span>
    </a-table>
  </a-card>
</template>

<script>
    export default {
        data () {
            return {
                logs: [],
                loading: false,
                statusList: [],
                changing: false,
                rules: {
                    comment: { required: true, message: 'Пожалуйста, заполните поле комментарий', trigger: 'change' }
                },
                lastStatus: {
                    status: '',
                    status_id: undefined
                },
                form: {
                    comment: '',
                    status_id: undefined,
                    status: ''
                },
                columns: [
                    {
                        title: this.$t('status'),
                        scopedSlots: { customRender: 'status' },
                        key: 'status'
                    },
                    {
                        title: this.$t('date'),
                        scopedSlots: { customRender: 'created_at' },
                        key: 'created_at'
                    },
                    {
                        title: this.$t('whoChanged'),
                        scopedSlots: { customRender: 'user_id' },
                        key: 'user_id'
                    }
                ]
            }
        },
        created () {
            this.getLogs()
            // this.getStatuses()
        },
        computed: {
        },
        methods: {
            getLogs () {
                this.loading = true
                this.$store.dispatch('getInvestorLogs', { id: this.$route.params.id }).then((res) => {
                    this.logs = res.investor_logs
                    this.logs.forEach(el => el.user_id ? this.getUserById(el, el.user_id) : '')
                }).catch(reject => {
                    console.log(reject)
                })
                .finally(() => {
                    this.loading = false
                })
            },
            getUserById (obj, id) {
                return this.$store.dispatch('getSystemUser', id).then(res => {
                    console.log(res)
                    this.logs = this.logs.map(el => el.user_id === res.id ? { ...el, name: res.name } : el)
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
