<template>
  <a-card>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :row-ley="(record) => record.investor_id"
      :pagination="false"
      :loading="loading"
      bordered
    >
      <span slot="index" slot-scope="text, column, index">
        {{ index + 1 }}
      </span>
      <span slot="fio" slot-scope="text">
        {{ text.first_name + ' ' + text.last_name + ' ' + text.patronymic }}
      </span>
    </a-table>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: null,
      loader: false,
      columns: [
        {
          title: 'No',
          key: 'index',
          scopedSlots: { customRender: 'index' },
          width: '60px',
          align: 'center',
          customCell: this.onRowClick
        },
        {
          title: 'FIO',
          scopedSlots: { customRender: 'fio' },
          key: 'fio',
          align: 'left',
          customCell: this.onRowClick
        }
      ]
    }
  },
  mounted () {
    this.getTableData()
  },
  watch: {
    tableData (val) {
      console.log('TABLE DATA ===>', val)
    }
  },
  methods: {
    getTableData () {
      this.loader = true
      this.$store.dispatch('getInvestorEditedList')
        .then(res => {
          console.log('EDITED LIST ==>', res.edited_list)
          this.tableData = res.edited_list
        }).finally(() => { this.loader = false })
    },

    onRowClick (record, index) {
      return {
        on: {
          click: (event) => {
            this.$router.push({ name: 'invetstors-edit-preview', params: { id: record.investor_id } })
          }
        }
      }
    }
  }
}
</script>
