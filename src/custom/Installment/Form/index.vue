<template>
  <div>
    <div class="navbar" >
      <a-navigation style="white-space: nowrap" :list="[{ name: $t('3аявки'), link: '/installment/list'}, { name: $t('Детали'), link: '' }]" :isBack="{ flag: true, return: true }" noBorder/>
      <a-button v-if="!installment.is_deleted" @click="deleteBond" type="danger">{{ $t('delete_bond') }}</a-button>
      <a-button v-else @click="restoreBond" type="primary">{{ $t('Восстановить') }}</a-button>
    </div>
    <a-card class="no-space-tab">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" :tab="$t('Детали рассрочки')">
          <a-card :title="$t('Детали рассрочки')" class="no-border-card">
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
                  <a-form-model-item :label="'Стоимость товара'" prop="min_investment_amount">
                    <a-input-number
                      v-model="installment.shelf_price"
                      disabled
                      style="width: 100%"
                      :formatter="value => value.replace(/(?=(\d{3})+(?!\d))/g, ' ')"
                      :parser="value => value.replace(/\s?|(,*)/g, '')"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Количество месяцев срока'" prop="min_investment_amount">
                    <a-input-number v-model="installment.period_month_count" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Статус'" prop="min_investment_amount">
                    <a-input :value="installment.status" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Статус автопогашение'" prop="min_investment_amount">
                    <a-input :value="installment.auto_payment ? 'Активный' : 'Неактивный'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col v-if="installment.reject_reason" :lg="8" :md="12">
                  <a-form-model-item :label="'Причина отказа'" prop="min_investment_amount">
                    <a-input :value="$t(installment.reject_reason)" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('discount')" prop="min_investment_amount">
                    <a-input :value="$t(installment.discount ? installment.discount : '0') + '%'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('markup')" prop="min_investment_amount">
                    <a-input :value="$t(installment.markup ? installment.markup : '0') + '%'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'downpayment'" prop="min_investment_amount">
                    <a-input :value="$t(installment.downpayment)" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <!-- <a-col v-if="installment.installment_amount" :lg="8" :md="12">
                  <a-form-model-item :label="'installment_amount'" prop="min_investment_amount">
                    <a-input :value="$t(installment.installment_amount)" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col v-if="installment.shelf_price" :lg="8" :md="12">
                  <a-form-model-item :label="'shelf_price'" prop="min_investment_amount">
                    <a-input :value="$t(installment.shelf_price)" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col> -->
              </a-row>
            </a-form-model>
          </a-card>
        </a-tab-pane>
        <!-- <a-tab-pane key="3" :tab="$t('repaymentSchedule')">
          <repayment-schedule-tab :status="installment.status" :is_edited="installment.is_edited" ref="repaymentSheduleRef" />
        </a-tab-pane> -->
        <!-- <a-tab-pane key="9" :tab="$t('installmentTransactions')">
          <transaction-tab :contractNumber="contract_number" @updateSchedule="updateRepaymentSchedule" />

        </a-tab-pane> -->
        <a-tab-pane key="4" :tab="$t('Товары')">
          <a-card>
            <a-table
              :row-key="record => record.guid"
              bordered
              :pagination="false"
              :columns="columns1"
              :data-source="account"
            >
              <span slot="created_at" slot-scope="text"> {{ text.created_at | moment($dateFormat) }}</span>
              <span slot="invoice_date" slot-scope="text"> {{ text.invoice_date | moment($dateFormat) }}</span>
              <span slot="verified" slot-scope="text"> {{ verify(text.verified) }}</span>
              <span slot="responsible_person" slot-scope="text"> {{ getSystemUser(text.responsible_person) }}</span>
              <span slot="products" slot-scope="text"> {{ text.products_count }} </span>
              <span slot="actions" slot-scope="" class="span">
                <a-tooltip placement="bottomLeft" :title="$t('button.add')">
                  <a-button class="mx-1" @click.native.stop="ok" type="primary" icon="plus" />
                </a-tooltip>
              </span>
            </a-table>
          </a-card>
        </a-tab-pane>
        <!-- <a-tab-pane key="a34" :tab="$t('Проводки')">
          <PostingsTab />
        </a-tab-pane> -->
        <a-tab-pane key="5" :tab="$t('statusChangeHistory')">
          <logs-tab></logs-tab>
        </a-tab-pane>
        <!-- <a-tab-pane key="6" :tab="$t('files')">
          <a-card>
            <h3 :style="{ marginBottom: '16px' }">
              {{ $t('documents') }}
            </h3>
            <a-list :data-source="array0">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta>
                  <span slot="title">{{ item.title }}</span>
                  <img slot="avatar" width="25" v-if="item.format === 'photo'" height="25" :src="require('../../../assets/icons/image.svg')" >
                  <img slot="avatar" width="25" v-else-if="item.format === 'pdf'" height="25" :src="require('@/assets/icons/pdf.svg')" >
                  <img slot="avatar" width="25" v-else-if="item.format === 'doc'" height="25" :src="require('@/assets/icons/word.svg')" >
                  <img slot="avatar" width="25" v-else-if="item.format === 'excel'" height="25" :src="require('@/assets/icons/excel.svg')" >
                  <img slot="avatar" width="25" v-else height="25" :src="require('../../../assets/icons/docs.svg')" >
                </a-list-item-meta>
                <div>
                  <a-row type="flex">
                    <a-col span="auto">
                      <a :href="item.file" target="blank" v-if="item.format === 'pdf'" :disabled="!item.file">
                        <icon-btn icon="eye" :tooltip="$t('button.preview')" />
                      </a>
                      <icon-btn v-else-if="item.format === 'doc' || item.format === 'docx'" icon="eye" @click="go(item)" :tooltip="$t('button.preview')" />
                      <icon-btn v-else icon="eye" @click="imageFile = item.file, visibleImage = true" :tooltip="$t('button.preview')" />
                    </a-col>
                    <a-col span="auto">
                      <icon-btn @click="download(item)" :tooltip="$t('button.download')" icon="download" color="green" />
                    </a-col>
                  </a-row>
                </div>
              </a-list-item>
            </a-list>
            <a-modal
              v-if="imageFile"
              v-model="visibleImage"
              :title="$t('Investor')"
              :footer="null"
              :width="700"
            >
              <center>
                <img :src="imageFile" :alt="imageFile.split('/').pop()" style="max-width: 100%;margin: 0 auto">
              </center>
            </a-modal>
            <h3 :style="{ marginBottom: '16px', marginTop: '20px' }">
              {{ $t('documentsOfClient') }}
            </h3>
            <a-list :data-source="customerFiles">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta>
                  <span slot="title">{{ item.title }}</span>
                  <img slot="avatar" width="25" v-if="item.format === 'photo' || item.format === 'png' || item.format === 'jpg'" height="25" :src="require('../../../assets/icons/image.svg')" >
                  <img slot="avatar" width="25" v-else-if="item.format === 'pdf'" height="25" :src="require('@/assets/icons/pdf.svg')" >
                  <img slot="avatar" width="25" v-else-if="item.format === 'doc'" height="25" :src="require('@/assets/icons/word.svg')" >
                  <img slot="avatar" width="25" v-else-if="item.format === 'excel'" height="25" :src="require('@/assets/icons/excel.svg')" >
                  <img slot="avatar" width="25" v-else height="25" :src="require('../../../assets/icons/docs.svg')" >
                </a-list-item-meta>
                <div>
                  <a-row type="flex">
                    <a-col span="auto">
                      <a :href="item.file" target="blank" v-if="item.format === 'pdf'" :disabled="!item.file">
                        <icon-btn icon="eye" :tooltip="$t('button.preview')" />
                      </a>
                      <icon-btn v-else-if="item.format === 'doc' || item.format === 'docx'" icon="eye" @click="go(item)" :tooltip="$t('button.preview')" />
                      <icon-btn v-else icon="eye" @click="imageFile = item.file, visibleImage = true" :tooltip="$t('button.preview')" />
                    </a-col>
                    <a-col span="auto">
                      <icon-btn @click="download(item)" :tooltip="$t('button.download')" icon="download" color="green" />
                    </a-col>
                  </a-row>
                </div>
              </a-list-item>
            </a-list>
          </a-card>
          <a-card v-if="status_list === 'agreement_accept' || status_list === 'done'">
            <div>
              <a-upload
                name="file"
                :customRequest="uploadFile"
                :file-list="[]"
              >
                <a-button > <a-icon :type="fileUploadLoading ? 'loading' : 'upload'" /> Click to Upload </a-button>
              </a-upload>
            </div>
          </a-card>
        </a-tab-pane> -->
        <a-tab-pane key="7" :tab="$t('wingsRequest')">
          <a-card class="no-border-card">
            <!-- <vue-json-pretty :data="wingsData.internal_request"> </vue-json-pretty> -->
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="8" :tab="$t('wingsResponse')">
          <a-card class="no-border-card">
            <!-- <vue-json-pretty :data="wingsData.wings_response"> </vue-json-pretty> -->
          </a-card>
        </a-tab-pane>
        <!-- <a-tab-pane key="54" :tab="$t('Scoring')">
          <a-card>
            <katmTable />
          </a-card>
        </a-tab-pane> -->
      </a-tabs>
      <a-modal
        v-if="this.accounts"
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
import katmTable from './katmTable'
import images from '../../../assets/icons/image.svg'
import docs from '../../../assets/icons/docs.svg'
import moment from 'moment'
import LogsTab from './LogsTab'
import TransactionTab from './TransactionTab.vue'
import RepaymentScheduleTab from './RepaymentScheduleTab.vue'
// import PostingsTab from './PostingsTab.vue'
// import { downloadfile } from '@/utils/request'
export default {
  mixins: [imageUpload],
  components: { katmTable, images, docs, LogsTab, TransactionTab, RepaymentScheduleTab },
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
    status_list: '',
    fileUploadLoading: false,
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
    columnsCard: [
      {
        title: this.$t('Card_number'),
        dataIndex: 'card_number',
        key: 'card_number'
      },
      {
        title: this.$t('card_expiry_month'),
        dataIndex: 'card_expiry_month',
        key: 'card_expiry_month'
      },
      {
        title: this.$t('card_expiry_year'),
        dataIndex: 'card_expiry_year',
        key: 'card_expiry_year'
      }
    ],
    columns1: [
      // {
      //   title: this.$t('Verified'),
      //   scopedSlots: { customRender: 'verified' },
      //   key: 'verified',
      //   width: 100
      // },
      // {
      //   title: this.$t('Number'),
      //   dataIndex: 'guid',
      //   key: 'guid'
      // },
      // {
      //   title: this.$t('contract_number'),
      //   dataIndex: 'contract_number',
      //   key: 'contract_number'
      // },
       {
        title: this.$t('created at'),
        scopedSlots: { customRender: 'created_at' },
        width: 200,
        key: 'created_at'
      },
      // {
      //   title: this.$t('products'),
      //   scopedSlots: { customRender: 'products' },
      //   key: 'products',
      //   width: 200
      // },
       {
        title: this.$t('name'),
        dataIndex: 'name',
        key: 'name'
      },
       {
        title: this.$t('installment_amount'),
        dataIndex: 'price',
        key: 'installment_amount',
        width: 200
      },
      {
        title: this.$t('quantity'),
        dataIndex: 'quantity',
        key: 'amount',
        width: 140
      }
      //  {
      //   title: this.$t('merchant'),
      //   dataIndex: 'name',
      //   key: 'name'
      // },
      // {
      //   title: this.$t('category'),
      //   dataIndex: 'category',
      //   key: 'category'
      // }
      // {
      //   title: this.$t('merchant_branch'),
      //   dataIndex: 'branch_name',
      //   key: 'branch_name'
      // },
      // {
      //   title: this.$t('invoice_date'),
      //   scopedSlots: { customRender: 'invoice_date' },
      //   key: 'invoice_date'
      // },
      // {
      //   title: this.$t('invoice_number'),
      //   dataIndex: 'invoice_number',
      //   key: 'invoice_number'
      // },
      // {
      //   title: this.$t('responsible_person'),
      //   scopedSlots: { customRender: 'responsible_person' },
      //   key: 'responsible_person'
      // },
      // {
      //   title: this.$t('commentary'),
      //   dataIndex: 'commentary',
      //   key: 'commentary'
      // },
      //  {
      //   title: this.$t('category.table.Actions'),
      //   scopedSlots: { customRender: 'actions' },
      //   key: 'actions',
      //   width: 100
      // }
    ],
    installmentTransactions: [],
    photoFiles: [],
    passportFiles: [],
    uploadingImage: false,
    uploadingImagePass: false
    }
  },
  watch: {
    visibleImage (newValue, oldValue) {
      if (!newValue) {
        this.imageFile = ''
      }
    },
    installment (newValue) {
      console.log('INSTSALLL ===>', this.installment)
    },
    array0 (val) {
      console.log('DOCS ==>', val)
    }
  },
  computed: {
    ...mapGetters(['system_users'])
  },
  methods: {
    getInstallmentTransactions () {
      this.$store.dispatch('getInstallmentTransactions', this.$route.params.id)
        .then((res) => {
            this.installmentTransactions = res.bond_payment
        })
    },
    deleteBond () {
      this.$store.dispatch('deleteBondSelf', this.$route.params.id)
        .then(res => {
          this.$alertMessage('success', this.$t('bond_deleted_successfully'), '', this)
          this.$router.push({ name: 'installment-list' })
        })
    },
    restoreBond () {
      this.$store.dispatch('restoreBond', { id: this.$route.params.id, data: this.installment })
        .then(res => {
          this.$alertMessage('success', this.$t('Bond restored successfully'), '', this)
          this.$router.push({ name: 'installment-list' })
        })
    },
    uploadFile (data) {
      this.fileUploadLoading = true
        const formData = new FormData()
        formData.append('file', data.file)
        console.log('file', data.file)
        // const url = await this.$getBase64(data.file)
        this.$store.dispatch('upload', formData).then(res => {
          this.$store.dispatch('addNewContract', { id: this.installment?.customer?.customer_id,
            guid: this.installment.guid,
            data: {
              file_name_1: '',
              file_name_2: '',
              file_name_3: res.filename
            }
          }).then(() => {
            this.array0.push({
              file: `https://test.cdn.iman.uz/iman/${res.filename}`,
              title: res.filename,
              key: res.filename,
              format: res.filename.split('.').pop()
            })
          })
        // this.media[0] = {
        //   uid: res.filename,
        //   name: res.filename,
        //   status: 'done',
        //   url: `${process.env.VUE_APP_CDN_URL}${res.filename}`
        // }
      }).catch(err => console.log(err))
      .finally(() => {
        this.fileUploadLoading = false
      })
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
    getSystemUser (id) {
      this.$store.dispatch('getSystemUser', id).then((res) => {
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
      this.$store.dispatch('getSingleScoringApp', this.$route.params.id).then(res => {
        console.log('single stor', res)
        this.installment = res
        this.status_list = res.installment.status
        const imgExtensions = ['svg', 'png', 'jpg', 'jpeg']
        const imageList = Object.entries(res.installment.attachments).pop()[1].map(el => {
          const exten = el.split('.').pop()
          return {
            file: el,
            key: el,
            title: el.split('/').pop(),
            format: exten?.includes('doc') ? 'doc' : (
              exten?.includes('pdf') ? 'pdf' : (
                exten?.includes('xls') ? 'excel' : (
                  imgExtensions.includes(exten) ? 'photo' : 'file'
                )
              )
            )
          }
        })
        // const imageList = []
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
        this.phone_number = this.installment.customer.personal_info?.phone_number
        this.contract_number = this.installment.contract_number
        // console.log('CREATED AT ===>', moment(this.installment.created_at).format('HH'))
        this.created_at = this.installment.created_at
        this.installment_amount = this.installment.installment_amount
        this.name = this.installment.merchant.merchant.name
        this.branch_name = this.installment.merchant.merchant_branch.name
        this.invoice_date = this.installment.invoice_date
        this.invoice_number = this.installment.invoice_number
        this.commentary = this.installment.invoice_number
        this.guid = this.installment.guid
        this.responsible_person = this.installment.responsible_person
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
        // this.account.push(this.accounts)
        this.installment.created_at = moment(this.installment.created_at).subtract(5, 'hours')
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
    getApplicationProducts () {
      this.$store.dispatch('getApplicationProducts', this.$route.params.id).then(res => {
        console.log('res producsts', res)
        this.account = res
      }).catch(reject => {
        //
      })
      .finally(() => {
        //
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
      this.$store.dispatch('addInvoice', this.dust()).then((res) => {
        // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)
        this.$message.success('Invoice has added successfully')
        this.visible = false
        location.reload()
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
    },
    updateRepaymentSchedule () {
      this.$refs.repaymentSheduleRef.getTableData()
    }
  },
  created (guid) {
    this.getInstallmentTransactions()
    this.getSingleScoring(guid)
    this.getInquiry()
    this.getApplicationProducts()
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
 /*.address_input{*/
 /*  min-width: 40vh;*/
 /*  max-width: 100vh;*/
 /*}*/

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding-right: 20px;
  }

</style>
