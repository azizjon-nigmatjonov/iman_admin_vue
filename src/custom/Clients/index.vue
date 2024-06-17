<template>
  <div>
    <a-navigation :list="[{ name: $t('Список Пос агенты'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <!-- <a-button type="primary" @click="$router.push({ name: 'new clients' })" icon="plus" style="float: right">{{ $t('button.create') }}</a-button> -->
    </a-navigation>
    <a-card >
      <a-table
        :columns="columns"
        :data-source="pos_agents"
        :row-key="record => record.guid"
        @change="getPagination"
        :pagination="pagination"
        :loading="loading"
        :customRow="onRowClick"
      >
        <span slot="created_at" slot-scope="text"> {{ text.created_at | moment($dateFormat) }}</span>
        <span slot="min_investment_amount" slot-scope="text"> {{ $moneyFormat(text.min_investment_amount) }}</span>
        <span slot="min_percent" slot-scope="text"> <strong> {{ text.min_percent }}%  ~ {{ text.max_percent }}%</strong></span>
        <span slot="actions" slot-scope="text" class="span">
          <!-- <delete-btn @confirm="deletePosAgents(text)"/> -->
          <!-- <a-popconfirm
            title="Вы хотите это удалить?"
            ok-text="Да"
            cancel-text="Нет"
            @confirm="deletePosAgents(text)"
            @cancel="cancel => null"
          >
            <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
              <a-button type="danger" icon="delete" />
            </a-tooltip>
          </a-popconfirm> -->
          <edit-btn @click="$router.push('/clients/list/' + text.guid)" />
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
            <a-button class="mx-1" @click="$router.push('/posAgents/list/edit/' + text.guid)" type="primary" icon="edit" />
          </a-tooltip> -->
        </span>
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
             title: this.$t('created_at'),
             scopedSlots: { customRender: 'created_at' },
             key: 'created_at'
          //    customCell: (record, index) => {
          //     return {
          //       on: {
          //         click: (event) => {
          //           console.log(record, index)
          //           this.$router.push({ name: 'posAgent - accountList', params: { id: record.guid } })
          //         }
          //       }
          //     }
          // }
         },
             {
             title: this.$t('First_name'),
             dataIndex: 'passport.first_name',
             key: 'first_name'
          //    customCell: (record, index) => {
          //     return {
          //       on: {
          //         click: (event) => {
          //           console.log(record, index)
          //           this.$router.push({ name: 'posAgent - accountList', params: { id: record.guid } })
          //         }
          //       }
          //     }
          // }
         },

        //  {
        //      title: 'Language',
        //      dataIndex: 'lang',
        //      key: 'lang'
        //  },
          {
             title: this.$t('Last_name'),
             dataIndex: 'passport.last_name',
             key: 'last_name'
          //    customCell: (record, index) => {
          //     return {
          //       on: {
          //         click: (event) => {
          //           console.log(record, index)
          //           this.$router.push({ name: 'posAgent - accountList', params: { id: record.guid } })
          //         }
          //       }
          //     }
          // }
         },
          {
            title: this.$t('phone'),
            key: 'actions',
            dataIndex: 'personal_info.phone_number'
          }
            // {
            //     title: this.$t('category.table.Actions'),
            //     scopedSlots: { customRender: 'actions' },
            //     key: 'actions',
            //     width: 150
            // }
         ],
         pos_agents: [],
         pagination: {
            current: 1,
            showQuickJumper: true
         },
         loading: false
     }
 },
  watch: {
    '$route.query': {
      handler () {
        let query = null
        if (this.$isEmptyObj(this.$route.query)) {
          query = { limit: 10, page: 1 }
        } else {
          query = this.$route.query
          this.pagination.current = parseInt(this.$route.query.page)
        }
        this.getPosAgents(query)
      }
    }
  },
 methods: {
    onRowClick (record, index) {
        return {
            on: {
                click: (e) => {
                    // console.log('FOrmat', `/closed-months/preview/${record.guid}/${newMoment(record.period).format('YYYY-MM-DD')}`)
                    this.$router.push(`/clients/list/${record.guid}`)
                }
            }
        }
    },
    getPagination (e) {
      this.$router.push({ path: this.$router.fullPath, query: { ...this.$route.query, page: e.current, limit: 10 } })
      this.pagination.current = e.current
    },
     getPosAgents (query) {
       this.loading = true
         this.$store.dispatch('getClients', query)
         .then(res => {
             console.log(res)
             this.pos_agents = res.customers
            const pagination = { ...this.pagination }
            pagination.total = res.count
            this.pagination = pagination
         })
         .catch(reject => {
          console.log(reject.response.data)
          this.$alertMessage('error', 'Произошла ошибка', '', this)
        })
        .finally(() => {
          this.loading = false
        })
     },
     deletePosAgents (e) {
        this.$store.dispatch('deletePosAgents', e.guid).then(res => {
          console.log(e.guid)
          this.pos_agents.splice(this.pos_agents.findIndex(el => el.first_name === e.first_name), 1)
            // this.$deleteFromList(this.pos_agents, e.guid)
            this.$message.success(' Pos agent deleted successfully')
          }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
     }
 },
 created () {
   let query = null
    if (this.$isEmptyObj(this.$route.query)) {
      query = { limit: 10, page: 1 }
    } else {
      query = this.$route.query
      this.pagination.current = parseInt(this.$route.query.page)
    }
    this.getPosAgents(query)
 }
}
</script>

<style>

</style>
