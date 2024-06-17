
<template>
  <div>
    <a-navigation
      :list="[
        { name: $t('Finance'), link: '' },
        { name: $t('P&L'), link: '' },
        { name: $t('Детальная информация'), link: '' }
      ]"
      :isBack="{ flag: true, return: true }"
    />
    <a-card class="no-space-tab">
      <a-form-model :colon="false" layout="horizontal" ref="ruleForm">
        <a-card :title="$t('Информация по счету')" class="no-border-card no-space-tab">
          <a-row type="flex" :gutter="16">
            <a-col :span="8">
              <a-form-model-item ref="name" :label="$t('Дата применения')" prop="title.en">
                <a-date-picker
                  placeholder="Select Time"
                  :format="$dateFormat"
                  style="width: 100%"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Номер счета')" prop="description.en">
                <a-input :placeholder="$t('Введите имя')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Тип операции')" prop="description.en">
                <a-select size="small" style="width: 100%;" placeholder="Выберите тип операции">
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Платежный шлюз')" prop="description.en">
                <a-input :placeholder="$t('Введите платежный шлюз')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item ref="description" :label="$t('Сумма')" prop="description.en">
                <a-input :placeholder="$t('Введите сумму')" />
              </a-form-model-item>
            </a-col>
            <!-- <a-col :span="8">
                  <a-form-model-item :label="$t('Portfolio.create.Decription')" ref="description" prop="description">
                    <a-textarea :auto-size="{ minRows: 10, maxRows: 10 }" placeholder="запишите описание" v-model="portfolio.description"/>
                  </a-form-model-item>
                </a-col> -->
          </a-row>
          <a-row type="flex" :gutter="16">
            <a-col :span="16">
              <a-form-model-item ref="description" :label="$t('Portfolio.create.Decription')" prop="description.en">
                <a-textarea :placeholder="$t('Введите описание')" size="large" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form-model>
    </a-card>
    <a-row class="edit-btns mt-4">
      <a-col span="24">
        <a-form-model-item>
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button type="grey" style="margin-right: 6px">{{
                $t('button.cancel')
              }}</a-button>
              <!-- <a-button type="primary">{{ $t('button.create') }}</a-button> -->
              <a-button type="primary">{{ $t('button.save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
  </div>
</template>
<script>
// import formRule from './formRules'
// import imageUpload from '@/mixins/imageUpload'
// import debounce from 'lodash/debounce'
// import request from '@/utils/request'
export default {
  // mixins: [imageUpload],
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="less">
.category {
  padding:20px,
}
.picture-card {
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 200px;
  }
}
</style>
