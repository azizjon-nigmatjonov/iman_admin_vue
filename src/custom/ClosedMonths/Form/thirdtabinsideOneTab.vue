<template>
  <div class="tableTop">
    <a-table
      bordered
      :pagination="true"
      :rowKey="(row, index) => index"
      :columns="columname"
      :scroll="{ x: 1000 }"
      :data-source="computedTableData"
      :loading="loading"
    >
      <template slot="orderNumber" slot-scope="text, record, index">
        {{ CountNumber(index) }}
      </template>
      <span slot="percent" slot-scope="text">
        {{ text }} %
      </span>
      <span slot="type" slot-scope="text">
        <a-tag :color="colors[text]" style="width: 100%; text-align: center">{{ types[text] }}</a-tag>
      </span>
      <span slot="status" slot-scope="text">
        {{ $t(text.status) }}
      </span>
      <span slot="date" slot-scope="text">
        {{ text.created_at | moment($dateFormat) }}
      </span>
      <span slot="money" slot-scope="text">
        {{ $moneyFormat(+text) || '0' }}
      </span>
    </a-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
props: ['columname', 'data', 'loading', 'total', 'searchText'],
  watch: {
    total (event) {
      this.pagination.total = event
    }
  },
  data () {
  return {
    types: {
      exists: 'Текущий',
      new: 'Новый'
    },
    colors: {
      exists: 'cyan',
      new: 'green'
    },
    pagination: { current: 1, pageSize: 10, total: this.total },
    count: 0
  }
  },
  methods: {
  moment,
    getPagination (pagination) {
    this.count = pagination.current
this.pagination.current = pagination.current
    },
    CountNumber (index) {
      if (this.count === 0 || this.count === 1) {
        return (index + 1)
      } else {
        return ((this.count * this.pagination.pageSize - this.pagination.pageSize) + index + 1)
      }
    }
  },
  computed: {
    computedTableData () {
      return this.data.filter(row => {
        if (row.name?.toLowerCase().includes(this.searchText.toLowerCase()) || row.investor_id.includes(this.searchText)) return true
        return false
      })
    }
  }
}
</script>

<style scoped>
.tableTop {
  margin-top: 20px;
}
</style>
