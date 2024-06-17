<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="investors"
      :row-key="record => record.id"
      @change="getPagination"
      :pagination="pagination"
      :loading="loading"
      bordered
    >
      <span slot="index" slot-scope="text, column, index">
        {{ (pagination.current - 1) * 10 + index + 1 }}
      </span>
      <span slot="residency" slot-scope="text">
        {{ text ? 'Резидент' : 'Нерезидент' }}
      </span>
      <span slot="fullname" slot-scope="text, row">
        {{ `${row.passport_data && row.passport_data.first_name || ''}  ${row.passport_data && row.passport_data.last_name || ''}` }}
      </span>
      <span slot="birth_day" slot-scope="text">
        {{ text.birth_day | moment($dateTimeFormat) }}
      </span>
      <!-- <span slot="expiry_date" slot-scope="text">
            {{ text.expiry_date | moment('DD/MM/YY HH:mm') }}
            </span> -->
      <span slot="actions" slot-scope="text">

        <delete-btn @confirm="deleteInvestor(text)"/>
        <!-- <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
                <a-button @click="showModal(text)" type="primary" icon="eye" />
            </a-tooltip> -->
      </span>
    </a-table>
  </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'all'
            },
            tab: {
                type: String
            }
        },
        data () {
            return {
                investors: [],
                visible: false,
                loading: false,
                passport_data: {},
                selectedInvestors: null,
                pagination: {
                    current: 1,
                    showQuickJumper: true
                },
                columns: [
                    {
                        title: '№',
                        key: 'index',
                        scopedSlots: { customRender: 'index' }
                    },
                    {
                        title: this.$t('fullname'),
                        key: 'fullname',
                        scopedSlots: { customRender: 'fullname' },
                        customCell: this.onRowClick
                    },
                    {
                        title: this.$t('investors.table.phone_number'),
                        dataIndex: 'phone_number',
                        key: 'phone_number',
                        customCell: this.onRowClick
                    },
                    {
                        title: this.$t('residency'),
                        dataIndex: 'is_resident',
                        scopedSlots: { customRender: 'residency' },
                        customCell: this.onRowClick
                    },
                    {
                        title: this.$t('Status'),
                        scopedSlots: { customRender: 'status' },
                        key: 'status',
                        customCell: this.onRowClick
                    },
                    {
                        title: this.$t('investors.table.actions'),
                        scopedSlots: { customRender: 'actions' },
                        key: 'actions'
                    }
                ]
            }
        },
        methods: {
            onRowClick (record, index) {
                return {
                    on: {
                        click: (event) => {
                            console.log(record, index)
                            this.$router.push({ name: 'invetstors-preview', params: { id: record.id } })
                        }
                    }
                }
            },
            getStatusColor (color) {
                var selected
                switch (color) {
                    case 'new':
                        selected = 'cyan'
                        break
                    case 'in_process':
                        selected = 'green'
                        break
                    case 'current':
                        selected = 'blue'
                        break
                    case 'left':
                        selected = 'red'
                        break
                    default:
                        selected = ''
                }
                return selected
            },

            getPagination (e) {
                this.$router.push({ path: this.$router.fullPath, query: { page: e.current, limit: 10 } })
                const query = {
                    page: e.current,
                    limit: 10,
                    status: this.type === 'all' ? '' : this.type
                }
                this.getInvestors(query)
                this.pagination.current = e.current
            },

            // showModal (text) {
            //   this.selectedInvestors = { ...text }
            //   this.visible = true
            // },
            getInvestors (query) {
                console.log(query)
                this.loading = true
                this.$store.dispatch('getInvestors', query).then(res => {
                    console.log(res)
                    this.investors = res.investors
                    console.log('investors passport', this.investors)
                    const pagination = { ...this.pagination }
                    pagination.total = +res.count
                    this.pagination = pagination
                    this.loading = false
                }).catch(reject => {
                    console.log(reject.response.data)
                    this.$alertMessage('error', 'Произошла ошибка', '', this)
                    this.loading = false
                })
            },
            deleteInvestor (e) {
                console.log(e) // pro/list
                this.$store.dispatch('deleteInvestor', e.id).then(res => {
                console.log(res)
                this.$deleteFromList(this.investors, e.id)
                this.$alertMessage('success', 'Deleted', 'Investor has deleted successfully', this)
                }).catch(reject => {
                    console.log(reject.response.data)
                    if (reject.response.data) {
                        this.$alertMessage('error', 'Произошла ошибка', '', this)
                    }
                })
            }
        },
        created () {
            let query = null
            if (this.$isEmptyObj(this.$route.query)) {
            query = { limit: 10, page: 1, status: this.type === 'all' ? '' : this.type }
                } else query = { limit: parseInt(this.$route.query.limit), page: parseInt(this.$route.query.page) }
                this.getInvestors(query)
        }
    }
</script>

<style lang="less">

</style>
