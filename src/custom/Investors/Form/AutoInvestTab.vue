<template>
  <div>
    <a-card class="no-border-card no-pt-body-card">
      <a-row :gutter="16">
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('Сумма инвестора')">
            <a-input :disabled="editable" v-model="investor.amount" style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('card_number')">
            <a-input :disabled="editable" v-model="investor.card_number" style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('День инвестирования')">
            <a-input :disabled="editable" v-model="investor.invest_day" style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('Статус актив')">
            <a-input :disabled="editable" :v-model="investor.is_active ? $t('active') : $t('not active')" style="width: 100%" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
    data () {
        return {
            editable: true,
            investor: {}
        }
    },
    methods: {
        getAutoInvests (id = '') {
        this.$store.dispatch('getAutoInvests', id).then(res => {
            console.log('res', res)
            this.investor = res
        })
    }
    },
    created () {
        this.getAutoInvests(this.$route.params.id)
    }
}
</script>

<style>

</style>
