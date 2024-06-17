<template>
  <div>
    <a-form-model :model="users" :colon="false" ref="rules" :rules="rules">
      <a-row type="flex" :gutter="[8,8]" v-for="(item) in users" :key="item.guid">
        <a-col span="12">
          <a-form-model-item :label="$t('Имя пользователя')">
            <a-input place v-model="item.username" :disabled="item.username ? true : false"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item :label="$t('new_password')">
            <a-input place v-model="item.new_password"></a-input>
          </a-form-model-item>
          <!-- <p v-if="item.guid == error_field" style="color: red; position: absolute; bottom: -5px">Пожалуйста, напишите</p> -->
        </a-col>
        <a-col span="24">
          <a-form-model-item>
            <a-row type="flex" justify="end">
              <a-col span="auto">
                <a-button @click="updateOwnerPassword(item.guid, item.new_password)" type="primary">{{ $t('button.create') }}</a-button>
              </a-col>
            </a-row>
          </a-form-model-item>
        </a-col>
        <a-divider class="divider" orientation="left"></a-divider>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            users: [],
            form: {
              new_password: ''
            },
            error_field: false
        }
    },
    methods: {
        getMerchantsOwnerInfo () {
        this.$store.dispatch('getMerchantsOwnerInfo', this.$route.params.id)
          .then(res => {
            if (res.users) {
              this.users = res.users.map((item) => {
                return {
                  new_password: '',
                  ...item
                }
              })
            }
        })
        .catch(err => console.log(err))
        },
        updateOwnerPassword (ownerId, new_password) {
          if (new_password) {
            console.log('aaa')
            this.error_field = false
            this.$store.dispatch('passwordSetup', { guid: this.$route.params.id, ownerId, data: { new_password: new_password } }).then(res => {
                this.$alertMessage('success', 'Успешно обновлено', '', this)
            }).finally(() => {
                this.loading = false
            }).catch(() => {})
          } else {
            console.log('bbbb')
          }
        }
    },
    created () {
      this.getMerchantsOwnerInfo()
    }
}
</script>

<style>

</style>
