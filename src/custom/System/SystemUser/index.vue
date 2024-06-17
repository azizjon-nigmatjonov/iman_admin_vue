<template>
  <div>
    <a-navigation :list="[{ name: $t('Список пользователей'), link: ''}]" :isBack="{ flag: false, link: ''}" >
      <a-button type="primary" @click="$router.push('/system/system-users/new-user')" icon="plus" style="float: right">Создать пользователь</a-button>
    </a-navigation>
    <a-card>
      <a-row>
        <a-col span="auto">
          <a-table
            :loading="loading"
            :columns="columns"
            :data-source="sysUser"
            :pagination="pagination"
            @change="getPagination">
            <span v-if="true" slot="name" slot-scope="text">
              <a-row type="flex" :gutter="16">
                <a-col type="flex" span="auto">
                  <a-avatar :size="50" v-text="text.name.substring(0,1).toUpperCase()" />
                </a-col>
                <a-col type="flex" span="auto">
                  <h3>{{ text.name }}</h3>
                  <a-tag color="green">{{ text.phone }}</a-tag>
                </a-col>
              </a-row>
            </span>
            <span slot="created_at" slot-scope="text">{{ $date(text.created_at) | moment($dateTimeFormat) }}</span>
            <span slot="action" slot-scope="text">
              <a-col span="auto">
                <a-row type="flex" :gutter="[8]">
                  <a-col span="auto">
                    <delete-btn @confirm="deleteSystemUser(text.id)"/>
                    <!-- <a-popconfirm
                      title="Вы уверены, что хотите удалить этого системного пользователя?"
                      ok-text="Да"
                      cancel-text="Нет"
                      @confirm="deleteSystemUser(text.id)"
                      @cancel="cancel => null"
                    >
                      <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
                        <a-button type="danger" icon="delete" />
                      </a-tooltip>
                    </a-popconfirm> -->
                  </a-col>
                  <a-col span="auto">
                    <edit-btn @click="$router.push('/system/system-users/' + text.id)" />
                    <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
                      <a-button type="primary" icon="edit" @click="$router.push('/system/system-users/' + text.id)" />
                    </a-tooltip> -->
                  </a-col>
                  <a-col span="auto">
                    <icon-btn icon="lock" @click="setupPassword(text)" :tooltip="$t('button.preview')" />
                    <!-- <a-tooltip placement="bottomLeft" :title="$t('button.preview')">
                      <a-button type="primary" icon="lock" @click="setupPassword(text)" />
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
        sysUser: [],
        pagination: {
          current: 1,
          showQuickJumper: true
        },
        columns: [
            {
                title: 'Системный пользователь',
                key: 'name',
                scopedSlots: { customRender: 'name' }
            },
            {
                title: this.$t('table.created_at'),
                key: 'created_at',
                scopedSlots: { customRender: 'created_at' }
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
        getPagination (e) {
          this.$router.push({ path: this.$route.fullPath, query: { page: e.current, limit: 10 } })
          this.getSystemUsers(this.$route.query)
          this.pagination.current = e.current
        },
        setupPassword (item) {
          console.log(item)
        },
        getSystemUsers (pagination) {
            this.loading = true
            this.$store.dispatch('getSystemUsers', pagination).then(res => {
                console.log(res)
                this.loading = false
                this.sysUser = res.system_users.map(e => ({ ...e, key: e.id }))
                this.pagination = { ...this.pagination, total: parseInt(res.count) }
                // document.body.scrollTop = 0
                // document.documentElement.scrollTop = 0
            })
        },
        deleteSystemUser (id) {
          this.$store.dispatch('deleteSystemUser', id).then(res => {
            this.$deleteFromList(this.sysUser, id)
            this.$alertMessage('success', 'Deleted', 'System user deleted successfully', this)
          })
        }
    },
    created () {
      this.getSystemUsers(this.$route.query)
      this.pagination.current = parseInt(this.$route.query.page) || 1
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
