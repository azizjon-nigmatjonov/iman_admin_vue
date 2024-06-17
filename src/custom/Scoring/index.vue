<template>
  <page-header-wrapper :title="false">
    <a-card >
      <a-row v-if="false" type="flex" justify="end" class="mb-2">
        <a-col span="auto">
          <a-button type="primary" @click="$router.push('/bonds/list/new')">{{ $t('button.create') }}</a-button>
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="scoring_list"
        :row-key="record => record.guid"
        @change="getPagination"
        :pagination="pagination"
        size="middle"
        :scroll="{ x: 1500, y: 400 }"
        bordered>
        <span slot="customer.birthday" slot-scope="text">
          {{ text.customer.birthday | moment($dateFormat) }}
        </span>
        <span slot="created_at" slot-scope="text">
          {{ text.created_at | moment($dateTimeFormat) }}
        </span>
        <span slot="amount_per_month" slot-scope="text">
          {{ $moneyFormat(text.amount_per_month) }}
        </span>
        <span slot="installment_amount" slot-scope="text">
          {{ $moneyFormat(text.installment_amount) }}
        </span>
        <span slot="status" slot-scope="text">
          <a-tag color="pink">{{ text.status }}</a-tag>
        </span>
        <span slot="actions" slot-scope="text">
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
            <a-button @click="showModal(text)" class="mx-1" type="primary" icon="eye" />
          </a-tooltip> -->
          <icon-btn icon="eye" @click="showModal(text)" :tooltip="$t('button.preview')" />
        </span>
      </a-table>
      <a-modal
        v-model="visible.flag"
        :title="$t('Scoring')"
      >
        <a-descriptions
          :column="{ xxl: 4, xl: 3, lg:1, md: 24, sm: 8, xs: 1 }"
        >
          <a-descriptions-item :label="$t('First_name')">
            {{ visible.data.customer.first_name }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Last_name')">
            {{ visible.data.customer.last_name }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Birth_day')">
            {{ visible.data.customer.birthday }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Phone_number')">
            {{ visible.data.customer.phone_number }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Card_number')">
            {{ visible.data.customer.card_number }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Registration_number')">
            {{ visible.data.customer.registration_address }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Children')">
            {{ visible.data.customer.children }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Education')">
            {{ visible.data.customer.education }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Proffesion')">
            {{ visible.data.customer.profession }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Job_organization')">
            {{ visible.data.customer.place_of_work }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Scoring')">
            {{ visible.data.customer.scoring }}
          </a-descriptions-item><a-descriptions-item :label="$t('Work_phone_number')">
            {{ visible.data.customer.work_phone_number }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Patronymic')">
            {{ visible.data.customer.patronymic }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Created_at')">
            {{ visible.data.created_at | moment($dateTimeFormat) }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Installment_amount')">
            {{ visible.data.installment_amount }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Expiry_month_count')">
            {{ visible.data.expiry_month_count }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Amount_per_month')">
            {{ visible.data.amount_per_month }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Perent_markup')">
            {{ visible.data.percent_markup }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Price_in_merchant')">
            {{ visible.data.price_in_merchant }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('Status')">
            {{ visible.data.status }}
          </a-descriptions-item>
        </a-descriptions>
        <template slot="footer">
          <a-button style="background: red; color: white; border: none" key="back" @click="rejectScore(visible.data)">
            {{ $t('Отклонять') }}
          </a-button>
          <a-button key="submit" type="primary" @click="acceptScore(visible.data)">
            {{ $t('Принять') }}
          </a-button>
        </template>
      </a-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
data () {
  return {
    vis: false,
    visible: {
      flag: false,
      data: {
        customer: {}
      }
    },
    pagination: {
      current: 1,
      showQuickJumper: true
    },
    scoring_list: [],
    columns: [
      {
        title: this.$t('Created_at'),
        scopedSlots: { customRender: 'created_at' },
        key: 'created_at',
        width: 120
      },
      {
        title: this.$t('bonds.table.installment_amount'),
        scopedSlots: { customRender: 'installment_amount' },
        key: 'installment_amount',
        width: 120
      },
      {
        title: this.$t('bonds.table.expiry_month_count'),
        dataIndex: 'expiry_month_count',
        key: 'expiry_month_count',
        width: 120
      },
      {
        title: this.$t('bonds.table.amount_per_month'),
        scopedSlots: { customRender: 'amount_per_month' },
        key: 'amount_per_month',
        width: 120
      },
         {
        title: this.$t('bonds.table.percent_markup'),
        dataIndex: 'percent_markup',
        key: 'percent_markup',
        width: 120
      },
      {
        title: this.$t('bonds.table.price_in_merchant'),
        dataIndex: 'price_in_merchant',
        key: 'price_in_merchant',
        width: 100
      },
     {
        title: this.$t('bonds.table.customer'),
        children: [
          {
            title: this.$t('bonds.table.First_name'),
            dataIndex: 'customer.first_name',
            key: 'first_name',
            width: 120
          },
          {
            title: this.$t('bonds.table.Last_name'),
            dataIndex: 'customer.last_name',
            key: 'last_name',
            width: 120
          },
          {
            title: this.$t('bonds.table.Birthday'),
            scopedSlots: { customRender: 'customer.birthday' },
            key: 'birthday',
            width: 120
          },
          {
            title: this.$t('bonds.table.Phone_number'),
            dataIndex: 'customer.phone_number',
            key: 'phone_number',
            width: 120
          },
            {
            title: this.$t('bonds.table.Card_number'),
            dataIndex: 'customer.card_number',
            key: 'card_number',
            width: 120
          },
          {
            title: this.$t('bonds.table.adress_registration'),
            dataIndex: 'customer.registration_address',
            key: 'registration_address',
            width: 120
          },
           {
            title: this.$t('bonds.table.Childrens'),
            dataIndex: 'customer.children',
            key: 'children',
            width: 120
          },
            {
            title: this.$t('bonds.table.Education'),
            dataIndex: 'customer.education',
            key: 'education',
            width: 120
          },
          {
            title: this.$t('bonds.table.profession'),
            dataIndex: 'customer.profession',
            key: 'profession',
            width: 120
          },
          {
            title: this.$t('bonds.family_status'),
            dataIndex: 'customer.family_status',
            key: 'family_status',
            width: 120
          },
           {
            title: this.$t('bonds.table.inn'),
            dataIndex: 'customer.inn',
            key: 'inn',
            width: 120
          },
          {
            title: this.$t('bonds.table.work_phone_number'),
            dataIndex: 'customer.work_phone_number',
            key: 'work_phone_number',
            width: 120
          },
          {
            title: this.$t('bonds.table.patronymic'),
            dataIndex: 'customer.patronymic',
            key: 'patronymic',
            width: 120
          }
        ]
      },
       {
        title: this.$t('bonds.table.status'),
        scopedSlots: { customRender: 'status' },
        key: 'status',
        fixed: 'right',
        width: 100
      },
      {
        title: this.$t('bonds.table.action'),
        scopedSlots: { customRender: 'actions' },
        key: 'actions',
        fixed: 'right',
        width: 150
      }
    ]
  }
},
methods: {

  acceptScore (item) {
    this.$store.dispatch('acceptScoring', item.guid).then(res => {
      this.scoring_list = this.scoring_list.filter(el => el.guid !== item.guid)
      this.$alertMessage('success', 'Accepted', 'Scoring has accepted successfully', this)
    })
    this.visible.flag = false
  },
  rejectScore (item) {
    this.$store.dispatch('rejectScoring', item.guid).then(res => {
      this.scoring_list = this.scoring_list.filter(el => el.guid !== item.guid)
      this.$alertMessage('success', 'Rejected', 'Scoring has rejected successfully', this)
      this.visible.flag = false
    })
  },
  getPagination (e) {
    this.$router.push({ path: this.$router.fullPath, query: { page: e.current, limit: 10 } })
    this.getScoring({ page: e.current, limit: 10 })
    this.pagination.current = e.current
  },
 showModal (obj) {
    this.visible.flag = true
    this.visible.data = obj
    },
  handleOk (e) {
      console.log(e)
      this.visible.flag = false
    },
  getScoring (query) {
      this.$store.dispatch('getScoring', query).then(res => {
      console.log(res)
      this.scoring_list = res.scoring_list
      const pagination = { ...this.pagination }
        pagination.total = res.count
        this.pagination = pagination
      // .map(res => {
      //   return {
      //             ...res,
      //             installment_amount: res.installment_amount / 1000000 + 'M',
      //             per_month_amount: res.per_month_amount / 1000000 + 'M'
      //           }
      //   })
      // this.bonds = {
      // ...res.bonds,
      // installment_amount: toString(res.installment_amount) + 'M'
      // }
      // this.bonds = Object.keys(res.bonds)
  })
  },
  deleteScoring (e) {
    console.log(e) // pro/list
  }
},
created () {
  let query = null
  if (this.$isEmptyObj(this.$route.query)) {
  query = { limit: 10, page: 1 }
    } else {
      query = this.$route.query
      this.pagination.current = parseInt(this.$route.query.page)
      }
    this.getScoring(query)
}
}
</script>

<style>
.span {
  padding: 10px;
  padding-block: 10px;
}
</style>
