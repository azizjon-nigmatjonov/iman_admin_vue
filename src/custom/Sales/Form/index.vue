<template>
  <div>
    <a-navigation :list="[{ name: $t('Продажа'), link: '/sale/list'}, { name: $t('3аявки'), link: '' }]" :isBack="{ return: true, flag: true }" noBorder/>
    <a-card class="no-space-tab">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" :tab="$t('Основной')">
          <a-card>
            <a-form-model>
              <a-row :gutter="16" v-if="installment.guid">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('appliaction_id')" prop="min_investment_amount">
                    <a-input :value="$t(installment.appliaction_id)" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('customer_id')" prop="min_investment_amount">
                    <a-input :value="$t(installment.customer_id)" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('Гуид')" prop="min_investment_amount">
                    <a-input :value="$t(installment.guid)" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item label="Цена товара" prop="min_investment_amount">
                    <a-input-number
                      v-model="installment.shelf_amount"
                      disabled
                      :formatter="value => value.replace(/(?=(\d{3})+(?!\d))/g, ' ')"
                      :parser="value => value.replace(/\s?|(,*)/g, '')"
                      style="width: 100%"
                    />
                  </a-form-model-item>
                </a-col>
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
                    <a-input-number v-model="installment.period_month_count" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="'Статус'" prop="min_investment_amount">
                    <a-input :value="$t(installment.status)" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="a34" :tab="$t('Проводки')">
          <PostingsTab />
        </a-tab-pane>
        <a-tab-pane key="3" :tab="$t('repaymentSchedule')">
          <a-card>
            <a-table :scroll="{ x: 2000, y: 700 }" bordered :columns="columns" :data-source="repaymentSchedule" :pagination="false">
              <span slot="created_at" slot-scope="text">
                {{ text.created_at | moment($dateTimeFormat) }}
              </span>
              <span slot="monthly_fee" slot-scope="text">
                {{ $moneyFormat(text.monthly_fee) }}
              </span>
              <span slot="status" slot-scope="text">
                <a-tag v-if="text" :color="getColor(text)">{{ getStatus(text) }}</a-tag>
                <span v-else></span>
              </span>
              <span slot="principal_amount" slot-scope="text"> {{ $moneyFormat(text.principal_amount) }}</span>
              <span slot="interest_amount" slot-scope="text"> {{ $moneyFormat(text.interest_amount) }}</span>
              <span slot="total_amount" slot-scope="text">{{ $moneyFormat(text.principal_amount + text.interest_amount) }}</span>
            </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="9" :tab="$t('installmentTransactions')">
          <a-card>
            <a-table :columns="columnsTransactions" :data-source="installmentTransactions" :pagination="false">
              <span slot="payment_type" slot-scope="text">
                {{ $t(text) }}
              </span>
              <span slot="dateTime" slot-scope="text">
                {{ text | moment($dateTimeFormat) }}
              </span>
              <span slot="status" slot-scope="text">
                <a-tag :color="getStatusColor(text.status)">{{ text.status === 'done' ? 'Проверено' : $t(text.status) }}</a-tag>
              </span>
              <span slot="status" slot-scope="text">
                <a-tag :color="getStatusColor(text.status)">{{ text.status === 'done' ? 'Проверено' : $t(text.status) }}</a-tag>
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
          <a-card>
            <a-form-model ref="rulesTransection" :rules="rulesTransection" :model="newSaleForm" :colon="false">
              <a-col span="24" v-if="!newSalesActive">
                <a-form-model-item>
                  <a-row type="flex" justify="end">
                    <a-col span="auto">
                      <a-button @click="addNewOwner()">Добавить</a-button>
                    </a-col>
                  </a-row>
                </a-form-model-item>
              </a-col>
              <a-row type="flex" :gutter="[24,24]" justify="end">
                <a-col span="8" v-if="newSalesActive">
                  <a-form-model-item :label="$t('amount')" prop="amount">
                    <a-input-number style="width: 100%" type="number" place v-model="newSaleForm.amount"></a-input-number>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-col span="24" v-if="newSalesActive">
                <a-form-model-item>
                  <a-row type="flex" justify="end">
                    <a-col span="auto">
                      <a-button @click="postNewTransaction" type="primary">{{ $t('save') }}</a-button>
                    </a-col>
                  </a-row>
                </a-form-model-item>
              </a-col>
            </a-form-model>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="4" :tab="$t('Товары клиент')">
          <a-card>
            <a-table
              :columns="columnsProductClient"
              :data-source="products"
              :loading="loading"
              bordered
            >
              <span slot="index" slot-scope="text, item, index">
                {{ length > 1 ? (( index + 1 ) === length ? $t('overall') : index + 1) : index + 1 }}
              </span>
              <span slot="max_investment_amount" slot-scope="text"> {{ $moneyFormat(text.max_investment_amount) }}</span>
              <span slot="min_investment_amount" slot-scope="text"> {{ $moneyFormat(text.min_investment_amount) }}</span>
              <span slot="min_percent" slot-scope="text"> <strong> {{ text.min_percent }}%  ~ {{ text.max_percent }}%</strong></span>
              <span slot="actions" slot-scope="text" class="span">
                <span slot="created_at" slot-scope="text">
                  {{ text.created_at | moment($dateTimeFormat) }}
                </span>
                <delete-btn @confirm="deleteCategory(text)"/>
                <!-- <a-popconfirm
                  :title="$t('Вы хотите это удалить?')"
                  :ok-text="$t('Да')"
                  :cancel-text="$t('Нет')"
                  @confirm="deleteCategory(text)"
                  @cancel="cancel => null"
                >
                  <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
                    <a-button type="danger" icon="delete" />
                  </a-tooltip>
                </a-popconfirm> -->
                <edit-btn @click="$router.push('/category/list/edit/' + text.id)" />
                <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
                  <a-button class="mx-1" @click="$router.push('/category/list/edit/' + text.id)" type="primary" icon="edit" />
                </a-tooltip> -->
              </span>
            </a-table>
          </a-card>
        </a-tab-pane>
        <!-- <a-tab-pane key="5" :tab="$t('statusChangeHistory')">
          <logs-tab></logs-tab>
        </a-tab-pane> -->
        <!-- <a-tab-pane key="6" :tab="$t('files')">
          <a-card>
            <h3 :style="{ marginBottom: '16px' }">
              {{ $t('documents') }}
            </h3>
            <a-list :data-source="customerFiles">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta>
                  <span slot="title">{{ item.url.length > 90 ? item.url.substr(0, 90) + '...' : item.url }}</span>
                  <img slot="avatar" width="25" height="25" :src="require('../../../assets/icons/docs.svg')" >
                </a-list-item-meta>
                <div>
                  <a-row type="flex">
                    <a-col span="auto">
                      <a :href="item.url" target="blank" :disabled="!item.url">
                        <icon-btn icon="eye" :tooltip="$t('button.preview')" />
                      </a>
                    </a-col>
                    <a-col span="auto">
                      <icon-btn @click="download(item)" :tooltip="$t('button.download')" icon="download" color="green" />
                    </a-col>
                  </a-row>
                </div>
              </a-list-item>
            </a-list>
          </a-card>
        </a-tab-pane> -->
        <a-tab-pane key="7" :tab="$t('bonds.preview.customer')">
          <customer-info :idCustomer="installment.customer_id" />
        </a-tab-pane>
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
// import katmTable from './katmTable'
import images from '../../../assets/icons/image.svg'
import docs from '../../../assets/icons/docs.svg'
import moment from 'moment'
import LogsTab from './LogsTab'
import PostingsTab from '../../Installment/Form/PostingsTab.vue'
import CustomerInfo from '@/custom/Installment/Form/CustomerInfo.vue'
export default {
  mixins: [imageUpload],
  components: { images, docs, LogsTab, PostingsTab, CustomerInfo },
  data () {
    return {
      loading: false,
      imageFile: '',
      visibleImage: false,
      repaymentSchedule: [],
      previewVisiblePhoto: false,
      previewImagePhoto: '',
      previewVisiblePass: false,
      previewImagePass: '',
    visible: false,
    newSalesActive: false,
    newSaleForm: {
      amount: null
    },
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
        title: this.$t('Общий сумма'),
        scopedSlots: { customRender: 'total_amount' },
        key: 'total_amount'
      },
      {
        title: this.$t('Основная сумма'),
        scopedSlots: { customRender: 'principal_amount' },
        key: 'principal_amount'
      },
      {
        title: this.$t('Наценка'),
        scopedSlots: { customRender: 'interest_amount' },
        // dataIndex: 'interest_amount',
        key: 'interest_amount'
      },
      {
        title: this.$t('Ежемесячная оплата'),
        scopedSlots: { customRender: 'monthly_fee' },
        key: 'monthly_fee'
      },
       {
        title: this.$t('Номер месяца периода'),
        dataIndex: 'period_month_number',
        key: 'period_month_number'
        // width: '180px'
      },
      {
        title: this.$t('date'),
        scopedSlots: { customRender: 'created_at' },
        key: 'created_at'
      },
      {
        title: this.$t('Дата периода'),
        dataIndex: 'period_date',
        key: 'period_date'
      },
      // {
      //   title: this.$t('guid'),
      //   dataIndex: 'guid',
      //   key: 'guid'
      // },
      // {
      //   title: this.$t('installment_id'),
      //   dataIndex: 'installment_id',
      //   key: 'installment_id'
      // },
      {
        title: this.$t('status'),
        scopedSlots: { customRender: 'status' },
        key: 'status'
      }
            // {
      //   title: this.$t('debtAmount'),
      //   dataIndex: 'amount',
      //   scopedSlots: { customRender: 'period' },
      //   key: 'debt'
      // },
      // {
      //   title: this.$t('interest'),
      //   dataIndex: 'interest',
      //   scopedSlots: { customRender: 'money' },
      //   key: 'interest'
      // },
      // {
      //   title: this.$t('amount'),
      //   scopedSlots: { customRender: 'amount' },
      //   dataIndex: 'sum',
      //   key: 'amount'
      // },
      // {
      //   title: this.$t('discounted_amount'),
      //   scopedSlots: { customRender: 'discounted_amount' },
      //   // dataIndex: 'sum',
      //   key: 'discounted_amount'
      // },
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
      {
        title: this.$t('responsible_person'),
        scopedSlots: { customRender: 'responsible_person' },
        key: 'responsible_person'
      },
      {
        title: this.$t('commentary'),
        dataIndex: 'commentary',
        key: 'commentary'
      }
      //  {
      //   title: this.$t('category.table.Actions'),
      //   scopedSlots: { customRender: 'actions' },
      //   key: 'actions',
      //   width: 100
      // }
    ],
    photoFiles: [],
    columnsTransactions: [
      {
        title: this.$t('transactionId'),
        key: 'transaction_id',
        dataIndex: 'transaction_id'
      },
      {
        title: this.$t('created_at'),
        scopedSlots: { customRender: 'dateTime' },
        key: 'created_at',
        dataIndex: 'created_at'
      },
      {
        title: this.$t('amount'),
        scopedSlots: { customRender: 'money' },
        key: 'amount',
        dataIndex: 'amount'
      },
      {
        title: this.$t('payment_type'),
        key: 'payment_type',
        dataIndex: 'payment_type',
        scopedSlots: { customRender: 'payment_type' }
      },
      {
        title: this.$t('installment_id'),
        // scopedSlots: { customRender: 'installment_id' },
        dataIndex: 'installment_id',
        key: 'installment_id'
      },
      {
        title: this.$t('status'),
        scopedSlots: { customRender: 'status' },
        key: 'status'
      }
    ],
    installmentTransactions: [],
    passportFiles: [],
    uploadingImage: false,
    uploadingImagePass: false,
      columnsProducts: [
        {
          title: '№',
          scopedSlots: { customRender: 'index' },
          key: 'index'
        },
        {
          title: this.$t('product_name'),
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: this.$t('model'),
          dataIndex: 'model',
          key: 'model'
        },
        {
          title: this.$t('category'),
          dataIndex: 'category.data.name_ru',
          key: 'category'
        },
        {
          title: this.$t('price'),
          dataIndex: 'price',
          key: 'price'
        },
        {
          title: this.$t('count'),
          dataIndex: 'count',
          key: 'count'
        },
        // {
        //   title: this.$t('overall_price'),
        //   dataIndex: 'overall_price',
        //   key: 'overall_price'
        // },
        {
          title: this.$t('price_without_nds'),
          dataIndex: 'overall_price',
          key: 'overall_price'
        },
         {
          title: this.$t('rate_nds'),
          dataIndex: 'rate_nds',
          key: 'rate_nds'
        },
        {
          title: this.$t('price_with_nds'),
          dataIndex: 'overall_price_with_nds',
          key: 'overall_price_with_nds'
        }
        // {
        //   title: this.$t('discounted_price'),
        //   dataIndex: 'discounted_price',
        //   key: 'discounted_price'
        // }
        ],
      columnsProductClient: [
        {
          title: '№',
          scopedSlots: { customRender: 'index' },
          key: 'index'
        },
        {
          title: this.$t('product_name'),
          dataIndex: 'name',
          key: 'name'
        },
        // {
        //   title: this.$t('model'),
        //   dataIndex: 'model',
        //   key: 'model'
        // },
        // {
        //   title: this.$t('category'),
        //   dataIndex: 'category',
        //   key: 'category'
        // },
        {
          title: this.$t('price'),
          dataIndex: 'price',
          key: 'price'
        },
        {
          title: this.$t('discounted_price'),
          dataIndex: 'discounted_price',
          key: 'discounted_price'
        },
        {
          title: this.$t('overall_price_with_nds'),
          dataIndex: 'overall_price_with_nds',
          key: 'overall_price_with_nds'
        },
        {
          title: this.$t('price_without_nds'),
          dataIndex: 'price_without_nds',
          key: 'price_without_nds'
        },
        {
          title: this.$t('count'),
          dataIndex: 'quantity',
          key: 'count'
        },
        {
          title: this.$t('merchant'),
          dataIndex: 'merchant_name',
          key: 'merchant_name'
        },
        {
          title: this.$t('merchant_branch'),
          dataIndex: 'branch_name',
          key: 'branch_name'
        }
        // {
        //   title: this.$t('merchant_product_id'),
        //   dataIndex: 'merchant_product_id',
        //   key: 'merchant_product_id'
        // },
        // {
        // title: this.$t('date'),
        // scopedSlots: { customRender: 'created_at' },
        // key: 'created_at'
        // }
        // {
        //   title: this.$t('overall_price'),
        //   dataIndex: 'overall_price',
        //   key: 'overall_price'
        // },
        // {
        //   title: this.$t('price_without_nds'),
        //   dataIndex: 'overall_price',
        //   key: 'overall_price'
        // },
        //  {
        //   title: this.$t('rate_nds'),
        //   dataIndex: 'rate_nds',
        //   key: 'rate_nds'
        // },
        // {
        //   title: this.$t('price_with_nds'),
        //   dataIndex: 'overall_price_with_nds',
        //   key: 'overall_price_with_nds'
        // }
        ],
        rulesTransection: {
          'amount': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }]
        },
        products: [],
        length: undefined
    }
  },
  computed: {
    ...mapGetters(['system_users']),
    computedColi () {
      return this.columnsProducts
    }
  },
  methods: {
    getInstallmentTransactionsSale () {
      this.$store.dispatch('getInstallmentTransactionsSale', this.$route.params.id)
        .then((res) => {
            this.installmentTransactions = res
        })
    },
    getStatusColor (color) {
      var selected
      switch (color) {
        case 'success':
          selected = 'cyan'
          break
        default:
          selected = 'orange'
      }
      return selected
    },
    getSaleProducts (ID) {
      this.loading = true
      this.$store.dispatch('getSaleProducts', ID).then(res => {
        this.products = res
        if (res.length) {
          this.getSingleScoringApplication(res[0].application_id)
        }
      }).catch(reject => {
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
      .finally(() => {
        this.loading = false
      })
    },
    getSingleScoringApplication (application_id) {
      this.$store.dispatch('getSingleScoringApp', application_id).then(res => {
        this.getMerchantUsers(res.merchant_id)
        this.getBranch(res.merchant_id, res.branch_id)
      })
    },
    getMerchantUsers (merchant_id) {
      this.$store.dispatch('getMerchantUser', merchant_id).then(res => {
        this.products = this.products.map(item => ({
          ...item,
          merchant_name: res.data.name
        }))
      })
    },
    getBranch (merchant_id, branch_id) {
      this.$store.dispatch('getNewBranch', { id: merchant_id, branch_id: branch_id }).then(res => {
        this.products = this.products.map(item => ({
          ...item,
          branch_name: res.name
        }))
      })
    },
    customRowClick (record) {
          return {
            on: {
                click: (event) => {
                   this.$router.push({ name: 'sale-product-list', params: { id: record.guid } })
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
    // getInquiry () {
    //   this.$store.dispatch('getInquiryData', { id: this.$route.params.id })
    //   .then(res => {
    //       this.wingsData = res
    //   }).catch(err => console.log(err))
    // },
    go (e) {
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
      // console.log(e)
      if (e.status === 'not_paid') {
        return 'Не оплачено'
      }
      if (e.status === 'active') {
        return 'Не оплачено'
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
    getSingleScoring (guid) {
      this.$store.dispatch('getSingleScoring', this.$route.params.id).then(res => {
        this.installment = res
        if (res) {
          this.getSaleProducts(res.appliaction_id)
        }
        console.log('installmeeeent', res)
        this.additional_contacts = this.installment.customer?.additional_contacts.map(ek => ({ ...ek, key: Math.random() * 400 }))
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
    getRepaymentSchedule () {
      this.$store.dispatch('getRepaymentScheduleSale', this.$route.params.id).then((res) => {
        this.repaymentSchedule = res.map(item => ({
          ...item,
          monthly_fee: item.interest_amount + item.principal_amount
        }))
        console.log('sssss', this.repaymentSchedule)
      }).catch(reject => {
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    getInstallmentCustomerFiles (id) {
      this.$store.dispatch('getInstallmentSaleCustomerFiles', id).then((res) => {
        this.customerFiles = res.Attachments
      }).catch(reject => {
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    async download (e) {
      await fetch(e.url).then(response => response.blob()).then(data => {
        const fileLink = document.createElement('a')
        fileLink.href = window.URL.createObjectURL(new Blob([data]))
        fileLink.setAttribute('download', e.doc_type === 'photo' ? `image.jpg` : e.url)
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },
    handleCancel (e) {
      this.visible = false
    },
    ok () {
      this.visible = true
    },
    acceptScore (guid) {
      this.$store.dispatch('acceptScoring', this.$route.params.id).then((res) => {
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
    addNewOwner () {
      this.newSalesActive = true
    },
    postNewTransaction () {
      this.$refs.rulesTransection.validate((valid) => {
        if (valid) {
          const params = {
            order_id: this.installment.contract_number,
            amount: parseFloat(this.newSaleForm.amount)
          }
          this.$store.dispatch('postNewTransaction', params).then(res => {
              this.$alertMessage('success', 'Posted successfully', '', this)
              this.newSalesActive = false
              this.getInstallmentTransactionsSale()
          }).catch((error) => {
            console.log('error', error)
          })
        }
      })
    }
  },
  created (guid) {
    this.getInstallmentTransactionsSale()
    this.getSingleScoring(guid)
    this.getRepaymentSchedule()
    // this.getInquiry()
    //  this.getSingleScoringProducts(this.$route.params.id)
     this.getInstallmentCustomerFiles(this.$route.params.id)
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
