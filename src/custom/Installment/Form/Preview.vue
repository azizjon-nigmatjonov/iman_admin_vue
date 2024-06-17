<template>
  <div>
    <a-card size="small" class="mb-1">
      <a-breadcrumb>
        <a-breadcrumb-item><a-button @click="$router.go(-1)" icon="left" size="small" type="link">{{ $t('Назад') }}</a-button></a-breadcrumb-item>
      </a-breadcrumb>
    </a-card>
    <!-- <a-navigation :list="[{ name: 'список продуктов', link: ''}]" :isBack="{ flag: true, link: `/scoring/list/${$route.params.id}`}" /> -->
    <a-card>
      <!-- <a-row type="flex" justify="end" class="mb-2">
        <a-col span="auto">
          <a-button type="primary" @click="$router.push('/category/list/new')">{{ $t('button.create') }}</a-button>
        </a-col>
      </a-row> -->
      <a-table
        :columns="columns"
        :data-source="products"
        :row-key="record => record.id"
        :loading="loading"
        bordered
      >
        <span slot="index" slot-scope="text, item, index">
          {{ length > 1 ? (( index + 1 ) === length ? $t('overall') : index + 1) : index + 1 }}
        </span>
        <span slot="max_investment_amount" slot-scope="text"> {{ $moneyFormat(text.max_investment_amount) }}</span>
        <span slot="min_investment_amount" slot-scope="text"> {{ $moneyFormat(text.min_investment_amount) }}</span>
        <span slot="min_percent" slot-scope="text"> <strong> {{ text.min_percent }}%  ~ {{ text.max_percent }}%</strong></span>
        <span slot="discounted_price" slot-scope="text"> {{ text.discounted_price ? Number(text.discounted_price).toFixed(2) : '' }}</span>
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
            title: '№',
            scopedSlots: { customRender: 'index' },
            key: 'index'
          },
          {
            title: this.$t('product_name'),
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: this.$t('model'),
            dataIndex: 'model',
            key: 'model'
          },
          // {
          //   title: this.$t('category'),
          //   dataIndex: 'category.data.name_ru',
          //   key: 'category'
          // },
          {
            title: this.$t('count'),
            dataIndex: 'count',
            key: 'count'
          },
          {
            title: this.$t('cost_with_nds'),
            dataIndex: 'price',
            key: 'price'
          },
          {
            title: this.$t('overall_price_with_nds'),
            dataIndex: 'overall_price',
            key: 'overall_price'
          },
          {
            title: this.$t('measurementUnit'),
            dataIndex: 'measurement_unit',
            key: 'measurement_unit'
          },
          {
            title: this.$t('price_without_nds'),
            dataIndex: 'price_without_nds',
            key: 'price_without_nds'
          },
          {
            title: this.$t('nds_price'),
            dataIndex: 'price_nds',
            key: 'price_nds'
          },
           {
            title: this.$t('discounted_price'),
             scopedSlots: { customRender: 'discounted_price' },
            key: 'discounted_price'
          }
          // {
          //   title: this.$t('price_with_nds'),
          //   dataIndex: 'price_with_nds',
          //   key: 'price_with_nds'
          // }
         ],
         products: [],
         length: undefined
     }
 },
 methods: {
      getSingleScoring (guid) {
        this.loading = true
      this.$store.dispatch('getSingleScoringNew', this.$route.params.id).then(res => {
          this.products = res.products
          if (res.products.length > 1) {
            this.products.push({
              name: '',
              model: '',
              category: '',
              price: '',
              count: res.all_products_count,
              'overall_price': res.all_products_price,
              'price_without_nds': res.all_products_price_without_nds,
              'price_with_nds': res.all_products_price_with_nds,
              'price_nds': res.all_products_price_nds
            })
          }
          this.length = this.products.length
          console.log(this.products)
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
      .finally(() => {
        this.loading = false
      })
      }
 },
 created () {
     this.getSingleScoring(this.$route.params.id)
 }
}
</script>

<style>

</style>
