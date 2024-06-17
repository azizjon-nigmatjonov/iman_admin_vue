<template>
  <div >
    <a-navigation
      :list="[{ name: $t('Список категорий'), link: '/category/list'}, { name: $t('Форма категории'), link: ''}]"
      :isBack="{ flag: true, link: '/category/list'}"
      noBorder
    />
    <a-card class="no-space-tab">
      <a-form-model :colon="false" ref="ruleForm" :model="form" :rules="rules">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" :tab="$t('English')">
            <a-card class="no-border-card no-pt-body-card" title="Создание категории">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a-form-model-item ref="name" :label="$t('Название')" prop="title.en">
                    <a-input :placeholder="$t('Название на английском языке')" v-model="form.title.en" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item :label="$t('category.create.Min_investment_amount')" prop="min_investment_amount">
                    <a-input min="0" type="number" :placeholder="$t('category.create.Min_investment_amount')" v-model="form.min_investment_amount" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item :label="$t('category.create.Max_investment_amount')" prop="max_investment_amount">
                    <a-input min="0" type="number" :placeholder="$t('category.create.Max_investment_amount')" v-model="form.max_investment_amount" />
                  </a-form-model-item>
                </a-col>
                <a-col span="8">
                  <a-form-model-item :label="$t('category.create.Percents')" prop="min_percent">
                    <a-input-group compact>
                      <a-input min="0" type="number" v-model="form.min_percent" style=" width: 45%; text-align: center" :placeholder="$t('minimum')" />
                      <a-input
                        style=" width: 10%; border-left: 0; pointer-events: none; backgroundColor: #fff"
                        placeholder="~"
                        disabled
                      />
                      <a-input type="number" v-model="form.max_percent" style="width: 45%; text-align: center; border-left: 0" :placeholder="$t('maximum')" />
                    </a-input-group>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="2" :tab="$t('Russian')" force-render>
            <a-card class="no-border-card no-pt-body-card" title="Создание категории">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a-form-model-item ref="name" :label="$t('Название')" prop="title.ru">
                    <a-input :placeholder="$t('Название на русском языке')" v-model="form.title.ru" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item :label="$t('category.create.Min_investment_amount')" prop="min_investment_amount">
                    <a-input min="0" type="number" :placeholder="$t('category.create.Min_investment_amount')" v-model="form.min_investment_amount" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item :label="$t('category.create.Max_investment_amount')" prop="max_investment_amount">
                    <a-input min="0" type="number" :placeholder="$t('category.create.Max_investment_amount')" v-model="form.max_investment_amount" />
                  </a-form-model-item>
                </a-col>
                <a-col span="8">
                  <a-form-model-item :label="$t('category.create.Percents')" prop="min_percent">
                    <a-input-group compact>
                      <a-input min="0" type="number" v-model="form.min_percent" style=" width: 45%; text-align: center" :placeholder="$t('minimum')" />
                      <a-input
                        style=" width: 10%; border-left: 0; pointer-events: none; backgroundColor: #fff"
                        placeholder="~"
                        disabled
                      />
                      <a-input type="number" v-model="form.max_percent" style="width: 45%; text-align: center; border-left: 0" :placeholder="$t('maximum')" />
                    </a-input-group>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="3" :tab="$t('Uzbek')">
            <a-card class="no-border-card no-pt-body-card" title="Создание категории">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a-form-model-item ref="name" :label="$t('Название')" prop="title.uz">
                    <a-input :placeholder="$t('Название на узбекском языке')" v-model="form.title.uz" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item :label="$t('category.create.Min_investment_amount')" prop="min_investment_amount">
                    <a-input min="0" type="number" :placeholder="$t('category.create.Min_investment_amount')" v-model="form.min_investment_amount" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item :label="$t('category.create.Max_investment_amount')" prop="max_investment_amount">
                    <a-input min="0" type="number" :placeholder="$t('category.create.Max_investment_amount')" v-model="form.max_investment_amount" />
                  </a-form-model-item>
                </a-col>
                <a-col span="8">
                  <a-form-model-item :label="$t('category.create.Percents')" prop="min_percent">
                    <a-input-group compact>
                      <a-input min="0" type="number" v-model="form.min_percent" style=" width: 45%; text-align: center" :placeholder="$t('minimum')" />
                      <a-input
                        style=" width: 10%; border-left: 0; pointer-events: none; backgroundColor: #fff"
                        placeholder="~"
                        disabled
                      />
                      <a-input type="number" v-model="form.max_percent" style="width: 45%; text-align: center; border-left: 0" :placeholder="$t('maximum')" />
                    </a-input-group>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-card>
          </a-tab-pane>
        </a-tabs>
        <!-- <a-row>
          <a-col span="24">
            <a-form-model-item label=" ">
              <a-row type="flex" justify="end">
                <a-col span="auto">
                  <a-button @click="cancelPost" type="grey" style="margin-right: 6px">{{
                    $t('button.cancel')
                  }}</a-button>
                  <a-button @click="postCategory" v-if="isNewForm" type="primary">{{ $t('button.create') }}</a-button>
                  <a-button @click="updateCategory" v-else type="primary">{{ $t('button.save') }}</a-button>
                </a-col>
              </a-row>
            </a-form-model-item>
          </a-col>
        </a-row> -->
      </a-form-model>
    </a-card>
    <a-row class="edit-btns mt-4">
      <a-col span="24">
        <a-form-model-item>
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button @click="cancelPost" type="grey" style="margin-right: 6px">{{
                $t('button.cancel')
              }}</a-button>
              <a-button @click="postCategory" v-if="isNewForm" type="primary">{{ $t('button.create') }}</a-button>
              <a-button @click="updateCategory" v-else type="primary">{{ $t('button.save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ruleForm from './ruleForm'
export default {
  data () {
    return {
      isNewForm: false,
      form: {
        lang: '',
        max_investment_amount: null,
        min_investment_amount: null,
        title: {
          en: '',
          ru: '',
          uz: ''
        },
        max_percent: null,
        min_percent: null
      },
      rules: ruleForm
    }
  },
    watch: {
    'form.min_percent' (e) {
      if (parseInt(e) >= parseInt(this.form.max_percent)) this.form.min_percent = this.form.max_percent - 1
    },
     'form.max_percent' (e) {
        if (parseInt(e) === parseInt(this.form.min_percent)) this.form.min_percent = this.form.max_percent - 1
     },
      'form.min_investment_amount' (e) {
      if (parseInt(e) >= parseInt(this.form.max_investment_amount)) this.form.min_investment_amount = this.form.max_investment_amount - 1
      console.log(e)
    },
     'form.max_investment_amount' (e) {
        if (parseInt(e) === parseInt(this.form.min_investment_amount)) this.form.min_investment_amount = this.form.max_investment_amount - 1
     }
  },
  methods: {
    callback () {

    },
    checkPost () {
      let flag = null
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          flag = true
          return true
        } else {
          flag = false
          return false
        }
      })
      return flag
    },
    postCategory () {
      if (this.checkPost() === false) return -1
      console.log(this.stringToInt())
      this.$store.dispatch('postCategory', this.stringToInt()).then((res) => {
        console.log(res)
        this.$alertMessage('success', 'Tutor', 'Tutor added successfully', this)
        this.$router.go(-1)
      }).catch(er => {
      this.$message.error(er)
        })
    },
    getCategory (id) {
      this.$store.dispatch('getCategory', id).then((res) => {
        console.log(res)
        this.form = res.category
      }).catch(er => {
        this.$message.error(er)
        })
    },
    stringToInt () {
      return { ...this.form,
        min_investment_amount: parseInt(this.form.min_investment_amount),
        max_investment_amount: parseInt(this.form.max_investment_amount),
        max_percent: parseInt(this.form.max_percent),
        min_percent: parseInt(this.form.min_percent)
      }
    },
    updateCategory () {
      if (this.checkPost() === false) return -1
      console.log(this.stringToInt())
      this.$store.dispatch('updateCategory', this.stringToInt()).then((res) => {
        this.$alertMessage('success', 'Category', 'Category has Успешно обновлено', this)
        this.$router.go(-1)
      }).catch(er => {
        this.$message.error(er)
        })
    },
    cancelPost () {
      this.$router.go(-1)
    }
  },
  created () {
    if (this.$isEmptyObj(this.$route.params)) {
      this.isNewForm = true
    } else this.getCategory(this.$route.params.id)
  }
}
</script>

<style>
</style>
