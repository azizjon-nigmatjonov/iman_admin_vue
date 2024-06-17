<template>
  <div>
    <a-navigation :list="[{ name: $t('Список облигаций'), link: ''}]" :isBack="{ flag: true, link: '/bonds/list'}" />
    <a-card>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" :tab="$t('Детали клиента')">
          <a-descriptions
            v-if="bond.customer"
            layout="vertical"
            class="desc"
            bordered
          >
            <a-descriptions-item :label="$t('bonds.preview.First_name')">
              {{ this.bond.customer.first_name }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.Last_name')">
              {{ this.bond.customer.last_name }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.patronymic')">
              {{ this.bond.customer.patronymic }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.Birthday')">
              {{ this.bond.customer.birthday | moment($dateFormat) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.Phone_number')">
              {{ this.bond.customer.phone_number }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.Card_number')">
              {{ this.bond.customer.card_number.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/, '') }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.adress_registration')">
              {{ this.bond.customer.registration_address }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.Childrens')">
              {{ this.bond.customer.children }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.Education')">
              {{ this.bond.customer.education }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.profession')">
              {{ this.bond.customer.profession }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.Job_organization')">
              {{ this.bond.customer.place_of_work }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.score')">
              {{ this.bond.customer.scoring }}
            </a-descriptions-item>
            <!-- <a-descriptions-item :label="$t('bonds.preview.work_phone_number')">
              {{ this.bond.customer.work_phone_number }}
            </a-descriptions-item> -->
            <!-- <a-descriptions-item :label="$t('bonds.preview.expiry_date')">
              {{ this.bond.expiry_date }}
            </a-descriptions-item> -->
            <a-descriptions-item :label="$t('bonds.preview.installment_amount')">
              {{ $moneyFormat(this.bond.installment_amount) }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('bonds.preview.expiry_month_count')">
              {{ this.bond.expiry_month_count }}
            </a-descriptions-item>
            <!-- <a-descriptions-item :label="$t('bonds.preview.First_name')">
              {{ this.bond.amount_per_month }}
            </a-descriptions-item> -->
            <!-- <a-descriptions-item :label="$t('bonds.preview.First_name')">
              {{ this.bond.percent_markup }}
            </a-descriptions-item> -->
            <a-descriptions-item label="Price in merchant">
              {{ $moneyFormat(this.bond.price_in_merchant) }}
            </a-descriptions-item>
            <a-descriptions-item label="Status">
              {{ this.bond.status }}
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('Список инвесторов')">
          <a-table
            :columns="columns"
            :data-source="transactions"
            :row-key="record => record.guid"
            size="middle"
            :scroll="{ x: 300, y: 300 }"
          >
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="3" :tab="$t('repaymentSchedule')">
          <a-table
            :columns="columns1"
            :data-source="bond.repayment_schedule"
            :row-key="record => record.guid"
            size="middle"
            :scroll="{ x: 300, y: 300 }"
          >
            <span slot="status" slot-scope="text">
              <a-tag :color="getStatusColor(text.status)">{{ text.status }}</a-tag>
            </span>
          </a-table>
        </a-tab-pane>
      <!-- <template>
        <div class="buttons">
          <a-button style="background: red; color: white; border: none" key="back" @click="rejectScore(installment)">
            Отклонять
          </a-button>
          <a-button v-if="installment.scoring_status == 'passed'" key="submit" type="primary" @click="acceptScore(installment)" class="mx"> Принять </a-button>
          <a-button v-else-if="installment.scoring_status !== 'passed' && installment.status !== 'reject'" key="submit2" type="primary" @click="startScoring(installment)" class="mx"> Начать подсчет очков </a-button>
        </div>
      </template> -->
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    bond: {},
    transactions: [],
    columns: [
       {
        title: this.$t('amount'),
        dataIndex: 'amount',
        key: 'amount'
      },
      {
        title: this.$t('interest_percent'),
        dataIndex: 'interest_percent',
        key: 'interest_percent'
      },
      {
        title: this.$t('investment_percent'),
        dataIndex: 'investment_percent',
        key: 'investment_percent'
      },
      {
        title: this.$t('Investor_name'),
        dataIndex: 'Investor.first_name',
        key: 'Investor.first_name'
      }
      ],
      columns1: [
       {
        title: this.$t('amount'),
        dataIndex: 'amount',
        key: 'amount'
      },
      {
        title: this.$t('date'),
        dataIndex: 'date',
        key: 'date'
      },
      {
        title: this.$t('status'),
        scopedSlots: { customRender: 'status' },
        key: 'status'
      }
      ]
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
       console.log(res)
       this.bond = res.bond
     })
   },
   getBondTransaction (id) {
     this.$store.dispatch('getBondTransaction', this.$route.params.id).then(res => {
       console.log(res)
       this.transactions = res
       console.log(this.transactions)
     })
   }
  },
  created (id) {
    this.getBond(id)
    this.getBondTransaction(id)
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
