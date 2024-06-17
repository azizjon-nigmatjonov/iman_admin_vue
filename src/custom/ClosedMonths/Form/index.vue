<template>
  <div>
    <a-navigation :list="[{ name: $t('closedMonths'), link: '' }, { name: $t('button.edit'), link: '' }]" :isBack="{ flag: true, return: true }" noBorder>
      <div style="float: right; display: flex; align-items: center">
        {{ $t('month') }}: <span style="color: #01cab0; font-weight: bold; text-transform: capitalize;">{{ getMonth }}</span>
        <a-input v-if="activeTab === 1 || activeTab === 3" style="margin-left: 10px" :placeholder="$t('search')" v-model="searchText" ></a-input>
      </div>
    </a-navigation>
    <a-card class="no-space-tab">
      <a-tabs v-model="activeTab" class="no-margin-bar" @change="onTabChange">
        <div slot="tabBarExtraContent" style="display: flex; align-items: center; margin-right: 24px">
          <a-button @click="postReportLeft" type="primary" :loading="reportLoading" style="margin-right: 10px">Дивидент</a-button>
          <a-button @click="showCreateModal" type="primary" style="margin-right: 10px">Прогноз</a-button>
          <a-button style="margin-right: 10px" type="primary" @click="downloadCGU" :loading="downloadingCGU" icon="file-excel">{{ $t('Export DXM') }}</a-button>
          <a-button icon="download" @click="downloadExcel" v-if="activeTab !== 4" style="margin-right: 10px"></a-button>
          <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('closedMonthsBtn')"
            @confirm="sendRequest"
            :okText="$t('yes')"
            :cancelText="$t('no')"
            :disabled="$route.query.status !== 'in-process' || downloaded"
          >
            <a-button type="primary" :disabled="$route.query.status !== 'in-process' || downloaded" :loading="loadingBtn">{{ $t('closedMonthsBtn') }}</a-button>
          </a-popconfirm>
        </div>
        <a-tab-pane :key="1" tab="Распеределения чистый прыбыли">
          <a-card>
            <first-tab ref="tab1" :excelFile="excelFile" :searchText="searchText" ></first-tab>
          </a-card>
        </a-tab-pane>
        <a-tab-pane :key="2" tab="Вывод денег">
          <a-card>
            <second-tab ref="tab2" :excelFile="excelFile"></second-tab>
          </a-card>
        </a-tab-pane>
        <a-tab-pane :key="3" tab="Ввод денег">
          <a-card>
            <third-tab :searchText="searchText" ref="tab3"></third-tab>
          </a-card>
        </a-tab-pane>
        <a-tab-pane :key="4" :tab="$t('files')">
          <a-card>
            <a-table
              bordered
              :pagination="false"
              :columns="columns0"
              :loading="loadingBtn"
              :data-source="array0"
            >
              <span slot="orderNumber" slot-scope="text, record, index">
                {{ index + 1 }}
              </span>
              <span slot="type" slot-scope="text">
                {{ $t(text.type) }}
              </span>
              <span slot="icon" slot-scope="text">
                <img width="25" v-if="text.format === 'photo'" height="25" :src="require('../../../assets/icons/image.svg')" >
                <img width="25" v-else height="25" :src="require('../../../assets/icons/docs.svg')" >
                {{ text.title }}
              </span>
              <span slot="file" slot-scope="text"> {{ text.format === 'photo' ? 'Изображение' : 'Документ' }}</span>
              <span slot="actions" slot-scope="text" class="span">
                <a-row type="flex" :gutter="[8, 8]">
                  <a-col span="auto">
                    <icon-btn @click="download(text)" :tooltip="$t('button.preview')" icon="download" color="green" />
                  </a-col>
                </a-row>
              </span>
            </a-table>
          </a-card>
        </a-tab-pane>
      </a-tabs>
      <!-- <a-button @click="onChangeStatus" type="primary" style="float: right">{{ $t('sendToNextStatus') }}</a-button> -->
    </a-card>
    <!-- <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 20px" v-if="activeTab === 2">
      <a-button @click="onChangePage" icon="printer" theme="filled" style="padding: 5px 40px; margin-right: 10px"> {{ 'Печать' }} </a-button>
      <a-button @click="onChangePage" type="primary" icon="edit" theme="filled" style="padding: 5px 50px"> {{ 'Изменить статус' }} </a-button>
    </div> -->

    <a-modal :footer="null" v-model="visible" title="Create Modal" @ok="handleOkModal">
      <a-row >
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
        >
          <a-row :gutter="16">
            <a-col span="12">
              <a-form-model-item :label="$t('day_0')" ref="day_0" prop="day_0">
                <a-input-number
                  v-model="form.day_0"
                  :min="0"
                  :max="100"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                />
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item :label="$t('days_1_7')" ref="days_1_7" prop="days_1_7">
                <a-input-number
                  :min="0"
                  :max="100"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                  v-model="form.days_1_7"
                />
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item :label="$t('days_8_15')" ref="days_8_15" prop="days_8_15">
                <a-input-number
                  :min="0"
                  :max="100"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                  v-model="form.days_8_15"
                />
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item :label="$t('days_16_30')" ref="days_16_30" prop="days_16_30">
                <a-input-number
                  :min="0"
                  :max="100"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                  v-model="form.days_16_30"
                />
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item :label="$t('days_31_60')" ref="days_31_60" prop="days_31_60">
                <a-input-number
                  :min="0"
                  :max="100"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                  v-model="form.days_31_60"
                />
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item :label="$t('days_61_90')" ref="days_61_90" prop="days_61_90">
                <a-input-number
                  :min="0"
                  :max="100"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                  v-model="form.days_61_90"
                />
              </a-form-model-item>
            </a-col>
            <a-col span="12">
              <a-form-model-item :label="$t('days_91more')" ref="days_91more" prop="days_91more">
                <a-input-number
                  :min="0"
                  :max="100"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                  v-model="form.days_91more"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-form-model-item>
            <a-button @click="onSubmit" type="primary" html-type="submit">
              {{ $t('save') }}
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
// import { delete } from 'node_modules/vue/types/umd'
import imageUpload from '@/mixins/imageUpload'
import FirstTab from './firstTab.vue'
import SecondTab from './secondTab.vue'
import ThirdTab from './thirdTab'
import moment from 'moment'
import writeXlsxFile from 'write-excel-file'
import formatter from '@/utils/excelDataFormatter'
import excelFormats from './excelFormats'

