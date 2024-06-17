<template>
  <div>
    <a-navigation :list="[{ name: $t('Роли'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <a-button type="primary" @click="$router.push('/system/roles/new')" icon="plus" style="float: right">Создать роль</a-button>
    </a-navigation>
    <a-card>
      <a-row>
        <a-col span="auto">
          <a-table :columns="columns" :data-source="roles" bordered :loading="loading">
            <span slot="name" slot-scope="text">
              <a-row type="flex" :gutter="16">
                <a-col type="flex" span="auto">
                  <a-avatar :size="50" v-if="text.image.url" :src="text.image.url" />
                  <a-avatar :size="50" v-else v-text="text.name.substring(0,1).toUpperCase()" />
                </a-col>
                <a-col type="flex" span="auto">
                  <h3>{{ text.name }}</h3>
                  <a-tag color="green">{{ text.phone }}</a-tag>
                </a-col>
              </a-row>
            </span>
            <span slot="created_at" slot-scope="text">{{ $date(text.created_at) | moment($dateTimeFormat) }}</span>
            <span slot="active" slot-scope="text"><a-switch v-model="text.active"></a-switch></span>
            <span slot="action" slot-scope="text">
              <a-col span="auto">
                <a-row type="flex" :gutter="[8]">
                  <a-col span="auto">
                    <delete-btn @confirm="deleteUserRole(text.id)"/>
                    <!-- <a-popconfirm
                      title="Вы уверены, чтобы удалить этот роль?"
                      ok-text="Да"
                      cancel-text="Нет"
                      @confirm="deleteUserRole(text.id)"
                      @cancel="cancel => null"
                    >
                      <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
                        <a-button type="danger" icon="delete" />
                      </a-tooltip>
                    </a-popconfirm> -->
                  </a-col>
                  <a-col span="auto">
                    <edit-btn @click="$router.push('/system/roles/' + text.id)" />
                    <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
                      <a-button type="primary" icon="edit" @click="$router.push('/system/roles/' + text.id)" />
                    </a-tooltip> -->
                  </a-col>
<!--                  <a-col span="auto">-->
<!--                    <icon-btn icon="eye" @click="$router.push(`/system/roles/assign-permission/${text.id}`)" />-->
                    <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
                      <a-button type="primary" icon="eye" @click="$router.push(`/system/roles/assign-permission/${text.id}`)" />
                    </a-tooltip> -->
<!--                  </a-col>-->
                </a-row>
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
        roles: [],
        columns: [
            {
                title: 'Название',
                key: 'name',
                dataIndex: 'name'
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
        methods: {
        getRoles () {
          this.loading = true
          console.log()
            this.$store.dispatch('getUserRoles', this.$store.state.Auth.client_id).then(res => {
                console.log(res)
                this.roles = res.user_roles.map(e => ({ ...e, key: e.id }))
            })
          .finally(() => {
            this.loading = false
          })
        },
        deleteUserRole (id) {
          this.$store.dispatch('deleteUserRole', id).then(res => {
            this.$deleteFromList(this.roles, id)
            this.$alertMessage('success', 'Deleted', 'Role deleted successfully', this)
          })
        }
    },
    created () {
        this.getRoles()
    }

}
</script>

<style lang="less" scoped>
.img_style{
    width: 70px;
    height: 70px;
    object-fit: cover;
}
</style>
