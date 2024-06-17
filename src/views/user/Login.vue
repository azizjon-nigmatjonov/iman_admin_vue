<template>
  <div class="main">
    <a-form-model
      class="user-layout-login"
      ref="ruleForm"
      :model="form"
      :rules="rules"
    >
      <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="ошибка при входе" />
      <a-form-model-item ref="username" prop="username" >
        <a-input
          size="large"
          type="text"
          :placeholder="$t('login.form.username')"
          v-model="form.username"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-model-item>

      <a-form-model-item ref="password" prop="password">
        <a-input-password
          size="large"
          :placeholder="$t('login.form.password')"
          v-model="form.password"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          :disabled="loginBtn"
          @click="onSubmit"
        >{{ $t('login.form.enter') }}</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'

export default {
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      loginType: 1,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      userType: '1b0444d7-79c2-42d2-b3c5-528be29506a8',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: { required: true, message: 'поле обязательно', trigger: 'change' },
        password: { required: true, message: 'поле обязательно', trigger: 'change' }
      },
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  watch: {
    'form.username' (val) {
      if (val !== val.replace(/\s+/g, '')) this.form.username = val.replace(/\s+/g, '')
    },
    'form.password' (val) {
      if (val !== val.replace(/\s+/g, '')) this.form.password = val.replace(/\s+/g, '')
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleTabClick (key) {
      this.customActiveKey = key
    },
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loginBtn = true
          this.$store.dispatch('loginBySystemUser', this.form).then(response => {
            this.$store.dispatch('loginBySystemUserSecond', this.form).then(res => {
            this.loginSuccess()
            }).catch(err => {
              if (err.response.status === 400) {
                this.requestFailed(err.response)
                this.loginBtn = false
              } else {
                this.requestFailed('Произошла ошибка')
              }
            }).finally(() => {
              this.loginBtn = false
            })
          }).catch(err => {
            if (err.response.status === 400) {
              this.requestFailed(err.response)
              this.loginBtn = false
            } else {
              this.requestFailed('Произошла ошибка')
            }
          })
        } else {
          return false
        }
        // if (valid) {
        //   this.$store.dispatch('loginBySystemUserSecond', this.form).then(res => {
        //     // this.loginSuccess()
        //   }).catch(err => {
        //     if (err.response.status === 400) {
        //       this.requestFailed(err.response)
        //       this.loginBtn = false
        //     }
        //   }).finally(() => {
        //     this.loginBtn = false
        //   })
        // }
      })
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (res) {
      console.log(res)

      this.$router.push({ path: '/' })
      setTimeout(() => {
        this.$notification.success({
          message: 'Вы вошли успешно',
          description: ``
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: 'Логин или пароль неверный',
        description: ((err.response || {}).data || {}).message || 'Пожалуйста, попробуйте еще раз',
        duration: 4
      })
      setTimeout(() => {
            this.state.loginBtn = false
      }, 600)
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
