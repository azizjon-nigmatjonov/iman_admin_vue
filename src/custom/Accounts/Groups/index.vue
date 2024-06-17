<template>
  <div>
    <a-navigation :list="[{ name: $t('Accounts'), link: ''}, { name: $t('accountGroups'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <!-- <a-button type="primary" @click="$router.push(`/accounts/groups/new`)" icon="plus" style="float: right">{{ $t('button.create') }}</a-button> -->
    </a-navigation>
    <a-card>
      <a-table
        bordered
        :columns="columns"
        :pagination="accountGroupsPagination"
        :data-source="account_groups"
        :loading="loading"
        @change="getAccountGroups"
        :row-key="record => record.guid"
      >
        <span slot="created_at" slot-scope="text"> {{ text.created_at | moment($dateFormat) }}</span>
        <span slot="actions" slot-scope="text" class="span">
          <delete-btn @confirm="deleteMerchantUsers(text)"/>
          <!-- <a-popconfirm
            :title="$t('Вы хотите это удалить?')"
            :ok-text="$t('Да')"
            :cancel-text="$t('Нет')"
            @confirm="deleteMerchantUsers(text)"
            @cancel="cancel => null"
          >
            <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
              <a-button type="danger" icon="delete" />
            </a-tooltip>
          </a-popconfirm> -->
          <edit-btn @click="$router.push({ name: 'edit-merchant', params: { id: text.guid} })" />
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
            <a-button class="mx-1" @click="$router.push({ name: 'edit-merchant', params: { id: text.guid} })" type="primary" icon="edit" />
          </a-tooltip> -->
          <!-- <a-tooltip placement="bottomLeft" :title="$t('transactions')">
            <a-button @click="$router.push({ name: 'transactions-merchant', params: { id: text.guid } })" type="primary" icon="transaction" />
          </a-tooltip> -->
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
 data () {
     return {
       loading: false,
         columns: [
            {
                title: this.$t('created_at'),
                scopedSlots: { customRender: 'created_at' },
                key: 'created_at',
                customCell: this.onRowClick
            },
        //  {
        //      title: 'Language',
        //      dataIndex: 'lang',
        //      key: 'lang'
        //  },
            {
                title: this.$t('Name'),
                dataIndex: 'name',
                key: 'name',
                customCell: this.onRowClick
            },
            {
                title: this.$t('Description'),
                dataIndex: 'description',
                key: 'description',
                customCell: this.onRowClick
            }
            // {
            //     title: this.$t('category.table.Actions'),
            //     scopedSlots: { customRender: 'actions' },
            //     key: 'actions',
            //     width: 165
            // }
         ],
         account_groups: []
     }
 },
 computed: {
   ...mapGetters(['accountGroupsPagination'])
 },
 methods: {
    onRowClick (record, index) {
        return {
            on: {
                click: (event) => {
                    console.log(record, index)
                    // this.$router.push({ name: 'branches-list', params: { id: record.guid } })
                }
            }
        }
    },
     getAccountGroups (query) {
       this.loading = true
        const params = {
          pagination: query
        }
         this.$store.dispatch('getAccountGroups', params).then(res => {
             console.log(res)
             this.account_groups = res.account_groups
         })
         .finally(() => {
           this.loading = false
         })
     },
     deleteMerchantUsers (e) {
        this.$store.dispatch('deleteMerchantUsers', e.guid).then(res => {
           this.account_groups.splice(this.account_groups.findIndex(el => el.guid === e.guid), 1)
            // this.$deleteFromList(this.account_groups, e.guid)
            console.log(e.guid)
            this.$message.success('Merchant deleted successfully')
          })
     }
 },
 mounted () {
//    let query = null
//   if (this.$isEmptyObj(this.$route.query)) {
//   query = { limit: 10, page: 1 }
//     } else query = this.$route.query
    const query = {
        current: 1,
        pageSize: 10
    }
     this.getAccountGroups(query)
 }
}
</script>

<style>

</style>
