a<template>
  <div>
    <a-navigation :list="[{ name: $t('Mudaraba'), link: '' }]" :isBack="{ flag: true, link: '/mudaraba/iput', return: true }" noBorder/>
    <a-card class="no-space-tab">
      <a-tabs v-model="activeTab" v-if="applicationData && applicationData.investor" class="no-margin-bar">
        <a-tab-pane key="1" :tab="$t('investorData')">
          <a-card :title="$t('Application form')" class="no-border-card no-pt-body-card">
            <a-form-model>
              <a-row :gutter="16">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('status')" prop="min_investment_amount">
                    <a-input :value="$t(applicationData.status) || '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('type')" prop="min_investment_amount">
                    <a-input :value="$t(applicationData.type) || '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('amount')" prop="min_investment_amount">
                    <a-input :value="applicationData.data.strategy ? $moneyFormat(+applicationData.data.strategy.amount) : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>

                <template v-if="isCashIn" >
                  <a-col :lg="8" :md="12">
                    <a-form-model-item :label="$t('risk_type')" prop="min_investment_amount">
                      <a-input :value="applicationData.data.strategy ? applicationData.data.strategy.risk : '-'" disabled style="width: 100%" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :lg="8" :md="12">
                    <a-form-model-item :label="$t('month_limit')" prop="min_investment_amount">
                      <a-input :value="applicationData.data.strategy ? applicationData.data.strategy.month_limit : '-'" disabled style="width: 100%" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :lg="8" :md="12">
                    <a-form-model-item :label="$t('payment_type')" prop="min_investment_amount">
                      <a-input :value="applicationData.payment_type ? $t(applicationData.payment_type) : '-'" disabled style="width: 100%" />
                    </a-form-model-item>
                  </a-col>
                </template>

                <template v-else >
                  <a-col :lg="8" :md="12">
                    <a-form-model-item :label="$t('card_number')" prop="min_investment_amount">
                      <a-input :value="applicationData.data.bank ? applicationData.data.bank.recipient_account_number : '-'" disabled style="width: 100%" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :lg="8" :md="12">
                    <a-form-model-item :label="$t('bank_name')" prop="min_investment_amount">
                      <a-input :value="applicationData.data.bank ? applicationData.data.bank.bank_name : '-'" disabled style="width: 100%" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :lg="8" :md="12">
                    <a-form-model-item :label="$t('MFO')" prop="min_investment_amount">
                      <a-input :value="applicationData.data.bank ? applicationData.data.bank.mfo : '-'" disabled style="width: 100%" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :lg="8" :md="12">
                    <a-form-model-item :label="$t('transit_account')" prop="min_investment_amount">
                      <a-input :value="applicationData.data.bank ? applicationData.data.bank.transit_account : '-'" disabled style="width: 100%" />
                    </a-form-model-item>
                  </a-col>
                </template>

              </a-row>
            </a-form-model>
          </a-card>
          <a-card :title="$t('passportData')" class="no-border-card no-pt-body-card">
            <a-form-model>
              <a-row :gutter="16">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.first_name')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.passport_data.first_name || '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.last_name')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.passport_data.last_name || '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('patronymic')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.passport_data.patronymic || '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.birthday')" prop="min_investment_amount">
                    <a-date-picker
                      show-time
                      :format="$dateFormat"
                      placeholder="Select Time"
                      v-model="applicationData.investor.passport_data.birth_day"
                      disabled
                      style="width: 100%"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.gender')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.passport_data.gender || '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.passport_id')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.passport_data.doc_number || '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.issue_date')" prop="min_investment_amount">
                    <a-date-picker
                      :format="$dateFormat"
                      show-time
                      placeholder="Select Time"
                      v-model="applicationData.investor.passport_data.date_of_issue"
                      disabled
                      style="width: 100%"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.expiry_date')" prop="min_investment_amount">
                    <a-date-picker
                      :format="$dateFormat"
                      show-time
                      placeholder="Select Time"
                      v-model="applicationData.investor.passport_data.date_of_expiry"
                      disabled
                      style="width: 100%"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('domestic_phone_number')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.kyc ? applicationData.investor.kyc.domestic_phone_number : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('email')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.kyc ? applicationData.investor.kyc.email : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('monthly_income')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.kyc ? applicationData.investor.kyc.monthly_income : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('phone_number')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.phone_number ? applicationData.investor.phone_number : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('type')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.type ? applicationData.investor.type : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('inn')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.inn ? applicationData.investor.inn : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('inps')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.inps ? applicationData.investor.inps : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('country')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.country ? applicationData.investor.country : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('actual_address')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.kyc ? applicationData.investor.kyc.actual_address : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <div v-if="Boolean(claimCard)" style="width: 100%">
                <a-divider style="margin: 24px -24px; width: calc(100% + 48px)" />
                <a-row>
                  <a-col :span="24">
                    <a-descriptions :title="$t('investor.card')" layout="vertical" :column="4" bordered>
                      <a-descriptions-item :label="$t('card.number')">
                        {{ claimCard.card_number }}
                      </a-descriptions-item>
                      <a-descriptions-item :label="$t('card_expiry_month')">
                        {{ claimCard.expiry_date.slice(2,4) }}
                      </a-descriptions-item>
                      <a-descriptions-item :label="$t('card_expiry_year')">
                        {{ claimCard.expiry_date.slice(0,2) }}
                      </a-descriptions-item>
                    </a-descriptions>
                  </a-col>
                </a-row>
                <a-divider style="margin: 24px -24px; width: calc(100% + 48px)" />
              </div>
              <!-- <a-row :gutter="16">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('registration_photo')" prop="min_investment_amount">
                    <a-upload
                      class="picture-card"
                      list-type="picture-card"
                      disabled
                      :file-list="fileList"
                      @preview="handlePreview($event, '')"
                      @change="handleChange($event, 'fileList')"
                    >
                      <div v-if="fileList.length < 1">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                      <img :alt="previewImage" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('actual_address')" prop="min_investment_amount">
                    <a-input :value="applicationData.investor.kyc ? applicationData.investor.kyc.actual_address : '-'" disabled style="width: 100%" />
                  </a-form-model-item>
                </a-col>
              </a-row> -->
              <a-row :gutter="16">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('registration_photo')" prop="min_investment_amount">
                    <a-upload
                      class="picture-card"
                      list-type="picture-card"
                      disabled
                      :file-list="fileList"
                      @preview="handlePreview($event, '')"
                      @change="handleChange($event, 'fileList')"
                    >
                      <div v-if="fileList.length < 1">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                      <img :alt="previewImage" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('profile_photo')" prop="min_investment_amount">
                    <a-upload
                      class="picture-card"
                      list-type="picture-card"
                      disabled
                      :file-list="fileList2"
                      @preview="handlePreview($event, '2')"
                      @change="handleChange($event, 'fileList2')"
                    >
                      <div v-if="fileList2.length < 1">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible2" :footer="null" @cancel="previewVisible2 = false">
                      <img :alt="previewImage2" style="width: 100%" :src="previewImage2" />
                    </a-modal>
                    <!-- <img
                      :src="applicationData.investor.profile_photo"
                      :alt="applicationData.investor.profile_photo"
                      class="imageClass"
                      width="200"
                      height="200"
                    /> -->
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('Passport_photo')" prop="min_investment_amount">
                    <a-upload
                      class="picture-card"
                      list-type="picture-card"
                      disabled
                      :file-list="fileList3"
                      @preview="handlePreview($event, '3')"
                      @change="handleChange($event, 'fileList3')"
                    >
                      <div v-if="fileList3.length < 1">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible3" :footer="null" @cancel="previewVisible3 = false">
                      <img :alt="previewImage3" style="width: 100%" :src="previewImage3" />
                    </a-modal>
                    <!-- <img
                      v-if="applicationData.investor.passport_data && applicationData.investor.passport_data.passport_photo"
                      :src="applicationData.investor.passport_data && applicationData.investor.passport_data.passport_photo"
                      alt="Passport image"
                      class="imageClass"
                      width="200"
                      height="200"
                    /> -->
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('photo_document')" prop="min_investment_amount">
                    <a-upload
                      class="picture-card"
                      list-type="picture-card"
                      disabled
                      :file-list="fileList4"
                      @preview="handlePreview($event, '4')"
                      @change="handleChange($event, 'fileList4')"
                    >
                      <div v-if="fileList4.length < 1">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible4" :footer="null" @cancel="previewVisible4 = false">
                      <img :alt="previewImage4" style="width: 100%" :src="previewImage4" />
                    </a-modal>
                    <!-- <img
                      v-if="applicationData.investor.passport_data && applicationData.investor.passport_data.photo_document"
                      :src="applicationData.investor.passport_data && applicationData.investor.passport_data.photo_document"
                      alt="Passport image"
                      class="imageClass"
                      width="200"
                      height="200"
                    /> -->
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
            <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 20px" v-if="!isCashOut">
              <div style="margin-right: 10px">
                {{ $t('changePaymentType') }}:
              </div>
              <a-select style="width: 100%; max-width: 300px; margin-right: 10px" v-model="paymentForm.payment_type_id">
                <a-select-option v-for="item in paymentTypes" :key="item.payment_type_id" :value="item.payment_type_id" >
                  {{ $t(item.payment_type) }}
                </a-select-option>
              </a-select>
              <a-button @click="onChangePayment" type="primary" :loading="loading"> {{ $t('save') }} </a-button>
            </div>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="3" :tab="$t('updateHistory')">
          <a-card>
            <a-table
              bordered
              :scroll="{ x: 200, y: 700 }"
              :pagination="false"
              :columns="column1"
              :data-source="applicationData.statuses"
            >
              <span slot="user" slot-scope="text">
                {{ $t(text.user && text.user.name || '') }}
              </span>
              <span slot="status" slot-scope="text">
                {{ $t(text.status) }}
              </span>
              <span slot="date" slot-scope="text">
                {{ text.created_at | moment($dateFormat) }}
              </span>
              <span slot="comment" slot-scope="text">
                {{ text.comment && moment(text.comment).isValid() ? moment(text.comment).format('DD.MM.YYYY') : text.comment }}
              </span>
            </a-table>
            <a-form-model :model="form" :rules="rules" ref="ruleForm">
              <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 20px" class="mb-2">
                <div style="margin-right: 10px">
                  {{ $t('changeStatus') }}:
                </div>
                <a-select style="width: 100%; max-width: 300px; margin-right: 10px" v-model="form.status" @change="onStatusChange">
                  <a-select-option
                    v-for="item in filteredStatus"
                    :key="item.status_id"
                    :disabled="applicationData.status === 'paid' && item.status === 'cancelled' || applicationData.status === 'success' && item.status === 'cancelled'"
                    :value="item.status"
                  >
                    {{ $t(item.status) }}
                  </a-select-option>
                  <a-select-option :value="applicationData.status" disabled>
                    {{ $t(applicationData.status) }}
                  </a-select-option>
                </a-select>
                <a-button @click="onChangeStatus" type="primary" :disabled="applicationData.status === form.status" :loading="loading"> {{ $t('save') }} </a-button>
              </div>
              <a-row type="flex" justify="end" v-if="editCancel">
                <a-col :md="12" :span="24">
                  <a-form-model-item ref="comment" :label="$t('commentary')" prop="comment">
                    <a-textarea :placeholder="$t('Описание')" v-model="form.comment" :max-length="255"/>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="4" :tab="$t('files')">
          <a-card>
            <a-table
              bordered
              :scroll="{ x: 200, y: 700 }"
              :pagination="false"
              :columns="columns0"
              :data-source="array0">
              <span slot="type" slot-scope="text">
                {{ $t(text.type) }}
              </span>
              <span slot="icon" slot-scope="text">
                <img width="25" v-if="text.format === 'photo'" height="25" :src="require('../../../assets/icons/image.svg')" >
                <img width="25" v-else-if="text.format === 'pdf'" height="25" :src="require('@/assets/icons/pdf.svg')" >
                <img width="25" v-else-if="text.format === 'doc'" height="25" :src="require('@/assets/icons/word.svg')" >
                <img width="25" v-else-if="text.format === 'excel'" height="25" :src="require('@/assets/icons/excel.svg')" >
                <img width="25" v-else height="25" :src="require('../../../assets/icons/docs.svg')" >
                {{ text.title }}
              </span>
              <span slot="file" slot-scope="text"> {{ text.format === 'photo' ? 'Изображение' : 'Документ' }}</span>
              <span slot="actions" slot-scope="text" class="span">
                <a-row type="flex" :gutter="[8, 8]">
                  <a-col span="auto">
                    <a :href="text.file" target="blank" v-if="text.format === 'pdf'" :disabled="!text.file">
                      <icon-btn icon="eye" :tooltip="$t('button.preview')" />
                      <!-- <a-button type="primary" icon="eye" /> -->
                    </a>
                    <icon-btn v-else-if="text.format === 'doc' || text.format === 'docx'" icon="eye" @click="go(text)" :tooltip="$t('button.preview')" />
                    <icon-btn v-else icon="eye" @click="imageFile = text.file, visible = true" :tooltip="$t('button.preview')" />
                    <!-- <a-button v-else-if="text.format === 'jpg' || text.format === 'png'" @click="imageFile = text.file, visible = true" type="primary" icon="eye" /> -->
                    <!-- <a-button v-else @click="go(text)" type="primary" icon="eye" /> -->
                  </a-col>
                  <a-col span="auto">
                    <icon-btn @click="download(text)" :tooltip="$t('button.preview')" icon="download" color="green" />
                    <!-- <a-button @click="download(text)" type="primary" icon="download" /> -->
                  </a-col>
                </a-row>
              </span>
            </a-table>
          </a-card>
        </a-tab-pane>
        <!-- <a-tab-pane key="3" :tab="$t('information')">
          <pre>
                  {{ applicationData }}
              </pre
          >
        </a-tab-pane> -->
      </a-tabs>
      <a-modal
        v-if="imageFile"
        v-model="visible"
        :title="$t('Investor')"
        :footer="null"
        :width="700"
      >
        <center>
          <img :src="imageFile" :alt="imageFile.split('/').pop()" style="max-width: 100%;margin: 0 auto">
        </center>
      </a-modal>

      <a-modal
        @ok="dateModalAcceptHandler"
        v-model="datePickerModal"
        :title="$t('select.date')"
        okType="primary"
        okText="Выбрать"
        :cancelText="$t('button.cancel')"
      >
        <div style="display: flex; align-items: center; justify-content: center; margin-top: 40px" >
          <a-date-picker v-model="selectedDate" style="width: 70%" />
        </div>
      </a-modal>

      <a-modal
        @ok="modalConfirmHandler"
        v-model="acceptModal"
        :title="$t('Вы подтверждаете изменения статуса?')"
        okType="primary"
        okText="Подтвердить"
        :cancelText="$t('button.cancel')"
        :confirm-loading="modalLoading"
      >
        <!-- <div style="display: flex; align-items: center; justify-content: center; margin-top: 40px" >
          <a-date-picker v-model="selectedDate" style="width: 70%" />
        </div> -->
      </a-modal>

      <!-- <a-button @click="onChangeStatus" type="primary" style="float: right">{{ $t('sendToNextStatus') }}</a-button> -->
    </a-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
