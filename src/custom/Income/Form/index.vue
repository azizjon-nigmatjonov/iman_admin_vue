<template>
  <div>
    <a-navigation :list="[{ name: $t('Приход'), link: '/income/list'}, { name: $t('3аявки'), link: '' }]" :isBack="{ flag: true, return: true }" noBorder/>
    <a-card class="no-space-tab">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" :tab="$t('Основной')">
          <a-card>

            <a-card :title="$t('Клиент (ФИО)')" class="no-border-head no-space-tab">
              <a-row :gutter="16" v-if="installment.customer && installment.customer.passport">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('First_name')" prop="min_investment_amount">
                    <a-input :value="installment.customer.passport.first_name" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('Last_name')" prop="min_investment_amount">
                    <a-input :value="installment.customer.passport.last_name" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('patronymic')" prop="min_investment_amount">
                    <a-input :value="installment.customer.passport.patronymic" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-card>
            <a-form-model>
              <a-row :gutter="16">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Дата создания'" prop="min_investment_amount">
                    <a-date-picker
                      show-time
                      placeholder="Select Time"
                      v-model="installment.created_at"
                      :format="$dateTimeFormat"
                      disabled
                      style="width: 100%"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('contract_number')" prop="min_investment_amount">
                    <a-input :value="$t(installment.contract_number)" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Сумма рассрочки'" prop="min_investment_amount">
                    <a-input-number
                      v-model="installment.installment_amount"
                      disabled
                      :formatter="value => value.replace(/(?=(\d{3})+(?!\d))/g, ' ')"
                      :parser="value => value.replace(/\s?|(,*)/g, '')"
                      style="width: 100%"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Количество месяцев срока'" prop="min_investment_amount">
                    <a-input-number v-model="installment.expiry_month_count" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Статус'" prop="min_investment_amount">
                    <a-input :value="$t(installment.status)" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Менеджер (Пос агент Имя)'" prop="min_investment_amount">
                    <a-input :value="installment.pos_agent.first_name + ' ' + installment.pos_agent.last_name" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="12" :md="12">
                  <a-form-model-item :label="'Подразделение (Название филиала)'" prop="min_investment_amount">
                    <a-input :value="installment.merchant.merchant.name + ' / ' + installment.merchant.merchant_branch.name" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
              </a-row>

            </a-form-model>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('Дополнительно')">
          <a-card>
            <a-form-model>
              <a-row :gutter="16">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Дата счет фактуры'" prop="min_investment_amount">
                    <a-date-picker
                      show-time
                      placeholder="Select Time"
                      v-model="installment.invoice_date"
                      :format="$dateTimeFormat"
                      disabled
                      style="width: 100%"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Номер счет фактуры'" prop="min_investment_amount">
                    <a-input :value="installment.invoice_number" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="12" :md="12">
                  <a-form-model-item :label="'Менеджер (Пос агент Имя)'" prop="min_investment_amount">
                    <a-input :value="installment.pos_agent.first_name + ' ' + installment.pos_agent.last_name" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
              </a-row>

            </a-form-model>
          </a-card>
        </a-tab-pane>
        <!-- <a-tab-pane key="3" :tab="$t('repaymentSchedule')">
          <a-card>
            <a-table :columns="columns" :data-source="repaymentSchedule" :pagination="false">
              <span slot="status" slot-scope="text">
                <a-tag v-if="text" :color="getColor(text)">{{ getStatus(text) }}</a-tag>
                <span v-else></span>
              </span>
              <span slot="date" slot-scope="text, rec">
                <b v-if="rec.overall">
                  {{ getDateOrText(text) }}
                </b>
                <span v-else>
                  {{ getDateOrText(text) }}
                </span>
              </span>
              <span slot="amount" slot-scope="text"> {{ $moneyFormat(text) }}</span>
              <span slot="money" slot-scope="text">
                {{ $moneyFormat(+text) }}
              </span>
            </a-table>
          </a-card>
        </a-tab-pane> -->
        <a-tab-pane key="4" :tab="$t('Товары')">
          <a-card>
            <a-table
              :row-key="record => record.guid"
              bordered
              :scroll="{ x: 2000, y: 700 }"
              :pagination="false"
              :columns="columns1"
              :data-source="account"
              :loading="productsLoading"
              :customRow="customRowClick"
            >
              <span slot="created_at" slot-scope="text"> {{ text.created_at | moment($dateFormat) }}</span>
              <span slot="invoice_date" slot-scope="text"> {{ text.invoice_date | moment($dateFormat) }}</span>
              <span slot="verified" slot-scope="text"> {{ verify(text.verified) }}</span>
              <span slot="responsible_person" slot-scope="text"> {{ text && userName }}</span>
              <span slot="products" slot-scope="text"> {{ text.products_count }} </span>
              <span slot="actions" slot-scope="" class="span">
                <a-tooltip placement="bottomLeft" :title="$t('button.add')">
                  <a-button class="mx-1" @click.native.stop="ok" type="primary" icon="plus" />
                </a-tooltip>
              </span>
            </a-table>
          </a-card>
        </a-tab-pane>
        <!-- <a-tab-pane key="5" :tab="$t('statusChangeHistory')">
          <logs-tab></logs-tab>
        </a-tab-pane> -->
        <!-- <a-tab-pane key="54" :tab="$t('Scoring')">
          <a-card>
            <katmTable />
          </a-card>
        </a-tab-pane> -->
      </a-tabs>
      <a-modal
        v-if="accounts"
        v-model="visible"
        :title="$t('addInvoice')"
        @ok="addInvoice"
        @cancel="handleCancel"
        on-ok="handleOk"
      ><template>
        <a-form-model :span="12" :colon="false">
          <a-col style="padding: 0 15px">
            <a-form-model-item :label="$t('invoice_date')" prop="invoice_date">
              <a-date-picker v-model="invoice_date" :format="$dateFormat" />
            </a-form-model-item>
          </a-col>
          <a-col style="padding: 0 15px">
            <a-form-model-item :label="$t('invoice_number')" prop="invoice_number">
              <a-input v-model="invoice_number" />
            </a-form-model-item>
          </a-col>
        </a-form-model>
      </template>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import imageUpload from '@/mixins/imageUpload'
