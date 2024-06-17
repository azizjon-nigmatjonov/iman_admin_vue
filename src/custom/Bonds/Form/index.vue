<template>
  <a-card>
    <a-row type="flex">
      <a-col :span="24">
        <a-divider orientation="left">{{ $t('Form') }}</a-divider>
        <a-form-model :colon="false" ref="ruleForm" :model="form" :rules="rules">
          <a-row type="flex" class="form-row" :gutter="[16, 0]">
            <a-col span="8">
              <a-form-model-item ref="name" label="First name" prop="customer.first_name">
                <a-input
                  placeholder="first name"
                  v-model="form.customer.first_name"
                />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Last name" prop="customer.last_name">
                <a-input v-model="form.customer.last_name" placeholder="Адрес электронной почты" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="patronymic" prop="customer.patronymic">
                <a-input placeholder="patronymic" v-model="form.customer.patronymic" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Birthday" prop="customer.birthday">
                <a-input type="number" placeholder="birthday" v-model="form.customer.birthday" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Телефонный номер" prop="customer.phone_number">
                <a-input placeholder="Телефон репетитора" v-model="form.customer.phone_number" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Office number" prop="customer.work_phone_number">
                <a-input placeholder="Телефон репетитора" v-model="form.customer.work_phone_number" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Card number" prop="customer.card_number">
                <a-input placeholder="Телефон репетитора" v-model="form.customer.card_number" />
              </a-form-model-item>
            </a-col>
            <a-divider orientation="left">Образование и работа</a-divider>
            <a-col span="8">
              <a-form-model-item label="Job organization" prop="customer.job_organization">
                <a-input placeholder="Job organization" v-model="form.customer.job_organization" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Address registration" prop="customer.address_registration">
                <a-input placeholder="Address registration" v-model="form.customer.address_registration" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Education" prop="customer.education">
                <a-input placeholder="Education" v-model="form.customer.education" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Profession" prop="customer.profession">
                <a-input placeholder="Education" v-model="form.customer.profession" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Score" prop="customer.score">
                <a-input type="number" placeholder="Score" v-model="form.customer.score" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Children" prop="customer.childrens">
                <a-input type="number" placeholder="Children" v-model="form.customer.childrens" />
              </a-form-model-item>
            </a-col>
            <a-divider orientation="left">Дополнительные поля</a-divider>
            <a-col span="8">
              <a-form-model-item label="Expire date" prop="expiry_date">
                <a-input type="number" placeholder="Expire date" v-model="form.expiry_date" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Expire month" prop="expiry_month_count">
                <a-input type="number" placeholder="Children" v-model="form.expiry_month_count" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Installment ammount" prop="installment_amount">
                <a-input type="number" placeholder="Children" v-model="form.installment_amount" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Price in merchant" prop="price_in_merchant">
                <a-input type="number" placeholder="Price in merchant" v-model="form.price_in_merchant" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Markup percents" prop="percent_markup">
                <a-input type="number" placeholder="Price in merchant" v-model="form.percent_markup" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Per month amount" prop="per_month_amount">
                <a-input type="number" placeholder="Price in merchant" v-model="form.per_month_amount" />
              </a-form-model-item>
            </a-col>
            <a-divider orientation="left">Категории и комментарии</a-divider>
            <a-col span="8">
              <a-form-model-item label="Data list">
                <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit">
                  <a-tab-pane v-for="pane in form.data" :key="pane.key" :tab="pane.name" :closable="pane.closable">
                    <a-select style="width: 100%" v-model="pane.category.id">
                      <a-select-option v-for="(item, i) in categories" :key="i" :value="item.id" >
                        {{ item.title }}
                      </a-select-option>
                    </a-select>
                    <a-input class="my-1" v-model="pane.name" placeholder="Title"></a-input>
                    <a-input class="my-1" v-model="pane.description" placeholder="Description"></a-input>
                  </a-tab-pane>
                </a-tabs>
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item label="Descriptio" prop="commentary">
                <a-textarea
                  v-model="form.commentary"
                  placeholder="Commentary"
                  :auto-size="{ minRows: 10, maxRows: 10 }"
                />
              </a-form-model-item>
            </a-col>
            <a-col span="24">
              <a-form-model-item label=" ">
                <a-row type="flex" justify="end">
                  <a-col span="auto">
                    <a-button @click="cancelPost" type="grey" style="margin-right: 6px">{{
                      $t('button.cancel')
                    }}</a-button>
                    <a-button @click="postBonds" v-if="isNewForm" type="primary">{{ $t('button.create') }}</a-button>
                    <a-button @click="updateBonds" v-else type="primary">{{ $t('button.save') }}</a-button>
                  </a-col>
                </a-row>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import rule from './formRules'
