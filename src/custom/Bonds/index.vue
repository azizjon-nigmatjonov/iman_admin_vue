<template>
  <div>
    <a-navigation :list="[{ name: $t('Список Мусавама'), link: ''}]" :isBack="{ flag: false, link: '/category/list'}" />
    <a-card >
      <a-form layout="horizontal" :form="form" @submit="download">
        <a-row class="buttons">
          <a-col :span="8">
          </a-col>
          <a-col :span="8" class="buttons">
            <a-range-picker
              style="width: 100%"
              format="YYYY-MM-DD"
              :show-time="{
                hideDisabledOptions: false
              }"
              v-model="form.date"
            />
          </a-col>
          <a-col :span="4" class="buttons">
            <a-form-item style="margin-top: -5px">
              <a-button id="buttonSearch" type="primary" html-type="submit" icon="file-excel">{{ $t('Export to excel') }}</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        <a-table
          :columns="columns"
          :loading="loader"
          :data-source="bonds"
          @change="getPagination"
          :pagination="pagination"
          :row-key="record => record.guid"
          size="middle"
          :scroll="{ x: 1500, y: 700 }"
          bordered
        >
          <span slot="customer.birthday" slot-scope="text">
            {{ text.customer.birthday | moment($dateTimeFormat) }}
          </span >
          <span slot="created_at" slot-scope="text">
            {{ text.created_at | moment($dateTimeFormat) }}
          </span>
          <span slot="customer.card_number" slot-scope="text">
            <strong>{{ $cardNumberFormat(text.customer.card_number) }}</strong>
          </span>
          <span class="span" slot="actions" slot-scope="text" :gutter="16">
            <!-- <a-popconfirm
            title="Вы хотите это удалить?"
            ok-text="Да"
            cancel-text="Нет"
            @confirm="deleteBond(text)"
            @cancel="cancel => null"
          >
            <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
              <a-button type="danger" icon="delete"/>
            </a-tooltip>
          </a-popconfirm> -->
            <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
              <a-button @click="$router.push({ name: 'preview bond', params: {id: text.guid} })" class="mx-1" type="primary" icon="account-book" />
            </a-tooltip>
          </span>
          <span slot="amount_per_month" slot-scope="text">
            {{ $moneyFormat(text.amount_per_month) }}
          </span>
          <span slot="installment_amount" slot-scope="text">
            {{ $moneyFormat(text.installment_amount) }}
          </span>
          <span slot="price_in_merchant" slot-scope="text">
            {{ $moneyFormat(text.price_in_merchant) }}
          </span>
        </a-table>
      </a-form>
    </a-card>
  </div>