const validate = { required: true, message: 'поле обязательно', trigger: 'change' }

export default {
  mixins: [imageUpload],
  data () {
    return {
        excelFile: {
          xlsx2: '',
          xlsx1: ''
        },
        form: {
          day_0: '',
          days_1_7: '',
          days_8_15: '',
          days_16_30: '',
          days_31_60: '',
          days_61_90: '',
          days_91more: '',
          month: ''
        },
        rules: {
          day_0: validate,
          days_1_7: validate,
          days_8_15: validate,
          days_16_30: validate,
          days_31_60: validate,
          days_61_90: validate,
          days_91more: validate
        },
        visible: false,
        loading: false,
        loadingBtn: false,
         reportLoading: false,
        downloadingCGU: false,
        downloaded: false,
        data: [],
        searchText: '',
        activeTab: 1,
        link: 'https://view.officeapps.live.com/op/embed.aspx?src=',
        fileTypes: {
            agreement: '',
            partnership_left: '',
            withdraw_dividends: '',
            certificate: ''
        },
        array0: [],
        columns0: [
            {
              title: 'No',
              width: 60,
              align: 'center',
              scopedSlots: { customRender: 'orderNumber' },
              key: 'orderNumber'
            },
            {
              title: this.$t('filename'),
              scopedSlots: { customRender: 'icon' },
              key: 'icon'
            },
            // {
            //   title: this.$t('type'),
            //   scopedSlots: { customRender: 'type' },
            //   key: 'type'
            // },
            {
              title: this.$t('category.table.Actions'),
              scopedSlots: { customRender: 'actions' },
              key: 'actions',
              width: 220
            }
        ],
        isCashOut: this.$route.path.split('/').includes('withdrawal')
    }
  },
  components: {
    FirstTab,
    SecondTab,
    ThirdTab
  },
  computed: {
    getMonth () {
      return moment(this.$route.params.date).locale(this.$t('lang')).format('MMMM')
    }
  },
  mounted () {
    console.log(this.$t('lang'))
  },
  methods: {
    showCreateModal () {
      this.visible = true
    },
    onSubmit () {
      console.log('form', this.form)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.form)
          this.$store.dispatch('postDelayInstallment', this.form).then(res => {
            this.$message.success('Successfully added')
            this.visible = false
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
       })
    },
    handleOkModal (e) {
      console.log(e)
      this.visible = false
    },
    async downloadExcel (e) {
     console.log('download pro', this.excelFile['xlsx' + this.activeTab])

      if ((this.activeTab === 1 || this.activeTab === 2)) {
          window.open(this.excelFile['xlsx' + this.activeTab], '_blank')
          return null
      } else {
        // this.excelFile.xlsx = ''
      }

      const data = this.$refs[`tab${this.activeTab}`]._data.excelData
      const format = excelFormats[`closedMonth_${this.activeTab}`]
      console.log('format', format)
      const formattedData = formatter(data, format)
      await writeXlsxFile(formattedData, {
        columns: format.columns.map(() => ({ width: 28 })),
        fileName: 'Закрытие месяца.xlsx'
      })
    },
    downloadCGU (e) {
      e.preventDefault()
      this.downloadingCGU = true
      // const dateBegin = this.form.date[0].format('YYYY-MM-DD')
      // const dateEnd = this.form.date[1].format('YYYY-MM-DD')
      const params = {
          begin_date: this.$route.query.period,
          end_date: moment(this.$route.query.period).add(10, 'm').format('YYYY-MM-DD'),
          month_id: this.$route.params.id
      }

      this.$store.dispatch('getInvestorCguReport', params).then((response) => {
        console.log(response)
        if (response.filename && response.filename.length) {
          response.filename.forEach((element, index) => {
            console.log('El', element)
            window.open(element)
          })
        }
      }).catch(reject => {
        console.log(reject.response.data)
        this.$message.error(reject.response.data.error)
      })
      .finally(() => {
        this.downloadingCGU = false
      })
    },
    onChangePage () {
        this.activeTab++
    },
    onTabChange (key) {
      if (key === 4) {
        this.getClosedMonthFiles()
      }
    },
    go (e) {
      console.log('e', e)
      window.open(e.format !== 'photo' ? this.link + e.file : e.file, '_blank')
    },
    async download (e) {
      console.log(e)
      const link = e.file
      // await fetch(e.file).then(response => response.blob()).then(data => {
        // console.log(data)
        const fileLink = document.createElement('a')
        fileLink.href = link
        fileLink.setAttribute('download', e.title)
        document.body.appendChild(fileLink)
        fileLink.click()
      // })
    },
    getApplicationsDetail () {
      this.$store.dispatch('getApplicationsDetail', { id: this.$route.params.id }).then(res => {
        console.log(res)
      })
    },
    getClosedMonthFiles () {
      this.loadingBtn = true
      this.$store.dispatch('getClosedMonthFiles', this.$route.params.id).then(res => {
        // this.$message.success('Request successfully sent!')
        const imgExtensions = ['svg', 'png', 'jpg', 'jpeg']
        this.array0 = res.files.map(el => {
          const exten = el.file_name.split('.').pop()
          return {
            file: el.file_name,
            title: el.title,
            key: Math.random(),
            format: exten.includes('doc') ? 'doc' : (
              exten.includes('pdf') ? 'pdf' : (
                exten.includes('xls') ? 'excel' : (
                  imgExtensions.includes(exten) ? 'photo' : 'file'
                )
              )
            )
          }
        })
      }).finally(() => {
        this.loadingBtn = false
      })
    },
    postReportLeft () {
      this.reportLoading = true
      // testcase // window.open('https://test.cdn.iman.uz/documents/divident_2022-05-24_12:14:01.xlsx')
      this.$store.dispatch('sendReportLeftInvestor', {
        month_id: this.$route.params.id,
        period: this.$route.params.date
      }).then(res => {
        this.$message.success('Request successfully sent!')
          window.open(res.url)
        })
        .catch(res => {
          this.$message.error('Server rejected!')
        })
        .finally(() => {
          this.reportLoading = false
        })
    },
    sendRequest () {
      this.loadingBtn = true
      this.$store.dispatch('sendClosedMonthRequest', {
        month_id: this.$route.params.id,
        period: this.$route.params.date
      }).then(res => {
        console.log(res)
        this.$message.success('Request successfully sent!')
        const imgExtensions = ['svg', 'png', 'jpg', 'jpeg']
        this.downloaded = true
        this.array0 = res.fileslist.map(el => {
          const exten = el.file_name.split('.').pop()
          return {
            file: el.file_name,
            title: el.file_name.split('/').pop(),
            key: Math.random(),
            format: exten.includes('doc') ? 'doc' : (
              exten.includes('pdf') ? 'pdf' : (
                exten.includes('xls') ? 'excel' : (
                  imgExtensions.includes(exten) ? 'photo' : 'file'
                )
              )
            )
          }
        })
      })
      .catch(res => {
        this.$message.error('Server rejected!')
      })
      .finally(() => {
        this.loadingBtn = false
      })
    }
  },
  created () {
    this.form.month = this.$route?.params.date
  }
}
</script>

<style scoped>
.first {
  margin-bottom: 30px;
  overflow: hidden;
}
.buttons {
  display: flex;
  justify-content: flex-end;
}
.mx {
  margin: 0 5px;
}
.balance {
  margin-left: auto;
  margin: 5px;
  display: flex;
  justify-content: flex-end;
}
.imageClass {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
