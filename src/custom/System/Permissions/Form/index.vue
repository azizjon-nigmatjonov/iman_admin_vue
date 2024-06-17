<template>
  <div>
    <a-navigation
      :list="[{ name: $t('Список разрешений'), link: '/system/roles'}, { name: $route.params.id ? $t('button.edit') : $t('Добавить'), link: ''}]"
      :isBack="{ flag: true, return: true}"
      noBorder
    />
    <a-card class="no-border-card no-pt-body-card" :title="$route.params.id ? $t('button.edit') : 'Список разрешений'">
      <a-form-model :colon="false" ref="ruleForm" :model="form" :rules="rules">
        <a-row class="form-row" :gutter="16">
          <a-col :span="8">
            <a-form-model-item ref="name" label="Ключ" prop="name">
              <a-input
                placeholder="Ключ"
                v-model="form.name"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="name" label="Название" prop="key">
              <a-input
                placeholder="Название"
                v-model="form.key"
              />
            </a-form-model-item>
          </a-col>
        <!-- <a-col>
          <a-form-model-item label="">
            <a-row type="flex" justify="end">
              <a-col span="auto">
                <a-button @click="cancelPost" type="grey" style="margin-right: 6px">{{
                  $t('button.cancel')
                }}</a-button>
                <a-button @click="postPermission" v-if="isNewForm" type="primary">{{
                  $t('button.create')
                }}</a-button>
                <a-button @click="updatePermission" v-else type="primary">{{ $t('button.save') }}</a-button>
              </a-col>
            </a-row>
          </a-form-model-item>
        </a-col> -->
        </a-row>
        <a-row :gutter="16">
          <a-col>
            <a-form-model-item ref="name" label="Выберите действия" prop="actions">
              <a-checkbox-group
                v-model="form.actions"
                :options="actionsList"
              >
                <span slot="label" slot-scope="value" >{{ value.name }}</span>
              </a-checkbox-group>
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
              <a-button @click="cancelPost" :loading="loading" type="grey" style="margin-right: 6px">{{
                $t('button.cancel')
              }}</a-button>
              <a-button @click="postPermission" :loading="loading" v-if="isNewForm" type="primary">{{
                $t('button.create')
              }}</a-button>
              <a-button @click="updatePermission" v-else :loading="loading" type="primary">{{ $t('button.save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      actionsList: [
          {
            value: 'create',
            name: 'Создать'
          },
          {
            value: 'read',
            name: 'Читать'
          },
          {
            value: 'update',
            name: 'Редактировать'
          },
          {
            value: 'delete',
            name: 'Удалить'
          }
      ],
      form: {
        actions: null,
        key: '',
        name: '',
        user_type_id: this.$store.state.UserRoles.user_types[0].id
      },
      isNewForm: false,
      rules: {
        name: [{ required: true, message: 'Укажите название разрешения', trigger: 'blur' }]
      }
    }
  },
  computed: {
    userTypes () {
      console.log(this.$store.getters.getUserTypes)
      return this.$store.getters.getUserTypes
    }
  },
  methods: {

    postPermission () {
      //   if (!this.$isValid(this)) {
      //     this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
      //     return -1
      //   }
      const form = {
        ...this.form,
        actions: []
      }
      this.actionsList.forEach(element => {
        this.form.actions.forEach(el => {
            if (el === element.value) {
              form.actions.push({ key: element.value, name: element.name })
            }
        })
      })
      console.log(form)
      this.loading = true
      this.$store.dispatch('postPermission', form).then((res) => {
        this.$alertMessage('success', 'Role', 'Role created successfully', this)
        this.cancelPost()
        this.loading = false
      })
    },
    getPermission (id) {
      this.$store.dispatch('getPermission', id).then((res) => {
        console.log(res)
        this.form = res
        this.form.actions = res.actions.map(el => el.key)
      })
    },
    transformer (form) {
        this.actionsList.forEach(element => {
        this.form.actions.forEach(el => {
            if (el === element.value) {
              form.actions.push({ key: element.value, name: element.name })
            }
        })
      })
    },
    updatePermission () {
      //   if (!this.$isValid(this)) {
      //     this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
      //     return -1
      //   }
      const form = { ...this.form, actions: [] }
      this.transformer(form)
      this.loading = true

      this.$store.dispatch('updatePermission', form).then((res) => {
        this.$alertMessage('success', 'Role', 'Role has Успешно обновлено', this)
        this.cancelPost()
        this.loading = false
      })
    },
    cancelPost () {
      this.$router.go(-1)
    },
    handleSubmit (e) {
      console.log(e)
    }
  },
  created () {
    console.log(this.$store.state.UserRoles.user_types)
    if (this.$isEmptyObj(this.$route.params)) {
      this.isNewForm = true
    } else this.getPermission(this.$route.params.id)
  }
}
</script>

<style>
</style>