</template>
<script>
import { downloadfile } from '@/utils/request'
export default {
data () {
  return {
    pagination: {
      current: 1,
      showQuickJumper: true
    },
    date_begin: '',
    date_end: '',
    loader: false,
    visible: false,
    selectedBonds: null,
    bonds: [],
    columns: [
      {
        title: this.$t('bonds.table.created_at'),
         scopedSlots: { customRender: 'created_at' },
        key: 'created_at'
      },
      {
        title: this.$t('bonds.table.installment_amount'),
        scopedSlots: { customRender: 'installment_amount' },
        key: 'installment_amount'
      },
      {
        title: this.$t('bonds.table.expiry_month_count'),
        dataIndex: 'expiry_month_count',
        key: 'expiry_month_count'
      },
        {
        title: this.$t('bonds.table.amount_per_month'),
        scopedSlots: { customRender: 'amount_per_month' },
        key: 'amount_per_month'
      },
      //    {
      //   title: this.$t('bonds.table.percent_markup'),
      //   dataIndex: 'percent_markup',
      //   key: 'percent_markup'
      // },
      {
        title: this.$t('bonds.table.price_in_merchant'),
        scopedSlots: { customRender: 'price_in_merchant' },
        key: 'price_in_merchant'
      },
      {
        title: this.$t('bonds.table.status'),
        dataIndex: 'status',
        key: 'status'
      },
    //  {
    //     title: this.$t('bonds.table.customer'),
    //     children: [
    //       {
    //         title: this.$t('bonds.table.First_name'),
    //         dataIndex: 'customer.first_name',
    //         key: 'first_name',
    //         width: 120
    //       },
    //       {
    //         title: this.$t('bonds.table.Last_name'),
    //         dataIndex: 'customer.last_name',
    //         key: 'last_name',
    //         width: 120
    //       },
    //       {
    //         title: this.$t('bonds.table.Birthday'),
    //         scopedSlots: { customRender: 'customer.birthday' },
    //         key: 'birthday',
    //         width: 120
    //       },
    //       {
    //         title: this.$t('bonds.table.Phone_number'),
    //         dataIndex: 'customer.phone_number',
    //         key: 'phone_number',
    //         width: 120
    //       },
    //         {
    //         title: this.$t('bonds.table.Card_number'),
    //         scopedSlots: { customRender: 'customer.card_number' },
    //         key: 'customer.card_number',
    //         width: 120
    //       },
    //       {
    //         title: this.$t('bonds.table.adress_registration'),
    //         dataIndex: 'customer.registration_address',
    //         key: 'registration_address',
    //         width: 120
    //       },
    //        {
    //         title: this.$t('bonds.table.Childrens'),
    //         dataIndex: 'customer.children',
    //         key: 'children',
    //         width: 120
    //       },
    //         {
    //         title: this.$t('bonds.table.Education'),
    //         dataIndex: 'customer.education',
    //         key: 'education',
    //         width: 120
    //       },
    //       {
    //         title: this.$t('bonds.table.profession'),
    //         dataIndex: 'customer.profession',
    //         key: 'profession',
    //         width: 120
    //       },
    //       {
    //         title: this.$t('bonds.family_status'),
    //         dataIndex: 'customer.family_status',
    //         key: 'family_status',
    //         width: 120
    //       },
    //        {
    //         title: this.$t('bonds.table.inn'),
    //         dataIndex: 'customer.inn',
    //         key: 'inn',
    //         width: 120
    //       },
    //       {
    //         title: this.$t('bonds.table.work_phone_number'),
    //         dataIndex: 'customer.work_phone_number',
    //         key: 'work_phone_number',
    //         width: 120
    //       },
    //       {
    //         title: this.$t('bonds.table.patronymic'),
    //         dataIndex: 'customer.patronymic',
    //         key: 'patronymic',
    //         width: 120
    //       }
    //     ]
    //   },
      {
        title: this.$t('bonds.table.action'),
        scopedSlots: { customRender: 'actions' },
        key: 'actions',
        fixed: 'right',
        width: 150
      }
    ],
    form: { date: [] }
  }
},
methods: {
  download (e) {
      e.preventDefault()
      this.date_begin = this.form.date[0].format('YYYY-MM-DD')
      this.date_end = this.form.date[1].format('YYYY-MM-DD')
    //   const date = [ this.date_begin, this.date_end ]
    const a = {
        start: this.date_begin,
        end: this.date_end
    }
    //   console.log(date)
      this.$store.dispatch('getBondReports', a).then((res) => {
        console.log(res)
        downloadfile.get(res.filename).then((res) => {
        var fileURL = window.URL.createObjectURL(new Blob([res.data]))
        var fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', `File`)
        document.body.appendChild(fileLink)
        fileLink.click()
        window.location.href = res.filename
      })
      })
    },
  getPagination (e) {
    this.$router.push({ path: this.$router.fullPath, query: { page: e.current, limit: 10 } })
    this.getBonds({ page: e.current, limit: 10 })
    this.pagination.current = e.current
  },
  deleteBond (e) {
      this.$store.dispatch('deleteBond', e.guid).then(res => {
        console.log(res)
      this.bonds = this.bonds.filter(el => el.guid !== e.guid)
      this.$alertMessage('success', 'Deleted', 'Bond has deleted successfully', this)
    }).catch(er => {
    this.$message.error(er.response.data.message)
  })
  },

  showModal (text) {
    this.selectedBonds = { ...text }
    this.visible = true
  },
  handleOk (e) {
      console.log(e)
      this.visible = false
    },
  getBonds (query) {
    this.loader = true
      this.$store.dispatch('getBonds', query).then(res => {
      console.log(res)
      this.bonds = res.bonds
      const pagination = { ...this.pagination }
      pagination.total = res.count
      this.pagination = pagination
  }).finally(() => {
    this.loader = false
  }).catch(er => {
    this.$message.error(er.response.data.message)
  })
  }
},
created () {
  let query = null
  if (this.$isEmptyObj(this.$route.query)) {
  query = { limit: 10, page: 1 }
    } else query = this.$route.query
    this.getBonds(query)
}
}
</script>

<style>
.span {
  padding: 10px;
  padding-block: 10px;
}
.buttons {
   margin-left: auto;
   margin: 5px;
   display: flex;
   justify-content: flex-end;
 }
</style>
