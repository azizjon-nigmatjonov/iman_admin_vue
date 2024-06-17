<template>
  <div>
    <a-navigation
      :list="[{ name: $t('create.user'), link: '/system/roles'}, { name: $route.params.id ? $t('button.edit') : $t('Добавить'), link: ''}]"
      :isBack="{ flag: true, return: true}"
      noBorder
    />
    <a-card
      class="no-border-card no-pt-body-card"
      :title="$route.params.id ? $t('button.edit') : $t('create.user')">
      <a-form-model
        :colon="false"
        ref="ruleForm"
        :model="form"
        :rules="rules"
      >
        <a-row class="form-row" :gutter="16">
          <a-col :span="8">
            <a-form-model-item ref="first_name" :label="$t('first_name')" prop="first_name">
              <a-input
                placeholder="Имя"
                v-model="form.first_name"
                @blur="
                  () => {
                    $refs.name.onFieldBlur();
                  }"
              />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item ref="last_name" :label="$t('last_name')" prop="last_name">
              <a-input
                :placeholder="$t('first_name')"
                v-model="form.last_name"
                @blur="
                  () => {
                    $refs.name.onFieldBlur();
                  }"
              />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item ref="name" label="Телефонный номер" prop="phone">
              <a-input
                placeholder="телефонный номер"
                v-model="form.phone"
                @blur="
                  () => {
                    $refs.name.onFieldBlur();
                  }"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row type="flex" :gutter="[16]">
          <a-col span="8">
            <a-form-model-item label="Логин" prop="username">
              <a-input placeholder="логин" v-model="form.username"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col span="8">
            <a-form-model-item label="Пароль" prop="password">
              <a-input-password v-model="form.password" type="password" placeholder="пароль"></a-input-password>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-row class="edit-btns mt-4">
      <a-col span="24">
        <a-form-model-item>
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button @click="cancelPost" type="grey" :loading="loading" style="margin-right:6px">
                {{ $t('button.cancel') }}
              </a-button>
              <a-button @click="postSystemUser" v-if="isNewForm" :loading="loading" type="primary">
                {{ $t('button.create') }}
              </a-button>
              <a-button @click="updateSystemUser" v-else :loading="loading" type="primary">{{ $t('button.save') }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-card v-if="$route.params.id">
      <a-row>
        <h3>Выберите роли</h3>
        <a-col span="16">
          <a-select
            style="min-width: 250px"
            v-model="selectedRoles"
            mode="multiple"
            placeholder="Select roles"
            @change="handleChange">
            <a-select-option v-for="role in user_roles" :key="role.id">
              {{ role.name }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      isNewForm: false,
      selectedRoles: [],
      counter: 0,
      scopes: [],
      user_with_roles: [],
      user_roles: [],
      filteredRoles: [],
      form: {
        'first_name': '',
        'last_name': '',
        'username': '',
        'password': '',
        'phone': ''
      },
      rules: {
        first_name: [
          { required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }
        ],
        last_name: [
          { required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Пожалуйста, заполните поле password', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'Пожалуйста, заполните поле логин', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Пожалуйста, выберите номер' }
        ]
      }
    }
  },
  methods: {
    async fetchItems () {
      this.loading = true
      try {
        const { user_roles } = await this.$store.dispatch('getUserRoles')
        this.user_roles = user_roles
        const { user_role } = await this.$store.dispatch('getUserWithRoles', this.$route.params.id)
        this.user_with_roles = user_role
        this.selectedRoles = user_role.map(elm => elm.user_role_id)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    checkPost () {
      let flag = null
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          flag = true
          return true
        } else {
          flag = false
          console.log('error submit!!')
          return false
        }
      })
      return flag
    },
    postSystemUser () {
      if (this.checkPost() === false) {
        return -1
      }
      this.loading = true
      this.$store.dispatch('postSystemUser', this.form).then(res => {
        console.log(res)
        this.$alertMessage('success', 'System-user', 'System user added successfully', this)
        this.$router.push('/system/system-users')
        this.loading = false
      }).catch(err => {
        if (err.response.status === 400) {
          // alert(err.response.data.message)
          this.$alertMessage('error', 'System-user', 'Произошла ошибка', '')
        }
        this.loading = false
      })
        .finally(() => {
          this.loading = false
        })
    },
    getSystemUser (id) {
      this.$store.dispatch('getSystemUser', id).then(res => {
        console.log(res)
        this.form = res
      })
    },
    updateSystemUser () {
      if (this.checkPost() === false) {
        return -1
      }
      this.loading = true
      this.$store.dispatch('updateSystemUser', this.form).then(res => {
        this.$alertMessage('success', 'System-user', 'System-user has Успешно обновлено', this)
        this.$refs.ruleForm.resetFields()
        this.$router.push('/system/system-users')
        this.loading = false
      })
        .finally(() => {
          this.loading = false
        })
    },
    cancelPost () {
      this.$router.replace('/system/system-users')
    },
    getRoles () {
      this.$store.dispatch('getUserRoles').then(res => {
        this.roles = res.user_roles
      }).catch(err => console.log(err))
    },
    handleSubmit (e) {
      console.log(e)
    }
  },
  created () {
    console.log(this.$route)
    if (this.$isEmptyObj(this.$route.params)) {
      this.isNewForm = true
    } else {}
    if (this.$route.params.id) {
      this.getSystemUser(this.$route.params.id)
      this.fetchItems()
    }
  },
  watch: {
    selectedRoles (newValue, oldValue) {
      console.log('newValue', newValue)
      console.log('oldValue', oldValue)
      if (this.counter === 0) {
        this.counter += 1
      } else if (newValue.length > oldValue.length) {
        const lastElement = newValue[newValue.length - 1]
        this.$store.dispatch('postUserWithRole', {
          user_role_id: lastElement,
          user_id: this.$route.params.id
        })
        console.log('newElement', lastElement)
      } else {
        const deletedElementId = oldValue.find(el => !newValue.includes(el))
        this.$store.dispatch('deleteUserWithRole', { user_id: this.$route.params.id, user_role_id: deletedElementId })
      }
    }
  }

}
</script>

<style>

</style>
