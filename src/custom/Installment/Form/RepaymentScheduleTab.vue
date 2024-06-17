<template>
  <a-card :title="`${$t('prepayment')}: ${$moneyFormat(tableData.downpayment)}`" >
    <a-table :columns="columns" :data-source="computedTableData" :pagination="false">
      <span slot="status" slot-scope="text">
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
      <span slot="discounted_amount" slot-scope="text"> {{ $moneyFormat(text.discounted_amount) }}</span>
      <span slot="money" slot-scope="text">
        {{ $moneyFormat(+text) }}
      </span>
    </a-table>

    <a-card v-if="status === 'done' && !isEdited" >
      <a-button v-if="!datePickerVisible" @click="datePickerVisible = true" type="primary" >Изменить дату</a-button>
      <div v-else style="display: flex; justify-content: space-between" >
        <div>
          <a-date-picker v-model="selectedDate" :disabled-date="disabledDate" style="width: 250px; margin-right: 20px" />
          <a-button @click="changeDate" type="primary" >Изменит</a-button>
        </div>
        <a-button v-if="acceptButtonVisible" @click="confirmClick" type="primary" >Подтвердить</a-button>
      </div>
    </a-card>

  </a-card>
</template>

<script>
import moment from 'moment'

export default {
  props: ['status', 'is_edited'],
  data () {
    return {
      tableData: [],
      datePickerVisible: false,
      selectedDate: null,
      acceptButtonVisible: false,
      isEdited: this.is_edited,
      columns: [
        {
          title: this.$t('date'),
          dataIndex: 'date',
          scopedSlots: { customRender: 'date' },
          key: 'date'
        },
        {
          title: this.$t('debtAmount'),
          dataIndex: 'amount',
          scopedSlots: { customRender: 'money' },
          key: 'debt'
        },
        {
          title: this.$t('interest'),
          dataIndex: 'interest',
          scopedSlots: { customRender: 'money' },
          key: 'interest'
        },
        {
          title: this.$t('amount'),
          scopedSlots: { customRender: 'amount' },
          dataIndex: 'sum',
          key: 'amount'
        },
        {
          title: this.$t('discounted_amount'),
          scopedSlots: { customRender: 'discounted_amount' },
          key: 'discounted_amount'
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
    this.getTableData()
  },
  watch: {
    is_edited (value) {
      this.isEdited = this.is_edited
    }
  },
  computed: {
    repayments () {
      return this.tableData?.repayment || []
    },
    computedTableData () {
      if (!this.repayments?.length) return []

      let amountSum = 0
      let interestSum = 0
      const hasNotPaidMonth = this.repayments.some(item => item.status === 'not_paid')
      const computedData = this.repayments.map(item => {
        amountSum += item.amount
        interestSum += item.interest
        return {
          ...item,
          sum: (+item.amount) + (+item.interest)
        }
      })

      computedData.push({
        date: 'Итого:',
        overall: true
      })
      computedData.push({
        date: `${ this.tableData.months } ${ this.$t('months') }`,
        amount: amountSum,
        interest: interestSum,
        sum: interestSum + amountSum,
        status: hasNotPaidMonth ? 'not_fully_paid' : 'fully_paid'
      })

      return computedData
    },
    computedStartDate () {
      const currentDate = moment()
      // eslint-disable-next-line no-unused-expressions
      return this.repayments.filter(item => {
        return moment(item.date) > currentDate
      })?.[0]?.date
    }
  },
  methods: {
    confirmClick () {
      console.log('EDIT ---->', this.repayments)
      this.$store.dispatch('editRepaymentSchedule', { id: this.$route.params.id,
        data: {
          repayment_schedule: {
            repayment_schedule: this.repayments,
            status: 'alternative'
          }
        }
      }).then(res => {
        this.$alertMessage('success', 'Успешно', 'Дата успешно обновлена', this)
        this.isEdited = true
      })
    },
    changeDate () {
      if (!this.selectedDate) {
        this.datePickerVisible = false
        return null
      }
      // const selectedMonth = Number(this.selectedDate.format('M')) + (this.selectedDate.format('YY') * 12)
      // const selectedYear = this.selectedDate.format('YY')
      let counter = 0
      const currentDate = moment()

      this.tableData.repayment = this.tableData.repayment.map((item, i) => {
        const date = moment(item.date)
        // const computedMonth = Number(date.format('M')) + (date.format('YY') * 12)
        // if (date.format('MM') < selectedMonth || date.format('YY') < selectedYear) return item
        console.log(`${date} < ${currentDate}`)
        console.log('-----------------')
        if (date < currentDate) return item
        // console.log('aaa', date.format('MM'), date.format('YY'))
        counter++
        return {
          ...item,
          date: counter === 1 ? this.selectedDate.format('YYYY-MM-DD') : this.selectedDate.add(1, 'month').format('YYYY-MM-DD')
        }
      })
      this.selectedDate = null
      this.acceptButtonVisible = true
    },
    disabledDate (current) {
      console.log('qweqweqweqweqwe ===>', this.computedStartDate)
      const startDate = this.computedStartDate ? moment(this.computedStartDate) : null
      if (!startDate) return false
      // console.log('START ===>', startDate.format('DD.MM.YYYY HH:mm:ss'))
      const disabledDates = ['29', '30', '31']
      return current && (current < startDate || current > startDate.add(1, 'month').endOf('day') || disabledDates.includes(current.format('DD')))
    },
    getTableData () {
      this.$store.dispatch('getRepaymentSchedule', this.$route.params.id).then((res) => {
        this.tableData = res.repayment_schedule?.[0]
      })
    },
    getColor (e) {
      if (e.status === 'not_paid') {
        return 'orange'
      }
      if (e.status === 'paid') {
        return 'green'
      }
      if (e.status === 'not_fully_paid') {
        return 'yellow'
      }
      if (e.status === 'fully_paid') {
        return 'cyan'
      }
    },
    getStatus (e) {
      console.log(e)
      if (e.status === 'not_paid') {
        return 'Не оплачено'
      }
      if (e.status === 'not_fully_paid') {
        return 'Полностью не оплачен'
      }
      if (e.status === 'fully_paid') {
        return 'Полностью оплачен'
      }
      if (e.status === 'paid') {
        return 'Оплачено'
      }
    },
    getDateOrText (text) {
      return text | moment(this.$dateFormat) ? moment(this.$dateFormat) : text
    }
  }
}
</script>
