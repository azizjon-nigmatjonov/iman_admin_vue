<template>
  <div>
    <!-- <a-navigation :list="[{ name: 'Список аккаунтов', link: ''}]" :isBack="{ flag: true, link: '/posAgents/list'}" /> -->
    <a-row type="flex" justify="end" class="mb-2">
      <a-col span="auto">
        <a-button type="primary" @click="onChange()">{{ $t('button.create') }}</a-button>
      </a-col>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="accounts"
      :row-key="record => record.id"
    >
      <span slot="status" slot-scope="text">
        <a-tag :color="getStatusColor(text.is_active)">{{ text.is_active ? $t('active') : $t('inactive') }}</a-tag>
      </span>
      <span slot="actions" slot-scope="text" class="span">
        <delete-btn @confirm="deletePosAgentsAccount(text)"/>
        <!-- <a-popconfirm
          title="Вы хотите это удалить?"
          ok-text="Да"
          cancel-text="Нет"
          @confirm="deletePosAgentsAccount(text)"
          @cancel="cancel => null"
        >
          <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
            <a-button type="danger" icon="delete" />
          </a-tooltip>
        </a-popconfirm> -->
        <a-popconfirm
          title="Вы хотите заблокировать?"
          ok-text="Да"
          cancel-text="Нет"
          @confirm="updatePosAgentsAcount(text)"
          @cancel="cancel => null"
        >
          <icon-btn icon="lock" :title="$t('button.preview')" />
          <!-- <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
            <a-button class="mx-1" type="primary" icon="lock" />
          </a-tooltip> -->
        </a-popconfirm>

      </span>
    </a-table>
    <!-- <a-modal
        v-model="visible"
        title="Title"
        on-ok="handleOk">
        <template slot="footer">
          <a-button key="back" @click="handleCancel">
            Return
          </a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
            Submit
          </a-button>
        </template>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-modal> -->
    <a-modal
      v-if="this.accounts"
      v-model="visible"
      :title="$t('добавить аккаунт')"
      @ok="postPosAgentsAccount"
      @cancel="handleCancel"
      on-ok="handleOk"
    ><template>
      <a-form-model :colon="false" :model="account">
        <a-col style="padding: 0 15px">
          <a-form-model-item :label="$t('posAgent_number')" prop="posAgent_number">
            <a-input @keypress="isNumber($event)" type="number" @keydown.space.prevent v-model="account.phone_number" />
          </a-form-model-item>
        </a-col>
        <!-- <a-col style="padding: 0 15px">
            <a-form-model-item :label="$t('Status')" prop="status">
              <a-switch v-model="form.is_active" @change="onChange1()" />
            </a-form-model-item>
          </a-col> -->
      </a-form-model>
    </template>
    </a-modal>
    <!-- <template>
        <div class="buttons">
          <a-button style="background: red; color: white; border: none" key="back" @click="rejectScore(installment)">
            Отклонять
          </a-button>
          <a-button v-if="installment.scoring_status == 'passed'" key="submit" type="primary" @click="acceptScore(installment)" class="mx"> Принять </a-button>
          <a-button v-else-if="installment.scoring_status !== 'passed' && installment.status !== 'reject'" key="submit2" type="primary" @click="startScoring(installment)" class="mx"> Начать подсчет очков </a-button>
        </div>
      </template> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
        visible: false,
        account: {
            phone_number: ''
            // is_active: false
        },
         columns: [
              {
             title: this.$t('phone_number'),
             dataIndex: 'phone_number',
             key: 'phone_number'
         },
             {
             title: this.$t('Status'),
             scopedSlots: { customRender: 'status' },
             key: 'status'
         },
         {
             title: this.$t('category.table.Actions'),
             scopedSlots: { customRender: 'actions' },
             key: 'actions',
            width: 150
      }
        //  {
        //      title: 'Language',
        //      dataIndex: 'lang',
        //      key: 'lang'
        //  },
         ],
    pos_agents: {},
    accounts: []
    }
  },
  methods: {
    isNumber: function (evt) {
      evt = (evt) ?? window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
      handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
      onChange () {
          this.visible = true
      },
    getStatusColor (color) {
      var selected
      switch (color) {
        case true:
          selected = 'green'
          break
        case false:
          selected = 'red'
          break
        default:
          selected = 'brown'
      }
      return selected
    },
    onChange1 () {
        if (this.account.is_active) {
        this.account.is_active = false
        } else {
            this.account.is_active = true
        }
    },
     postPosAgentsAccount () {
         const a = {
        id: this.$route.params.id,
        data: {
          phone_number: this.account.phone_number
        }
        }
    //   if (this.checkPost() === false) return -1
      console.log(this.form)
      console.log('IAm a ', a)
      this.$store.dispatch('postPosAgentsAccount', a).then((res) => {
        console.log(res)
        this.accounts.push({
          is_active: true,
          phone_number: this.account.phone_number
        })
        this.$message.success('Pos agent  added successfully')
        this.visible = false
      }).catch(er => {
        console.log(er)
        this.$message.error(er.response.data.message)
      })
    },
   getPosAgent (id) {
     this.$store.dispatch('getPosAgent', this.$route.params.id).then(res => {
       this.pos_agent = res.pos_agent
       this.accounts = res.pos_agent.accounts
     }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
   },
   deletePosAgentsAccount (e) {
       const a = {
        id: this.$route.params.id,
        data: e
    }
        this.$store.dispatch('deletePosAgentsAccount', a).then(res => {
            this.pos_agent.accounts.splice(this.pos_agent.accounts.findIndex(el => el.phone_number === e.phone_number), 1)
            this.$message.success(' Pos agent account deleted successfully')
          }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
     },
     updatePosAgentsAcount (e) {
       if (this.is_active === true) {
         this.is_active = false
       } else {
         this.is_active = true
       }
         const a = {
        id: this.$route.params.id,
        data: {
          ...e,
          is_active: this.is_active
        }
       }
         this.$store.dispatch('updatePosAgentsAcount', a).then(res => {
             this.$message.success('Account has Успешно обновлено')
          }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
     }
  },
  created (id) {
    this.getPosAgent(id)
  }

}
</script>

<style>
 .first {
   margin-bottom: 50px 0;
 }
 .buttons {
   margin-left: auto;
   margin: 5px;
   display: flex;
   justify-content: flex-end;
 }
 .mx {
   margin: 0 5px;
 }
 .desc {
   margin-bottom: 30px;
 }
</style>
