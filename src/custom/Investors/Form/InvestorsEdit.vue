<template>
  <div>
    <a-navigation :list="[{ name: $t('Список инвесторов'), link: ''}]" :isBack="{ return: true, flag: true }" noBorder/>
    <a-card>
      <div slot="extra" class="btns-row" >
        <a-button type="danger" @click="rejectHandler" >Отказать</a-button>
        <a-button type="primary" @click="confirmHandler" >Принять</a-button>
      </div>

      <a-row :gutter="24">
        <a-col :span="10" >
          <a-card title="Старые данные" >
            <div class="row">
              <div class="label">Имя:</div>
              <div class="value">{{ oldData ? oldData.first_name : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Фамилия:</div>
              <div class="value">{{ oldData ? oldData.last_name : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Отчество:</div>
              <div class="value">{{ oldData ? oldData.patronymic : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">ПИНФЛ:</div>
              <div class="value">{{ oldData ? oldData.pin : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Серия и номер пасспорта:</div>
              <div class="value">{{ oldData ? oldData.doc_number : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Дата выдачи паспорта:</div>
              <div class="value">{{ oldData ? moment(oldData.date_of_issue).format('DD.MM.YYYY') : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Место выдачи паспорта:</div>
              <div class="value">{{ oldData ? oldData.place_of_issue : '---' }}</div>
            </div>
            <div v-if="oldData && oldData.passport_photo">
              <div class="row">
                <div class="label">Фото паспорта:</div>
              </div>
              <div class="row">
                <div class="photo-card" style="margin-bottom: 50px">
                  <img style="max-height: 300px" slot="cover" :src="oldData ? oldData.passport_photo : '---'" alt="">
                </div>
              </div>
            </div>
            <div v-if="oldData && oldData.photo_with_passport">
              <div class="row">
                <div class="label">Фото с паспортом:</div>
              </div>
              <div class="row">
                <div class="photo-card" >
                  <img style="max-height: 300px" slot="cover" :src="oldData ? oldData.photo_with_passport : '---'" alt="">
                </div>
              </div>
            </div>
            <div v-if="oldData && oldData.photo_card_registration">
              <div class="row">
                <div class="label">Фото прописки ID карты:</div>
              </div>
              <div class="row">
                <div class="photo-card" >
                  <img style="max-height: 300px" slot="cover" :src="oldData ? oldData.photo_card_registration : '---'" alt="">
                </div>
              </div>
            </div>
          </a-card>
        </a-col>

        <a-col :span="4" class="center-block" >
          <div class="icon"><a-icon type="double-right" style="font-size: 70px; color: #00CAB0" /></div>
        </a-col>

        <a-col :span="10" >
          <a-card title="Новые данные" >
            <div class="row">
              <div class="label">Имя:</div>
              <div class="value">{{ newData ? newData.first_name : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Фамилия:</div>
              <div class="value">{{ newData ? newData.last_name : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Отчество:</div>
              <div class="value">{{ newData ? newData.patronymic : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">ПИНФЛ:</div>
              <div class="value">{{ newData ? newData.pin : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Серия и номер пасспорта:</div>
              <div class="value">{{ newData ? newData.doc_number : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Дата выдачи паспорта:</div>
              <div class="value">{{ newData ? newData.date_of_issue : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Место выдачи паспорта:</div>
              <div class="value">{{ newData ? newData.place_of_issue : '---' }}</div>
            </div>
            <div class="row">
              <div class="label">Фото паспорта:</div>
            </div>
            <div class="row" >
              <div class="photo-card" style="margin-bottom: 50px">
                <img style="max-height: 300px" slot="cover" :src="newData ? newData.passport_photo : '---'" alt="">
              </div>
            </div>

            <div class="row" >
              <div class="label">Фото с паспортом:</div>
            </div>
            <div class="row">
              <div class="photo-card" style="margin-bottom: 50px">
                <img style="max-height: 300px" slot="cover" :src="newData ? newData.photo_with_passport : '---'" alt="">
              </div>
            </div>

            <div class="row">
              <div class="label">Фото прописки или Фото задней части ID-карты:</div>
            </div>
            <div class="row">
              <div class="photo-card">
                <img style="max-height: 300px" slot="cover" :src="newData ? newData.photo_card_registration : '---'" alt="">
              </div>
            </div>

          </a-card>
        </a-col>
      </a-row>

    </a-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      oldData: null,
      newData: null
    }
  },
  mounted () {
    this.getNewData()
    this.getOldData()
  },
  methods: {
    moment,
    getNewData () {
      this.$store.dispatch('getInvestorNewData', this.$route.params.id)
        .then(res => {
          this.newData = res
        })
    },
    getOldData () {
      this.$store.dispatch('getInvestor', this.$route.params.id)
        .then(res => {
          const oldData = res.investor.passport_data
          this.oldData = oldData
        })
    },
    confirmHandler () {
      this.$store.dispatch('confirmInvestorData', this.$route.params.id)
        .then(res => {
          this.$router.push(`/investors/list?status=changeRequests`)
          this.$alertMessage('success', 'Investor', 'Investor has Успешно обновлено', this)
        })
    },
    rejectHandler () {
      this.$store.dispatch('deleteInvestorData', this.$route.params.id)
        .then(res => {
          this.$router.push(`/investors/list?status=changeRequests`)
          this.$alertMessage('success', 'Deleted', 'Investor deleted successfully', this)
        })
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
}

.label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
.value {
  font-size: 16px;
  padding-left: 20px;
}

.center-block {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.photo-card {
  width: 100%;
  display: flex;
  justify-content: center;
}

.btns-row button {
  margin: 0 10px;
}
</style>
