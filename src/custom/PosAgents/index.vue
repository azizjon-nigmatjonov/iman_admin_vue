<template>
  <div>
    <a-navigation :list="[{ name: $t('Список Пос агенты'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <div class="nav-block" >
        <a-input v-model="seachText" class="search-input" :placeholder="$t('search')" />
        <a-button type="primary" @click="$router.push('/posAgents/list/new')" icon="plus" style="float: right">{{ $t('button.create') }}</a-button>
      </div>
    </a-navigation>
    <a-card >
      <a-table
        :columns="columns"
        :data-source="pos_agents"
        :row-key="record => record.guid"
        @change="getPagination"
        :pagination="pagination"
        :loading="loading"
      >
        <span slot="created_at" slot-scope="text"> {{ text.created_at | moment($dateFormat) }}</span>
        <span slot="min_investment_amount" slot-scope="text"> {{ $moneyFormat(text.min_investment_amount) }}</span>
        <span slot="min_percent" slot-scope="text"> <strong> {{ text.min_percent }}%  ~ {{ text.max_percent }}%</strong></span>
        <span slot="actions" slot-scope="text" class="span">
          <delete-btn @confirm="deletePosAgents(text)"/>
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
          <edit-btn @click="$router.push('/posAgents/list/edit/' + text.guid)" />
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
            <a-button class="mx-1" @click="$router.push('/posAgents/list/edit/' + text.guid)" type="primary" icon="edit" />
          </a-tooltip> -->
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
 data () {
     return {
        seachText: '',
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
             dataIndex: 'first_name',
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
             dataIndex: 'last_name',
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
             title: this.$t('category.table.Actions'),
             scopedSlots: { customRender: 'actions' },
             key: 'actions',
            width: 150
      }
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
   seachText () {
    this.searchPosAgents()
   }
 },
 methods: {
    searchPosAgents: debounce(function (string) {
        this.pagination.current = 1
        this.getPosAgents()
    }, 300),
    getPagination (e) {
      this.pagination.current = e.current
      this.getPosAgents()
    },
     getPosAgents () {
       this.loading = true
         this.$store.dispatch('getPosAgents', { page: this.pagination.current, limit: 10, search: this.seachText })
         .then(res => {
             console.log(res)
             this.pos_agents = res.pos_agents
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
     this.getPosAgents()
 }
}
</script>

<style scoped>
  .nav-block {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .search-input {
    width: 300px;
    margin-right: 20px;
  }
</style> >

</style>
