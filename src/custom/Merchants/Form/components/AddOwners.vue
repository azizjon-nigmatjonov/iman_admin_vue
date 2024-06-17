<template>
  <div>
    <div v-if="usersList.length">
      <a-form-model :model="usersList" :colon="false">
        <a-row type="flex" :gutter="[8,8]" v-for="user in usersList" :key="user.guid" style="position: relative">
          <a-divider class="divider" orientation="left" style="margin-top: 20px">{{ $t('Владелец') }}</a-divider>
          <delete-btn @confirm="deleteOwner(user.guid)" style="position:absolute; right: 0px; top: 40px;" />
          <a-col span="8">
            <a-form-model-item :label="$t('FirstName')" prop="first_name">
              <a-input disabled place v-model="user.first_name"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item :label="$t('middleName')" prop="middle_name">
              <a-input disabled place v-model="user.middle_name"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item :label="$t('LastName')" prop="last_name">
              <a-input disabled place v-model="user.last_name"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="4">
            <a-form-model-item ref="contract.date" :label="$t('birthday')" prop="birth_date">
              <a-date-picker disabled @change="getBirthDay" v-model="user.birth_date" format="YYYY-MM-DD" />
            </a-form-model-item>
          </a-col>
          <a-col span="4">
            <a-form-model-item ref="contract.date" :label="$t('Gender')" prop="gender">
              <a-select disabled :placeholder="$t('Gender')" v-model="user.gender">
                <a-select-option :value="gender.male">
                  {{ $t('male') }}
                </a-select-option>
                <a-select-option :value="gender.female">
                  {{ $t('female') }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item :label="$t('username')" prop="last_name">
              <a-input disabled place v-model="user.username"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item :label="$t('phone')" prop="phone_number">
              <a-input disabled v-model="user.phone_number" @keypress="onPhoneNumber" @change="changePhone($event, i)" />
            </a-form-model-item>
          </a-col>
          <a-col span="8" v-if="!user.guid">
            <a-form-model-item :label="$t('password')" prop="password">
              <a-input disabled place v-model="user.password"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <div v-if="usersList.length < 2 || newUserActive">
      <a-divider class="divider" orientation="left" style="margin-top: 50px">{{ $t('Создание нового владельца') }}</a-divider>
      <a-form-model ref="rules" :rules="rules" :model="users" :colon="false">
        <a-row type="flex" :gutter="[8,8]" style="position: relative">
          <a-icon type="delete" @click="() => newUserActive = false" style="position:absolute; right: 10px; top: 0px; z-index: 999" />
          <a-col span="8">
            <a-form-model-item :label="$t('FirstName')" prop="first_name">
              <a-input place v-model="users.first_name"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item :label="$t('middleName')" prop="middle_name">
              <a-input place v-model="users.middle_name"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item :label="$t('LastName')" prop="last_name">
              <a-input place v-model="users.last_name"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="4">
            <a-form-model-item ref="contract.date" :label="$t('birthday')" prop="birth_date">
              <a-date-picker @change="getBirthDay" v-model="users.birth_date" format="YYYY-MM-DD" />
            </a-form-model-item>
          </a-col>
          <a-col span="4">
            <a-form-model-item ref="contract.date" :label="$t('Gender')" prop="gender">
              <a-select :placeholder="$t('Gender')" v-model="users.gender">
                <a-select-option :value="gender.male">
                  {{ $t('male') }}
                </a-select-option>
                <a-select-option :value="gender.female">
                  {{ $t('female') }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item :label="$t('username')" prop="last_name">
              <a-input place v-model="users.username"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item :label="$t('phone')" prop="phone_number">
              <a-input v-model="users.phone_number" @keypress="onPhoneNumber" @change="changePhone($event, i)" />
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item :label="$t('password')" prop="password">
              <a-input place v-model="users.password"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item :label="$t('confirm_password')" prop="confirm_password">
              <a-input place v-model="users.confirm_password"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <a-col span="24" v-if="!newUserActive">
      <a-form-model-item label=" ">
        <a-row type="flex" justify="end">
          <a-col span="auto">
            <a-button @click="addNewOwner()">Добавить</a-button>
          </a-col>
        </a-row>
      </a-form-model-item>
    </a-col>
    <a-col span="24">
      <a-form-model-item label=" ">
        <a-row type="flex" justify="end">
          <a-col span="auto">
            <a-button @click="postData" type="primary">{{ $t('save') }}</a-button>
          </a-col>
        </a-row>
      </a-form-model-item>
    </a-col>
  </div>
</template>

<script>
export default {
    data () {
        return {
            rules: {
                'first_name': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
                'last_name': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
                'middle_name': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
                'birth_date': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
                'phone_number': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
                'gender': [{ required: true, message: 'Пожалуйста, выберите', trigger: 'change' }],
                'password': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }],
                'confirm_password': [{ required: true, message: 'Пожалуйста, напишите', trigger: 'change' }]
            },
            users: {
              first_name: '',
              birth_date: '',
              gender: '',
              last_name: '',
              middle_name: '',
              password: '',
              confirm_password: '',
              phone_number: '',
              username: ''
            },
            usersList: [],
            newUserActive: false,
            gender: {
                male: 'male',
                female: 'female'
            }
        }
    },
    methods: {
        postData () {
          this.$refs.rules.validate((valid) => {
            // if (valid) {
              this.loading = false
              const params = {
                merchant_id: this.$route.params.id,
                ...this.users
              }
              this.$store.dispatch('postMerchantsOwnerInfo', params).then(res => {
                  this.$alertMessage('success', 'Создано успешно', '', this)
                  this.newUserActive = false
                  this.getMerchantsOwnerInfo()
              }).finally(() => {
                  this.loading = false
              }).catch((error) => {
                // console.log('error', error.response.data.errors)
                this.$alertMessage('error', 'Произошла ошибка', error.response.data.error, this)
              })
            // }
          })
        },
        deleteOwner (id) {
          this.$store.dispatch('deleteMerchantsOwner', { user_id: id, merchant_id: this.$route.params.id })
            .then(res => {
              this.$alertMessage('success', 'Успешно удалено', '', this)
              this.getMerchantsOwnerInfo()
            })
            .catch(err => console.log(err))
        },
        getMerchantsOwnerInfo () {
            this.$store.dispatch('getMerchantsOwnerInfo', this.$route.params.id)
            .then(res => {
                if (res.users) {
                  this.usersList = res.users
                }
              console.log('result owners', res)
            })
            .catch(err => console.log(err))
        },
        getBirthDay (e) {
          this.users.birth_date = e.format('YYYY-MM-DD')
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
            if (evt.target.value.length >= 12) {
                theEvent.returnValue = false
                if (theEvent.preventDefault) theEvent.preventDefault()
            }
            },
        addNewOwner () {
          this.newUserActive = true
        }
    },
    created () {
        this.getMerchantsOwnerInfo()
    }
}
</script>
