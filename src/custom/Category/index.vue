<template>
  <div>
    <a-navigation :list="[{ name: $t('Список категорий'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <a-button type="primary" @click="$router.push('/category/list/new')" icon="plus" style="float: right">{{ $t('button.create') }}</a-button>
    </a-navigation>
    <a-card>
      <a-table
        :columns="columns"
        :data-source="categories"
        :row-key="record => record.id"
        :loading="loading"
      >
        <span slot="max_investment_amount" slot-scope="text"> {{ $moneyFormat(text.max_investment_amount) }}</span>
        <span slot="min_investment_amount" slot-scope="text"> {{ $moneyFormat(text.min_investment_amount) }}</span>
        <span slot="min_percent" slot-scope="text"> <strong> {{ text.min_percent }}%  ~ {{ text.max_percent }}%</strong></span>
        <span slot="actions" slot-scope="text" class="span">
          <delete-btn @confirm="deleteCategory(text)"/>
          <!-- <a-popconfirm
            :title="$t('Вы хотите это удалить?')"
            :ok-text="$t('Да')"
            :cancel-text="$t('Нет')"
            @confirm="deleteCategory(text)"
            @cancel="cancel => null"
          >
            <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
              <a-button type="danger" icon="delete" />
            </a-tooltip>
          </a-popconfirm> -->
          <edit-btn @click="$router.push('/category/list/edit/' + text.id)" />
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
            <a-button class="mx-1" @click="$router.push('/category/list/edit/' + text.id)" type="primary" icon="edit" />
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
       loading: false,
         columns: [
             {
             title: this.$t('category.table.name'),
             dataIndex: 'title.ru',
             key: 'title'
         },
        //  {
        //      title: 'Language',
        //      dataIndex: 'lang',
        //      key: 'lang'
        //  },
          {
             title: this.$t('category.table.Min_investment_amount'),
             scopedSlots: { customRender: 'min_investment_amount' },
             key: 'min_investment_amount'
         },
         {
             title: this.$t('category.table.Max_investment_amount'),
             scopedSlots: { customRender: 'max_investment_amount' },
             key: 'max_investment_amount'
         },
          {
             title: this.$t('category.table.Percents'),
             scopedSlots: { customRender: 'min_percent' },
             key: 'min_percent'
         },
        {
             title: this.$t('category.table.Actions'),
             scopedSlots: { customRender: 'actions' },
             key: 'actions',
            width: 150
      }
         ],
         categories: []
     }
 },
 methods: {
     getCategories () {
       this.loading = true
         this.$store.dispatch('getCategories').then(res => {
             console.log(res)
             this.categories = res.categories
         }).catch(er => {
          this.$message.error(er)
        })
        .finally(() => {
          this.loading = false
        })
     },
     deleteCategory (e) {
        this.$store.dispatch('deleteCategory', e.id).then(res => {
            this.$deleteFromList(this.categories, e.id)
            this.$alertMessage('success', 'Deleted', 'Category deleted successfully', this)
          }).catch(er => {
          this.$message.error(er)
          })
     }
 },
 created () {
     this.getCategories()
 }
}
</script>

<style>

</style>
