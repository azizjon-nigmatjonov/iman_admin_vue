<template>
  <div>
    <a-card size="small" class="mb-2">
      <a-row justify="space-between" align="middle" type="flex">
        <a-col span="auto">
          <a-breadcrumb>
            <a-breadcrumb-item href="">
              <a-icon type="home" />
            </a-breadcrumb-item>
            <a-breadcrumb-item >
              <a @click="$router.go(-1)">
                <a-icon type="user" />
                <span>Роли</span>
              </a>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              Назначение роли пользователя
            </a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>
        <a-col span="auto">
          <a-button :loading="loadingBtn" @click="savePermissions" style="color: white; background: #4CAF50; border: none">Сохранить изменения</a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-row :gutter="[8]">
      <a-col :span="7">
        <a-card style="height: auto">
          <a-input spellcheck="false" @change="search" placeholder="Поиск ролей" style="padding: 14px" class="mb-2" />
          <div :class="item.disabled ? 'card_left back_color' : 'card_left'" v-for="item in permissions" :key="item.id">
            <a-row type="flex" justify="space-between" align="middle">
              <a-col span="auto">
                <span class="mx-1">{{ item.name }}</span>
              </a-col>
              <a-col span="auto">
                <a-button :disabled="item.disabled" type="border" @click="addToUserPermission(item)">Add</a-button>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
      <a-col span="17">
        <a-card style="width: 100%">
          <a-table bordered :columns="columns" :data-source="userPermissions">
            <span slot="actions" slot-scope="text">
              <a-checkbox disabled :defaultChecked="true" v-for="item in text.actions" :key="item.id">
                {{ item.name }}
              </a-checkbox>
            </span>
            <span slot="action" slot-scope="text, record">
              <a-row type="flex" :gutter="[16]">
                <a-col span="auto">
                  <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
                    <a @click="removePerminant(record)">{{ $t('button.delete') }}</a>
                  </a-tooltip>
                </a-col>
                <!-- <a-col span="auto" v-if="!text.id">
                  <a @click="postUserPermission(text)">{{ $t('button.save') }}</a>
                </a-col> -->
              </a-row>
            </span>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
data () {
  return {
        loadingBtn: false,
        permissions: [],
        csp: true,
        user_role_id: '',
        cachedData: [],
        userPermissions: [],
         columns: [
            {
                title: 'Название',
                key: 'permission_name',
                dataIndex: 'permission_name'
            },
            {
                title: 'Список разрешений',
                key: 'actions',
                scopedSlots: { customRender: 'actions' }
            },
            // {
            //   title: 'Список разрешений',
            //     children: [
            //       {
            //         title: 'СОЗДАТЬ',
            //         scopedSlots: { customRender: 'create' },
            //         key: 'building',
            //         width: 100
            //       },
            //       {
            //         title: 'ЧИТАТЬ',
            //         scopedSlots: { customRender: 'read' },
            //         key: 'numbdaer',
            //         width: 100
            //       },
            //       {
            //         title: 'ИЗМЕНИТЬ',
            //         scopedSlots: { customRender: 'update' },
            //         key: 'numbdser',
            //         width: 110
            //       },
            //       {
            //         title: 'УДАЛИТЬ',
            //         scopedSlots: { customRender: 'delete' },
            //         key: 'numbesdr',
            //         width: 100
            //       }
            //     ]
            // },
            {
                title: this.$t('table.actions'),
                key: 'action',
                scopedSlots: { customRender: 'action' }
            }
        ]
  }
},
methods: {
  search (e) {
    const tempPermissions = [...this.permissions]
    if (e.target.value.trim().length > 0) {
      this.permissions = tempPermissions.filter(el => el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
    } else {
      this.getPermissions()
    }
  },

  getPermissions () {
    this.$store.dispatch('getPermissions').then(res => {
        console.log(res)
        this.permissions = res
        this.$store.dispatch('getUserRolePermissions', this.user_role_id).then(result2 => {
          console.log(result2)
          this.setUserRolePermissions(result2)
          this.permissions = res.map(el => {
              return {
                ...el,
                disabled: result2.permissions.filter(ds => {
                  return el.id === ds.id
                }).length > 0
              }
          })
          console.log(this.permissions)
        })
    })
  },
  setUserRolePermissions (list) {
    console.log(list)
    this.userPermissions = list.permissions.map(el => ({
      actions: el.actions,
      create: !!el.actions.filter(el => el.key === 'create').length,
      read: !!el.actions.filter(el => el.key === 'read').length,
      update: !!el.actions.filter(el => el.key === 'update').length,
      delete: !!el.actions.filter(el => el.key === 'delete').length,
      permission_id: el.id,
      permission_name: el.name,
      key: el.id,
      id: el.id
    }))
  },

  savePermissions () {
    this.loadingBtn = true
    console.log(this.userPermissions)
    const formulation = this.userPermissions.map(el => {
      const status = {
      create: el.create ? el.actions.filter(el => el.key === 'create') : [],
      read: el.read ? el.actions.filter(el => el.key === 'read') : [],
      update: el.update ? el.actions.filter(el => el.key === 'update') : [],
      delete: el.delete ? el.actions.filter(el => el.key === 'delete') : []
    }
      return {
        'action_ids': Object.values(status).map(els => {
            if (els.length) {
              return els[0].id
            } else return false
          }).filter(Boolean),
          'id': el.permission_id
      // user_role_id: this.user_role_id
    }
    })
    console.log(formulation)
      this.$store.dispatch('postUserRolePermission', { permissions: [...formulation], user_role_id: this.user_role_id }).then(res => {
      console.log(res)
      this.$alertMessage('success', 'SAVED', 'User Role Permission saved successfully', this)
    }).finally(() => (this.loadingBtn = false))
  },
  addToUserPermission (data) {
    console.log(data)
    data.disabled = true
    this.userPermissions.push(
      {
        create: true,
        read: true,
        update: true,
        delete: true,
        permission_id: data.id,
        permission_name: data.name,
        actions: data.actions.map(el => ({ ...el, value: true })),
        key: data.id,
        id: ''
      }
    )
  },

  getUserRolePermissions () {
    this.$store.dispatch('getUserRolePermissions', this.user_role_id).then(res => {
      this.setUserRolePermissions(res)
    })
  },

  removePerminant (id) {
    // console.log(id)
    this.userPermissions.splice(this.userPermissions.findIndex(el => el.key === id.key), 1)
       this.permissions.forEach(el => {
     if (el.id === id.key) {
          el.disabled = false
      }
     })
  }
},
created () {
  this.user_role_id = this.$route.params.id
  // console.log(this.$route.params.id)
  this.getPermissions()
}
}
</script>

<style scoped>
.card_left {
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 2px;
  padding: 3px !important;
  background: rgb(255, 255, 255);
}
.back_color {
  background: rgb(240, 240, 240);
  color: rgb(160, 160, 160);
}
</style>
