<template>
  <div>
    <a-navigation :list="[{ name: $t('Детали портфолио'), link: ''}]" :isBack="{ flag: true, link: '/portfolio'}" />
    <a-card>
      <a-descriptions
        v-if="this.portfolio.title"
        bordered
        layout="vertical"
      >
        <a-descriptions-item :label="$t('Portfolio.preview.title')">
          {{ this.portfolio.title.ru }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Portfolio.preview.Decription')">
          {{ this.portfolio.description.ru }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Portfolio.create.Disclaimer')">
          {{ this.portfolio.disclaimer.ru }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Portfolio.preview.Max_investment_amount')">
          {{ $moneyFormat(this.portfolio.max_investment_amount) }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Portfolio.preview.Min_investment_amount')">
          {{ $moneyFormat(this.portfolio.min_investment_amount) }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Portfolio.create.initial_percent_iman')">
          {{ this.portfolio.initial_percent_iman }}
        </a-descriptions-item>
        <!-- <a-descriptions-item :label="$t('Portfolio.preview.min_bond_percent_limit')">
          {{ this.portfolio.min_bond_percent_limit }}
        </a-descriptions-item> -->
        <a-descriptions-item :label="$t('Portfolio.create.value_by_mln')">
          {{ this.portfolio.value_by_mln }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Portfolio.create.weight_by_mln')">
          {{ $moneyFormat(this.portfolio.weight_by_mln) }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Portfolio.create.value_by_month')">
          {{ $moneyFormat(this.portfolio.value_by_month) }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Portfolio.create.weight_by_month')">
          {{ this.portfolio.weight_by_month }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('risk_type')">
          {{ this.portfolio.risk_type }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Portfolio.preview.photo')">
          <img :src="this.portfolio.photo" :alt="this.portfolio.photo" class="imageClass" width="100" height="100">
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Portfolio.create.corporate')">
          {{ this.portfolio.corporate }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('Status')">
          {{ $t(this.portfolio.status) }}
        </a-descriptions-item>
      </a-descriptions>
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
// import category from '@/config/routes/categories'
export default {
  data () {
    return {
    portfolio: {},
    slugs: {},
    category: []
    }
  },
  computed: {
    //   slug: this.portfolio.category.map(e => {
    //       return toString(e.slug)
    //   })
  },
  methods: {
    getPortfolio (guid) {
      this.$store.dispatch('getPortfolio', this.$route.params.id).then(res => {
        this.portfolio = res.strategy
        console.log(res)
        this.slug = Object.keys(this.portfolio.category)
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    }
  },
  created (guid) {
    this.getPortfolio(guid)
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
</style>
