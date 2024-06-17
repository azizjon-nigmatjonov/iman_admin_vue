<template>
  <div>
    <a-navigation :list="[{ name: $t('Список продавцов'), link: '/merchants/list'}, { name: $t('Разделы продавца'), link: ''}]" :isBack="{ flag: true, link: '/merchants/list' }" />
    <a-card>
      <a-tabs type="card" @change="callback">
        <a-tab-pane key="1" :tab="$t('Список филиал')">
          <a-row type="flex" justify="end" class="mb-2">
            <a-col span="auto">
              <a-button
                type="primary"
                @click="$router.push({ name: 'new-branch', params: { id: $route.params.id } })"
              >{{ $t('button.create') }}</a-button
              >
            </a-col>
          </a-row>
          <a-table
            bordered
            :columns="columns"
            :data-source="merchant_branches"
            :loading="loading"
            :row-key="record => record.guid"
            :pagination="false"
          >
            <span slot="created_at" slot-scope="text"> {{ text.created_at | moment($dateFormat) }}</span>
            <span slot="updated_at" slot-scope="text"> {{ text.updated_at | moment($dateFormat) }}</span>
            <span slot="actions" slot-scope="text" class="span">
              <delete-btn @confirm="() => {}" />
              <edit-btn @click="$router.push(`/branches/list/${$route.params.id}/edit/${text.guid}`)" />
            </span>
          </a-table>
          <div v-if="merchant_branches.length > 14" v-observe-visibility="handleScrolledToBottm"></div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Список пос агенты">
          <pos-agent-list />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Счёт фактура">
          <productsList />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import productsList from '../Merchants/Product/productsList.vue'
import PosAgentList from '../Merchants/posAgent/posAgentList.vue'
export default {
  data () {
    return {
      columns: [
        {
          title: this.$t('branchId'),
          dataIndex: 'guid',
          key: 'guid'
        },
        {
          title: this.$t('created_at'),
          scopedSlots: { customRender: 'created_at' },
          key: 'created_at',
          customCell: this.onRowClick
        },
        {
          title: this.$t('Name'),
          dataIndex: 'name',
          key: 'name',
          customCell: this.onRowClick
        },
        {
          title: this.$t('Phone number'),
          dataIndex: 'phone_number',
          key: 'phone_number',
          customCell: this.onRowClick
        },
        {
          title: this.$t('updated_at'),
          scopedSlots: { customRender: 'updated_at' },
          key: 'updated_at',
          customCell: this.onRowClick
        },
        {
          title: this.$t('category.table.Actions'),
          scopedSlots: { customRender: 'actions' },
          key: 'actions',
          width: 140
        }
      ],
      merchant_branches: [],
      loading: false,
      pagination: {
        current: 0,
        limit: 15
      }
    }
  },
  components: {
    productsList,
    PosAgentList
  },
  methods: {
    callback () {},
    getBranchByMerchant () {
      this.loading = true
      const data = {
        offset: this.pagination.current,
        limit: this.pagination.limit
      }
      this.$store.dispatch('getBranchByMerchant', { params: data, id: this.$route.params.id })
      .then(res => {
        this.merchant_branches = res.list
      })
      .catch(er => {
        this.$message.error(er.response.data.message)
      })
      .finally(() => {
        this.loading = false
      })
    },
    deleteBranch (e) {
      this.$store
        .dispatch('deleteBranch', { merchant_id: this.$route.params.id, branch_id: e.guid })
        .then(res => {
          this.merchant_branches.splice(
            this.merchant_branches.findIndex(el => el.guid === e.guid),
            1
          )
          this.$message.success('Бренч успешно удалена')
        })
        .catch(er => {
          this.$message.error(er.response.data.message)
        })
    },
    onRowClick (record, index) {
        return {
            on: {
                click: (event) => {
                    this.$router.push(`/branches/list/${this.$route.params.id}/edit/${record.guid}`)
                }
            }
        }
    },
    handleScrolledToBottm (isVisible) {
      if (!isVisible) { return }
      this.pagination.current++
      this.getBranchByMerchant()
    }
  },
  created () {
    this.getBranchByMerchant()
  }
}
</script>

<style></style>
