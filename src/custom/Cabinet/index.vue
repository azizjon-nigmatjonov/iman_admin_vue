<template>
  <div>
    <a-card size="small" class="mb-1">
      <a-breadcrumb>
        <a-breadcrumb-item><a-button @click="$router.go(-1)" icon="left" size="small" type="link">{{ $t('Назад') }}</a-button></a-breadcrumb-item>
      </a-breadcrumb>
    </a-card>
    <a-card
      style="width:100%"
    >
      <a-tabs
        default-active-key="1"
        tab-position="left"
        size="large"
      >
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon style="font-size: 20px" type="profile"/>
            {{ $t('change_data') }}
          </span>
          {{ $t('change_data') }}
          <a-form-model style="width: 50%" ref="ruleForm" :model="form" :rules="rules">
            <a-form-model-item :label="$t('name')" prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item :label="$t('username')" prop="username">
              <a-input v-model="form.username" />
            </a-form-model-item>
            <a-form-model-item :label="$t('phone')" prop="phone">
              <a-input v-model="form.phone" />
            </a-form-model-item>
            <a-button html-type="submit" type="primary" :loading="loading" @click="updateDate">{{ $t('update') }}</a-button>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon style="font-size: 22px" type="safety"/>
            {{ $t('change_password') }}
          </span>
          <a-row :gutter="[16, 16]">
            <a-col style="margin: 5px 10px" :span="20">
              <label>{{ $t('old_password') }}</label>
              <a-input :type="type" v-model="old_pass" :placeholder="$t('old_password')">
              </a-input>
            </a-col>
            <a-col style="margin: 5px 10px" :span="20">
              <label>{{ $t('new_password') }}</label>
              <a-input :type="type" v-model="new_pass" :placeholder="$t('new_password')">
                <a-tooltip slot="suffix" title="Extra information">
                  <a-icon @click="showPass" :type="type === 'password' ? 'eye' : 'eye-invisible'" style="color: rgba(0,0,0,.45)" />
                </a-tooltip>
              </a-input>
            </a-col>
            <a-col style="margin: 5px 10px" :span="20">
              <label>{{ $t('new_password_confirm') }}</label>
              <a-input :type="type" v-model="confirm_pass" :placeholder="$t('new_password_confirm')" />
            </a-col>
          </a-row>
          <a-row style="margin: 20px 0">
            <a-col :span="16"></a-col>
            <a-col :span="8">
              <a-button @click="changePass" type="primary" :loading="loadingBtn">
                {{ $t('change_password') }}
              </a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
     const validatePhone = (rule, value, callback) => {
      if (/^[+][9][9][8]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error(this.$t('incorrectPhone')))
      }
    }
    return {
      new_pass: null,
      confirm_pass: null,
      old_pass: null,
      loadingBtn: false,
      type: 'password',
      loading: false,
      form: {
        name: '',
        phone: '',
        username: ''
      },
      rules: {
        name: [{ required: true, message: 'Name required', trigger: 'blur' }],
        username: [{ required: true, message: 'Username required', trigger: 'blur' }],
        phone: [{ required: true, message: 'Phone required', trigger: 'change' }, { validator: validatePhone, trigger: 'change' }]
      }
    }
  },
  computed () {
    // userId () {
    //   return this.$store.state.sytem_users.id
    // }
  },
  mounted () {
    this.getSystemUserById()
  },
  methods: {
    ...mapActions(['patchPassword', 'getSystemUser', 'updateSystemUser']),
    updateDate () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.updateSystemUser({
            id: JSON.parse(localStorage.getItem('user_id')),
            data: {
              name: this.form.name,
              phone: this.form.phone,
              username: this.form.username
            }
          }).then(res => {
            console.log(res)
            this.$message.success(this.$t('successfullyUpdated'))
            location.reload()
          this.$router.go(-1)
          }).catch(err => {
            this.$message.error(err.message)
            console.log(err.response)
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    changePass () {
      if (this.new_pass != null && this.confirm_pass != null && this.new_pass === this.confirm_pass) {
        this.loadingBtn = true
        this.patchPassword({
          password: this.old_pass,
          new_password: this.new_pass
        }).then(res => {
          this.loadingBtn = false
          this.$message.success(this.$t('successfullyUpdated'))
          this.$router.go(-1)
          this.new_pass = null
          this.old_pass = null
          this.confirm_pass = null
          this.type = 'password'
        }).catch(err => {
          this.loadingBtn = false
          this.$message.error(err.message)
        })
      } else {
        this.$message.error(this.$t('error'))
      }
    },
    getSystemUserById () {
      const ida = JSON.parse(this.$store.state.Auth.userInfo)
      this.getSystemUser(ida.id).then(res => {
        this.form.name = res.name
        this.form.phone = res.phone
        this.form.username = res.username
      })
    },
    showPass () {
      if (this.type === 'password') {
        this.type = 'text'
      } else this.type = 'password'
    }
  }
}
</script>
