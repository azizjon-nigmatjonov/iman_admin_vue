<template>
  <div style='width: 100%'>
    <!--    <a-button type="primary" @click="showModal">-->
    <!--      Open Modal-->
    <!--    </a-button>-->
    <a-modal id="partner" v-model="visible" @ok="false" bodyStyle='{background:red}'>
      <a-card :bordered="false">
        <a-form-model :model="form" :colon="false" layout="horizontal" ref="ruleForm" :rules="rules">
          <a-card :title="$t('Partner')" class="no-border-card no-space-tab no-padding-title">
            <a-row type="flex" :gutter="16">
              <a-col :span="12">
                <a-form-model-item ref="name" :label="$t('name')" prop="name">
                  <a-input v-model="form.name" />
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item ref="address" :label="$t('Address')" prop="address">
                  <a-input v-model="form.address" />
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item ref="email" :label="$t('email')" prop="email">
                  <a-input v-model="form.email"/>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item ref="inn" :label="$t('inn')" prop="inn">
                  <a-input v-model="form.inn"/>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item ref="contract" :label="$t('contract_number')" prop="contract">
                  <a-input v-model="form.contract"/>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item ref="date_of_contract" :label="$t('contract_date')" prop="date_of_contract">
                  <a-date-picker
                    placeholder="Select Time"
                    :format="$dateFormat"
                    :valueFormat="$dateValueFormat"
                    v-model="form.date_of_contract"
                    style="width: 100%"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-card>
        </a-form-model>
      </a-card>
      <a-row class="edit-btns mt-4" slot="footer">
        <a-col span="24">
          <a-form-model-item>
            <a-row type="flex" justify="end">
              <a-col span="auto">
                <a-button :key="$t('button.cancel')" size='small' type="grey" style="margin-right: 6px" @click="$router.go(-1)">{{
                  $t('button.cancel')
                }}</a-button>
                <!-- <a-button type="primary">{{ $t('button.create') }}</a-button> -->
                <a-button :key="$t('button.save')" type="primary" @click="submitForm">{{ $t('button.save') }}</a-button></a-col>
            </a-row>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rules: {
        name: [{ required: true, message: this.$t('name') + ' требуется', trigger: 'change' }],
        address: [{ required: true, message: this.$t('Address') + ' требуется', trigger: 'change' }],
        contract: [{ required: true, message: this.$t('contract_number') + ' требуется', trigger: 'change' }],
        date_of_contract: [{ required: true, message: this.$t('contract_date') + ' требуется', trigger: 'change' }],
        inn: [{ required: true, message: this.$t('inn') + ' требуется', trigger: 'change' }]
      },
      form: {
        name: '',
        address: '',
        email: '',
        contract: '',
        date_of_contract: '',
        inn: ''
      },
      visible: false
    }
  },
  methods: {
    // createOrUpdatePartner () {
    //
    // },
    submitForm () {
      this.$refs.ruleForm.validate((valid, values) => {
        if (valid) {
          this.loading = true
          const _form = JSON.parse(JSON.stringify(this.form))
          this.$store.dispatch('createOrUpdatePartner', _form).then(res => {
            console.log(res)
            this.$message.success('Expense has added successfully')
            this.visible = false
          })
            .finally(() => {
              this.loading = false
            })
          // this.$store.dispatch('postExpense', this.form).then((res) => {
          // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)// })
          //   .finally(() => {
          //     this.submitting = false
          //   })
        }
      })
    },
    showModal () {
      this.visible = !this.visible
    }
  }
}
</script>

<style scoped>
</style>