console.log(rule)
export default {
  data () {
    return {
      activeKey: '',
      panes: [],
      newTabIndex: 0,
      categories: [],
      fileList: [],
      isNewForm: false,
      previewImage: '',
      previewVisible: false,
      form: {
        bond_date: 'string',
        commentary: 'string',
        customer: {
          address_registration: 'string',
          birthday: 'string',
          card_number: 'string',
          childrens: 0,
          education: 'string',
          first_name: 'string',
          id: 0,
          job_organization: 'string',
          last_name: 'string',
          patronymic: 'string',
          phone_number: 'string',
          profession: 'string',
          score: 0,
          work_phone_number: 'string'
        },
        data: [
          {
            description: 'string',
            image_url: 'string',
            name: 'tab',
            id: 0,
            key: Math.random() * 300,
            category: {
              id: '',
              name: ''
            }
          }
        ],
        expiry_date: 'string',
        expiry_month_count: 0,
        installment_amount: 0,
        per_month_amount: 0,
        percent_markup: 0,
        price_in_merchant: 0
      },
      rules: rule
    }
  },
  methods: {
    uploadImage (data) {
      this.$uploadImage(data.file, this.fileList, this)
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await this.$getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      if (fileList.length === 0) {
        this.fileList = fileList
      }
    },
    getCategories () {
          this.$store.dispatch('getCategories').then(res => {
            console.log(res)
            this.categories = res.categories
          }).catch(err => console.log(err))
    },
     callback (key) {
      console.log(key)
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    add () {
      const panes = this.form.data
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push(
        {
            description: '',
            image_url: '',
            name: 'tab',
            id: 0,
            category: {
              id: null,
              name: ''
            },
          key: activeKey
        })
      this.form.data = panes
      this.activeKey = activeKey
    },
    remove (targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
    },
    checkPost () {
      let flag = null
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          flag = true
          return true
        } else {
          flag = false
          console.log('error submit!!')
          return false
        }
      })
      return flag
    },
    postBonds () {
      if (this.checkPost() === false) {
        return -1
      }
      this.form.image = {
        url: '',
        uuid: this.fileList[0].uid
      }
      const data = this.form.links.map((el) => el.link)
      this.form.links = data
      this.$store.dispatch('postBonds', this.form).then((res) => {
        console.log(res)
        this.$alertMessage('success', 'Bond', 'Bond added successfully', this)
        this.$router.go(-1)
      })
    },
    getBonds (id) {
      this.$store.dispatch('getBonds', id).then((res) => {
        console.log(res)
        this.form = res.tutor
        this.fileList = [
          { uid: res.tutor.image.uuid, status: 'done', name: res.tutor.image.url, url: res.tutor.image.url }
        ]
        this.form.links = res.tutor.links.map((el) => ({ link: el }))
      })
    },
    updateBonds () {
      if (this.checkPost() === false) {
        return -1
      }
      this.form.image = {
        url: this.fileList[0].url,
        uuid: this.fileList[0].uid
      }
      this.form.links = this.form.links.map((el) => el.link)
      this.$store.dispatch('updateBonds', this.form).then((res) => {
        this.$alertMessage('success', 'Tutor', 'Tutor has Успешно обновлено', this)
        // this.$refs.ruleForm.resetFields()
        this.$router.push('/users/tutors')
      })
    },
    cancelPost () {
      this.$router.go(-1)
    },
    handleSubmit (e) {
      console.log(e)
    }
  },
  created () {
    this.getCategories()
    if (this.$isEmptyObj(this.$route.params)) {
      this.isNewForm = true
      this.activeKey = this.form.data[0].key
      this.form.links = [{ link: '' }]
    } else this.getTutor(this.$route.params.id)
  }
}
</script>

<style>
</style>
