<template>
  <div>
    <a-navigation
      :list="[{ name: $t('Роли'), link: '/system/roles'}, { name: $route.params.id ? $t('button.edit') : $t('Добавить'), link: ''}]"
      :isBack="{ flag: true, return: true}"
      noBorder
    />
    <a-card class="no-border-card no-pt-body-card" :title="$route.params.id ? $t('button.edit') : 'Cоздание роли'">
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
                placeholder="название роли"
                v-model="form.name"
                @blur="
                  () => {
                    $refs.name.onFieldBlur();
                  }"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="name" label="Тип пользователя" prop="user_type_id">
              <a-select disabled :default-value="userTypes[0].id">
<!--                <a-select-option v-for="item in userTypes" :key="item.id" :value="item.id">-->
<!--                  {{ item.name }}-->
<!--                </a-select-option>-->
                <a-select-option :value="userTypes[0].id">
                  {{userTypes[0].name}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
            <!-- <a-col>
              <a-form-model-item label="">
                <a-row type="flex" justify="end">
                  <a-col span="auto">
                    <a-button @click="cancelPost" type="grey" style="margin-right:6px">{{ $t('button.cancel') }}</a-button>
                    <a-button @click="postUserRole" v-if="isNewForm" type="primary">{{ $t('button.create') }}</a-button>
                    <a-button @click="updateUserRole" v-else type="primary">{{ $t('button.save') }}</a-button>
                  </a-col>
                </a-row>
              </a-form-model-item>
            </a-col> -->
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
              <a-button @click="postUserRole" v-if="isNewForm" :loading="loading" type="primary">{{ $t('button.create')
                }}
              </a-button>
              <a-button @click="updateUserRole" v-else :loading="loading" type="primary">{{ $t('button.save') }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-card v-if="$route.params.id">
      <a-row style="margin-bottom: 20px; margin-top:10px">
        <a-input v-model="searchText" class="search-input" :placeholder="$t('search')" />
      </a-row>
      <a-row>
        <a-col span="auto">
          <a-table :columns="columns" :data-source="computedTableData" bordered :loading="loadingTable">
            <span slot="action" slot-scope="row">
               <a-col span="auto">
                 <a-switch :checked="filteredScopes.includes(row.id)" @change="handleSwitch($event, row.id)" />
               </a-col>
            </span>
          </a-table>
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
      loadingTable: false,
      isNewForm: false,
      searchText: '',
      form: {
        'name': '',
        'user_type_id': 'a828e458-7488-49b8-a717-c33972603704'
      },
      rules: {
        name: [
          { required: true, message: 'Пожалуйста, заполните поле имя репетитора', trigger: 'blur' }
        ]
        // user_type_id: [
        //   { required: true, message: 'Пожалуйста, выберите роль' }
        // ]
      },
      scopes: [],
      filteredScopes: [],
      columns: [
        {
          title: 'Название',
          key: 'url',
          dataIndex: 'url'
        },
        {
          title: this.$t('table.actions'),
          key: 'action',
          width: 200,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  computed: {
    userTypes () {
      return this.$store.getters.getUserTypes
    },
    computedTableData () {
      return this.scopes?.filter(scope => scope.url.includes(this.searchText))
    }
  },
  methods: {
    handleSwitch (val, id) {
      if (val) {
        this.addUserRoleScope(id)
        this.filteredScopes.push(id)
      } else {
        this.filteredScopes = this.filteredScopes.filter(el => el !== id)
        this.removeUserRoleScope(id)
      }
      console.log(id, val)
    },
    addUserRoleScope (id) {
      this.$store.dispatch('postUserRoleScopes', {
        scope_id: id,
        user_role_id: this.$route.params.id
      })
    },
    removeUserRoleScope (id) {
      this.$store.dispatch('deleteUserRoleScope', { user_role_id: this.$route.params.id, scope_id: id })
    },
    postUserRole () {
      if (!this.$isValid(this)) {
        this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
        return -1
      }
      this.$store.dispatch('postUserRole', this.form).then(res => {
        this.$alertMessage('success', 'Role', 'Role created successfully', this)
        this.cancelPost()
      })
        .finally(() => {
          this.loading = false
        })
    },
    getUserRole (id) {
      this.$store.dispatch('getUserRole', id).then(res => {
        console.log(res)
        this.form = res
      })
    },
    updateUserRole () {
      if (!this.$isValid(this)) {
        this.$formValidationError('warning', 'Form required', 'Please provide all fields', this)
        return -1
      }
      this.$store.dispatch('updateUserRole', this.form).then(res => {
        this.$alertMessage('success', 'Role', 'Role has Успешно обновлено', this)
        this.cancelPost()
      })
        .finally(() => {
          this.loading = false
        })
    },
    cancelPost () {
      this.$router.replace('/system/roles')
    },
    handleSubmit (e) {
      console.log(e)
    },
    async fetchItems () {
      this.loadingTable = true
      try {
        const { scopes } = await this.$store.dispatch('getScopes')
        const { user_role_scopes } = await this.$store.dispatch('getUserRoleScopes', {
          id: this.$route.params.id,
          limit: 1000
        })
        const filteredScopes = user_role_scopes.map(elm => elm.scope_id)
        this.filteredScopes = filteredScopes

        const trueScopes = scopes.filter(item => filteredScopes.includes(item.id)) ?? []
        const falseScopes = scopes.filter(item => !filteredScopes.includes(item.id)) ?? []
        const computedScopes = [...trueScopes, ...falseScopes]
        console.log('SCOPES ===>', trueScopes, falseScopes)
        this.scopes = computedScopes
      } catch (e) {
        console.log(e)
      } finally {
        this.loadingTable = false
      }
    }
  },
  created () {
    if (this.$isEmptyObj(this.$route.params)) {
      this.isNewForm = true
    } else {
      this.getUserRole(this.$route.params.id)
    }
  },
  mounted () {
    this.fetchItems()
  },
  watch: {}
}
</script>

<style>
.search-input {
  width: 300px;
  margin-right: 20px;
}
</style>
