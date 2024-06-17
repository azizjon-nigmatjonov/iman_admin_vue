<template>
  <div>
    <a-row type="flex" justify="end">
      <a-col span="auto">
        <a-button :loading="saveButtonLoading" @click="saveOrder" v-if="saveButtonVisible" style="margin-right: 10px">{{
          $t('button.saveOrder')
        }}</a-button>
      </a-col>
    </a-row>
    <a-card>
      <a-table
        :columns="columns"
        :data-source="actualAdvices"
        :rowKey="e => e.guid"
      >
        <span slot="actions" slot-scope="text">
          <arrow-btn :type="'up'" @click="upButtonHandler(text)" />
          <arrow-btn :type="'down'" @click="downButtonHandler(text)" />
          <!-- <edit-btn @click="$router.push({ name: 'advices-categories-edit', params: { id: text.guid} })" />
          <delete-btn @confirm="deleteCategory(text)" /> -->
        </span>
        <span slot="status" slot-scope="text">
          <a-switch @change="updateIsActualProp($event, text)" v-model="text.is_actual"></a-switch>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import arrowBtn from '@/components/arrowBtn.vue'

export default {
    components: { arrowBtn },
data () {
    return {
        saveButtonLoading: false,
        saveButtonVisible: false,
        columns: [
             {
                title: '№',
                key: 'index',
                width: 70,
                dataIndex: 'idx'
            },
            {
                title: this.$t('name'),
                key: 'title',
                dataIndex: 'title.ru'
            },
            {
                title: this.$t('Описание'),
                key: 'description',
                dataIndex: 'description.ru'
            },
             {
                title: this.$t('investors.table.actions'),
                scopedSlots: { customRender: 'actions' },
                key: 'actions',
                width: 200,
                fixed: 'right'
            },
             {
                title: this.$t('status'),
                scopedSlots: { customRender: 'status' },
                key: 'status',
                width: 80,
                fixed: 'right'
            }
        ],
        actualAdvices: []
    }
},
methods: {
    updateIsActualProp (event, text) {
      console.log(event, text)
        this.$store.dispatch('updateActualAdviceProp', {
           data: [
              {
                is_actual: event,
                guid: text.guid
              }
           ]
        }).then(res => {
          console.log('ACTUAL', res)
          this.$alertMessage('success', 'Статус успешно обновлен', 'Он не удаляется. Был изменен статус актуальности', this)
          this.actualAdvices = this.actualAdvices.filter(item => item.guid !== text.guid)
        }).catch(er => {
          console.log(er)
          this.$alertMessage('danger', 'Error', JSON.stringify(er), this)
        })
    },
    upButtonHandler (row) {
      const index = this.actualAdvices.findIndex(el => el.guid === row.guid)
      if (index === 0) return null
      const computedAdvices = JSON.parse(JSON.stringify(this.actualAdvices))
      computedAdvices[index] = computedAdvices[index - 1]
      computedAdvices[index - 1] = row
      this.actualAdvices = computedAdvices
      this.saveButtonVisible = true
    },
    downButtonHandler (row) {
      const index = this.actualAdvices.findIndex(el => el.guid === row.guid)
      const length = this.actualAdvices.length
      if (index === length - 1) return null
      const computedAdvices = JSON.parse(JSON.stringify(this.actualAdvices))
      computedAdvices[index] = computedAdvices[index + 1]
      computedAdvices[index + 1] = row
      this.actualAdvices = computedAdvices
       this.saveButtonVisible = true
    },
    saveOrder () {
      const computedData = this.actualAdvices.map((el, index) => ({
        guid: el.guid,
        position: index
      }))

      this.saveButtonLoading = true
      this.$store.dispatch('updateActualAdviceOrder', computedData)
        .then(res => {
          this.$alertMessage('success', 'Message', 'Успешно обновлено updated', this)
          this.saveButtonVisible = false
        })
        .finally(() => { this.saveButtonLoading = false })
    },
    getActualAdvices () {
        this.$store.dispatch('getActualAdvices').then(res => {
            console.log(res)
            this.actualAdvices = res.advices_list.map((el, idx) => ({ ...el, idx: idx + 1 }))
        }).catch(err => {
            this.$message.error(err.response.data.message)
        })
    }
},
created () {
    this.getActualAdvices()
}
}
</script>

<style>

</style>
