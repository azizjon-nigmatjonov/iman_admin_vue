<template>
  <div>
    <a-row type="flex" :gutter="[8,8]">
      <a-col span="10">
        <a-form-model :rules="rulesMarkups" :model="formMarkups" :colon="false" ref="rulesMarkups">
          <a-divider class="divider" orientation="left">{{ $t('Прибыль') }}</a-divider>
          <a-col class="mx my-1">
            <a-row type="flex" :gutter="[8,8]" v-for="(item, i) in markup_list" :key="i">
              <a-col style="width: 140px" >
                <a-form-model-item class="my-0 py-0" :label="$t('Прибыль')" prop="margin">
                  <a-input
                    disabled
                    :value="item.percentage ? item.percentage : 0"
                    :max="100"
                    :min="0"
                    type="number"
                    :addonAfter="'%'"
                    :stringMode="false"

                  />
                </a-form-model-item>
              </a-col>
              <a-col>
                <a-form-model-item :label="$t('month')" prop="month">
                  <a-input-number
                    disabled
                    v-model="item.period_month"
                    :max="100"
                    :min="0"
                    :formatter="value => `${value}`"
                  />
                </a-form-model-item>
              </a-col>
              <a-col>
                <a-form-model-item label=" ">
                  <a-button @click="deleteMarkup(item.id)">X</a-button>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row type="flex" :gutter="[8,8]" v-if="isNewMarkupActive">
              <a-col style="width: 140px" >
                <a-form-model-item class="my-0 py-0" :label="$t('Прибыль')" prop="percentage">
                  <a-input
                    :value="formMarkups.percentage"
                    :max="100"
                    :min="0"
                    type="number"
                    :addonAfter="'%'"
                    v-model.number="formMarkups.percentage"
                    :stringMode="false"

                  />
                </a-form-model-item>
              </a-col>
              <a-col>
                <a-form-model-item :label="$t('month')" prop="period_month">
                  <a-input-number
                    v-model="formMarkups.period_month"
                    :max="100"
                    :min="0"
                    :formatter="value => `${value}`"
                  />
                </a-form-model-item>
              </a-col>
              <a-col>
                <a-form-model-item label=" ">
                  <a-button @click="() => isNewMarkupActive = false">X</a-button>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-button v-if="!isNewMarkupActive" @click="addNewMarkup()">Добавить</a-button>
          </a-col>
        </a-form-model>
      </a-col>
      <a-col span="10" offset="1">
        <a-form-model :rules="rulesDiscount" :model="formDiscounts" :colon="false" ref="rulesDiscount">
          <a-divider class="divider" orientation="left">{{ $t('discount') }}</a-divider>
          <a-row :gutter="[8,8]" type="flex" v-for="item in discounts" :key="item">
            <a-col>
              <a-form-model-item class="my-0 py-0" :label="$t('discount')" prop="percentager">
                <a-input-number
                  disabled
                  :value="item.percentage ? item.percentage : 0"
                  :max="100"
                  :min="0"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                />
              </a-form-model-item>
            </a-col>
            <a-col>
              <a-form-model-item :label="$t('month')" prop="discountmounth">
                <a-input-number
                  disabled
                  v-model="item.period_month"
                  :max="100"
                  :min="0"
                  :formatter="value => `${value}`"
                />
              </a-form-model-item>
            </a-col>
            <a-col>
              <a-form-model-item label=" ">
                <a-button @click="deleteDiscount(item.id)">X</a-button>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row type="flex" :gutter="[8,8]" v-if="isNewDiscountActive">
            <a-col style="width: 140px" >
              <a-form-model-item class="my-0 py-0" :label="$t('Прибыль')" prop="percentage">
                <a-input
                  :value="formDiscounts.percentage"
                  :max="100"
                  :min="0"
                  type="number"
                  :addonAfter="'%'"
                  v-model.number="formDiscounts.percentage"
                  :stringMode="false"

                />
              </a-form-model-item>
            </a-col>
            <a-col>
              <a-form-model-item :label="$t('month')" prop="period_month">
                <a-input-number
                  v-model="formDiscounts.period_month"
                  :max="100"
                  :min="0"
                  :formatter="value => `${value}`"
                />
              </a-form-model-item>
            </a-col>
            <a-col>
              <a-form-model-item label=" ">
                <a-button @click="() => isNewDiscountActive = false">X</a-button>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-button v-if="!isNewDiscountActive" @click="addNewDiscount()">Добавить</a-button>
        </a-form-model>
      </a-col>
      <a-col span="24">
        <a-form-model-item label=" ">
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button @click="postData" type="primary">{{ $t('button.create') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
    data () {
        return {
            rulesMarkups: {
                'period_month': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
                'percentage': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }]
            },
            rulesDiscount: {
                'period_month': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
                'percentage': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }]
            },
            discounts: [],
            markup_list: [],
            isNewMarkupActive: false,
            isNewDiscountActive: false,
            formMarkups: {
              percentage: null,
              period_month: null
            },
            formDiscounts: {
              percentage: null,
              period_month: null
            }
        }
    },
    methods: {
     addNewMarkup () {
      this.isNewMarkupActive = true
     },
     addNewDiscount () {
      this.isNewDiscountActive = true
     },
     postData () {
      this.$refs.rulesMarkups.validate((valid) => {
        if (valid && this.isNewMarkupActive) {
          const data = {
            markups: [
              {
                percentage: parseFloat(this.formMarkups.percentage),
                period_month: parseFloat(this.formMarkups.period_month)
              }
            ]
          }
          this.$store.dispatch('postMurkups', { guid: this.$route.params.id, data: data }).then(res => {
                this.$alertMessage('success', 'Создано успешно', '', this)
                this.isNewMarkupActive = false
                setTimeout(() => {
                  this.getMarkups()
                }, 300)
            }).finally(() => {
                this.loading = false
            }).catch(() => {
              console.log('dismatch pass')
        })
        }
      })
      this.$refs.rulesMarkups.validate((valid) => {
        if (valid && this.isNewDiscountActive) {
          const data = {
            discounts: [
              {
                percentage: parseFloat(this.formDiscounts.percentage),
                period_month: parseFloat(this.formDiscounts.period_month)
              }
            ]
          }
          this.$store.dispatch('postDiscounts', { guid: this.$route.params.id, data: data }).then(res => {
              this.$alertMessage('success', 'Создано успешно', '', this)
              this.isNewDiscountActive = false
              setTimeout(() => {
                this.getDiscounts()
              }, 300)
          }).finally(() => {
              this.loading = false
          }).catch(() => {
            console.log('dismatch pass')
          })
        }
      })
     },
     getDiscounts (id) {
      this.$store.dispatch('getDiscounts', id)
        .then(res => {
          if (res.list) {
            this.discounts = res.list
          }
        })
        .catch(err => console.log(err))
     },
     getMarkups (id) {
      this.$store.dispatch('getMarkups', id)
        .then(res => {
          if (res.list) {
            this.markup_list = res.list
          }
        })
        .catch(err => console.log(err))
     },
     deleteDiscount (id) {
      const params = {
        merchant_id: this.$route.params.id,
        discunt_id: id
      }
      if (params.merchant_id) {
        this.$store.dispatch('deleteDiscount', params).then(res => {
        this.discounts = this.discounts.filter(el => el.id !== params.discunt_id)
        this.$message.success('Успешно удалено !')
      })
      }
     },
     deleteMarkup (id) {
      const params = {
        merchant_id: this.$route.params.id,
        markup_id: id
      }
      if (params.merchant_id) {
        this.$store.dispatch('deleteMarkup', params).then(res => {
        this.markup_list = this.markup_list.filter(el => el.id !== params.markup_id)
        this.$message.success('Успешно удалено !')
      })
      }
     }
    },
    created () {
      this.getMarkups(this.$route.params.id)
      this.getDiscounts(this.$route.params.id)
    }
}
</script>

<style>

</style>
