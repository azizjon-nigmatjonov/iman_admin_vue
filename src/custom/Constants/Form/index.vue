<template>
  <div>
    <a-navigation
      :list="[{ name: $t('Константы'), link: '/settings/constants'}, { name: $route.params.id ? $t('button.edit') : $t('Добавить'), link: ''}]"
      :isBack="{ flag: true, return: true}"
      noBorder
    />
    <a-card class="no-border-card no-pt-body-card" :title="$route.params.id ? $t('button.edit') : 'Cоздание константы'">
      <a-form-model
        :colon="false"
        ref="ruleForm"
        :model="form"
        :rules="rules"
      >
        <a-row class="form-row" :gutter="16">
          <a-col :span="8">
            <a-form-model-item ref="name" label="Название" prop="name">
              <a-input
                :placeholder="$t('name')"
                v-model="form.name"
                :disabled="$route.params.id"
                @blur="
                  () => {
                    $refs.name.onFieldBlur();
                  }"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="value" :label="$t('value')" prop="value">
              <a-input
                :placeholder="$t('value')"
                v-model="form.value"
                @blur="
                  () => {
                    $refs.value.onFieldBlur();
                  }"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="key" :label="$t('key')" prop="key">
              <a-input
                :placeholder="$t('key')"
                v-model="form.key"
                @blur="
                  () => {
                    $refs.key.onFieldBlur();
                  }"
              />
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
              <a-button @click="cancelPost" type="grey" :loading="loading" style="margin-right:6px">{{ $t('button.cancel') }}</a-button>
              <a-button @click="postConstant" v-if="isNewForm" :loading="loading" type="primary">{{ $t('button.create') }}</a-button>
              <a-button @click="updateConstant" v-else :loading="loading" type="primary">{{ $t('button.save') }}</a-button>
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
      isNewForm: false,
      form: {
          'name': '',
          'value': '',
          key: ''
        },
       rules: {
        name: [
          { required: true, message: 'Пожалуйста, заполните поле имя репетитора', trigger: 'blur' }
        ],
        value: [
          { required: true, message: 'Пожалуйста, заполните поле значение', trigger: 'blur' }
        ],
        key: [
          { required: true, message: 'Пожалуйста, заполните поле ключ', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    postConstant () {
      if (!this.$isValid(this)) {
        this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
        return -1
      }
      this.$store.dispatch('postConstant', this.form).then(res => {
        this.$alertMessage('success', 'Constant', 'Constant created successfully', this)
        this.cancelPost()
      })
      .finally(() => {
        this.loading = false
      })
    },
    getConstant (id) {
      this.$store.dispatch('getConstant', id).then(res => {
        console.log(res)
        this.form.name = res.name
        this.form.value = res.data.value
        this.form.key = res.data.key
      })
    },
    updateConstant () {
      if (!this.$isValid(this)) {
        this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
        return -1
      }
      this.$store.dispatch('updateConstant', { ...this.form, id: this.$route.params.id }).then(res => {
        this.$alertMessage('success', 'Constant', 'Constant has Успешно обновлено', this)
        this.cancelPost()
      })
      .finally(() => {
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
   if (this.$isEmptyObj(this.$route.params)) {
      this.isNewForm = true
    } else this.getConstant(this.$route.params.id)
  }

}
</script>

<style>

</style>
