<template>
  <div>
    <a-navigation :list="[{ name: $t('Список продуктов'), link: ''}]" :isBack="{ flag: true, link: `/merchants/list/${$route.query.parent_id}/transactions`}" />
    <a-card>
      <a-table
        :columns="columns"
        :data-source="bond.products"
        :row-key="record => record.id"
      >
        <span slot="index" slot-scope=""> {{ this.bond.created_at | moment($dateFormat) }}</span>
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
      <!-- <template>
        <div class="buttons">
          <a-button style="background: red; color: white; border: none" key="back" @click="rejectScore(installment)">
            Отклонять
          </a-button>
          <a-button v-if="installment.scoring_status == 'passed'" key="submit" type="primary" @click="acceptScore(installment)" class="mx"> Принять </a-button>
          <a-button v-else-if="installment.scoring_status !== 'passed' && installment.status !== 'reject'" key="submit2" type="primary" @click="startScoring(installment)" class="mx"> Начать подсчет очков </a-button>
        </div>
      </template> -->
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
         columns: [
              {
             title: this.$t('date'),
             scopedSlots: { customRender: 'index' },
             key: 'index'
         },
             {
             title: this.$t('Name_of_product'),
             dataIndex: 'name',
             key: 'name'
         },
        //  {
        //      title: 'Language',
        //      dataIndex: 'lang',
        //      key: 'lang'
        //  },
          {
             title: this.$t('Price'),
             dataIndex: 'price',
             key: 'price'
         }
         ],
    bond: {},
    bonds1: [],
    transactions: []
    }
  },
  methods: {
    getStatusColor (color) {
      var selected
      switch (color) {
        case 'pending':
          selected = 'orange'
          break
        case 'done':
          selected = 'green'
          break
        default:
          selected = ''
      }
      return selected
    },
   getBond (id) {
     this.$store.dispatch('getBond', this.$route.params.id).then(res => {
       this.bond = res.bond
       this.bonds1 = Object.keys(res.bond)
     })
   }
  },
  created (id) {
    this.getBond(id)
  }

}
</script>

<style>
 .first {
   margin-bottom: 50px 0;
 }
 .buttons {
   margin-left: auto;
   margin: 5px;
   display: flex;
   justify-content: flex-end;
 }
 .mx {
   margin: 0 5px;
 }
 .desc {
   margin-bottom: 30px;
 }
</style>
