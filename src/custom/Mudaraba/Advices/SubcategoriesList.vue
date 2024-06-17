<template>
  <div>
    <a-navigation
      :list="[{ name: $t('Categories'), link: '/advices/categories' }, { name: $t('Subcategories'), link: '' }]"
      :isBack="{ flag: true, return: true }"
      noBorder
    >
      <div style="float: right" >
        <a-button :loading="saveButtonLoading" @click="saveOrder" v-if="saveButtonVisible" style="margin-right: 10px">{{
          $t('button.saveOrder')
        }}</a-button>
        <a-button type="primary" @click="$router.push(`/advices/categories/${$route.params.categoryId}/subcategories/new`)">{{
          $t('button.create')
        }}</a-button>
      </div>
    </a-navigation>
    <a-card class="no-space-tab">
      <a-card>
        <a-table
          :columns="columns"
          :data-source="subcategories"
          :row-key="record => record.guid"
          size="middle"
          @change="getPagination"
          :pagination="pagination"
          :loading="loading"
          bordered
        >
          <span slot="index" slot-scope="text, column, index">
            {{ (pagination.current - 1) * 10 + index + 1 }}
          </span>
          <span slot="actions" slot-scope="text">
            <arrow-btn :type="'up'" @click="upButtonHandler(text)" />
            <arrow-btn :type="'down'" @click="downButtonHandler(text)" />
            <edit-btn @click="$router.push({ name: 'advices-subcategories-edit', params: { id: text.guid, categoryId: $route.params.categoryId} })" />
            <delete-btn @confirm="deleteSubCategory(text)" />
          </span>
        </a-table>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import arrowBtn from '../../../components/arrowBtn.vue'

export default {
  components: { arrowBtn },
  data () {
    return {
      subcategories: [],
      loading: false,
      saveButtonVisible: false,
      saveButtonLoading: false,
      pagination: {
        current: 1,
        showQuickJumper: true
      },
      columns: [
        {
          title: '№',
          key: 'index',
          width: 70,
          scopedSlots: { customRender: 'index' },
          customCell: this.onRowClick
        },
        {
          title: this.$t('name'),
          key: 'name',
          dataIndex: 'title.ru',
          customCell: this.onRowClick
        },
        {
            title: this.$t('investors.table.actions'),
            scopedSlots: { customRender: 'actions' },
            key: 'actions',
            width: 200,
            fixed: 'right'
        }
      ]
    }
  },
  methods: {
    upButtonHandler (row) {
      const index = this.subcategories.findIndex(el => el.guid === row.guid)
      if (index === 0) return null
      const computedCategories = JSON.parse(JSON.stringify(this.subcategories))
      computedCategories[index] = computedCategories[index - 1]
      computedCategories[index - 1] = row
      this.subcategories = computedCategories
      this.saveButtonVisible = true
    },
    downButtonHandler (row) {
      const index = this.subcategories.findIndex(el => el.guid === row.guid)
      const length = this.subcategories.length
      if (index === length - 1) return null
      const computedCategories = JSON.parse(JSON.stringify(this.subcategories))
      computedCategories[index] = computedCategories[index + 1]
      computedCategories[index + 1] = row
      this.subcategories = computedCategories
       this.saveButtonVisible = true
    },
    saveOrder () {
      const computedData = this.subcategories.map((el, index) => ({
        guid: el.guid,
        position: index
      }))

      this.saveButtonLoading = true
      this.$store.dispatch('updateSubcategoriesOrder', computedData)
        .then(res => {
          this.$alertMessage('success', 'Message', 'Успешно обновлено updated', this)
          this.saveButtonVisible = false
        })
        .finally(() => { this.saveButtonLoading = false })
    },
    onRowClick (record, index) {
      return {
        on: {
          click: event => {
            this.$router.push(`/advices/categories/${this.$route.params.categoryId}/subcategories/${record.guid}/list`)
          }
        }
      }
    },
    getPagination (e) {
      const query = {
        page: e.current,
        limit: 10
      }
      this.pagination.current = e.current
      this.getSubcategories(query)
    },
    getSubcategories (query) {
      this.loading = true
      this.$store
        .dispatch('getAdviceSubcategories', { categoryId: this.$route.params.categoryId, params: query })
        .then(res => {
          // console.log(res)
          this.subcategories = res.categories_list
          const pagination = { ...this.pagination }
          pagination.total = res.count
          this.pagination = pagination
          this.loading = false
        })
        .catch(reject => {
          console.log(reject.response.data)
          this.$alertMessage('error', 'Произошла ошибка', '', this)
          this.loading = false
        })
    },
    deleteSubCategory (e) {
      console.log(e) // pro/list
      this.$store
        .dispatch('deleteAdviceSubcategories', e.guid)
        .then(res => {
          console.log(res)
          this.$alertMessage('success', 'Deleted', 'Deleted successfully', this)
            const query = {
                page: this.pagination.current,
                limit: 10
            }
            this.getSubcategories(query)
        })
        .catch(reject => {
          console.log(reject.response.data)
          if (reject.response.data) {
            this.$alertMessage('error', 'Произошла ошибка', '', this)
          }
        })
    },
    getList () {
        const query = {
            page: this.pagination.current,
            limit: 10
        }
        this.getSubcategories(query)
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style></style>
