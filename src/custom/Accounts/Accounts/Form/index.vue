
<template>
  <div>
    <a-navigation
      :list="[
        { name: $t('Accounts'), link: '' },
        { name: $t('Accounts'), link: '' },
        { name: $t('Детальная информация'), link: '' }
      ]"
      :isBack="{ flag: true, return: true }"
      noBorder
    />
    <a-card class="no-space-tab">
      <a-tabs v-model="activeTab" class="no-margin-bar">
        <a-tab-pane key="1" :tab="$t('Основные')">
          <a-card>
            <a-form-model :colon="false" layout="horizontal" ref="ruleForm">
              <a-card :title="$t('Информация по счету')" class="no-border-card no-space-tab">
                <a-row type="flex" :gutter="16">
                  <a-col :span="8">
                    <a-form-model-item ref="name" :label="$t('Account number')" prop="title.en">
                      <a-input :placeholder="$t('Введите номер телефона')" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-model-item ref="description" :label="$t('name')" prop="description.en">
                      <a-input :placeholder="$t('Введите имя')" />
                    </a-form-model-item>
                  </a-col>
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
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('Операции по счетам')">
          <a-card>
            <a-table :columns="columns"></a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="3" :tab="$t('Авто-операции')">
          <a-card>
            <a-form-model :colon="false" layout="horizontal" ref="ruleForm">
              <a-card :title="$t('Информация по счету')" class="no-border-card no-space-tab">
                <a-row type="flex" :gutter="16">
                  <a-col :span="8">
                    <a-form-model-item ref="name" :label="$t('Account number')" prop="title.en">
                      <a-input :placeholder="$t('Введите номер телефона')" />
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-model-item ref="description" :label="$t('name')" prop="description.en">
                      <a-input :placeholder="$t('Введите имя')" />
                    </a-form-model-item>
                  </a-col>
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
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <a-row class="edit-btns mt-4">
      <a-col span="24">
        <a-form-model-item>
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button type="grey" style="margin-right: 6px">{{
                $t('button.cancel')
              }}</a-button>
              <!-- <a-button @click="postPortfolio" v-if="isNewForm" type="primary">{{ $t('button.create') }}</a-button> -->
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
//   mixins: [imageUpload],
  data () {
      return {
          activeTab: '1',
          columns: [
            {
                title: this.$t('Account number'),
                scopedSlots: { customRender: 'created_at' },
                key: 'created_at'
            },
            {
                title: this.$t('Name'),
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: this.$t('Description'),
                dataIndex: 'phone_number',
                key: 'phone_number'
            },
            {
                title: this.$t('category.table.Actions'),
                scopedSlots: { customRender: 'actions' },
                key: 'actions',
                width: 165
            }
         ]
      }
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
