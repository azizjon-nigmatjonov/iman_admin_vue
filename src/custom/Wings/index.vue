<template>
  <div>
    <a-navigation :list="[{ name: $t('Wings'), link: ''}, { name: $t('Inquiries'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <!-- <a-button type="primary" @click="$router.push('/wings/list/new')" icon="plus" style="float: right">{{ $t('button.create') }}</a-button> -->
    </a-navigation>
    <a-card>
      <a-table
        bordered
        :columns="columns"
        :data-source="wingsList"
        :row-key="record => record.guid"
        :pagination="pagination"
        @change="getPagination"
        :loading="loading"
      >
        <span slot="fullname" slot-scope="text, row"> {{ row.first_name }} {{ row.last_name }}</span>
        <span slot="created_at" slot-scope="text"> {{ text.created_at | moment($dateFormat) }}</span>
        <span slot="actions" slot-scope="text" class="span">
          <delete-btn @confirm="deleteMerchantUsers(text)"/>
          <edit-btn @click="$router.push({ name: 'edit-merchant', params: { id: text.guid} })" />
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
export default {
 data () {
     return {
         loading: false,
         pagination: {
             current: 1,
            showQuickJumper: true
         },
         columns: [
            {
                title: this.$t('ID'),
                dataIndex: 'id',
                key: 'id',
                customCell: this.onRowClick
            },
            {
                title: this.$t('Ф. И.'),
                key: 'fullname',
                scopedSlots: { customRender: 'fullname' },
                customCell: this.onRowClick
            },
            {
                title: this.$t('Пос агент'),
                dataIndex: 'pos_agent_name',
                key: 'pos_agent_name',
                customCell: this.onRowClick
            }
         ],
         wingsList: []
     }
 },
 mounted () {
     this.getWingsList({ page: this.pagination.current })
 },
 methods: {
     getPagination (e) {
         this.pagination.current = e.current
         this.getWingsList({ page: e.current })
     },
    onRowClick (record, index) {
        return {
            on: {
                click: (event) => {
                    console.log(record, index)
                    this.$router.push({ name: 'wings-inquiries-update', params: { id: record.claim_id } })
                }
            }
        }
    },
     getWingsList (query) {
         this.loading = true
         this.$store.dispatch('getWingsList', query).then(res => {
             console.log(res)
             this.wingsList = res.wings_requests
             const pagination = { ...this.pagination }
             pagination.total = +res.count
             this.pagination = pagination
         })
         .finally(() => {
            this.loading = false
         })
     }
 }
}
</script>

<style>

</style>
