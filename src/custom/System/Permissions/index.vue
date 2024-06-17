<template>
  <div>
    <a-navigation :list="[{ name: $t('Список разрешений'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <a-button type="primary" @click="$router.push('/system/permissions/new')" icon="plus" style="float: right">Создать разрешения</a-button>
    </a-navigation>
    <a-card>
      <a-row>
        <a-col span="auto">
          <a-table :columns="columns" :data-source="permissions" :loading="loading">
            <span slot="created_at" slot-scope="text">{{ $date(text.created_at) | moment($dateTimeFormat) }}</span>
            <span slot="active" slot-scope="text"><a-switch v-model="text.active"></a-switch></span>
            <span slot="action" slot-scope="text">
              <a-col span="auto">
                <a-row type="flex" :gutter="[8]">
                  <a-col span="auto">
                    <delete-btn @confirm="deletePermission(text.id)"/>
                    <!-- <a-popconfirm
                      title="Вы уверены, чтобы удалить этот разрешение?"
                      ok-text="Да"
                      cancel-text="Нет"
                      @confirm="deletePermission(text.id)"
                      @cancel="cancel => null"
                    >
                      <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
                        <a-button type="danger" icon="delete" />
                      </a-tooltip>
                    </a-popconfirm> -->
                  </a-col>
                  <a-col span="auto">
                    <edit-btn @click="$router.push('/system/permissions/' + text.id)" />
                    <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
                      <a-button type="primary" icon="edit" @click="$router.push('/system/permissions/' + text.id)" />
                    </a-tooltip> -->
                  </a-col>
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
        permissions: [],
        columns: [
            // {
            //     title: 'ID',
            //     key: 'id',
            //     dataIndex: 'id'
            // },
            {
                title: 'Название',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: this.$t('table.actions'),
                key: 'action',
                scopedSlots: { customRender: 'action' }
            }
        ]
    }
},
        methods: {
        getPermissions () {
          this.loading = true
            this.$store.dispatch('getPermissions').then(res => {
              console.log(res)
                this.permissions = res.map(e => ({ ...e, key: e.id }))
            })
            .finally(() => {
              this.loading = false
            })
        },
        deletePermission (id) {
          this.$store.dispatch('deletePermission', id).then(res => {
            this.$deleteFromList(this.permissions, id)
            this.$alertMessage('success', 'Deleted', 'Permission deleted successfully', this)
          })
        }
    },
    created () {
        this.getPermissions()
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
