<template>
  <div >
    <a-navigation
      :list="[{ name: $t('Clients'), link: '/clients/list'},
              { name: $t('ClientData'), link: ''}]"
      :isBack="{ flag: true, return: true }"
      noBorder
    />
    <a-card class="no-space-tab">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" :tab="$t('Детали рассрочки')">
          <a-card :title="$t('passportData')" class="no-border-card no-pt-body-card">
            <a-row :gutter="16">
              <a-col :lg="8" :md="12">
                <a-form-model-item ref="passport_data.first_name" :label="$t('investors.table.first_name')" prop="passport_data.first_name">
                  <a-input disabled v-model="form.passport.first_name" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('investors.table.last_name')" prop="min_investment_amount">
                  <a-input disabled v-model="form.passport.last_name" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('patronymic')" prop="min_investment_amount">
                  <a-input disabled v-model="form.passport.patronymic" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('investors.table.birthday')" prop="min_investment_amount">
                  <a-date-picker
                    disabled
                    placeholder="Select Time"
                    :format="$dateFormat"
                    v-model="form.passport.birthday"
                    style="width: 100%"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('place_of_birth')" prop="place_of_birth">
                  <a-input disabled v-model="form.passport.place_of_birth" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('investors.table.gender')" prop="passport_data.gender">
                  <a-input disabled v-model="form.passport.gender.data.name_ru" style="width: 100%" />
                  <!-- <a-select disabled style="width: 100%" v-model="form.passport.gender">
                            <a-select-option value="male" >
                            {{ $t('gender.male') }}
                            </a-select-option>
                            <a-select-option value="female" >
                            {{ $t('gender.female') }}
                            </a-select-option>
                        </a-select> -->
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('investors.table.passport_id')" prop="doc_number">
                  <a-input disabled v-model="form.passport.doc_number" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('pinfl')" prop="pin">
                  <a-input-number disabled :min="0" :max="99999999999999" v-model="form.passport.pin" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('investors.table.expiry_date')" prop="min_investment_amount">
                  <a-date-picker
                    disabled
                    :format="$dateFormat"
                    placeholder="Select Time"
                    v-model="form.passport.date_of_expiry"
                    style="width: 100%"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('investors.table.issue_date')" prop="min_investment_amount">
                  <a-date-picker
                    disabled
                    :format="$dateFormat"
                    placeholder="Select Time"
                    v-model="form.passport.date_of_issue"
                    style="width: 100%"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('place_of_issue')" prop="min_investment_amount">
                  <a-input disabled v-model="form.passport.place_of_issue" style="width: 100%" />
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
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
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-card>

          <a-card :title="$t('Personal_info')" class="no-border-card no-pt-body-card">
            <a-row :gutter="16">
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('additional_income')" prop="min_investment_amount">
                  <a-input-number disabled v-model="form.personal_info.additional_income" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('children')" prop="min_investment_amount">
                  <a-input disabled v-model="form.personal_info.children" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('employment_type')" prop="min_investment_amount">
                  <a-input disabled v-model="form.personal_info.employment_type.data.name_ru" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('family_status')" prop="min_investment_amount">
                  <a-input disabled v-model="form.personal_info.family_status.data.name_ru" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('home_phone_number')" prop="min_investment_amount">
                  <a-input disabled v-model="form.personal_info.home_phone_number" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('phone_number')" prop="advantage">
                  <!-- <a-input
                            style="width: 100%"
                            disabled
                            v-model="form.kyc.source_of_income[index]"
                            v-for="(item, index) in form.kyc.source_of_income"
                            :key="index">
                            <a-icon slot="addonAfter" type="delete" @click="onDeleteAdvantage(index)"/>
                        </a-input> -->
                  <a-input disabled v-model="form.personal_info.phone_number" style="width: 100%" />
                </a-form-model-item>

                <!-- <div ongoing>
                        <a-input placeholder="source" v-model="sourceIncomeVal" style="width: 100%" disabled @pressEnter="onAddAdvantage">
                            <span slot="addonAfter" disabled @click="onAddAdvantage">
                            {{ $t('add') }}
                            </span>
                        </a-input>
                        </div> -->
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('phone_number_of_card')" prop="temporary_address">
                  <a-input disabled v-model="form.personal_info.phone_number_of_card" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item ref="phone_number" :label="$t('phone_owner')" prop="phone_number">
                  <a-input disabled v-model="form.personal_info.phone_owner" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item ref="phone_number" :label="$t('salary')" prop="phone_number">
                  <a-input disabled v-model="form.personal_info.salary" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item ref="phone_number" :label="$t('second_phone_number')" prop="phone_number">
                  <a-input disabled v-model="form.personal_info.second_phone_number" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item ref="phone_number" :label="$t('total_family_income')" prop="phone_number">
                  <a-input disabled v-model="form.personal_info.total_family_income" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="12" :md="12">
                <a-form-model layout="inline">
                  <a-form-model-item :label="`${$t('has_credit_now')}:`">
                    <a-checkbox disabled :checked="form.personal_info.has_credit_now">
                    </a-checkbox>
                  </a-form-model-item>
                </a-form-model>
              </a-col>
            </a-row>
          </a-card>

          <a-card :title="$t('bonds.table.adress_registration')" class="no-border-card no-pt-body-card">
            <a-row :gutter="16">
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('apartment_number')" prop="min_investment_amount">
                  <a-input-number disabled v-model="form.registration_address.address.apartment_number" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('district')" prop="min_investment_amount">
                  <a-input disabled v-model="form.registration_address.address.district.data.name_ru" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('house_number')" prop="min_investment_amount">
                  <a-input disabled v-model="form.registration_address.address.house_number" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('mahalla')" prop="min_investment_amount">
                  <a-input disabled v-model="form.registration_address.address.mahalla" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('region')" prop="min_investment_amount">
                  <a-input disabled v-model="form.registration_address.address.region.data.name_ru" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('street_address')" prop="advantage">
                  <a-input disabled v-model="form.registration_address.address.street_address" style="width: 100%" />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card :title="$t('Residence_adress')" class="no-border-card no-pt-body-card">
            <a-row :gutter="16">
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('apartment_number')" prop="min_investment_amount">
                  <a-input disabled v-model="form.residence_address.address.apartment_number" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('district')" prop="min_investment_amount">
                  <a-input disabled v-model="form.residence_address.address.district.data.name_ru" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('house_number')" prop="min_investment_amount">
                  <a-input disabled v-model="form.residence_address.address.house_number" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('mahalla')" prop="min_investment_amount">
                  <a-input disabled v-model="form.residence_address.address.mahalla" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('region')" prop="min_investment_amount">
                  <a-input disabled v-model="form.residence_address.address.region.data.name_ru" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('street_address')" prop="temporary_address">
                  <a-input disabled v-model="form.residence_address.address.street_address" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="12" :md="12">
                <a-form-model layout="inline">
                  <a-form-model-item :label="`${$t('is_match_registration_address')}:`">
                    <a-checkbox disabled :checked="form.residence_address.is_match_registration_address">
                    </a-checkbox>
                  </a-form-model-item>
                </a-form-model>
              </a-col>
            </a-row>
          </a-card>
          <a-card :title="$t('work_address')" class="no-border-card no-pt-body-card">
            <a-row :gutter="16">
              <a-col :lg="8" :md="12">
                <a-form-model-item v-if="form.work_address.address" :label="$t('apartment_number')" prop="min_investment_amount">
                  <a-input disabled v-model="form.work_address.address.apartment_number" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item v-if="form.work_address.address" :label="$t('district')" prop="min_investment_amount">
                  <a-input disabled v-model="form.work_address.address.district.data.name_ru" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item v-if="form.work_address.address" :label="$t('house_number')" prop="min_investment_amount">
                  <a-input disabled v-model="form.work_address.address.house_number" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item v-if="form.work_address.address" :label="$t('mahalla')" prop="min_investment_amount">
                  <a-input disabled v-model="form.work_address.address.mahalla" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item v-if="form.work_address.address" :label="$t('region')" prop="min_investment_amount">
                  <a-input disabled v-model="form.work_address.address.region.data.name_ru" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item v-if="form.work_address.address" :label="$t('street_address')" prop="temporary_address">
                  <a-input disabled v-model="form.work_address.address.street_address" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="8" :md="12">
                <a-form-model-item :label="$t('Job_organization')" prop="temporary_address">
                  <a-input disabled v-model="form.work_address.organization_name" style="width: 100%" />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('files')">
          <a-card>
            <h3 :style="{ marginBottom: '16px' }">
              {{ $t('documents') }}
            </h3>
            <a-list :data-source="array0">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta>
                  <span slot="title">{{ item.title }}</span>
                  <!-- <a slot="title" @click="go(item)">{{ item.format === 'photo' ? 'Изображение' : 'Документ' }}</a> -->
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
                        <!-- <a-button type="primary" icon="eye" /> -->
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
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
// import ruleForm from './ruleForm'
// import index from '../Preview/index.vue'
import imageUpload from '@/mixins/imageUpload'
export default {
  mixins: [imageUpload],
  data () {
    return {
      form: {
        guid: '',
        passport: {
            first_name: '',
            last_name: '',
            patronymic: '',
            doc_number: '',
            date_of_issue: '',
            date_of_expiry: '',
            birthday: '',
            place_of_birth: '',
            place_of_issue: '',
            photo_document: '',
            pin: '',
            gender: {
            id: 1,
            data: {
                name_ru: '',
                name_uz: '',
                name_en: ''
            }
            },
            inn: '',
            passport_photo: ''
        },
        personal_info: {
            phone_number: '',
            home_phone_number: '',
            second_phone_number: '',
            salary: 0,
            additional_income: 0,
            total_family_income: 0,
            family_status: {
            id: 1,
            data: {
                name_ru: '',
                name_uz: '',
                name_en: ''
            }
            },
            customer_cards: [],
            phone_number_of_card: '',
            children: 3,
            has_credit_now: false,
            employment_type: {
            id: 7,
            data: {
                name_ru: '',
                name_uz: '',
                name_en: ''
            }
            },
            phone_owner: ''
        },
        additional_contacts: [],
        registration_address: {
            address: {
            district: {
                id: 0,
                data: {
                name_ru: '',
                name_uz: '',
                name_en: ''
                }
            },
            region: {
                id: 0,
                data: {
                name_ru: '',
                name_uz: '',
                name_en: ''
                }
            },
            street_address: '',
            house_number: '',
            apartment_number: '',
            mahalla: ''
            }
        },
        residence_address: {
            address: {
            district: {
                id: 0,
                data: {
                name_ru: '',
                name_uz: '',
                name_en: ''
                }
            },
            region: {
                id: 0,
                data: {
                name_ru: '',
                name_uz: '',
                name_en: ''
                }
            },
            street_address: '',
            house_number: '',
            apartment_number: '',
            mahalla: ''
            },
            is_match_registration_address: true
        },
        work_address: {
            organization_name: '',
            address: null
        },
        customer_id: '',
        status: '',
        attachments: {
            signature_file_name: '',
            agreement: ''
        },
        created_at: ''
        },
        array0: [],
        imageFile: '',
        visibleImage: false,
        fileList3: [],
        fileList4: [],
        previewImage3: '',
        previewImage4: '',
        previewVisible3: false,
        previewVisible4: false,
        uploadingImage3: false,
        uploadingImage4: false
    }
  },
  components: {
    //   index
  },
  methods: {
    async handlePreview (file, index) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        this[`previewImage${index}`] = file.url || file.preview
        this[`previewVisible${index}`] = true
    },
    handleChange ({ fileList }) {
        if (fileList.length === 0) { this.fileList = fileList }
    },
    getPosAgent (guid) {
      this.$store.dispatch('getClient', this.$route.params.id).then((res) => {
        console.log('hello resopnse', res, Object.entries(res.customer.attachments))
        this.form = {
            ...res.customer
        }
        // const imageList = Object.entries(res.customer.attachments).pop()[1].map(el => ({ file: el, key: el, format: 'photo' }))
        const imageList = []
        const imgExtensions = ['svg', 'png', 'jpg', 'jpeg']
        console.log('Files', imageList, this.array0)
        const others = res.customer.attachments
        this.array0 = Object.entries(others).map(el => {
          const exten = el[1].split('.').pop()
          return {
              file: el[1],
            title: this.$t(el[0]),
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
        console.log('Files', imageList, this.array0)
        this.array0 = [...this.array0, ...imageList]

        this.fileList3 = res.customer.passport.passport_photo ? [
          {
            uid: res.customer.passport.passport_photo.split('/').pop(),
            url: res.customer.passport.passport_photo,
            status: 'done',
            name: res.customer.passport.passport_photo
          }
        ] : []
        this.fileList4 = res.customer.passport.photo_document ? [
          {
            uid: res.customer.passport.photo_document.split('/').pop(),
            url: res.customer.passport.photo_document,
            status: 'done',
            name: res.customer.passport.photo_document
          }
        ] : []
      }).catch(reject => {
        // console.log(reject.data)
        // this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
     getBranches () {
      this.$store.dispatch('getBranches').then((res) => {
        this.merchant_branch = res.merchant_branches
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    }
  },
  created () {
    this.getPosAgent(this.$route.params.id)
  }
}
</script>

<style scoped>
.button {
  margin-bottom: 20px;
}
.delete {
  margin-top: 30px;
}
</style>
