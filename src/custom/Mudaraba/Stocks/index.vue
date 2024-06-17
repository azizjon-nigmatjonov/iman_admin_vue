<template>
  <div>
    <a-card title="Список акций">
      <template #extra>
        <a-button type="primary" @click="$router.push({ name: 'new-stock-list'})">{{ $t('button.new') }}</a-button>
      </template>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :row-key="record => record.guid"
        size="middle"
        :loading="loading"
        bordered
      >
        <span slot="description" slot-scope="text">
          <div v-html="text.description.ru"></div>
        </span>
        <span slot="actions" slot-scope="text">
          <edit-btn @click="$router.push({ name: 'edit-stock-list', params: { id: text.guid } })"/>
          <delete-btn @confirm="deleteStock(text)" />
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
            columns: [{
                title: this.$t('title'),
                dataIndex: 'name.ru',
                key: 'name',
                width: '20%'
            }, {
                title: this.$t('Описание'),
                scopedSlots: { customRender: 'description' },
                key: 'description',
                width: '50%'
            },
            {
                title: this.$t('table.actions'),
                scopedSlots: { customRender: 'actions' },
                key: 'actions',
                width: '40%'
            }
            ],
            dataSource: []
        }
    },
    methods: {
        deleteStock (text) {
            this.$store.dispatch('deleteStock', text.guid).then(() => {
                this.dataSource = this.dataSource.filter(item => item.guid !== text.guid)
            })
        },
        getStocks () {
            this.$store.dispatch('getStocks').then((res) => {
                console.log(res)
                this.dataSource = res.stock_list
            })
        }
    },
    created () {
        this.getStocks()
    }
}
</script>

<style>

</style>
