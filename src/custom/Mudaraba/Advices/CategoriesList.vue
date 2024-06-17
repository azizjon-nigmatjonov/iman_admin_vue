<template>
  <div>
    <a-navigation
      v-if="false"
      :list="[{ name: $t('Categories'), link: '' }]"
      :isBack="{ flag: false, link: '/advices/categories' }"
      noBorder
    >
      <div style="float: right" >
        <a-button :loading="saveButtonLoading" @click="saveOrder" v-if="saveButtonVisible" style="margin-right: 10px">{{
          $t('button.saveOrder')
        }}</a-button>
        <a-button type="primary" @click="$router.push('/advices/categories/new')">{{
          $t('button.create')
        }}</a-button>
      </div>
    </a-navigation>
    <a-row type="flex" justify="end">
      <a-col span="auto">
        <a-button :loading="saveButtonLoading" @click="saveOrder" v-if="saveButtonVisible" style="margin-right: 10px">{{
          $t('button.saveOrder')
        }}</a-button>
        <a-button type="primary" @click="$router.push('/advices/categories/new')">{{
          $t('button.create')
        }}</a-button>
      </a-col>
    </a-row>
    <a-tabs v-model="tabCurrent">
      <a-tab-pane :tab="$t('Categories')" :key="1">
        <a-card class="no-space-tab">
          <a-card>
            <a-table
              :columns="columns"
              :data-source="categories"
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
                <edit-btn @click="$router.push({ name: 'advices-categories-edit', params: { id: text.guid} })" />
                <delete-btn @confirm="deleteCategory(text)" />
              </span>
            </a-table>
          </a-card>
        </a-card>
      </a-tab-pane>
      <a-tab-pane :tab="$t('Актуальные советы')" :key="34435">
        <ActualAdvices />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import arrowBtn from '../../../components/arrowBtn.vue'
import ActualAdvices from './ActualAdvices.vue'

export default {
  components: { arrowBtn, ActualAdvices },
  data () {
    return {
      categories: [],
      tabCurrent: 1,
      saveButtonVisible: false,
      saveButtonLoading: false,
      loading: false,
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
      const index = this.categories.findIndex(el => el.guid === row.guid)
      if (index === 0) return null
      const computedCategories = JSON.parse(JSON.stringify(this.categories))
      computedCategories[index] = computedCategories[index - 1]
      computedCategories[index - 1] = row
      this.categories = computedCategories
      this.saveButtonVisible = true
    },
    downButtonHandler (row) {
      const index = this.categories.findIndex(el => el.guid === row.guid)
      const length = this.categories.length
      if (index === length - 1) return null
      const computedCategories = JSON.parse(JSON.stringify(this.categories))
      computedCategories[index] = computedCategories[index + 1]
      computedCategories[index + 1] = row
      this.categories = computedCategories
       this.saveButtonVisible = true
    },
    saveOrder () {
      const computedData = this.categories.map((el, index) => ({
        guid: el.guid,
        position: index
      }))

      this.saveButtonLoading = true
      this.$store.dispatch('updateCategoriesOrder', computedData)
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
            this.$router.push(`/advices/categories/${record.guid}/subcategories`)
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
      this.getCategories(query)
    },
    getCategories (query) {
      this.loading = true
      this.$store
        .dispatch('getAdviceCategories', query)
        .then(res => {
          // console.log(res)
          this.categories = res.categories_list
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
    deleteCategory (e) {
      console.log(e) // pro/list
      this.$store
        .dispatch('deleteAdviceCategory', e.guid)
        .then(res => {
          console.log(res)
          this.$alertMessage('success', 'Deleted', 'Investor has deleted successfully', this)
            const query = {
                page: this.pagination.current,
                limit: 10
            }
            this.getCategories(query)
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
        this.getCategories(query)
    }
  },
  created () {
    this.getList()
  },
  watch: {
    categories (val) {
      console.log('VAL ===>', val)
    }
  }
}
</script>

<style>
</style>