// import { delete } from 'node_modules/vue/types/umd'
// import imageUpload from '@/mixins/imageUpload'
export default {
  // mixins: [imageUpload],
  data () {
    return {
      fileList: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      claimCard: null,
      selectedDate: null,
      amountType: null,
      previewImage: '',
      previewImage2: '',
      previewImage3: '',
      previewImage4: '',
      previewVisible: false,
      previewVisible2: false,
      previewVisible3: false,
      previewVisible4: false,
      uploadingImage: false,
      uploadingImage2: false,
      uploadingImage3: false,
      uploadingImage4: false,
      editCancel: false,
      paymentTypes: [],
      loading: false,
      visible: false,
      imageFile: '',
      editStatus: false,
      applicationData: {},
      activeTab: '1',
      statuses: [
        'request_sent',
        'confirmed',
        'pending',
        'paid',
        'check_payment_pending',
        'signature_pending',
        'success',
        'cancelled',
        'rejected'
      ],
      column1: [
        {
          title: this.$t('status'),
          scopedSlots: { customRender: 'status' },
          key: 'status'
        },
        {
          title: this.$t('date'),
          scopedSlots: { customRender: 'date' },
          key: 'date'
        },
        {
          title: this.$t('whoChanged'),
          scopedSlots: { customRender: 'user' },
          key: 'user'
        },
        {
          title: this.$t('commentary'),
          scopedSlots: { customRender: 'comment' },
          key: 'comment'
        }
      ],
      statusList: [],
      array0: [],
      link: 'https://view.officeapps.live.com/op/embed.aspx?src=',
      fileTypes: {
        agreement: '',
        partnership_left: '',
        withdraw_dividends: '',
        certificate: ''
      },
      datePickerModal: false,
      acceptModal: false,
      form: {
        status_id: null,
        status: '',
        comment: undefined
      },
      rules: {},
      paymentForm: {
        payment_type_id: undefined
      },
      // rules: {
      //   'status_id': [{ required: true, message: 'Пожалуйста, заполните поле статус', trigger: 'blur' }]
      // },
      columns0: [
        {
          title: this.$t('filename'),
          scopedSlots: { customRender: 'icon' },
          key: 'icon'
        },
        {
          title: this.$t('type'),
          scopedSlots: { customRender: 'type' },
          key: 'type'
        },
        {
          title: this.$t('category.table.Actions'),
          scopedSlots: { customRender: 'actions' },
          key: 'actions',
          width: 220
        }
      ],
      isCashOut: this.$route.path.split('/').includes('cash_out')
    }
  },
  computed: {
    isCashIn () {
      return this.$route.name === 'mudaraba-input-detail'
    },
    filteredStatus () {
      let count = 0
      let newStatusList = this.statusList
      if (['bank_cash', 'bank_transfer'].includes(this.applicationData.payment_type)) {
        newStatusList = this.statusList.filter(e => e.status !== 'confirmed')
      }
      console.log('Filter', newStatusList)
      return newStatusList.filter(item => {
        if (this.applicationData.status === 'cancelled') {
          return false
        }
        if (item.status === 'success') {
          return false
        }
        if (item.status === 'cancelled') {
          return true
        }
        if (this.isCashOut) {
          if (this.applicationData.statuses.find(stat => stat.status === item.status) || item.status === 'paid') {
            return false
          }
        } else {
          if (!['card', 'paynet'].includes(this.applicationData.payment_type) && ['request_sent', 'confirmed'].includes(this.applicationData.status)) {
            return false
          }
          if (this.applicationData.statuses.find(stat => stat.status === item.status)) {
            return false
          }
          if (['bank_cash', 'bank_transfer'].includes(this.applicationData.payment_type) && item.status === 'check_payment_pending') {
            return true
          } else if (['signature_pending', 'check_payment_pending'].includes(item.status)) {
            return false
          }
          if (['card', 'paynet'].includes(this.applicationData.payment_type) && item.status === 'paid') {
            return false
          }
          if (['card', 'paynet'].includes(this.applicationData.payment_type) && this.applicationData.status === 'confirmed') {
            return false
          }
          if (['card'].includes(this.applicationData.payment_type) && item.status === 'confirmed') {
            return false
          }
        }
        if (count === 1 && item.status !== 'cancelled') {
          return false
        }
        count++
        return true
      })
    }
  },
  mounted () {
    this.$store.dispatch('getStatuses', { 'is_cash_out': this.$route.path.split('/').includes('cash_out') }).then(res => {
      console.log(res)
      this.statusList = res.statuses
      const status = this.statusList.find(item => item.status === this.applicationData.status)
      this.form.status = status && status.status
      this.form.status_id = status && status.status_id
    })
    this.$store.dispatch('getPaymentTypes', { }).then(res => {
      console.log(res)
      this.paymentTypes = res.payment_types
      const type = this.paymentTypes.find(item => item.payment_type === this.applicationData.payment_type)
      this.paymentForm.payment_type_id = type && type.payment_type_id
    })
  },
  methods: {
    moment,
    ...mapActions(['getClaimCardByID']),
    handleChange ({ fileList }) {
        if (fileList.length === 0) { this.fileList = fileList }
    },
    async handlePreview (file) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
    },
    onStatusChange (value) {
      console.log('Value', value)
      const stat = this.statusList.find(item => item.status === value)
      this.form.status_id = stat.status_id
      if (value === 'cancelled') {
        this.editCancel = true
        this.rules.comment = [{ required: true, message: 'Пожалуйста, заполните поле комментарий', trigger: 'change' }]
        this.form.comment = ''
      } else {
        this.editCancel = false
        this.rules = {}
        delete this.form.comment
      }
    },
    go (e) {
      console.log('e', e)
      window.open(e.format !== 'photo' ? this.link + e.file : e.file, '_blank')
    },
    async download (e) {
      console.log(e)
      await fetch(e.file).then(response => response.blob()).then(data => {
        console.log(data)
        const fileLink = document.createElement('a')
        fileLink.href = window.URL.createObjectURL(new Blob([data]))
        fileLink.setAttribute('download', e.title)
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },
    onChangeStatus () {
      this.$refs.ruleForm.validate((valid) => {
        // return console.log('AMOUNT ==>', this.amountType)
        if (valid) {
          if (this.form.status !== 'paid' || this.amountType.includes('UZS')) return this.changeApplicationStatus(this.form)
          this.datePickerModal = true
        }
      })
    },
    dateModalAcceptHandler () {
      if (!this.selectedDate) return null
      this.datePickerModal = false
      this.acceptModal = true
    },
    modalConfirmHandler () {
      this.acceptModal = false
      this.changeApplicationStatus({
        ...this.form,
        comment: this.selectedDate
      })
    },
    changeApplicationStatus (data) {
      this.loading = true
          this.$store.dispatch('sendApplicationToNextStatus', { id: this.$route.params.id, data })
            .then(res => {
              this.loading = false
              console.log(res)
              this.$route.go()
              this.editStatus = false
            })
            .catch(() => {
              this.loading = false
            })
            .finally(() => {
              this.form = {
                status_id: null,
                status: '',
                comment: undefined
              }
              this.editCancel = false
              this.getApplicationsDetail()
            })
    },
    onChangePayment () {
      this.loading = true
      this.$store.dispatch('setApplicationPaymentType', { id: this.$route.params.id, data: this.paymentForm })
      .then(res => {
        this.loading = false
        console.log(res)
        this.$route.go()
        this.editStatus = false
      })
      .catch(() => {
        this.loading = false
      })
      .finally(() => {
        this.getApplicationsDetail()
      })
    },
    getClaimCard (id, params = {}) {
      if (!id) return
      this.getClaimCardByID({ id, params })
        .then(res => {
          console.log('TRESSS ===>', res)
          this.claimCard = res.card
        })
        .catch(() => this.$message.error('error'))
    },
    getApplicationsDetail () {
      this.$store.dispatch('getApplicationsDetail', { id: this.$route.params.id }).then(res => {
        this.amountType = res?.claim?.data?.bank?.currency
        this.getClaimCard(res.claim.card_id)
        this.applicationData = res.claim
        this.fileList = this.applicationData.investor.passport_data.registration_photo ? [
          {
            uid: this.applicationData.investor.passport_data.registration_photo.split('/').pop(),
            url: this.applicationData.investor.passport_data.registration_photo,
            status: 'done',
            name: this.applicationData.investor.passport_data.registration_photo
          }
        ] : []
        this.fileList2 = this.applicationData.investor.profile_photo ? [
          {
            uid: this.applicationData.investor.profile_photo.split('/').pop(),
            url: this.applicationData.investor.profile_photo,
            status: 'done',
            name: this.applicationData.investor.profile_photo
          }
        ] : []
        this.fileList3 = this.applicationData.investor.passport_data.passport_photo ? [
          {
            uid: this.applicationData.investor.passport_data.passport_photo.split('/').pop(),
            url: this.applicationData.investor.passport_data.passport_photo,
            status: 'done',
            name: this.applicationData.investor.passport_data.passport_photo
          }
        ] : []
        this.fileList4 = this.applicationData.investor.passport_data.photo_document ? [
          {
            uid: this.applicationData.investor.passport_data.photo_document.split('/').pop(),
            url: this.applicationData.investor.passport_data.photo_document,
            status: 'done',
            name: this.applicationData.investor.passport_data.photo_document
          }
        ] : []
        const status = this.statusList.find(item => item.status === this.applicationData.status)
        this.form.status = status && status.status
        this.form.status_id = status && status.status_id
        const imgExtensions = ['svg', 'png', 'jpg', 'jpeg']
        const type = this.paymentTypes.find(item => item.payment_type === this.applicationData.payment_type)
        this.paymentForm.payment_type_id = type && type.payment_type_id
        this.array0 = res.claim.files.map(el => {
          const exten = el.title.split('.').pop()
          return {
            file: el.file_name,
            key: Math.random(),
            type: el.type,
            title: el.title,
            format: exten.includes('doc') ? 'doc' : (
              exten.includes('pdf') ? 'pdf' : (
                exten.includes('xls') ? 'excel' : (
                  imgExtensions.includes(exten) ? 'photo' : 'file'
                )
              )
            )
          }
        })
      })
    }
  },
  created () {
    console.log(this.$route)
    this.getApplicationsDetail(this.$route.params.id)
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
.balance {
  margin-left: auto;
  margin: 5px;
  display: flex;
  justify-content: flex-end;
}
.imageClass {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
