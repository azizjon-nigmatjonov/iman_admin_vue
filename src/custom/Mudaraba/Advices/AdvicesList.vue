<template>
  <div>
    <a-navigation
      :list="[
        { name: $t('Subcategories'), link: `/advices/categories/${$route.params.categoryId}/subcategories` },
        { name: $t('Advices'), link: '' },
      ]"
      :isBack="{ flag: true, return: true }"
      noBorder
    >
      <div style="float: right">
        <a-button :loading="saveButtonLoading" @click="saveOrder" v-if="saveButtonVisible" style="margin-right: 10px">{{
          $t('button.saveOrder')
        }}</a-button>
        <a-button
          type="primary"
          @click="
            $router.push({
              name: 'advices-create',
              params: { categoryId: $route.params.categoryId, subcategoryId: $route.params.subcategoryId },
            })
          "
        >{{ $t('button.create') }}</a-button
        >
      </div>
    </a-navigation>
    <a-card class="no-space-tab">
      <a-card>
        <a-table
          :columns="columns"
          :data-source="advices"
          :row-key="(record) => record.guid"
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
            <edit-btn
              @click="
                $router.push({
                  name: 'advices-edit',
                  params: {
                    id: text.guid,
                    categoryId: $route.params.categoryId,
                    subcategoryId: $route.params.subcategoryId,
                  },
                })
              "
            />
            <delete-btn @confirm="deleteAdvice(text)" />
          </span>
          <span slot="status" slot-scope="text">
            <a-switch @change="updateIsActualProp($event, text)" v-model="text.is_actual"></a-switch>
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
      advices: [],
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
          scopedSlots: { customRender: 'index' }
        },
        {
          title: this.$t('name'),
          key: 'name',
          dataIndex: 'title.ru'
        },
        {
          title: this.$t('investors.table.actions'),
          scopedSlots: { customRender: 'actions' },
          key: 'actions',
          width: 200,
          fixed: 'right'
        },
        {
          title: this.$t('status'),
          scopedSlots: { customRender: 'status' },
          key: 'status',
          width: 80,
          fixed: 'right'
        }
      ]
    }
  },
  methods: {
    updateIsActualProp (event, text) {
      console.log(event, text)
        this.$store.dispatch('updateActualAdviceProp', {
           data: [
              {
                is_actual: event,
                guid: text.guid
              }
           ]
        }).then(res => {
          console.log('ACTUAL', res)
          this.$alertMessage('success', 'Статус успешно обновлен', 'Он не удаляется. Был изменен статус актуальности', this)
          this.actualAdvices = this.actualAdvices.filter(item => item.guid !== text.guid)
        }).catch(er => {
          console.log(er)
          this.$alertMessage('danger', 'Error', JSON.stringify(er), this)
        })
    },
    upButtonHandler (row) {
      const index = this.advices.findIndex((el) => el.guid === row.guid)
      if (index === 0) return null
      const computedCategories = JSON.parse(JSON.stringify(this.advices))
      computedCategories[index] = computedCategories[index - 1]
      computedCategories[index - 1] = row
      this.advices = computedCategories
      this.saveButtonVisible = true
    },
    downButtonHandler (row) {
      const index = this.advices.findIndex((el) => el.guid === row.guid)
      const length = this.advices.length
      if (index === length - 1) return null
      const computedCategories = JSON.parse(JSON.stringify(this.advices))
      computedCategories[index] = computedCategories[index + 1]
      computedCategories[index + 1] = row
      this.advices = computedCategories
      this.saveButtonVisible = true
    },
    saveOrder () {
      const computedData = this.advices.map((el, index) => ({
        guid: el.guid,
        position: index
      }))

      this.saveButtonLoading = true
      this.$store
        .dispatch('updateAdvicesOrder', computedData)
        .then((res) => {
          this.$alertMessage('success', 'Message', 'Успешно обновлено updated', this)
          this.saveButtonVisible = false
        })
        .finally(() => {
          this.saveButtonLoading = false
        })
    },
    getPagination (e) {
      const query = {
        page: e.current,
        limit: 10
      }
      this.pagination.current = e.current
      this.getSubcategories(query)
    },
    getAdvices (query) {
      this.loading = true
      this.$store
        .dispatch('getAdvicesList', { subcategoryId: this.$route.params.subcategoryId, params: query })
        .then((res) => {
          this.advices = res.advices_list
          const pagination = { ...this.pagination }
          pagination.total = res.count
          this.pagination = pagination
          this.loading = false
        })
        .catch((reject) => {
          console.log(reject.response.data)
          this.$alertMessage('error', 'Произошла ошибка', '', this)
          this.loading = false
        })
    },
    deleteAdvice (e) {
      console.log(e) // pro/list
      this.$store
        .dispatch('deleteAdvice', e.guid)
        .then((res) => {
          console.log(res)
          this.$alertMessage('success', 'Deleted', 'Advice has deleted successfully', this)
          const query = {
            page: this.pagination.current,
            limit: 10
          }
          // this.getStories(query)
          this.getAdvices(query)
        })
        .catch((reject) => {
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
      this.getAdvices(query)
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style></style>
