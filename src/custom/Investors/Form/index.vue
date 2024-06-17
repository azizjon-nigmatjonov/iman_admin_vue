<template>
  <div>
    <div class="navbar">
      <a-navigation :list="[{ name: $t('Список инвесторов'), link: ''}]" :isBack="{ return: true, flag: true }" noBorder/>
      <a-button @click="deleteInvestor" type="danger">{{ $t('delete-investor') }}</a-button>
    </div>
    <a-card class="no-space-tab">
      <a-form-model :model="investor" :rules="rules" :colon="false" ref="ruleForm">
        <a-tabs default-active-key="1" v-model="activeTab">
          <a-tab-pane key="1" :tab="$t('Application form')">
            <a-card :title="$t('Информация об инвесторе')" class="no-border-card no-pt-body-card">
              <a-row :gutter="16">
                <a-col :lg="8" :md="12">
                  <a-form-model-item ref="passport_data.first_name" :label="$t('investors.table.first_name')" prop="passport_data.first_name">
                    <a-input :disabled="!editable" v-model="investor.passport_data.first_name" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.last_name')" prop="min_investment_amount">
                    <a-input :disabled="!editable" v-model="investor.passport_data.last_name" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.birthday')" prop="min_investment_amount">
                    <a-date-picker
                      :disabled="!editable"
                      placeholder="Select Time"
                      :format="$dateFormat"
                      :valueFormat="dateValueFormat"
                      v-model="investor.passport_data.birth_day"
                      style="width: 100%"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('citizenship')" prop="place_of_birth">
                    <a-input :disabled="!editable" v-model="investor.passport_data.place_of_birth" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.gender')" prop="passport_data.gender">
                    <!-- <a-input v-model="investor.passport_data.gender" style="width: 100%" /> -->
                    <a-select :disabled="!editable" style="width: 100%" v-model="investor.passport_data.gender">
                      <a-select-option value="male" >
                        {{ $t('gender.male') }}
                      </a-select-option>
                      <a-select-option value="female" >
                        {{ $t('gender.female') }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.passport_id')" prop="passport_data.doc_number">
                    <a-input :disabled="!editable" v-model="investor.passport_data.doc_number" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12" v-if="!investor.is_resident">
                  <a-form-model-item :label="$t('pinfl')" prop="none_resident_pinfl">
                    <a-input
                      :min="1"
                      :disabled="!editable"
                      v-model="investor.none_resident_pinfl"
                      style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12" v-if="investor.is_resident">
                  <a-form-model-item :label="$t('pinfl')" prop="passport_data.pin">
                    <a-input
                      :min="1"
                      :disabled="!editable"
                      v-model="investor.passport_data.pin"
                      style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.expiry_date')" prop="min_investment_amount">
                    <a-date-picker
                      :disabled="!editable"
                      :format="$dateFormat"
                      :valueFormat="dateValueFormat"
                      placeholder="Select Time"
                      v-model="investor.passport_data.date_of_expiry"
                      style="width: 100%"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('patronymic')" prop="min_investment_amount">
                    <a-input :disabled="!editable" v-model="investor.passport_data.patronymic" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('investors.table.issue_date')" prop="min_investment_amount">
                    <a-date-picker
                      :disabled="!editable"
                      :format="$dateFormat"
                      :valueFormat="dateValueFormat"
                      placeholder="Select Time"
                      v-model="investor.passport_data.date_of_issue"
                      style="width: 100%"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('place_of_issue')" prop="min_investment_amount">
                    <a-input :disabled="!editable" v-model="investor.passport_data.place_of_issue" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <!-- <a-col v-if="!investor.is_resident" :span="8">
                  <a-form-model-item :label="$t('Resident number')" prop="">
                    <a-input disabled v-model="investor.none_resident_pinfl"></a-input>
                  </a-form-model-item>
                </a-col> -->
                <a-col v-if="!investor.is_resident" :span="8">
                  <a-form-model-item :label="$t('Resident image')" prop="">
                    <a-upload
                      class="picture-card"
                      :disabled="!editable"
                      list-type="picture-card"
                      :file-list="[{
                        uid: '1asd',
                        name: 'xxersax.png',
                        status: 'done',
                        url: investor.none_resident_pinfl_photo,
                      }]"
                      @preview="handlePreview($event, '2')"
                    >
                      <div v-if="fileList2.length < 1">
                        <a-icon :type="uploadingImage2 ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-card>
            <a-card :title="$t('investor.cards')" class="no-border-card no-pt-body-card">
              <a-table
                :key="$t('cards')"
                :columns="cardsColumns"
                :data-source="investorCards"
                :row-key="(record) => record.investment_id"
                size="middle"
                :pagination="false"
                bordered
              >
                <span slot="card_expiry_year" slot-scope="item">{{ item.expiry_date.slice(0,2) }}</span>
                <span slot="card_expiry_month" slot-scope="item">{{ item.expiry_date.slice(2,4) }}</span>
              </a-table>
            </a-card>
            <a-card :title="$t('Application form')" class="no-border-card no-pt-body-card">
              <a-row :gutter="16">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('current_workplace')" prop="min_investment_amount">
                    <a-input :disabled="!editable" v-model="investor.kyc.current_workplace" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('domestic_phone_number')" prop="min_investment_amount">
                    <a-input :disabled="!editable" v-model="investor.kyc.domestic_phone_number" @keypress="onPhoneNumber" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('email')" prop="min_investment_amount">
                    <a-input :disabled="!editable" v-model="investor.kyc.email" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('monthly_income')" prop="min_investment_amount">
                    <a-input :disabled="!editable" v-model="investor.kyc.monthly_income" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('source_of_income_description')" prop="min_investment_amount">
                    <a-input :disabled="!editable" v-model="investor.kyc.source_of_income_description" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('source_of_income')" prop="advantage" :style="{'margin-bottom': investor.kyc.source_of_income.length ? `10px` : '3px'}">
                    <a-input
                      style="width: 100%"
                      :disabled="!editable"
                      v-model="investor.kyc.source_of_income[index]"
                      v-for="(item, index) in investor.kyc.source_of_income"
                      :key="index">
                      <a-icon slot="addonAfter" type="delete" @click="onDeleteAdvantage(index)"/>
                    </a-input>
                  </a-form-model-item>

                  <div ongoing>
                    <a-input placeholder="source" v-model="sourceIncomeVal" style="width: 100%" :disabled="!editable" @pressEnter="onAddAdvantage">
                      <span slot="addonAfter" :disabled="!editable" @click="onAddAdvantage">
                        {{ $t('add') }}
                      </span>
                    </a-input>
                  </div>
                  <!-- <a-form-model-item :label="$t('source_of_income')" prop="min_investment_amount">
                    <div v-if="updateForm.kyc.source_of_income.length < 1">

                    </div>
                    <div v-for="(source, index) in updateForm.kyc.source_of_income" :key="source">
                      <a-input v-model="updateForm.kyc.source_of_income[index]" style="width: 100%" />
                    </div>
                  </a-form-model-item> -->
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('temporary_address')" prop="temporary_address">
                    <a-input :disabled="!editable" v-model="investor.kyc.temporary_address" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item ref="phone_number" :label="$t('phone_number')" prop="phone_number">
                    <a-input :disabled="!isCurrent" v-model="investorPhoneNumber" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('Jobs')" prop="advantage" :style="{'margin-bottom': investor.kyc.source_of_income.length ? `10px` : '3px'}">
                    <a-input
                      style="width: 100%"
                      :disabled="!editable"
                      v-model="investor.kyc.job[index]"
                      v-for="(item, index) in investor.kyc.job"
                      :key="index">
                      <a-icon slot="addonAfter" type="delete" @click="onDeleteAdvantageJobs(index)"/>
                    </a-input>
                  </a-form-model-item>

                  <div ongoing>
                    <a-input placeholder="source" v-model="jobitem" style="width: 100%" :disabled="!editable" @pressEnter="newJobAdd">
                      <span slot="addonAfter" :disabled="!editable" @click="newJobAdd">
                        {{ $t('add') }}
                      </span>
                    </a-input>
                  </div>
                  <!-- <a-form-model-item :label="$t('source_of_income')" prop="min_investment_amount">
                    <div v-if="updateForm.kyc.source_of_income.length < 1">

                    </div>
                    <div v-for="(source, index) in updateForm.kyc.source_of_income" :key="source">
                      <a-input v-model="updateForm.kyc.source_of_income[index]" style="width: 100%" />
                    </div>
                  </a-form-model-item> -->
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('type')" prop="type">
                    <!-- <a-input v-model="investor ? investor.type : '-'" style="width: 100%" /> -->
                    <a-select :disabled="!editable" style="width: 100%" v-model="investor.type">
                      <a-select-option value="corporate" >
                        {{ $t('entity.corporate') }}
                      </a-select-option>
                      <a-select-option value="physical" >
                        {{ $t('entity.physical') }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('inn')" prop="inn">
                    <a-input type="number" :disabled="!editable" v-model="investor.inn" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('inps')" prop="inps">
                    <a-input-number :min="0" :disabled="!editable" v-model="investor.inps" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('country')" prop="country">
                    <a-input v-model="investor.country" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('city')" prop="city">
                    <!-- <a-input :disabled="investor.is_resident" v-model="investor.kyc.city" style="width: 100%" /> -->
                    <a-select show-search :filter-option="$filterOption" :disabled="!investor.is_resident" v-model="investor.kyc.city" style="width: 100%">
                      <a-select-option v-for="item in districts" :value="item.data.name_uz" :key="item.id">
                        {{ item.data.name_uz }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('region')" prop="region">
                    <!-- <a-input :disabled="investor.is_resident" v-model="investor.kyc.region" style="width: 100%" /> -->
                    <a-select show-search :filter-option="$filterOption" :disabled="!investor.is_resident" v-model="investor.kyc.region" style="width: 100%">
                      <a-select-option v-for="item in regions" :value="item.data.name_uz" :key="item.id">
                        {{ item.data.name_uz }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('village')" prop="village">
                    <a-input :disabled="!investor.is_resident" v-model="investor.kyc.village" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('street')" prop="street">
                    <a-input :disabled="!investor.is_resident" v-model="investor.kyc.street" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model layout="inline">
                    <a-form-model-item :label="`${$t('resident')}:`">
                      <!-- <a-input v-model="investor.is_resident ? $t('isResident') : $t('isNotResident')" style="width: 100%" /> -->
                      <a-checkbox :checked="investor.is_resident" @change="e => investor.is_resident = !investor.is_resident">
                      </a-checkbox>
                    </a-form-model-item>
                  </a-form-model>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('registration_photo')" prop="min_investment_amount">
                    <a-upload
                      class="picture-card"
                      :disabled="!editable"
                      :customRequest="uploadImage2"
                      list-type="picture-card"
                      :file-list="fileList2"
                      @preview="handlePreview($event, '2')"
                      @change="handleChange($event, 'fileList2')"
                    >
                      <div v-if="fileList2.length < 1">
                        <a-icon :type="uploadingImage2 ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible2" :footer="null" @cancel="previewVisible2 = false">
                      <img :alt="previewImage2" style="width: 100%" :src="previewImage2" />
                    </a-modal>
                    <!-- <img
                      :src="investor.passport_data.registration_photo"
                      :alt="investor.passport_data.registration_photo"
                      class="imageClass"
                      width="300"
                      height="300"
                    > -->
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('actual_address')" prop="min_investment_amount">
                    <a-input :disabled="investor.is_resident" v-model="investor.kyc.actual_address" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('profile_photo')" prop="min_investment_amount">
                    <a-upload
                      class="picture-card"
                      :customRequest="uploadImage"
                      list-type="picture-card"
                      :disabled="!editable"
                      :file-list="fileList"
                      @preview="handlePreview($event, '1')"
                      @change="handleChange($event, 'fileList')"
                    >
                      <div v-if="fileList.length < 1">
                        <a-icon :type="uploadingImage ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                      <img :alt="previewImage" style="width: 100%" :src="previewImage" />
                    </a-modal>
                    <!-- <img :src="updateForm.profile_photo" :alt="updateForm.profile_photo" class="imageClass" width="200" height="200"> -->
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('photo_document')" prop="min_investment_amount">
                    <a-upload
                      class="picture-card"
                      :disabled="!editable"
                      :customRequest="uploadImage3"
                      list-type="picture-card"
                      :file-list="fileList3"
                      @preview="handlePreview($event, '3')"
                      @change="handleChange($event, 'fileList3')"
                    >
                      <div v-if="fileList3.length < 1">
                        <a-icon :type="uploadingImage3 ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible3" :footer="null" @cancel="previewVisible3 = false">
                      <img :alt="previewImage3" style="width: 100%" :src="previewImage3" />
                    </a-modal>
                    <!-- <img
                      v-if="investor.passport_data && investor.passport_data.passport_photo"
                      :src="investor.passport_data && investor.passport_data.passport_photo"
                      alt="Passport image"
                      class="imageClass"
                      width="200"
                      height="200"
                    /> -->
                  </a-form-model-item>
                </a-col>
                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('passport_photo')" prop="min_investment_amount">
                    <a-upload
                      class="picture-card"
                      :disabled="!editable"
                      :customRequest="uploadImage4"
                      list-type="picture-card"
                      :file-list="fileList4"
                      @preview="handlePreview($event, '4')"
                      @change="handleChange($event, 'fileList4')"
                    >
                      <div v-if="fileList4.length < 1">
                        <a-icon :type="uploadingImage4 ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible4" :footer="null" @cancel="previewVisible4 = false">
                      <img :alt="previewImage4" style="width: 100%" :src="previewImage4" />
                    </a-modal>
                  </a-form-model-item>
                </a-col>

                <a-col :lg="8" :md="12">
                  <a-form-model-item :label="$t('photo_card_registration')" prop="photo_card_registration">
                    <a-upload
                      class="picture-card"
                      :disabled="!editable"
                      :customRequest="uploadImage5"
                      list-type="picture-card"
                      :file-list="fileList5"
                      @preview="handlePreview($event, '5')"
                      @change="handleChange($event, 'fileList5')"
                    >
                      <div v-if="fileList5.length < 1">
                        <a-icon :type="uploadingImage5 ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible5" :footer="null" @cancel="previewVisible5 = false">
                      <img :alt="previewImage5" style="width: 100%" :src="previewImage5" />
                    </a-modal>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <div style="display: flex; align-items: center; gap: 12px; justify-content: flex-end">
                <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 20px">
                  <a-button @click="updateInvestorPhoneNumber" type="primary" :loading="loading"> {{ $t('save_phone_number') }} </a-button>
                </div>
                <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 20px">
                  <a-button @click="updateSomeFields" type="primary" :loading="loading"> {{ $t('save') }} </a-button>
                </div>
              </div>
            </a-card>
            <a-card class="no-border-card no-pt-body-card">
              <div style="float: right; display: flex; align-items: center">
                <span style="margin-right: 30px" v-if="last_user">{{ $t('last user') }}:  {{ last_user }}</span>
                <span style="margin-right: 10px">{{ $t('status') }}:</span>
                <a-select style="width: 200px; margin-right: 10px" v-model="status" @change="changeStatus">
                  <!--                  <a-select-option v-for="(item,index) in statuses" :value="item.status" :key="index">-->
                  <!--                     {{$t(item.status)}}-->
                  <!--                  </a-select-option>-->
                  <a-select-option value="confirmed" >
                    {{ $t('confirmed') }}
                  </a-select-option>
                  <a-select-option value="cancelled" :disabled="investor.status !== 'new'">
                    {{ $t('cancelled') }}
                  </a-select-option>
                  <a-select-option value="new" disabled>
                    {{ $t('new') }}
                  </a-select-option>
                  <a-select-option value="in_process" disabled>
                    {{ $t('in_process') }}
                  </a-select-option>
                  <a-select-option value="current" disabled>
                    {{ $t('current') }}
                  </a-select-option>
                  <a-select-option value="left" disabled>
                    {{ $t('left') }}
                  </a-select-option>
                </a-select>
                <a-button @click="updateStatus" :disabled="!editable" type="primary" :loading="changing"> {{ $t('update.status') }} </a-button>
              </div>
            </a-card>
            <a-card v-if="status === 'cancelled' " :title="$t('Описание')" class="no-border-card no-pt-body-card">
              <a-form-model
                :colon="false"
                ref="ruleDescr"
                :model="radio"
                :rules="rulesDescr"
              >
                <a-row class="form-row" :gutter="16">
                  <a-tabs :activeKey="activeTabKey" @change="e => activeTabKey = e">
                    <a-tab-pane key="en" :tab="$t('en')">
                      <a-col>
                        {{ $t('description_en') }}
                      </a-col>
                      <a-col :span="24">
                        <a-radio-group v-model="radio.en" >
                          <a-radio
                            v-for="(item, index) in radioValues.en"
                            @change="onChangeRadio($event, index)"
                            :value="item.value"
                            :style="radioStyle"
                            :key="index"
                            :disabled="isDisableRadio"
                          >
                            {{ item.value }}
                          </a-radio>
                        </a-radio-group>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item :label="$t('description_en')" ref="title.en" prop="title.en">
                          <a-textarea
                            @change="onChangeInput"
                            :disabled="isDisabled"
                            :placeholder="$t('description_en')"
                            v-model="radio.en"
                          />
                        </a-form-model-item>
                      </a-col>
                    </a-tab-pane>
                    <a-tab-pane key="ru" :tab="$t('ru')" forceRender>
                      <a-col>
                        {{ $t('description_ru') }}
                      </a-col>
                      <a-col :span="24">
                        <a-radio-group v-model="radio.ru">
                          <a-radio
                            v-for="(item, index) in radioValues.ru"
                            @change="onChangeRadio($event, index)"
                            :value="item.value"
                            :style="radioStyle"
                            :key="index"
                            :disabled="isDisableRadio"
                          >
                            {{ item.value }}
                          </a-radio>
                        </a-radio-group>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="title.ru" :label="$t('description_ru')" prop="title.ru">
                          <a-textarea
                            @change="onChangeInput"
                            :disabled="isDisabled"
                            :placeholder="$t('description_ru')"
                            v-model="radio.ru"
                          />
                        </a-form-model-item>
                      </a-col>
                    </a-tab-pane>
                    <a-tab-pane key="uz" :tab="$t('uz')" forceRender>
                      <a-col>
                        {{ $t('description_uz') }}
                      </a-col>
                      <a-col :span="24">
                        <a-radio-group v-model="radio.uz">
                          <a-radio
                            v-for="(item, index) in radioValues.uz"
                            @change="onChangeRadio($event, index)"
                            :value="item.value"
                            :style="radioStyle"
                            :key="index"
                            :disabled="isDisableRadio"
                          >
                            {{ item.value }}
                          </a-radio>
                        </a-radio-group>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="title.uz" :label="$t('description_uz')" prop="title.uz">
                          <a-textarea
                            @change="onChangeInput"
                            :disabled="isDisabled"
                            :placeholder="$t('description_uz')"
                            v-model="radio.uz"
                          />
                        </a-form-model-item>
                      </a-col>
                    </a-tab-pane>
                  </a-tabs>
                  <a-col v-if="isDisabled || isDisableRadio ">
                    <a-button @click="clearValue" icon="delete">
                      {{ $t('clear-value') }}
                    </a-button>
                  </a-col>
                </a-row>
              </a-form-model>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="3" :tab="$t('Investor card')">
            <investor-card />
          </a-tab-pane>
          <a-tab-pane key="4" :tab="$t('investorClaims')">
            <a-card>
              <a-table
                :columns="columnsClaims"
                :data-source="investorClaims"
                :row-key="record => record.claim_id"
                size="middle"
                :pagination="false"
                :loading="claimsLoading"
                bordered
              >
                <span slot="payment_type" slot-scope="text">
                  {{ $t(text) }}
                </span>
                <span slot="type" slot-scope="text">
                  {{ $t(text.claim_type) }}
                </span>
                <span slot="created_at" slot-scope="text">
                  {{ text.created_at | moment($dateTimeFormat) }}
                </span>
                <span slot="amount" slot-scope="text">
                  {{ $moneyFormat(+text.data.amount) }}
                </span>
                <span slot="index" slot-scope="text, column, index">
                  {{ index + 1 }}
                </span>
                <span slot="residency" slot-scope="text">
                  {{ text ? 'Резидент' : 'Нерезидент' }}
                </span>
                <span slot="fullname" slot-scope="text, row">
                  {{ `${row.investor && row.investor.passport_data && row.investor.passport_data.first_name || ''}  ${ row.investor && row.investor.passport_data && row.investor.passport_data.last_name || ''}` }}
                </span>
                <span slot="birth_day" slot-scope="text">
                  {{ text.birth_day | moment($dateTimeFormat) }}
                </span>
                <span slot="status" slot-scope="text">
                  <a-tag :color="getClaimStatusColor(text.status)">{{ $t(text.status) }}</a-tag>
                </span>
                <span slot="actions" slot-scope="text">
                  <delete-btn @confirm="deleteInvestor(text)"/>
                </span>
              </a-table>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="6" :tab="$t('История изменение статусов')"><Logs /></a-tab-pane>
          <a-tab-pane key="5" :tab="$t('files')">
            <a-card>
              <a-table
                bordered
                :scroll="{ x: 200, y: 700 }"
                :pagination="false"
                :columns="columnsFiles"
                :data-source="arrayFiles">
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
                      <a :href="`${text.file}`" target="blank" v-if="text.format === 'pdf'" :disabled="!text.file">
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
          <a-tab-pane key="54" :tab="$t('Цель инвестора')">
            <a-card v-if="investor.investor_goal">
              <a-row type="flex" :gutter="[16, 8]">
                <a-col span="8">
                  <a-form-model-item :label="$t('Срок достижения цели')" prop="investor_goal.deadline_for_goal">
                    <a-input disabled v-model="investor.investor_goal.deadline_for_goal"></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col span="8">
                  <a-form-model-item :label="$t('Название цели')" prop="investor_goal.goal_name">
                    <a-input disabled v-model="investor.investor_goal.goal_name"></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col span="8">
                  <a-form-model-item :label="$t('Значок цели')" prop="investor_goal.goal_icon">
                    <a-input disabled v-model="investor.investor_goal.goal_icon"></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col span="8">
                  <a-form-model-item :label="$t('Первоначальные инвестиции')" prop="investor_goal.initial_investment">
                    <a-input disabled type="text" :value="$moneyFormat(investor.investor_goal.initial_investment)"></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col span="8">
                  <a-form-model-item :label="$t('Деньги для цели')" prop="investor_goal.money_for_goal">
                    <a-input disabled type="text" :value="$moneyFormat(investor.investor_goal.money_for_goal)" ></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col span="8">
                  <a-form-model-item :label="$t('Ежемесячные инвестиции')" prop="investor_goal.monthly_investment">
                    <a-input disabled type="text" :value="$moneyFormat(investor.investor_goal.monthly_investment)"></a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="sadi" :tab="$t('Авто инвест')">
            <AutoInvestTab />
          </a-tab-pane>
        </a-tabs>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import Logs from './logs.vue'
import AutoInvestTab from './AutoInvestTab.vue'
import InvestorCard from './InvestorCard.vue'
import TagSelectOption from '@/components/TagSelect/TagSelectOption'
import rulesDescr from './formDescrRules'

// import request from '@/utils/request'
// import imageUpload from '@/mixins/imageUpload'
// import { delete } from 'node_modules/vue/types/umd'
export default {
  components: { TagSelectOption, Logs, InvestorCard, AutoInvestTab },
  // mixins: [imageUpload],
  data () {
    //  const validatePassport = (rule, value, callback) => {
    //   if (/^[A-Z0-9]{9}$/.test(value)) {
    //     callback()
    //   } else {
    //     callback(new Error(this.$t('incorrectPassport')))
    //   }
    // }
    //  const validateINN = (rule, value, callback) => {
    //   if (/^\d{9}$/.test(value)) {
    //     callback()
    //   } else {
    //     callback(new Error(this.$t('incorrectINN')))
    //   }
    // }
    // const validatePin = (rule, value, callback) => {
    //   if (/\d{14}$/.test(value)) {
    //     callback()
    //   } else {
    //     callback(new Error(this.$t('incorrectPinfl')))
    //   }
    // }
    return {
      regions: [],
      districts: [],
      labelCol: { span: 5 },
      wrapperCol: { span: 'auto' },
      formDescr: {
        title: {
          en: '',
          ru: '',
          uz: ''
        }
      },
      isDisabled: false,
      isDisableRadio: false,
      rulesDescr: rulesDescr,
      radio: {
        en: '',
        ru: '',
        uz: ''
      },
      activeTabKey: 'en',
      radioValues: {
          en: [
            { value: 'Please upload a high-quality address registration photo' },
            { value: 'Please upload a high-quality photo of your original passport or ID card' },
            { value: 'Please upload a high-quality photo of the original passport/ID-card and address registration document' },
            { value: 'Please upload a high-quality photo of your biometric (green) passport or ID card, we cannot accept international passports for Uzbekistan citizens.' }
          ],
          ru: [
            { value: 'Пожалуйста загрузите качественное фото прописки' },
            { value: 'Пожалуйста загрузите качественное фото оригинала паспорта или ID-карты' },
            { value: 'Пожалуйста загрузите качественное фото оригинала паспорта/ID-карты и фото прописки' },
            { value: 'Пожалуйста загрузите качественное фото биометрического (зеленого) паспорта или ID-карты, мы не можем принять загранпаспорт.' }
          ],
          uz: [
            { value: 'Iltimos, propiskangizni yuqori sifatli suratini yuklang' },
            { value: 'Iltimos, pasportingiz yoki ID kartangizning asl nusxasini yuqori sifatli suratini yuklang' },
            { value: 'Iltimos, pasport yoki ID-kartangizning va propiskangizni asl nusxasini yuqori sifatli suratini yuklang' },
            { value: ' Biometrik (yashil) pasportingizni yoki ID kartangizni yuqori sifatli suratini yuklang, biz xalqaro pasportlarni qabul qila olmaymiz.' }
          ]
     },
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      statuses: [
        {
          status: 'confirmed'
        },
        {
          status: 'cancelled'
        },
        {
          status: 'new'
        },
        {
          status: 'in_process'
        },
        {
          status: 'current'
        },
        {
          status: 'left'
        }
      ],
      rules: {
        'passport_data.first_name': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'phone_number': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'passport_data.pin': [{ required: true, message: this.$t('incorrectPinfl'), trigger: 'blur' },
          { required: true, message: 'Укажите ненулевое значение', validator: this.validatePin, trigger: 'change' }],
        // 'inn': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }, { validator: validateINN, trigger: 'change' }],
        'passport_data.doc_number': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'passport_data.gender': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }],
        'type': [{ required: true, message: 'Пожалуйста, выберите поле', trigger: 'blur' }],
        'stage': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
        'status': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }]
      },
      last_user: '',
      sourceIncomeVal: '',
      dateValueFormat: 'YYYY-MM-DD',
      changing: false,
      status: '',
      jobitem: '',
      fileList: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      previewImage: '',
      previewImage2: '',
      previewImage3: '',
      previewImage4: '',
      previewImage5: '',
      previewVisible: false,
      previewVisible2: false,
      previewVisible3: false,
      previewVisible4: false,
      previewVisible5: false,
      uploadingImage: false,
      uploadingImage2: false,
      uploadingImage3: false,
      uploadingImage4: false,
      uploadingImage5: false,
      loading: false,
      updateForm: {
        'date_of_issue': '',
        'id': '',
        'kyc': {
          'actual_address': '',
          'current_workplace': '',
          'domestic_phone_number': '',
          'email': '',
          'monthly_income': '',
          'source_of_income': '',
          'source_of_income_description': '',
          'temporary_address': ''
        },
        'patronymic': '',
        'place_of_issue': '',
        'profile_photo': ''
      },
      overAllBalance: null,
      overAllIncome: null,
      editable: false,
      isCurrent: false,
      selectedInvestors: {},
      transactions: [],
      debitTrancations: [],
      creditTransactions: [],
      investorCards: [],
      investorPhoneNumber: '',
      investor: {
        country: '',
        id: '',
        inn: 0,
        inps: 1,
        is_resident: false,
        kyc: {
          actual_address: '',
          current_workplace: '',
          domestic_phone_number: '',
          email: '',
          monthly_income: '',
          job: [],
          source_of_income: [],
          source_of_income_description: '',
          temporary_address: '',
          city: '',
          region: '',
          village: '',
          street: ''
        },
        passport_data: {
          birth_day: '',
          date_of_expiry: '',
          date_of_issue: '',
          doc_number: '',
          first_name: '',
          gender: '',
          last_name: '',
          passport_photo: '',
          photo_card_registration: '',
          patronymic: '',
          photo_document: '',
          pin: null,
          place_of_birth: '',
          place_of_issue: '',
          registration_photo: ''
        },
        password: '',
        phone_number: '',
        profile_photo: '',
        stage: '',
        status: '',
        type: ''
      },
      pagination: {
        current: 1
      },
      investorbalance: {},
      activeTab: '1',
      form: {
        amount: '',
        amount1: ''
      },
      claimsLoading: false,
      investorClaims: [],
      columnsClaims: [
          {
              title: '№',
              key: 'index',
              scopedSlots: { customRender: 'index' }
          },
          {
            title: this.$t('Created_at'),
            scopedSlots: { customRender: 'created_at' },
            key: 'created_at',
            customCell: this.onRowCLickFunc
          },
          {
            title: this.$t('type'),
            key: 'type',
            scopedSlots: { customRender: 'type' },
            customCell: this.onRowClick
          },
          {
              title: this.$t('payment_type'),
              dataIndex: 'payment_type',
              scopedSlots: { customRender: 'payment_type' },
              customCell: this.onRowClick
          },
          {
              title: this.$t('Status'),
              scopedSlots: { customRender: 'status' },
              key: 'status',
              fixed: 'right',
              width: 120,
              customCell: this.onRowClick
          }
      ],
      columns1: [
      {
          title: this.$t('created_at'),
          scopedSlots: { customRender: 'created_at' },
          key: 'created_at'
        },
        {
          title: this.$t('amount'),
          dataIndex: 'amount',
          key: 'amount'
        },
        {
          title: this.$t('type'),
          scopedSlots: { customRender: 'type' },
          key: 'type'
        }
      ],
      columnsFiles: [
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
      cardsColumns: [
        // {
        //   title: this.$t('card.name'),
        //   // scopedSlots: { customRender: 'icon' },
        //   key: 'card_name',
        //   dataIndex: 'card_name'
        // },
        {
          title: this.$t('card.number'),
          // scopedSlots: { customRender: 'type' },
          key: 'card_number',
          dataIndex: 'card_number'
        },
        {
          title: this.$t('card_expiry_month'),
          scopedSlots: { customRender: 'card_expiry_month' },
          key: 'card_expiry_month'
        },
        {
          title: this.$t('card_expiry_year'),
          scopedSlots: { customRender: 'card_expiry_year' },
          key: 'card_expiry_year'
        }
        // {
        //   title: 'CVC',
        //   // scopedSlots: { customRender: 'actions' },
        //   key: 'cvc',
        //   dataIndex: 'cvc'
        // },
        // {
        //   title: this.$t('expiry.date'),
        //   // scopedSlots: { customRender: 'icon' },
        //   key: 'expiry_date',
        //   dataIndex: 'expiry_date'
        // }
      ],
      arrayFiles: []
    }
  },
  mounted () {
    console.log(this.$t('lang'))
  },
  methods: {
    ...mapActions(['getInvestorCards']),

    validatePin (rule, value, callback) {
      if (value.length === 1 && value === '0') {
        // eslint-disable-next-line standard/no-callback-literal
        callback(['Error'])
      }
      callback()
      // eslint-disable-next-line standard/no-callback-literal
      // callback(['Error'])
    },
    onRowClick (record, index) {
      return {
        on: {
          click: (event) => {
            this.$router.push(`/mudaraba/cash_in/${record.claim_id}`)
          }
        }
      }
    },
    changeStatus (val) {
      console.log('selected', val)
    },
    getInvestorClaims () {
      this.claimsLoading = true
      this.$store.dispatch('getInvestorClaims', this.$route.params.id).then(res => {
        console.log(res)
        // this.investor = res.investor
        this.investorClaims = res.claims
      })
      .finally(() => {
        this.claimsLoading = false
      })
    },
    getCards () {
      // console.log('CArds====', this.$route.params.id)
      this.getInvestorCards({ id: this.$route.params.id })
        .then(res => {
          console.log('Investor-cards', res)
          this.investorCards = res.cards
        })
        .catch(() => this.$message.error('Error on getting investor cards'))
    },
    getClaimStatusColor (color) {
        var selected
        switch (color) {
            case 'request_sent':
                selected = 'purple'
                break
            case 'confirmed':
                selected = 'blue'
                break
            case 'check_payment_pending':
                selected = 'orange'
                break
            case 'signature_pending':
                selected = 'yellow'
                break
            case 'success':
                selected = 'green'
                break
            case 'paid':
                selected = 'cyan'
                break
            case 'cancelled':
                selected = 'red'
                break
            default:
            selected = ''
        }
        return selected
    },
    async uploadImage (data) {
        this.uploadingImage = true
        const formData = new FormData()
        formData.append('file', data.file)
        console.log('File', data)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('uploadImage', formData).then(res => {
          console.log(res)
          this.fileList.push({
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
          })
        }).catch(err => console.log(err))
        .finally(() => {
          this.uploadingImage = false
        })
    },
    async uploadImage2 (data) {
        this.uploadingImage2 = true
        const formData = new FormData()
        formData.append('file', data.file)
        console.log('File', data)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('uploadImage', formData).then(res => {
          console.log(res)
          this.fileList2.push({
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
          })
        }).catch(err => console.log(err))
        .finally(() => {
          this.uploadingImage2 = false
        })
    },
    async uploadImage3 (data) {
        this.uploadingImage3 = true
        const formData = new FormData()
        formData.append('file', data.file)
        console.log('File', data)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('uploadImage', formData).then(res => {
          console.log(res)
          this.fileList3.push({
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
          })
        }).catch(err => console.log(err))
        .finally(() => {
          this.uploadingImage3 = false
        })
    },
    async uploadImage4 (data) {
        this.uploadingImage4 = true
        const formData = new FormData()
        formData.append('file', data.file)
        console.log('File', data)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('uploadImage', formData).then(res => {
          console.log(res)
          this.fileList4.push({
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
          })
        }).catch(err => console.log(err))
        .finally(() => {
          this.uploadingImage4 = false
        })
    },
    async uploadImage5 (data) {
        this.uploadingImage5 = true
        const formData = new FormData()
        formData.append('file', data.file)
        console.log('File', data)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('uploadImage', formData).then(res => {
          console.log(res)
          this.fileList5.push({
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
          })
        }).catch(err => console.log(err))
        .finally(() => {
          this.uploadingImage5 = false
        })
    },
    handleChange ({ fileList }, name) {
        if (fileList.length === 0) { this[name] = fileList }
    },
    async handlePreview (file, index) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        if (index === '1') {
          this.previewImage = file.url || file.preview
          this.previewVisible = true
        } else if (index === '2') {
          this.previewImage2 = file.url || file.preview
          this.previewVisible2 = true
        } else if (index === '3') {
          this.previewImage3 = file.url || file.preview
          this.previewVisible3 = true
        } else if (index === '4') {
          this.previewImage4 = file.url || file.preview
          this.previewVisible4 = true
        } else if (index === '5') {
          this.previewImage5 = file.url || file.preview
          this.previewVisible5 = true
        }
    },
    onPhoneNumber (evt) {
      var theEvent = evt || window.event
      var key = theEvent.keyCode || theEvent.which
      console.log('check', evt, key)
      if (theEvent.type === 'paste') {
          key = event.clipboardData.getData('text/plain')
      } else {
          key = String.fromCharCode(key)
      }
      var regex = /[0-9]|\./
      if (!regex.test(key)) {
        theEvent.returnValue = false
        if (theEvent.preventDefault) theEvent.preventDefault()
      }
      if (this.updateForm.kyc.domestic_phone_number.length >= 12) {
        theEvent.returnValue = false
        if (theEvent.preventDefault) theEvent.preventDefault()
      }
    },
    onDeleteAdvantage (index) {
      console.log('delete', index)
      this.investor.kyc.source_of_income.splice(index, 1)
    },
    onDeleteAdvantageJobs (index) {
      console.log('delete', index)
      this.investor.kyc.job.splice(index, 1)
    },
    onAddAdvantage () {
      // console.log(val, this.portfolio.advantages)
      // if (!this.updateForm.kyc.source_of_income) {
      //   this.portfolio.advantages = []
      // }
      this.investor.kyc.source_of_income.push(this.sourceIncomeVal)
      this.sourceIncomeVal = ''
      // console.log('new val', val)
    },
    newJobAdd () {
      this.investor.kyc.job.push(this.jobitem)
      this.jobitem = ''
    },
    getStatusColor (color) {
      var selected
      switch (color) {
        case 'refill':
          selected = 'cyan'
          break
        case 'invested':
          selected = 'green'
          break
        case 'withdraw':
          selected = 'red'
          break
        case 'new':
          selected = ''
          break
        case 'bond_repayment':
          selected = 'orange'
          break
        case 'passed':
          selected = '#87d068'
          break
        case 'not-passed':
          selected = 'red'
          break
        default:
          selected = ''
      }
      return selected
    },
    getInvestor () {
      this.$store.dispatch('getInvestor', this.$route.params.id).then(res => {
        console.log('investor ===>', res)
        this.investorPhoneNumber = res.investor.phone_number
        this.investor.is_resident = res.investor.is_resident
        this.investor.none_resident_pinfl = res.investor.none_resident_pinfl
        this.investor.none_resident_pinfl_photo = res.investor.none_resident_pinfl_photo
        this.investor.investor_goal = res.investor.investor_goal
        console.log('investor phone number', this.investorPhoneNumber)
        // this.investor = res.investor
        Object.keys(this.investor).forEach(key => {
          if (res.investor[key] || res.investor[key] === 0 || res.investor[key] === false) {
            this.investor[key] = res.investor[key]
          }
        })
        this.status = this.investor.status
        if (this.investor.status === 'new' || this.investor.status === 'confirmed' || this.investor.status === 'cancelled' || this.investor.status === 'passport') {
          this.editable = true
          this.isCurrent = true
        } else if (this.investor.status === 'current') {
          this.isCurrent = true
        } else {
          this.editable = false
          this.isCurrent = false
        }
        if (this.investor.passport_data.birth_day) {
          this.investor.passport_data.birth_day = moment(this.investor.passport_data.birth_day).format('YYYY-MM-DD')
        }
        if (this.investor.passport_data.date_of_expiry) {
          this.investor.passport_data.date_of_expiry = moment(this.investor.passport_data.date_of_expiry).format('YYYY-MM-DD')
        }
        if (this.investor.passport_data.date_of_issue) {
          this.investor.passport_data.date_of_issue = moment(this.investor.passport_data.date_of_issue).format('YYYY-MM-DD')
        }
        this.fileList2 = this.investor.passport_data.registration_photo ? [
          {
            uid: this.investor.passport_data.registration_photo.split('/').pop(),
            url: this.investor.passport_data.registration_photo,
            status: 'done',
            name: this.investor.passport_data.registration_photo
          }
        ] : []
        this.fileList = this.investor.profile_photo ? [
          {
            uid: this.investor.profile_photo.split('/').pop(),
            url: this.investor.profile_photo,
            status: 'done',
            name: this.investor.profile_photo
          }
        ] : []
        this.fileList3 = this.investor.passport_data.passport_photo ? [
          {
            uid: this.investor.passport_data.passport_photo.split('/').pop(),
            url: this.investor.passport_data.passport_photo,
            status: 'done',
            name: this.investor.passport_data.passport_photo
          }
        ] : []
        this.fileList4 = this.investor.passport_data.photo_document ? [
          {
            uid: this.investor.passport_data.photo_document.split('/').pop(),
            url: this.investor.passport_data.photo_document,
            status: 'done',
            name: this.investor.passport_data.photo_document
          }
        ] : []
        this.fileList5 = this.investor.passport_data.photo_card_registration ? [
          {
            uid: this.investor.passport_data.photo_card_registration.split('/').pop(),
            url: this.investor.passport_data.photo_card_registration,
            status: 'done',
            name: this.investor.passport_data.photo_card_registration
          }
        ] : []
        if (res.investor && res.investor.user_id) {
          this.$store.dispatch('getSystemUser', res.investor.user_id)
          .then(result => {
            this.last_user = result.username
          })
        }
        // Object.keys(this.updateForm).forEach(key => {
        //   if (['date_of_issue', 'patronymic', 'place_of_issue'].includes(key)) {
        //     this.updateForm[key] = JSON.parse(JSON.stringify(this.investor.passport_data[key]))
        //   } else if (this.investor[key]) {
        //     if (key === 'profile_photo') {
        //       this.fileList = [
        //         { uid: this.investor[key].split('/').pop(), url: this.investor[key], status: 'done', name: this.investor[key] }
        //       ]
        //     } else {
        //       this.updateForm[key] = JSON.parse(JSON.stringify(this.investor[key]))
        //       delete this.investor[key]
        //     }
        //   } else {
        //     this.updateForm[key] = ''
        //   }
        // })
      })
    },
    getInvestorCertificates () {
      const imgExtensions = ['svg', 'png', 'jpg', 'jpeg']
      this.$store.dispatch('getInvestorCertificates', this.$route.params.id).then(res => {
        this.arrayFiles = res.files.map(el => {
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
    },
    async download (e) {
      console.log(e)
      // await fetch(e.file).then(response => response.blob()).then(data => {
        // console.log(data)
        const fileLink = document.createElement('a')
        fileLink.href = `${e.file}`
        fileLink.setAttribute('download', e.title)
        document.body.appendChild(fileLink)
        fileLink.click()
      // })
    },
    updateStatus () {
      if (this.status === 'cancelled') {
        if (this.radio.en === '' || this.radio.ru === '' || this.radio.uz === '') {
          this.$message.warn(`${this.$t('please_fill')}`)
          return
        }
      }
      this.changing = true
      this.$store.dispatch('updateInvestorStatus', {
        status: this.status,
        investor_ids: [
          this.$route.params.id
        ],
        message: {
          name_en: this.radio.en,
          name_ru: this.radio.ru,
          name_uz: this.radio.uz
        }
      })
        .then(result => {
          console.log('Update ', result)
          this.$message.success('Status has Успешно обновлено')
          this.getInvestor()
          this.clearValue()
      })
      .catch(error => {
        console.log('Error', error)
      })
      .finally(() => {
        this.changing = false
      })
    },
    onChangeRadio (e, index) {
      console.log('radio checked', e.target.value, index)
      this.radio.en = this.radioValues.en[index].value
      this.radio.ru = this.radioValues.ru[index].value
      this.radio.uz = this.radioValues.uz[index].value
      this.isDisabled = true
    },
    onChangeInput (e) {
      this.isDisableRadio = true
      if (!e.target.value) {
        this.isDisableRadio = false
      }
    },
    clearValue () {
        this.radio.en = ''
        this.radio.ru = ''
        this.radio.uz = ''
        this.isDisabled = false
        this.isDisableRadio = false
    },
    updateInvestorPhoneNumber () {
      if (this.investorPhoneNumber) {
        console.log(this.$route.params.id)
         this.$store.dispatch('updateInvestorPhone', { id: this.$route.params.id, data: { phone: this.investorPhoneNumber } })
            .then(result => {
              console.log('Update ', result)
              this.$alertMessage('success', 'Investor', 'Investor Успешно обновлено', this)
              this.getInvestor()
              // this.$router.push({ name: 'invetstors-list' })
          })
          .catch(error => {
            console.log('Error', error)
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        return null
      }
    },
    updateSomeFields () {
      this.$refs.ruleForm.validate((valid, values) => {
        if (valid) {
          this.loading = true
          const _form = JSON.parse(JSON.stringify(this.investor))
          _form.passport_data.registration_photo = this.fileList2[0] ? this.fileList2[0].uid : ''
          _form.profile_photo = this.fileList[0] ? this.fileList[0].uid : ''
          _form.passport_data.passport_photo = this.fileList3[0] ? this.fileList3[0].uid : ''
          _form.passport_data.photo_document = this.fileList4[0] ? this.fileList4[0].uid : ''
          _form.passport_data.photo_card_registration = this.fileList5[0] ? this.fileList5[0].uid : ''
          _form.inn = _form.inn ? parseInt(_form.inn) : _form.inn
          _form.passport_data.pin = _form.passport_data.pin ? parseInt(_form.passport_data.pin) : _form.passport_data.pin
          this.$store.dispatch('updateInvestor', { id: this.$route.params.id, data: _form })
            .then(result => {
              console.log('Update ', result)
              this.$alertMessage('success', 'Investor', 'Investor Успешно обновлено', this)
              this.getInvestor()
              // this.$router.push({ name: 'invetstors-list' })
          })
          .catch(error => {
            console.log('Error', error)
          })
          .finally(() => {
            this.loading = false
          })
        } else {
          const firstErr = values[Object.keys(values)[0]][0].message
          this.$message.warning(firstErr)
        }
      })
    },
    deleteInvestor () {
      if (this.investorClaims.length > 0) return
      this.$store.dispatch('deleteInvestor', this.$route.params.id)
        .then(res => {
          this.$alertMessage('success', 'Deleted', 'Investor has deleted successfully', this)
          this.$router.push({ name: 'invetstors-list' })
        })
        .catch(reject => {
          console.log(reject.response.data)
          if (reject.response.data) {
            this.$alertMessage('error', 'Произошла ошибка', '', this)
          }
        })
    },
    getInvestorbalance (guid) {
      this.$store.dispatch('getInvestorBalance', this.$route.params.id).then(res => {
        this.investorbalance = res
        console.log(res)
      })
    },
    fillInvestor (guid) {
        const a = {
          id: this.investor.id,
          amount: {
            amount: parseInt(this.form.amount)
          }
        }
        console.log(this.amount)
        console.log(a)
      this.$store.dispatch('fillInvestor', a).then((res) => {
        // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)
        this.$message.success(' Balance  has filled successfully', this)
        this.activeTab = '2'
      })
    },
   widthdrawInvestor (guid) {
     const b = {
          id: this.investor.id,
          amount: {
            amount: parseInt(this.form.amount1)
          }
        }
      this.$store.dispatch('widthdrawInvestor', b).then((res) => {
        // this.installment_list = this.installment_list.filter((el) => el.guid !== item.guid)
      })
      this.$message.success('Balance  has widthdrawed successfully', this)
      this.activeTab = '2'
    },
    getPagination (e) {
    this.$router.push({ path: this.$router.fullPath, query: { page: e.current, limit: 10 } })
    this.getInvestorTransaction({ query: { page: e.current, limit: 10 }, id: this.$route.params.id })
    this.pagination.current = e.current
  },
    getInvestorTransaction (query) {
      this.$store.dispatch('getInvestorTransaction', query).then((res) => {
        console.log(res)
        this.transactions = res.transactions
         const pagination = { ...this.pagination }
             pagination.total = res.count
             this.pagination = pagination
      }).catch(reject => {
        console.log(reject.response.data)
        this.$notification.warning(reject.response.data.message)
      })
    },
    getRegionAndDistricts () {
      this.$store.dispatch('getDistricts').then(res => {
        this.districts = res.districts
      })
      this.$store.dispatch('getRegions').then(res => {
        this.regions = res.regions
      })
    }
  },
  created () {
    // console.log(this.$route)
    // this.getInvestorTransaction({ query: { page: 1, limit: 10 }, id: this.$route.params.id })
    // this.getInvestorInvestments(this.$route.params.id)
    this.getInvestor(this.$route.params.id)
    this.getInvestorCertificates()
    this.getInvestorClaims()
    this.getCards()
    this.getRegionAndDistricts()
    // this.getInvestorbalance(this.$route.params.id)
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding-right: 20px;
}
</style>
