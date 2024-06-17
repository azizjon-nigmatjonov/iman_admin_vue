<template>
  <div>
    <a-table
      :row-key="record => record.guid"
      bordered
      @change="getPagination"
      :pagination="pagination"
      :scroll="{ x: 2000, y: 700 }"
      :columns="columns1"
      :loading="loading"
      :data-source="invoices">
      <span slot="created_at" slot-scope="text"> {{ text.created_at | moment($dateFormat) }}</span>
      <span slot="invoice_date" slot-scope="text"> {{ text.invoice_date | moment($dateFormat) }}</span>
      <span slot="verified" slot-scope="text"> {{ verify(text.verified) }}</span>
      <span v-if="text.resposible_person" slot="responsible_person" slot-scope="text"> {{ getSystemUser }}</span>
      <span slot="products" slot-scope=""><a> продукты </a> </span>
      <span slot="actions" slot-scope="text" class="span">
        <a-tooltip placement="bottomLeft" :title="$t('button.add')">
          <a-button class="mx-1" @click="ok(text.guid)" type="primary" icon="plus" />
        </a-tooltip>
      </span>
    </a-table>
    <a-modal
      v-model="visible"
      :title="$t('addInvoice')"
      @ok="addInvoice"
      @cancel="handleCancel"
      on-ok="handleOk"
    ><template>
      <a-form-model :span="12" :colon="false">
        <a-col style="padding: 0 15px">
          <a-form-model-item :label="$t('invoice_date')" prop="invoice_date">
            <a-date-picker v-model="invoice_date" :format="$dateFormat" />
          </a-form-model-item>
        </a-col>
        <a-col style="padding: 0 15px">
          <a-form-model-item :label="$t('invoice_number')" prop="invoice_number">
            <a-input v-model="invoice_number" />
          </a-form-model-item>
        </a-col>
      </a-form-model>
    </template>
    </a-modal>
  </div>
</template>

<script>
export default {
 data () {
     return {
    visible: false,
    loading: false,
    invoice_date: '',
    invoice_number: '',
    incoiceId: '',
    invoices: [],
    pagination: {
        current: 1,
        showQuickJumper: true
      },
    columns1: [
      {
        title: this.$t('Verified'),
        scopedSlots: { customRender: 'verified' },
        key: 'verified',
        width: 100
      },
      {
        title: this.$t('contract_number'),
        dataIndex: 'contract_number',
        key: 'contract_number'
      },
       {
        title: this.$t('created at'),
        scopedSlots: { customRender: 'created_at' },
        width: 100,
        key: 'created_at'
      },
      {
        title: this.$t('products'),
        scopedSlots: { customRender: 'products' },
        key: 'products',
        width: 100,
         customCell: (record, index) => {
            return {
              on: {
                click: (event) => {
                   console.log(record, index)
                   this.$router.push({ name: 'products-list', params: { id: record.guid } })
                }
              }
            }
          }
      },
       {
        title: this.$t('installment_amount'),
        dataIndex: 'installment_amount',
        key: 'installment_amount'
      },
       {
        title: this.$t('merchant'),
        dataIndex: 'merchant.merchant.name',
        key: 'merchant.merchant.name'
      },
      {
        title: this.$t('merchant_branch'),
        dataIndex: 'merchant.merchant_branch.name',
        key: 'merchant.merchant_branch.name'
      },
      {
        title: this.$t('invoice_date'),
        scopedSlots: { customRender: 'invoice_date' },
        key: 'invoice_date'
      },
      {
        title: this.$t('invoice_number'),
        dataIndex: 'invoice_number',
        key: 'invoice_number'
      },
      {
        title: this.$t('responsible_person'),
        scopedSlots: { customRender: 'responsible_person' },
        key: 'responsible_person'
      },
      {
        title: this.$t('commentary'),
        dataIndex: 'commentary',
        key: 'commentary'
      },
       {
             title: this.$t('category.table.Actions'),
             scopedSlots: { customRender: 'actions' },
             key: 'actions',
             width: 100
      }
    ]
     }
 },
 methods: {
     getPagination (e) {
      this.$router.push({ path: this.$router.fullPath, query: { page: e.current, limit: 10 } })
      this.getMerchantUserInvoices({ query: { page: e.current, limit: 10 }, id: this.$route.params.id })
      this.pagination.current = e.current
    },
     ok (id) {
         this.invoiceId = id
         this.visible = true
     },
     dust () {
      return {
        id: this.invoiceId,
        data: {
          invoice_date: this.invoice_date,
          invoice_number: this.invoice_number
        }
      }
    },
     handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
     addInvoice () {
      console.log(this.dust())
      this.$store.dispatch('addInvoice', this.dust()).then((res) => {
        // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)
        this.$message.success('Invoice has added successfully')
        this.visible = false
      })
    },
    verify (ver) {
      if (ver === true) {
        return 'Да'
      } else {
        return 'Нет'
      }
    },
    getSystemUser (id) {
      this.$store.dispatch('getSystemUser', id).then((res) => {
        this.userName = res.name
        console.log(this.userName)
      })
      return this.userName
    },
    getMerchantUserInvoices (query) {
    //    const a = {
    //        id: this.$route.params.id
    //     }
    this.loading = true
      this.$store.dispatch('getMerchantUserInvoices', query).then((res) => {
          this.invoices = res.invoices
          const pagination = { ...this.pagination }
          pagination.total = res.count
          this.pagination = pagination
      })
      .finally(() => {
        this.loading = false
      })
    }
 },
 created () {
     this.getMerchantUserInvoices({ query: { page: 1, limit: 10 }, id: this.$route.params.id })
 }
}
</script>

<style>

</style>
