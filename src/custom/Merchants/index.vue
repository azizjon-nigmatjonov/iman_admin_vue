<template>
  <div>
    <a-navigation :list="[{ name: $t('Список продавцов'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <div class="nav-block" >
        <a-input v-model="searchText" @change="filterInput" class="search-input" :placeholder="$t('search')" />
        <a-button type="primary" @click="$router.push('/merchants/list/new')" icon="plus" style="float: right">{{ $t('button.create') }}</a-button>
      </div>
    </a-navigation>
    <a-card>
      <a-table
        bordered
        :columns="columns"
        :data-source="merchants"
        :row-key="record => record.guid"
        :loading="loading"
        :pagination="false"
      >
        <span slot="guid" slot-scope="text"> {{ text }}</span>
        <span slot="created_at" slot-scope="text"> {{ text.created_at | moment($dateFormat) }}</span>
        <span slot="updated_at" slot-scope="text"> {{ text.updated_at | moment($dateFormat) }}</span>
        <span slot="merchant_type" slot-scope="text">{{ $t(text) }}</span>
        <span slot="actions" slot-scope="text" class="span">
          <delete-btn @confirm="deleteMerchantUsers(text)"/>
          <edit-btn @click="$router.push(`/merchants/list/edit/${text.guid}`)" />
        </span>
      </a-table>
      <div v-if="merchants.length > 14" v-observe-visibility="handleScrolledToBottm"></div>
    </a-card>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
 data () {
      this.filterInput = debounce(this.filterInput, 500)
     return {
       searchPhoneNumber: '',
       searchText: '',
       loading: false,
       pagination: {
         current: 0,
         total: 1,
         pageSize: 10
       },
       columns: [
        {
          title: this.$t('Name'),
          dataIndex: 'name',
          key: 'name',
          customCell: this.onRowClick,
          width: 200
        },
        {
          title: this.$t('Phone number'),
          dataIndex: 'phone_number',
          key: 'phone_number',
          customCell: this.onRowClick,
          width: 140
        },
        {
          title: this.$t('email'),
          key: 'email',
          dataIndex: 'email',
          width: 180
        },
        {
          title: this.$t('investment.table.created_at'),
          scopedSlots: { customRender: 'created_at' },
          key: 'created_at',
          customCell: this.onRowClick,
          width: 120
        },
        {
          title: this.$t('tableUpdatedAt'),
          scopedSlots: { customRender: 'updated_at' },
          key: 'updated_at',
          customCell: this.onRowClick,
          width: 120
        },
        {
          title: this.$t('merchant.id'),
          key: 'type_id',
          dataIndex: 'type_id',
          width: 150
        },
        {
          title: this.$t('category.table.Actions'),
          scopedSlots: { customRender: 'actions' },
          key: 'actions',
          width: 105
        }
        ],
        merchants: []
     }
 },
  methods: {
    filterInput () {
      this.pagination.current = 0
      const query = { ...this.$route.query }
      query.name = this.searchText
      const { ...others } = query
      this.$router.push({ path: this.$router.fullPath, query: { ...others } })
      this.getMerchantUsers()
    },
     getMerchantUsers () {
        this.loading = true
        const params = {
          limit: 15,
          offset: this.pagination.current ? this.pagination.current * 15 : 0,
          name: this.$route.query.name ? this.$route.query.name : this.searchText,
          phone_number: this.searchPhoneNumber
        }
        this.$store.dispatch('getMerchantUsers', params).then(res => {
        if (this.pagination.current < 1) {
          this.merchants = res.list ? res.list : []
        } else {
          this.merchants.push(...res.list)
        }
        })
        .finally(() => {
          this.loading = false
        })
     },
     deleteMerchantUsers (e) {
        this.$store.dispatch('deleteMerchantUsers', e.guid).then(res => {
           this.merchants.splice(this.merchants.findIndex(el => el.guid === e.guid), 1)
            this.$message.success('Merchant deleted successfully')
          })
     },
     onRowClick (record, index) {
        return {
            on: {
                click: () => {
                    this.$router.push({ name: 'branches-list', params: { id: record.guid } })
                }
            }
        }
    },
    handleScrolledToBottm (isVisible) {
      if (!isVisible) { return }

      this.pagination.current++
      let query = null
      if (this.$isEmptyObj(this.$route.query)) {
        query = { limit: 15, page: this.pagination.current }
      } else query = this.$route.query
      this.getMerchantUsers(query)
    }
 },
 created () {
    if (this.$route.query.name) {
      this.searchText = this.$route.query.name
    }
    this.getMerchantUsers()
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