// import katmTable from './katmTable'
import images from '../../../assets/icons/image.svg'
import docs from '../../../assets/icons/docs.svg'
import moment from 'moment'
import LogsTab from './LogsTab'
// import { downloadfile } from '@/utils/request'
export default {
  mixins: [imageUpload],
  components: { images, docs, LogsTab },
  data () {
    return {
      imageFile: '',
      visibleImage: false,
      repaymentSchedule: [],
      previewVisiblePhoto: false,
      previewImagePhoto: '',
      previewVisiblePass: false,
      previewImagePass: '',
    visible: false,
    visible1: false,
    wingsData: {},
    userName: '',
    link: 'https://view.officeapps.live.com/op/embed.aspx?src=',
    installment: {},
    file1: '',
    file2: '',
    file3: '',
    customerFiles: [],
    array0: [],
    array: {},
    array1: {},
    array2: {},
    repayment_schedule: [],
    additional_contacts: [],
    verified: true,
    phone_number: '',
    contract_number: '',
    created_at: '',
    installment_amount: 0,
    name: '',
    branch_name: '',
    invoice_date: '',
    invoice_number: '',
    commentary: '',
    guid: '',
    responsible_person: '',
    account: [],
    accounts: {},
    columns: [
      {
        title: this.$t('date'),
        dataIndex: 'date',
        scopedSlots: { customRender: 'date' },
        key: 'date'
      },
      {
        title: this.$t('debtAmount'),
        dataIndex: 'amount',
        scopedSlots: { customRender: 'money' },
        key: 'debt'
      },
      {
        title: this.$t('interest'),
        dataIndex: 'interest',
        scopedSlots: { customRender: 'money' },
        key: 'interest'
      },
      {
        title: this.$t('amount'),
        scopedSlots: { customRender: 'amount' },
        dataIndex: 'sum',
        key: 'amount'
      },
      {
        title: this.$t('status'),
        scopedSlots: { customRender: 'status' },
        key: 'status'
      }
    ],
    columns0: [
      {
        title: 'Значок',
        scopedSlots: { customRender: 'icon' },
        key: 'icon'
      },
      {
        title: 'Имя файла',
        scopedSlots: { customRender: 'file' },
        key: 'file'
      },
      {
             title: this.$t('category.table.Actions'),
             scopedSlots: { customRender: 'actions' },
             key: 'actions',
             width: 220
      }
    ],
    columns2: [
      {
        title: this.$t('first_name'),
        dataIndex: 'first_name',
        key: 'first_name'
      },
      {
        title: this.$t('last_name'),
        dataIndex: 'last_name',
        key: 'last_name'
      },
      {
        title: this.$t('phone_number'),
        dataIndex: 'phone_number',
        key: 'phone_number'
      },
      {
        title: this.$t('whom'),
        dataIndex: 'family_relation.data.name_ru',
        key: 'family_relation.data.name_ru'
      }
    ],
    columns1: [
      {
        title: this.$t('Verified'),
        scopedSlots: { customRender: 'verified' },
        key: 'verified',
        width: 100
      },
      // {
      //   title: this.$t('Number'),
      //   dataIndex: 'guid',
      //   key: 'guid'
      // },
      {
        title: this.$t('contract_number'),
        dataIndex: 'contract_number',
        key: 'contract_number'
      },
       {
        title: this.$t('created at'),
        scopedSlots: { customRender: 'created_at' },
        width: 100,
        key: 'created_at'
      },
      {
        title: this.$t('products'),
        scopedSlots: { customRender: 'products' },
        key: 'products',
        width: 100
      },
       {
        title: this.$t('installment_amount'),
        dataIndex: 'installment_amount',
        key: 'installment_amount'
      },
       {
        title: this.$t('merchant'),
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: this.$t('merchant_branch'),
        dataIndex: 'branch_name',
        key: 'branch_name'
      },
      {
        title: this.$t('invoice_date'),
        scopedSlots: { customRender: 'invoice_date' },
        key: 'invoice_date'
      },
      {
        title: this.$t('invoice_number'),
        dataIndex: 'invoice_number',
        key: 'invoice_number'
      },
      {
        title: this.$t('responsible_person'),
        scopedSlots: { customRender: 'responsible_person' },
        key: 'responsible_person'
      },
      {
        title: this.$t('commentary'),
        dataIndex: 'commentary',
        key: 'commentary'
      },
       {
        title: this.$t('category.table.Actions'),
        scopedSlots: { customRender: 'actions' },
        key: 'actions',
        width: 100
      }
    ],
    photoFiles: [],
    passportFiles: [],
    uploadingImage: false,
    uploadingImagePass: false,
    productsLoading: false
    }
  },
  computed: {
    ...mapGetters(['system_users'])
  },
  methods: {
      customRowClick (record) {
          return {
            on: {
                click: (event) => {
                   this.$router.push({ name: 'income-product-list', params: { id: record.guid } })
                }
            }
        }
      },
    uploadImage (data) {
        this.uploadingImage = true
        this.$uploadImage(data.file, this.photoFiles, this)
        .then(() => {
            this.uploadingImage = false
        })
        .catch(() => {
            this.uploadingImage = false
        })
    },
    handleChange ({ photoFiles }, type) {
        if (photoFiles.length === 0) { this[type ? 'photoFiles' : 'passportFiles'] = photoFiles }
    },
    async handlePreview (file, type) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        this[type ? 'previewImagePhoto' : 'previewImagePass'] = file.url || file.preview
        this[type ? 'previewVisiblePhoto' : 'previewVisiblePass'] = true
    },
    getDateOrText (text) {
      return text | moment(this.$dateFormat) ? moment(this.$dateFormat) : text
    },
    getInquiry () {
      this.$store.dispatch('getInquiryData', { id: this.$route.params.id })
      .then(res => {
          this.wingsData = res
      })
    },
    go (e) {
      console.log('e', e)
      window.open(e.format !== 'photo' ? this.link + e.file : e.file, '_blank')
    },
    getColor (e) {
      if (e.status === 'not_paid') {
        return 'orange'
      }
      if (e.status === 'paid') {
        return 'green'
      }
      if (e.status === 'not_fully_paid') {
        return 'yellow'
      }
      if (e.status === 'fully_paid') {
        return 'cyan'
      }
    },
    getStatus (e) {
      console.log(e)
      if (e.status === 'not_paid') {
        return 'Не оплачено'
      }
      if (e.status === 'not_fully_paid') {
        return 'Полностью не оплачен'
      }
      if (e.status === 'fully_paid') {
        return 'Полностью оплачен'
      }
      if (e.status === 'paid') {
        return 'Оплачено'
      }
    },
    Nullcheck (elem, arrAtt) {
      if (arrAtt.length > 1) {
        return elem[arrAtt[0]] && this.Nullcheck(elem[arrAtt[0]], arrAtt.slice(1)) || null
      } else {
        return elem[arrAtt[0]] || null
      }
    },
    getSystemUser () {
      this.$store.dispatch('getSystemUser', this.responsible_person).then((res) => {
        this.userName = res.name
      })
      return this.userName
    },
    verify (ver) {
      if (ver === true) {
        return 'Да'
      } else {
        return 'Нет'
      }
    },
    how () {
      console.log('I am working')
    },
    getSingleScoring (guid) {
      this.$store.dispatch('getSingleScoring', this.$route.params.id).then(res => {
        console.log(res)
        this.installment = res.installment
        const imageList = Object.entries(res.installment.attachments).pop()[1].map(el => ({ file: el, key: el, format: 'photo' }))
        // const imageList = []
        const imgExtensions = ['svg', 'png', 'jpg', 'jpeg']
        const { files, ...others } = res.installment.attachments
        this.array0 = Object.entries(others).map(el => {
          const exten = el[1].split('.').pop()
          return {
            file: el[1],
            title: el[1].split('/').pop(),
            key: Math.random(),
            format: exten.includes('doc') ? 'doc' : (
              exten.includes('pdf') ? 'pdf' : (
                exten.includes('xls') ? 'excel' : (
                  imgExtensions.includes(exten) ? 'photo' : 'file'
                )
              )
            )
          }
        }).filter(el => el)
        this.getInstallmentCustomerFiles(this.installment.customer.customer_id)
        this.array0 = [...this.array0, ...imageList]
        // this.repayment_schedule = this.installment.repayment_schedule.map(ek => ({ ...ek, key: Math.random() * 300 }))
        this.additional_contacts = this.installment.customer.additional_contacts.map(ek => ({ ...ek, key: Math.random() * 400 }))
        this.verified = this.installment.verified
        this.phone_number = this.installment.customer.personal_info.phone_number
        this.contract_number = this.installment.contract_number
        this.created_at = this.installment.created_at
        this.installment_amount = this.installment.installment_amount
        this.name = this.installment.merchant.merchant.name
        this.branch_name = this.installment.merchant.merchant_branch.name
        this.invoice_date = this.installment.invoice_date
        this.invoice_number = this.installment.invoice_number
        this.commentary = this.installment.invoice_number
        this.guid = this.installment.guid
        this.responsible_person = this.installment.responsible_person
        this.getSystemUser()
        this.accounts.verified = this.verified
        this.accounts.responsible_person = this.responsible_person
        this.accounts.phone_number = this.phone_number
        this.accounts.contract_number = this.contract_number
        this.accounts.created_at = this.created_at
        this.accounts.installment_amount = this.installment_amount
        this.accounts.name = this.name
        this.accounts.branch_name = this.branch_name
        this.accounts.invoice_date = this.invoice_date
        this.accounts.invoice_number = this.invoice_number
        this.accounts.commentary = this.commentary
        this.accounts.guid = this.guid
        this.accounts.products_count = this.installment.products && this.installment.products.length || 0
        this.account.push(this.accounts)
        this.photoFiles = [
          {
            uid: this.installment.customer.passport.photo_document.split('/').pop(),
            url: this.installment.customer.passport.photo_document,
            status: 'done',
            name: this.installment.customer.passport.photo_document
          }
        ]
        this.passportFiles = [
          {
            uid: this.installment.customer.passport.passport_photo.split('/').pop(),
            url: this.installment.customer.passport.passport_photo,
            status: 'done',
            name: this.installment.customer.passport.passport_photo
          }
        ]
        this.fileList = [{ uid: res.installment.attachments.file_name_3.split('/').pop(), url: res.installment.attachments.file_name_3, status: 'done', name: res.installment.attachments.file_name_3 }]
      })
    },
    getRepaymentSchedule () {
      this.$store.dispatch('getRepaymentSchedule', this.$route.params.id).then((res) => {
        // console.log('Repayment ', res)
        this.repaymentSchedule = res.repayment_schedule && res.repayment_schedule[0].repayment
        if (this.repaymentSchedule.length) {
          let amountSum = 0
          let interestSum = 0
          const hasNotPaidMonth = this.repaymentSchedule.some(item => item.status === 'not_paid')
          this.repaymentSchedule = this.repaymentSchedule.map(item => {
            amountSum += item.amount
            interestSum += item.interest
            return {
              ...item,
              sum: (+item.amount) + (+item.interest)
            }
          })
          this.repaymentSchedule.push({
            date: 'Итого:',
            overall: true
          })
          this.repaymentSchedule.push({
            date: `${ res.repayment_schedule[0].months } ${ this.$t('months') }`,
            amount: amountSum,
            interest: interestSum,
            sum: interestSum + amountSum,
            status: hasNotPaidMonth ? 'not_fully_paid' : 'fully_paid'
          })
        }
        // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)
        // this.$alertMessage('success', 'Accepted', 'Scoring has accepted successfully', this)
        // this.$router.go(-1)
      }).catch(reject => {
        console.log(reject.response.data)
        // this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    getInstallmentCustomerFiles (id) {
      this.$store.dispatch('getInstallmentCustomerFiles', id).then((res) => {
        const imgExtensions = ['svg', 'png', 'jpg', 'jpeg']
        this.customerFiles = Object.entries(res).map(el => {
          const exten = el[1].split('.').pop()
          return {
            file: el[1],
            title: el[1].split('/').pop(),
            key: Math.random(),
            format: exten.includes('doc') ? 'doc' : (
              exten.includes('pdf') ? 'pdf' : (
                exten.includes('xls') ? 'excel' : (
                  imgExtensions.includes(exten) ? 'photo' : 'file'
                )
              )
            )
          }
        })
      }).catch(reject => {
        console.log(reject.response.data)
        // this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    async download (e) {
      console.log(e)
      await fetch(e.file).then(response => response.blob()).then(data => {
        console.log(data)
        const fileLink = document.createElement('a')
        fileLink.href = window.URL.createObjectURL(new Blob([data]))
        fileLink.setAttribute('download', e.format === 'photo' ? `image.jpg` : e.file)
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    ok () {
      this.visible = true
    },
    acceptScore (guid) {
      this.$store.dispatch('acceptScoring', this.$route.params.id).then((res) => {
        // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)
        this.$alertMessage('success', 'Accepted', 'Scoring has accepted successfully', this)
        this.$router.go(-1)
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    dust () {
      return {
        id: this.installment.guid,
        data: {
          invoice_date: this.invoice_date,
          invoice_number: this.invoice_number
        }
      }
    },
    addInvoice () {
      console.log(this.dust())
      this.productsLoading = true
      this.$store.dispatch('addInvoice', this.dust()).then((res) => {
        // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)
        this.$message.success('Invoice has added successfully')
        this.visible = false
      })
      .finally(() => {
        this.productsLoading = false
      })
    },
    rejectScore (guid) {
      this.$store.dispatch('rejectScoring', this.$route.params.id).then((res) => {
        // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)
        this.$alertMessage('success', 'Rejected', 'Scoring has rejected successfully', this)
        this.$router.go(-1)
      })
    },
    startScoring (item) {
      this.$store.dispatch('startScoring', item.guid).then((res) => {
        console.log(res)
        console.log(item)
        item.scoring_status = res.status
        this.$alertMessage('success', 'Accepted', 'Scoring has started successfully', this)
        this.$router.go(-1)
      })
    }
  },
  created (guid) {
    this.getSingleScoring(guid)
    this.getRepaymentSchedule()
    this.getInquiry()
  }

}
</script>

<style scoped>
 .first {
  margin-bottom: 30px;
  overflow: hidden;
 }
 .buttons {
   display: flex;
   justify-content: flex-end;
 }
 .mx {
   margin: 0 5px;
 }
 .mx4{
   width: 150px;
   padding: 0 10px;
 }
 .files {
   display: flex;
   justify-content: space-between;
 }
</style>
