<template>
  <div>
    <a-card :title="$t('Passport_details')" class="no-border-head">
      <a-row :gutter="16" v-if="customer">
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('First_name')" prop="min_investment_amount">
            <a-input :value="customer.customer.first_name" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('Last_name')" prop="min_investment_amount">
            <a-input :value="customer.customer.last_name" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('phone_number')" prop="min_investment_amount">
            <a-input :value="customer.customer.phone_number" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('date_of_issue')" prop="min_investment_amount">
            <a-date-picker placeholder="Select Time" :format="$dateFormat" v-model="customer.passport_data.date_of_issue" disabled style="width: 100%"/>
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('date_of_expiry')" prop="min_investment_amount">
            <a-date-picker placeholder="Select Time" :format="$dateFormat" v-model="customer.passport_data.date_of_expiry" disabled style="width: 100%"/>
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('Doc_number')" prop="min_investment_amount">
            <a-input :value="customer.passport_data.number" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('Gender')" prop="min_investment_amount">
            <a-input :value="$t(customer.passport_data.gender)" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('PINFL')" prop="min_investment_amount">
            <a-input :value="customer.passport_data.pinfl" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <!-- <a-col :lg="12" :md="12">
          <a-form-model-item :label="$t('place_of_issue')" prop="min_investment_amount">
            <a-input :value="customer.passport_data.place_of_issue" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col> -->
        <a-col :lg="12" :md="12">
          <a-form-model-item :label="$t('place_of_birth')" prop="min_investment_amount">
            <a-input :value="customer.passport_data.place_of_birth" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <!-- <a-col :lg="6" :md="12">
          <a-form-model-item :label="$t('photo_document')" prop="min_investment_amount">
            <img :alt="photoFiles[0].uid" style="width: 112px" :src="photoFiles[0].url || require('@/assets/user.png')" />
          </a-form-model-item>
        </a-col> -->
        <!--<a-col :lg="6" :md="12">
          <a-form-model-item :label="$t('Passport_photo')" prop="min_investment_amount">
            <a-upload
              class="picture-card"
              list-type="picture-card"
                disabled
                :file-list="passportFiles"
                @preview="handlePreview($event, false)"
                @change="handleChange($event, false)"
            >
                <div v-if="passportFiles.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                </div>
            </a-upload>
            <a-modal :visible="previewVisiblePass" :footer="null" @cancel="previewVisiblePass = false">
                <img :alt="previewImagePass" style="width: 100%" :src="previewImagePass" />
            </a-modal>
            </a-form-model-item>
        </a-col> -->
      </a-row>
    </a-card>
    <a-card :title="$t('Personal_info')" class="no-border-head">
      <a-row :gutter="16" v-if="customer && customer.personal_data">
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('additional_income')" prop="min_investment_amount">
            <a-input :value="customer.personal_data.additional_income || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('employment_type')" prop="employment_type">
            <a-input :value="$t(customer.personal_data.employment_type == 1 ? $t('employment_type') : '') || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('Children')" prop="min_investment_amount">
            <a-input :value="parseInt(customer.personal_data.children) > 4 ? 'Более 5' : customer.personal_data.children" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('family_status')" prop="min_investment_amount">
            <a-input :value="$t(customer.personal_data.family_status) || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('has_credit_now')" prop="min_investment_amount">
            <a-input :value="customer.personal_data.has_credit_now ? $t('yes') : $t('no')" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('home_phone_number')" prop="min_investment_amount">
            <a-input :value="customer.personal_data.home_phone_number || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('second_phone_number')" prop="min_investment_amount">
            <a-input :value="customer.personal_data.second_phone_number || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('salary')" prop="min_investment_amount">
            <a-input :value="$moneyFormat(customer.personal_data.salary) || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <!-- <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('phone_number')" prop="min_investment_amount">
            <a-input :value="customer.personal_info.phone_number || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col> -->
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('total_family_income')" prop="min_investment_amount">
            <a-input :value="$moneyFormat(customer.personal_data.total_family_income) || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-card>
    <!-- <a-card :title="$t('Card_number')" class="no-border-head">
      <a-table :pagination="false" :columns="columnsCard" :data-source="customer.personal_data && customer.personal_data.customer_cards">
      </a-table>
    </a-card> -->
    <a-card :title="$t('Additional_contacts')" class="no-border-head" v-if="customer.additional_contacts" >
      <a-table :pagination="false" :columns="columns2" :data-source="customer.additional_contacts">
      </a-table>
    </a-card>
    <a-card :title="$t('Address')" class="no-border-head" v-if="customer && customer.residence_address">
      <a-row :gutter="16">
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('apartment_number')" prop="min_investment_amount">
            <a-input :value="customer.residence_address.address && customer.residence_address.address.apartment_number || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('district')" prop="min_investment_amount">
            <a-input :value="Nullcheck(customer.residence_address, ['address', 'district', 'data', 'name_ru']) || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('house_number')" prop="min_investment_amount">
            <a-input :value="customer.residence_address.address && customer.residence_address.address.house_number || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('region')" prop="min_investment_amount">
                <a-input :value="Nullcheck(customer.residence_address, ['address', 'region', 'data', 'name_ru']) || '-'" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col>
            <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('street_address')" prop="min_investment_amount">
                <a-input :value="customer.residence_address.address && customer.residence_address.address.street_address || '-'" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col>
            <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('is_match_registration_address')" prop="min_investment_amount">
                <a-input :value="customer.residence_address && customer.residence_address.is_match_registration_address ? 'Совпадает с адресом регистрации' : 'Не совпадает с адресом регистрации'" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col>
            <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('neighborhood')" prop="neighborhood">
                <a-input :value="customer.residence_address.address && customer.residence_address.address.mahalla || '-'" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col>
      </a-row>
    </a-card>
    <a-card :title="$t('Residence_adress')" class="no-border-head" v-if="customer && customer.registration_address">
      <a-row :gutter="16">
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('apartment_number')" prop="min_investment_amount">
            <a-input :value="customer.registration_address.address.apartmentNumber || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('district')" prop="min_investment_amount">
            <a-input :value="Nullcheck(customer.registration_address, ['address', 'district', 'data', 'name_ru']) || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('house_number')" prop="min_investment_amount">
            <a-input :value="customer.registration_address.address.houseNumber || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('region')" prop="min_investment_amount">
            <a-input :value="Nullcheck(customer.registration_address, ['address', 'region', 'data', 'name_ru']) || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('street_address')" prop="min_investment_amount">
            <a-input :value="customer.registration_address.address.streetAddress || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('neighborhood')" prop="neighborhood">
            <a-input :value="customer.registration_address.address.mahalla || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-card>
    <a-card :title="$t('Delivery_adress')" class="no-border-head" v-if="customer && customer.delivery_address">
      <a-row :gutter="16">
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('apartment_number')" prop="min_investment_amount">
            <a-input :value="customer.delivery_address.address.apartment_number || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('district')" prop="min_investment_amount">
            <a-input :value="Nullcheck(customer.delivery_address, ['address', 'district', 'data', 'name_ru']) || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('house_number')" prop="min_investment_amount">
            <a-input :value="customer.delivery_address.address && customer.delivery_address.address.house_number || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
            <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('region')" prop="min_investment_amount">
                <a-input :value="Nullcheck(customer.delivery_address, ['address', 'region', 'data', 'name_ru']) || '-'" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col>
            <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('street_address')" prop="min_investment_amount">
                <a-input :value="customer.delivery_address.address && customer.delivery_address.address.street_address || '-'" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col>
            <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('neighborhood')" prop="neighborhood">
                <a-input :value="customer.delivery_address.address && customer.delivery_address.address.mahalla || '-'" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col>
            <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('is_match_registration_address')" prop="min_investment_amount">
                <a-input :value="customer.delivery_address && customer.delivery_address.is_match_registration_address || ''" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col> -->
        </a-row>
    </a-card>
    <a-card :title="$t('Work_adress')" class="no-border-head" v-if="customer && customer.work_address">
      <a-row :gutter="16">
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('apartment_number')" prop="min_investment_amount">
            <a-input :value="customer.work_address.address && customer.work_address.address.apartment_number || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
        <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('district')" prop="min_investment_amount">
            <a-input :value="Nullcheck(customer.work_address, ['address', 'district', 'data', 'name_ru']) || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
             <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('house_number')" prop="min_investment_amount">
                <a-input :value="customer.work_address.address && customer.work_address.address.house_number || '-'" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col>
            <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('region')" prop="min_investment_amount">
                <a-input :value="Nullcheck(customer.work_address, ['address', 'region', 'data', 'name_ru']) || '-'" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col>
            <a-col :lg="8" :md="12">
            <a-form-model-item :label="$t('street_address')" prop="min_investment_amount">
                <a-input :value="customer.work_address.address && customer.work_address.address.street_address || '-'" disabled style="width: 100%" />
            </a-form-model-item>
            </a-col>
            <a-col :lg="8" :md="12">
          <a-form-model-item :label="$t('neighborhood')" prop="neighborhood">
            <a-input :value="customer.work_address.address && customer.work_address.address.mahalla || '-'" disabled style="width: 100%" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
    props: {
        idCustomer: {
            type: String,
            default: 'ant-pro-trend'
        }
    },
    data () {
        return {
            customer: [],
            passportFiles: [],
            previewVisiblePass: false,
            previewImagePass: false,
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
                    key: 'phone_number',
                    width: 200
                }
                // {
                //     title: this.$t('whom'),
                //     dataIndex: 'family_relation.data.name_ru',
                //     key: 'family_relation.data.name_ru'
                // }
            ]
        }
    },
    methods: {
        getData (id) {
            this.$store.dispatch('getCustomerInfo', id).then((res) => {
                console.log('response', res)
                this.customer = res
                // this.photoFiles = [
                //     {
                //         uid: res.customer.passport.photo_document.split('/').pop(),
                //         url: res.customer.passport.photo_document,
                //         status: 'done',
                //         name: res.customer.passport.photo_document
                //     }
                // ]
                // this.passportFiles = [
                //     {
                //         uid: res.customer.passport.passport_photo.split('/').pop(),
                //         url: res.customer.passport.passport_photo,
                //         status: 'done',
                //         name: res.customer.passport.passport_photo
                //     }
                // ]
            })
        },
        async handlePreview (file, type) {
            if (!file.url && !file.preview) {
            file.preview = await this.$getBase64(file.originFileObj)
            }
            this[type ? 'previewImagePhoto' : 'previewImagePass'] = file.url || file.preview
            this[type ? 'previewVisiblePhoto' : 'previewVisiblePass'] = true
        },
        Nullcheck (elem, arrAtt) {
            if (arrAtt.length > 1) {
                return elem[arrAtt[0]] && this.Nullcheck(elem[arrAtt[0]], arrAtt.slice(1)) || null
            } else {
                return elem[arrAtt[0]] || null
            }
        }
    },
    created () {
        this.getData(this.idCustomer)
    }
}
</script>

<style scoped>
</style>
