<template>
  <div>
    <a-row type="flex" justify="end" class="mb-2">
      <a-col span="auto">
        <div class="nav-block" >
          <a-input v-model="seachText" class="search-input" :placeholder="$t('search')" />
          <a-button type="primary" @click="$router.push(`/posAgent/${$route.params.id}/create`)" icon="plus" style="float: right">{{ $t('button.create') }}</a-button>
        </div>
      </a-col>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="pos_agents"
      :row-key="record => record.guid"
      :pagination="false"
      :loading="loading"
    >
      <span slot="created_at" slot-scope="text"> {{ text.created_at | moment($dateFormat) }}</span>
      <span slot="min_investment_amount" slot-scope="text"> {{ $moneyFormat(text.min_investment_amount) }}</span>
      <span slot="min_percent" slot-scope="text"> <strong> {{ text.min_percent }}%  ~ {{ text.max_percent }}%</strong></span>
      <span slot="actions" slot-scope="text" class="span">
        <delete-btn @confirm="deletePosAgent(text.id)"/>
        <edit-btn @click="() => {}" />
      </span>
    </a-table>
    <div v-if="pos_agents.length > 14" v-observe-visibility="handleScrolledToBottm"></div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
 data () {
    return {
      seachText: '',
      columns: [
        {
            title: this.$t('First_name'),
            dataIndex: 'first_name',
            key: 'first_name'
        },
        {
            title: this.$t('username'),
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: this.$t('phone'),
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: this.$t('category.table.Actions'),
            scopedSlots: { customRender: 'actions' },
            key: 'actions',
          width: 150
        }
      ],
      pos_agents: [],
      params: {
        pagination: {
          current: 0,
          limit: 15
        }
      },
      loading: false
    }
 },
 methods: {
    searchPosAgents: debounce(function (string) {
        this.params.pagination.current = 0
        this.getPosAgents()
    }, 300),
    getPosAgents () {
      this.loading = true
      const data = {
        agent_by_merchant: this.$route.params.id,
        offset: this.params.pagination.current,
        limit: this.params.pagination.limit
      }
      this.$store.dispatch('getPosAgentsList', data)
      .then(res => {
        if (this.params.pagination.current > 1) {
          this.pos_agents.push(...res)
        } else {
          this.pos_agents = res
        }
      })
      .catch(reject => {
        this.$message.error('Произошла ошибка')
      })
      .finally(() => {
        this.loading = false
      })
    },
    deletePosAgent (id) {
      this.$store.dispatch('deletePosAgent', id).then(() => {
          this.$message.success('Пос-агент успешно удален')
          this.getPosAgents()
      }).catch(reject => {
        this.$message.error('Произошла ошибка')
      })
    },
    handleScrolledToBottm (isVisible) {
      if (!isVisible) { return }
      this.params.pagination.current++
      this.getPosAgents()
    }
 },
 created () {
     this.getPosAgents()
 },
 watch: {
   seachText () {
    this.searchPosAgents()
   }
 }
}
</script>

<style>
.nav-block {
  display: flex;
  gap: 15px;
  align-content: center;
}
</style>
