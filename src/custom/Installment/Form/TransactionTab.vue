<template>
  <a-card :title="`${$t('total.amount.transactions')}: ${$moneyFormat(totalAmount)}`" >
    <div slot="extra" >
      <a-button @click="openModal" type="primary" >{{ $t('add.transaction') }}</a-button>
    </div>
    <a-table :loading="loader" :columns="columns" :data-source="tableData" :pagination="false">
      <span slot="payment_type" slot-scope="text">
        {{ $t(text) }}
      </span>
      <span slot="dateTime" slot-scope="text">
        {{ text | moment($dateTimeFormat) }}
      </span>
      <span slot="status" slot-scope="text">
        <a-tag :color="getStatusColor(text.status)">{{ text.status === 'success' ? 'Проверено' : $t(text.status) }}</a-tag>
      </span>
      <span slot="type" slot-scope="text">
        <a-tag v-if="text" :color="getColor(text)">{{ getStatus(text) }}</a-tag>
        <span v-else></span>
      </span>
      <span slot="date" slot-scope="text, rec">
        <b v-if="rec.overall">
          {{ getDateOrText(text) }}
        </b>
        <span v-else>
          {{ getDateOrText(text) }}
        </span>
      </span>
      <span slot="amount" slot-scope="text"> {{ $moneyFormat(text) }}</span>
      <span slot="money" slot-scope="text">
        {{ $moneyFormat(+text) }}
      </span>
    </a-table>

    <a-modal
      @ok="addTransactions"
      v-model="modalVisible"
      :title="$t('add.transaction')"
      okType="primary"
      okText="Добавить"
      :confirm-loading="modalLoading"
    >
      <div style="display: flex; align-items: center; justify-content: center; margin-top: 40px" >
        <a-form-item
          :validateStatus="inputError ? 'error' : ''"
          :required="true"
          :extra="inputError"
          style="width: 300px;"
          label="Сумма"
          :colon="true"
          labelAlign="left"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input-number
            style="width: 100%"
            :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/\$\s?|(,*)/g, '')"
            v-model="inputedAmount"
          />
        </a-form-item>
      </div>
    </a-modal>

  </a-card>
</template>

<script>
export default {
  props: ['contractNumber'],
  data () {
    return {
      tableData: [],
      inputedAmount: 0,
      loader: true,
      modalVisible: false,
      modalLoading: false,
      columns: [
      {
        title: this.$t('transactionId'),
        key: 'transaction_id',
        dataIndex: 'transaction_id'
      },
      {
        title: this.$t('created_at'),
        scopedSlots: { customRender: 'dateTime' },
        key: 'created_at',
        dataIndex: 'created_at'
      },
      {
        title: this.$t('amount'),
        scopedSlots: { customRender: 'money' },
        key: 'amount',
        dataIndex: 'amount'
      },
      {
        title: this.$t('payment_type'),
        key: 'payment_type',
        dataIndex: 'payment_type',
        scopedSlots: { customRender: 'payment_type' }
      },
      {
        title: this.$t('status'),
        scopedSlots: { customRender: 'status' },
        key: 'status'
      }
    ]
    }
  },
  mounted () {
    this.fetchTransactionList()
  },
  computed: {
    totalAmount () {
      if (!this.tableData?.length) return 0
      let total = 0
      this.tableData.forEach(el => {
        total += el.amount
      })
      return total
    }
  },
  methods: {
    fetchTransactionList () {
      this.loader = true
      this.$store.dispatch('getInstallmentTransactions', this.$route.params.id)
        .then((res) => {
            this.tableData = res.bond_payment
        }).finally(() => { this.loader = false })
    },
    getStatusColor (color) {
      var selected
      switch (color) {
        case 'success':
          selected = 'cyan'
          break
        default:
          selected = 'orange'
      }
      return selected
    },
    addTransactions () {
      this.modalLoading = true
      this.$store.dispatch('createInstallmentTransaction', {
        amount: this.inputedAmount,
        contract_number: this.contractNumber
      }).then(res => {
        this.modalVisible = false
        this.fetchTransactionList()
        this.$emit('updateSchedule')
      }).finally(() => { this.modalLoading = false })
    },
    openModal () {
      this.modalVisible = true
    }
  },
  watch: {
    modalVisible (value) {
      if (value) this.inputedAmount = 0
    }
  }
}
</script>
