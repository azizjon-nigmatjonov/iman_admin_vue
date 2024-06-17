<template>
  <div >
    <a-navigation :list="[{ name: $t('Форма счета'), link: ''}]" :isBack="{ flag: true, link: '/merchants/list'}" />
    <a-card>
      <a-row type="flex">
        <a-col :span="15" :offset="2">
          <a-divider orientation="left">{{ $t('Form') }}</a-divider>
          <a-form-model :colon="false" ref="ruleForm" :model="form">
            <a-row class="form-row" :gutter="16">
              <a-col :span="24">
              </a-col>
              <a-col :span="24">
                <a-form-model-item :label="$t('Сумма к оплате')" prop="amount">
                  <a-input min="0" type="number" :placeholder="$t('Enter transfer amount')" v-model="form.amount" />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item :label="$t('Описание')" prop="max_investment_amount">
                  <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" :placeholder="$t('Описание')" v-model="form.description" />
                </a-form-model-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-model-item :label="$t('Merchants')" prop="category">
                  <a-select style="width: 100%" v-model="form.merchant_user_id">
                    <a-select-option v-for="item in merchant_users" :key="item.id" :value="item.id" >
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col> -->
              <!-- <a-col span="8">
              <a-form-model-item :label="$t('category.create.Lang')" style="padding: 50px'" prop="lang">
                <a-select
                  v-model="form.lang"
                >
                  <a-select-option v-for="item in $store.state.langs" :key="item.key" :value="item.key" >
                    {{ item.title }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col> -->
              <a-col span="24">
                <a-form-model-item label=" ">
                  <a-row type="flex" justify="end">
                    <a-col span="auto">
                      <a-button @click="cancelPost" type="grey" style="margin-right: 6px">{{
                        $t('button.cancel')
                      }}</a-button>
                      <a-button @click="postBilling" type="primary">{{ $t('Отправить') }}</a-button>
                      <!-- <a-button @click="updateCategory" v-else type="primary">{{ $t('button.save') }}</a-button> -->
                    </a-col>
                  </a-row>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isNewForm: false,
      merchant_users: {},
      form: {
        merchant_user_id: '',
        amount: null,
        description: ''
      }
    }
  },
  methods: {
    callback () {

    },
    getMerchantUsers () {
        this.$store.dispatch('getMerchantUsers').then(res => {
            console.log(res)
            this.merchant_users = res.merchant_users
        }).catch(er => {
    this.$message.error(er)
  })
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
    StringtoInt () {
     return {
        ...this.form,
        amount: parseInt(this.form.amount),
        merchant_user_id: this.$route.params.id
     }
    },
    postBilling () {
      if (this.checkPost() === false) return -1
      console.log(this.StringtoInt())
      this.$store.dispatch('postBilling', this.StringtoInt()).then((res) => {
        console.log(this.$route.params.id)
        this.$message.success('Billing sent successfully')
        this.$router.push('/merchants/list')
      }).catch(er => {
    this.$message.error(er.response.data.message)
  })
    },
    cancelPost () {
      this.$router.go(-1)
    }
  },
  created () {
    this.getMerchantUsers(this.$route.params.id)
    console.log(this.$route.params.id)
  }
}
</script>

<style>
</style>
