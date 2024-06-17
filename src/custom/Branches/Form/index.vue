<template>
  <div>
    <a-card size="small" class="mb-1">
      <a-breadcrumb>
        <a-breadcrumb-item><a-button @click="$router.go(-1)" icon="left" size="small" type="link">{{ $t('Назад') }}</a-button></a-breadcrumb-item>
      </a-breadcrumb>
    </a-card>
    <a-card>
      <a-row type="flex">
        <a-col :span="21" :offset="1">
          <a-form-model :colon="false" ref="ruleForm" :rules="rules" :model="form">
            <a-row class="form-row" :gutter="16">
              <a-divider orientation="left">{{ $t('Детали подразделения') }} </a-divider>
              <a-col :md="8">
                <a-form-model-item ref="name" :label="$t('Name1')" prop="name">
                  <a-input v-model="form.name" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item ref="adsress" :label="$t('Adress1')" prop="address">
                  <address-autocomplete v-model="form.address.title" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item ref="phone_number" :label="$t('Phone number')" prop="phone_number">
                  <a-input v-model="form.phone_number" @keypress="onPhoneNumber"/>
                </a-form-model-item>
              </a-col>
              <a-divider orientation="left">{{ $t('Контактная информация') }}</a-divider>
              <a-col :md="8">
                <a-form-model-item ref="contacts.FirstName" :label="$t('FirstName')" prop="contacts.FirstName">
                  <a-input v-model="form.contact.first_name" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item ref="contacts.LastName" :label="$t('LastName')" prop="contacts.LastName">
                  <a-input v-model="form.contact.last_name" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item ref="contacts.PhoneNumber" :label="$t('PhoneNumber')" prop="contacts.PhoneNumber">
                  <a-input @keypress="onPhoneNumber" v-model="form.contact.phone_number" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8">
                <a-form-model-item ref="contacts.position" :label="$t('position')" prop="contacts.position">
                  <a-input v-model="form.contact.position" />
                </a-form-model-item>
              </a-col>
              <a-col span="24">
                <a-form-model-item label=" ">
                  <a-row type="flex" justify="end">
                    <a-col span="auto">
                      <a-button @click="cancelPost" type="grey" style="margin-right: 6px">{{
                        $t('button.cancel')
                      }}</a-button>
                      <a-button @click="postBranch" v-if="isNewForm" type="primary">{{ $t('button.create') }}</a-button>
                      <a-button @click="updateBranch" v-else type="primary">{{ $t('button.save') }}</a-button>
                    </a-col>
                  </a-row>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </a-col>
      </a-row>

      <yandex-map />

    </a-card>
  </div>
</template>

<script>
import formRule from './formRules'
import YandexMap from '@/components/YandexMap/YandexMap.vue'
import AddressAutocomplete from './AddressAutocomplete.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    YandexMap,
    AddressAutocomplete
  },
  computed: {
    coords () {
      return this.$store.getters.getAddressCoordinates
    }
  },
  data () {
    return {
      rules: formRule,
      isNewForm: false,
      form: {
        address: {
          title: ''
        },
        // merchant_id: '',
        name: '',
        phone_number: '',
        contact: {
          first_name: '',
          last_name: '',
          phone_number: '',
          position: ''
        }
      }
    }
  },
  methods: {
    ...mapMutations(['setAddressCoordinates']),
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
      if (evt.target.value.length >= 12) {
        theEvent.returnValue = false
        if (theEvent.preventDefault) theEvent.preventDefault()
      }
    },
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
    postBranch () {
      //  if (this.checkPost() === false) return -1
      // console.log('stringfy', { ...this.form, merchant_id: this.$route.params.id })
      this.$store.dispatch('postBranch', { ...this.form, merchant_id: this.$route.params.id }).then((res) => {
        this.$message.success('Branch added successfully')
        this.$router.go(-1)
      }).catch(er => {
        this.$message.error(er.response.data.message)
      })
    },
    getBranch (id, branchId) {
      const params = {
        branch_id: branchId,
        id: id
      }
      this.$store.dispatch('getNewBranch', params).then((res) => {
        this.form = res
        // if (res.merchant_branch.lat) {
        //   this.setAddressCoordinates([res.merchant_branch.lat, res.merchant_branch.lon])
        // } else {
        //   this.setAddressCoordinates(null)
        // }
      }).catch(er => {
        this.$message.error(er.response.data.message)
        })
    },
    stringToInt () {
      return {
        ...this.form,
        // merchant_id: this.$route.params.id,
        lat: this.coords?.[0] ? String(this.coords?.[0]) : '',
        lon: this.coords?.[1] ? String(this.coords?.[1]) : ''
      }
    },
    updateBranch () {
      // if (this.checkPost() === false) return -1
      // const params = {
      //   branch_id: this.$route.params.branch_id,
      //   id: this.$route.params.id,
      //   ...this.form
      // }
      console.log(this.form)
      this.$store.dispatch('updateBranch', this.form).then((res) => {
        this.$message.success('Branch has Успешно обновлено')
        this.$router.go(-1)
      }).catch(er => {
        this.$message.error(er.response.data.message)
      })
    },
    cancelPost () {
      this.$router.go(-1)
    }
  },
  created () {
    if (this.$route.name === 'new-branch') {
      this.isNewForm = true
    } else this.getBranch(this.$route.params.id, this.$route.params.branch_id)
  },
  watch: {
    'isNewForm': (val) => {
      console.log('val isnre', val)
    }
  }
}
</script>

<style>
</style>
