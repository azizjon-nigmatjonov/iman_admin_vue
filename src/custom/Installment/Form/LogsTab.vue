<template>
  <a-card>
    <a-table
      bordered
      :pagination="false"
      :columns="columns"
      :data-source="logs"
      :loading="loading"
    >
      <span slot="user" slot-scope="text">
        {{ $t(text.user && text.user.name || '') }}
      </span>
      <span slot="status" slot-scope="text">
        {{ $t(text.status) }}
      </span>
      <span slot="date" slot-scope="text">
        {{ text.created_at | moment($dateFormat) }}
      </span>
    </a-table>
    <a-form-model v-if="rejectSelectVisivle" :model="form" ref="ruleForm">
      <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 20px" class="mb-2">
        <div style="margin-right: 10px">
          {{ $t('changeStatus') }}:
        </div>
        <a-select style="width: 100%; max-width: 300px; margin-right: 10px" v-model="form.status" @change="onStatusChange">
          <a-select-option :value="lastStatus.status">
            {{ $t(lastStatus.status) }}
          </a-select-option>
          <template v-if="statusSelectVisible">
            <a-select-option v-for="item in filteredStatus" :key="item.status_id" :value="item.status" >
              {{ $t(item.status) }}
            </a-select-option>
          </template>
        </a-select>
        <a-button @click="onChangeStatus" type="primary" :loading="changing"> {{ $t('save') }} </a-button>
      </div>
      <a-row type="flex" justify="end">
        <a-col :md="12" :span="24">
          <a-form-model-item ref="comment" :label="$t('commentary')" prop="comment">
            <a-textarea :placeholder="$t('Описание')" v-model="form.comment" :max-length="255"/>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
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
                statusSelectVisible: false,
                rejectSelectVisivle: false,
                rules: {
                    comment: { required: true, message: 'Пожалуйста, заполните поле комментарий', trigger: 'change' }
                },
                lastStatus: {
                    status: 'reject',
                    status_id: 3
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
                        scopedSlots: { customRender: 'date' },
                        key: 'date'
                    },
                    {
                        title: this.$t('whoChanged'),
                        scopedSlots: { customRender: 'user' },
                        key: 'user'
                    },
                    {
                        title: this.$t('commentary'),
                        dataIndex: 'comment',
                        key: 'comment'
                    }
                ]
            }
        },
        mounted () {
            this.getLogs()
            this.getStatuses()
        },
        computed: {
            filteredStatus () {
                return this.statusList.filter(item => item.status === 'done')
            }
        },
        methods: {
            // assignFormValues () {
            //     if (this.statusList.length && this.lastStatus.status) {
            //         const status = this.statusList.find(item => item.status === this.lastStatus.status)
            //         this.form.status = status && status.status
            //         this.form.status_id = status && status.status_id
            //     }
            // },
            onStatusChange (value) {
                console.log('Value', value)
                const stat = this.statusList.find(item => item.status === value)
                this.form.status_id = stat.status_id
            },
            getLogs () {
                this.loading = true
                this.$store.dispatch('getApplicationLogs', this.$route.params.id).then((res) => {
                    const logs = res.logs
                    const length = res.logs?.length
                    this.logs = logs
                    console.log('LOGS ===>', logs)
                    if (logs[length - 1]?.status === 'agreement_accept') {
                        this.statusSelectVisible = true
                    } else this.statusSelectVisible = false

                    if (logs[length - 1]?.status !== 'reject') {
                        this.rejectSelectVisivle = true
                    } else this.rejectSelectVisivle = false

                    // if (res.logs.length) {
                    //     this.lastStatus = res.logs[res.logs.length - 1]
                    //     this.form.status = this.lastStatus.status
                    //     this.assignFormValues()
                    // }
                }).catch(reject => {
                    console.log(reject)
                })
                .finally(() => {
                    this.loading = false
                })
            },
            getStatuses () {
                this.$store.dispatch('getApplicationStatuses', {}).then((res) => {
                    this.statusList = res.statuses
                    // this.assignFormValues()
                }).catch(reject => {
                    console.log(reject)
                })
            },
            onChangeStatus () {
                this.changing = true
                this.$store.dispatch('updateApplicationStatus', { id: this.$route.params.id, data: this.form })
                .then((res) => {
                    this.form.comment = ''
                    this.getLogs()
                }).catch(reject => {
                    console.log(reject)
                })
                .finally(() => {
                    this.changing = false
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
