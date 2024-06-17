
<template>
  <div>
    <a-navigation
      :list="[
        { name: $t('Список портфолио'), link: '/stratefy/list' },
        { name: $route.params.id ? $t('button.edit') : $t('add') }
      ]"
      :isBack="{ flag: true, return: true }"
    />
    <a-card>
      <a-row type="flex" justify="center" :gutter="16">
        <a-col :span="24" >
          <!-- <a-divider orientation="left"> {{ $t('Form') }}</a-divider> -->
          <a-form-model :colon="false" layout="horizontal" :rules="rules" :model="portfolio" ref="ruleForm">
            <a-card :title="$t('strategyParameters')" class="no-border-card no-space-tab">
              <a-row type="flex" :gutter="16">
                <a-col :span="8">
                  <a-form-model-item :label="$t('Portfolio.create.Min_investment_amount')" prop="min_investment_amount">
                    <a-input-number
                      :min="0"
                      v-model="portfolio.min_investment_amount"
                      :formatter="value => value.replace(/(?=(\d{3})+(?!\d))/g, ' ')"
                      :parser="value => value.replace(/\s?|(,*)/g, '')"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item :label="$t('Portfolio.create.min_reinvestment_amount')" prop="min_reinvestment_amount">
                    <a-input-number
                      :min="0"
                      v-model="portfolio.min_reinvestment_amount"
                      :formatter="value => value.replace(/(?=(\d{3})+(?!\d))/g, ' ')"
                      :parser="value => value.replace(/\s?|(,*)/g, '')"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8" >
                  <a-form-model-item :label="$t('Portfolio.create.Max_investment_amount')" prop="max_investment_amount">
                    <a-input-number
                      :min="portfolio.min_investment_amount ? portfolio.min_investment_amount : 0"
                      v-model="portfolio.max_investment_amount"
                      :formatter="value => value.replace(/(?=(\d{3})+(?!\d))/g, ' ')"
                      :parser="value => value.replace(/\s?|(,*)/g, '')"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8" >
                  <a-form-model-item :label="$t('Portfolio.create.initial_percent_iman')" prop="initial_percent_iman">
                    <a-input-number
                      :min="0"
                      v-model="portfolio.initial_percent_iman"
                      :max="100"
                      :formatter="value => `${value}%`"
                      :parser="value => value.replace('%', '')"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8" >
                  <a-form-model-item :label="$t('Portfolio.create.min_percent_iman')" prop="min_percent_iman">
                    <a-input-number
                      :min="0"
                      v-model="portfolio.min_percent_iman"
                      :max="100"
                      :formatter="value => `${value}%`"
                      :parser="value => value.replace('%', '')"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row type="flex" :gutter="16">
                <a-col :span="8" >
                  <a-form-model-item :label="$t('Portfolio.create.value_by_mln')" prop="value_by_mln">
                    <a-input-number
                      :min="0"
                      v-model="portfolio.value_by_mln"
                      :formatter="value => value.replace(/(?=(\d{3})+(?!\d))/g, ' ')"
                      :parser="value => value.replace(/\s?|(,*)/g, '')"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8" >
                  <a-form-model-item :label="$t('Portfolio.create.weight_by_mln')" prop="weight_by_mln">
                    <a-input-number
                      :min="0"
                      :max="100"
                      v-model="portfolio.weight_by_mln"
                      @change="portfolio.weight_by_month = 100 - portfolio.weight_by_mln"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item :label="$t('Portfolio.create.cape_by_mln')" prop="percent_by_mln">
                    <a-input-number
                      :min="0"
                      :max="100"
                      v-model="portfolio.percent_by_mln"
                      :formatter="value => `${value}%`"
                      :parser="value => value.replace('%', '')"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row type="flex" :gutter="16">
                <a-col :span="8" >
                  <a-form-model-item :label="$t('Portfolio.create.value_by_month')" prop="value_by_month">
                    <a-input-number
                      :min="0"
                      v-model="portfolio.value_by_month"
                      :formatter="value => value.replace(/(?=(\d{3})+(?!\d))/g, ' ')"
                      :parser="value => value.replace(/\s?|(,*)/g, '')"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8" >
                  <a-form-model-item :label="$t('Portfolio.create.weight_by_month')" prop="weight_by_month">
                    <a-input-number
                      :min="0"
                      :max="100"
                      v-model="portfolio.weight_by_month"
                      @change="portfolio.weight_by_mln = 100 - portfolio.weight_by_month"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item :label="$t('Portfolio.create.cape_by_month')" prop="percent_by_month">
                    <a-input-number
                      :min="0"
                      :max="100"
                      v-model="portfolio.percent_by_month"
                      :formatter="value => `${value}%`"
                      :parser="value => value.replace('%', '')"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row type="flex" :gutter="16">
                <a-col :span="8" >
                  <a-form-model-item :label="$t('Portfolio.create.Month_count')" prop="month_limits">
                    <a-select mode="multiple" v-model="portfolio.month_limits" >
                      <a-select-option v-for="item in monthList" :value="item" :key="item">
                        {{ item }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8" >
                  <a-form-model-item :label="$t('Portfolio.create.Risk_type')" prop="risk_type">
                    <a-select v-model="portfolio.risk_type" >
                      <a-select-option value="A" >
                        A
                      </a-select-option>
                      <a-select-option value="B" >
                        B
                      </a-select-option>
                      <a-select-option value="C">
                        C
                      </a-select-option>
                      <a-select-option value="D">
                        D
                      </a-select-option>
                      <a-select-option value="E">
                        E
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item :label="$t('Portfolio.create.corporate')" prop="corporate">
                    <a-select
                      v-model="portfolio.corporate"
                      @popupScroll="onScrollBottom"
                      placeholder="brand">
                      <a-select-option v-for="corporate in corporateList" :title="corporate.name" :key="corporate.id" :value="corporate.id">
                        {{ corporate.name }}
                      </a-select-option>
                      <a-select-option key="fetching" v-if="corporateParams.total > corporateList.length || fetching">
                        <a-spin slot="notFoundContent" size="small" />
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row type="flex" :gutter="16">
                <a-col :span="8" >
                  <a-form-model-item :label="$t('Status')" prop="status">
                    <a-select v-model="portfolio.status" >
                      <a-select-option value="active" >
                        {{ $t('active') }}
                      </a-select-option>
                      <a-select-option value="inactive" >
                        {{ $t('inactive') }}
                      </a-select-option>
                      <a-select-option value="archive">
                        {{ $t('archive') }}
                      </a-select-option>
                      <a-select-option value="soon">
                        {{ $t('soon') }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8" >
                  <a-form-model-item :label="$t('annual_profit_rate')" prop="annual_profit_rate">
                    <a-input-number
                      :min="0"
                      :max="100"
                      :formatter="value => `${value}%`"
                      :parser="value => value.replace('%', '')"
                      v-model="portfolio.annual_profit_rate"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8" >
                  <!-- <a-input-search
                        placeholder="input search text"
                        :value="item"
                        @search="onDeleteAdvantage(index, $event)"
                        v-for="(item, index) in portfolio.advantages"
                        :key="index"
                      >
                        <a-button slot="enterButton">
                          delete
                        </a-button>
                      </a-input-search> -->
                  <!-- <a-form-model-item :label="$t('Portfolio.create.advantage')" prop="advantage" :style="{'margin-bottom': portfolio.advantages.length ? `10px` : '3px'}">
                    <a-input
                      :value="item"
                      v-for="(item, index) in portfolio.advantages"
                      :key="index">
                      <a-icon slot="addonAfter" type="delete" @click="onDeleteAdvantage(index)"/>
                    </a-input>
                  </a-form-model-item>

                  <div ongoing>
                    <a-input placeholder="advantage" v-model="advantageVal" @pressEnter="onAddAdvantage">
                      <span slot="addonAfter" @click="onAddAdvantage">
                        {{ $t('add') }}
                      </span>
                    </a-input>
                  </div> -->
                </a-col>
              </a-row>
              <a-row type="flex" :gutter="16">
                <a-col :span="6" >
                  <a-form-model-item :label="$t('octo_id')" prop="octo_id">
                    <a-input-number
                      v-model="portfolio.octo_id"
                      :style="{width: '100%'}"
                    >
                    </a-input-number>
                  </a-form-model-item>
                </a-col>
                <a-col :span="6" >
                  <a-form-model-item :label="$t('octo_secret')" prop="octo_secret">
                    <a-input
                      v-model="portfolio.octo_secret"
                      :style="{width: '100%'}"
                    >
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :span="6" >
                  <a-form-model-item :label="$t('paycom_id')" prop="paycom_id">
                    <a-input
                      v-model="portfolio.paycom_id"
                      :style="{width: '100%'}"
                    >
                    </a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :span="6" >
                  <a-form-model-item :label="$t('paycom_key')" prop="paycom_key">
                    <a-input
                      v-model="portfolio.paycom_key"
                      :style="{width: '100%'}"
                    >
                    </a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="6" :class="{'disabled-upload': strategyIcon}" >
                  <a-form-model-item :label="$t('icon')">
                    <a-upload
                      :customRequest="uploadStrategyIcon"
                      list-type="picture-card"
                      :file-list="[strategyIcon]"
                      @preview="handlePreview"
                      @change="handleStrategyIconChange"
                    >
                      <div>
                        <a-icon :type="strategyIconLoading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                      <img :alt="previewImage" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </a-form-model-item>
                </a-col>
                <a-col :span="18">
                  <a-form-model-item :label="$t('learn_more_page_picture')">
                    <a-upload
                      :customRequest="uploadImage"
                      list-type="picture-card"
                      :file-list="fileList"
                      @preview="handlePreview"
                      @change="handleChange"
                    >
                      <div>
                        <a-icon :type="uploadingImage ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                      <img :alt="previewImage" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-card>
            <a-card :title="$t('strategyInformation')" class="no-border-card no-space-tab">
              <a-row type="flex" :gutter="16">
                <a-tabs :activeKey="activeKey" @change="callback" tab-position="top" style="width: 100%">
                  <a-tab-pane key="1" :tab="$t('English')" force-render>
                    <a-row :gutter="16" style="margin-bottom: 70px" >
                      <a-col :span="8">
                        <a-form-model-item ref="name" :label="$t('Portfolio.create.Title')" prop="title.en">
                          <a-input :placeholder="$t('Название на английском языке')" v-model="portfolio.title.en">
                          </a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="description" :label="$t('Portfolio.create.Decription')" prop="description.en">
                          <a-textarea :placeholder="$t('Oписание на английском языке')" v-model="portfolio.description.en" size="large" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="disclaimer" :label="$t('Portfolio.create.Disclaimer')" prop="disclaimer.en">
                          <a-textarea :placeholder="$t('Дисклеймер на английском языке')" v-model="portfolio.disclaimer.en" size="large" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="learn_more_page" :label="$t(`Описание страницы 'Узнать больше'`)" prop="learn_more_page.description.en">
                          <a-textarea :placeholder="$t(`Описание страницы 'Узнать больше' на английском языке`)" v-model="portfolio.learn_more_page.description.en" size="large" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="diversification" :label="$t('Portfolio.create.diversification')" prop="diversification.en">
                          <a-textarea :placeholder="$t('Дисклеймер на английском языке')" v-model="portfolio.diversification.en" size="large" />
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="risk_assessment" :label="$t('Portfolio.create.risk_assessment')" prop="risk_assessment.value.en">
                          <a-input :placeholder="$t('Значение на английском языке')" v-model="portfolio.risk_assessment.value.en" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="risk_assessment" :label="$t(' ')" prop="risk_assessment.info.en">
                          <a-textarea :placeholder="$t('Информация на английском языке')" v-model="portfolio.risk_assessment.info.en"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="access_your_money" :label="$t('Portfolio.create.access_your_money')" prop="access_your_money.value.en">
                          <a-input :placeholder="$t('Значение на английском языке')" v-model="portfolio.access_your_money.value.en" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="access_your_money" :label="$t(' ')" prop="access_your_money.info.en">
                          <a-textarea :placeholder="$t('Информация на английском языке')" v-model="portfolio.access_your_money.info.en"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="deposit" :label="$t('Portfolio.create.deposit')" prop="deposit.value.en">
                          <a-input :placeholder="$t('Значение на английском языке')" v-model="portfolio.deposit.value.en" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="deposit" :label="$t(' ')" prop="deposit.info.en">
                          <a-textarea :placeholder="$t('Информация на английском языке')" v-model="portfolio.deposit.info.en"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="currency" :label="$t('Portfolio.create.currency')" prop="currency.value.en">
                          <a-input :placeholder="$t('Значение на английском языке')" v-model="portfolio.currency.value.en" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="currency" :label="$t(' ')" prop="currency.info.en">
                          <a-textarea :placeholder="$t('Информация на английском языке')" v-model="portfolio.currency.info.en"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="expected_profit" :label="$t('Portfolio.create.expected_profit')" prop="expected_profit.expected_profit_text.en">
                          <a-input :placeholder="$t('Значение на английском языке')" v-model="portfolio.expected_profit.expected_profit_text.en" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="expected_profit" :label="$t(' ')" prop="expected_profit.min_number">
                          <a-input :placeholder="$t('min')" v-model="portfolio.expected_profit.min_number"/>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="expected_profit" :label="$t(' ')" prop="expected_profit.max_number">
                          <a-input :placeholder="$t('max')" v-model="portfolio.expected_profit.max_number"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="8">
                        <a-form-model-item :label="$t('Portfolio.create.advantage')" prop="advantage" :style="{'margin-bottom': portfolio.advantages.length ? `10px` : '3px'}">
                          <a-input
                            v-model="item.en"
                            v-for="(item, index) in portfolio.advantages"
                            :key="index"
                            :placeholder="`'${item.en}' / '${item.ru}' / '${item.uz}'`"
                          >
                            <a-icon slot="addonAfter" type="delete" @click="onDeleteAdvantage(index)"/>
                          </a-input>
                        </a-form-model-item>
                        <a-row :span="4" style="margin-bottom: 30px" >
                          <a-button @click="onAddAdvantage()" >{{ $t('add') }}</a-button>
                        </a-row>
                      </a-col>
                    </a-row>

                    <p>{{ $t('Portfolio.create.goal') }}</p>
                    <a-row :gutter="24" v-for="(item, index) in portfolio.goals" :key="index" >
                      <a-col :span="8">
                        <a-form-model-item :label="$t('name')">
                          <a-input
                            v-model="item.goal_title.en"
                            :placeholder="`'${item.goal_title.en}' / '${item.goal_title.ru}' / '${item.goal_title.uz}'`"
                          >
                            <a-icon slot="addonAfter" type="delete" @click="onDeleteGoal(index)"/>
                          </a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item :label="$t('Description')">
                          <a-textarea
                            v-model="item.goal_description.en"
                            :placeholder="`'${item.goal_description.en}' / '${item.goal_description.ru}' / '${item.goal_description.uz}'`"
                          >
                          </a-textarea>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8" :class="{'disabled-upload': item.icon}" >
                        <a-form-model-item :label="$t('icon')">
                          <a-upload
                            :customRequest="(data) => uploadGoalIcon(data, index)"
                            list-type="picture-card"
                            :file-list="[item.icon]"
                            @preview="handlePreview"
                            @change="(data) => handleGoalIconChange(data, index)"
                          >
                            <div>
                              <a-icon :type="item.loading ? 'loading' : 'plus'" />
                              <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                            </div>
                          </a-upload>
                          <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                            <img :alt="previewImage" style="width: 100%" :src="previewImage" />
                          </a-modal>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="20" >
                      <a-col :span="4">
                        <a-button @click="onAddGoal()" >{{ $t('add') }}</a-button>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                  <a-tab-pane key="2" :tab="$t('Russian')" force-render>
                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="name" :label="$t('Portfolio.create.Title')" prop="title.ru">
                          <a-input :placeholder="$t('Название на русском языке')" v-model="portfolio.title.ru" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="description" :label="$t('Portfolio.create.Decription')" prop="description.ru">
                          <a-textarea :placeholder="$t('Oписание на русском языке')" v-model="portfolio.description.ru" size="large" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="disclaimer" :label="$t('Portfolio.create.Disclaimer')" prop="disclaimer.ru">
                          <a-textarea :placeholder="$t('Дисклеймер на русском языке')" v-model="portfolio.disclaimer.ru" size="large" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="learn_more_page" :label="$t(`Описание страницы 'Узнать больше'`)" prop="learn_more_page.description.ru">
                          <a-textarea :placeholder="$t(`Описание страницы 'Узнать больше' на русском языке`)" v-model="portfolio.learn_more_page.description.ru" size="large" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="diversification" :label="$t('Portfolio.create.diversification')" prop="diversification.ru">
                          <a-textarea :placeholder="$t('Дисклеймер на русском языке')" v-model="portfolio.diversification.ru" size="large" />
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="risk_assessment" :label="$t('Portfolio.create.risk_assessment')" prop="risk_assessment.value.ru">
                          <a-input :placeholder="$t('Значение на русском языке')" v-model="portfolio.risk_assessment.value.ru" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="risk_assessment" :label="$t(' ')" prop="risk_assessment.info.ru">
                          <a-textarea :placeholder="$t('Информация на русском языке')" v-model="portfolio.risk_assessment.info.ru"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="access_your_money" :label="$t('Portfolio.create.access_your_money')" prop="access_your_money.value.ru">
                          <a-input :placeholder="$t('Значение на русском языке')" v-model="portfolio.access_your_money.value.ru" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="access_your_money" :label="$t(' ')" prop="access_your_money.info.ru">
                          <a-textarea :placeholder="$t('Информация на русском языке')" v-model="portfolio.access_your_money.info.ru"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="deposit" :label="$t('Portfolio.create.deposit')" prop="deposit.value.ru">
                          <a-input :placeholder="$t('Значение на русском языке')" v-model="portfolio.deposit.value.ru" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="deposit" :label="$t(' ')" prop="deposit.info.ru">
                          <a-textarea :placeholder="$t('Информация на русском языке')" v-model="portfolio.deposit.info.ru"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="currency" :label="$t('Portfolio.create.currency')" prop="currency.value.ru">
                          <a-input :placeholder="$t('Значение на русском языке')" v-model="portfolio.currency.value.ru" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="currency" :label="$t(' ')" prop="currency.info.ru">
                          <a-textarea :placeholder="$t('Информация на русском языке')" v-model="portfolio.currency.info.ru"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="expected_profit" :label="$t('Portfolio.create.expected_profit')" prop="expected_profit.expected_profit_text.ru">
                          <a-input :placeholder="$t('Значение на русском языке')" v-model="portfolio.expected_profit.expected_profit_text.ru" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="expected_profit" :label="$t(' ')" prop="expected_profit.min_number">
                          <a-input :placeholder="$t('min')" v-model="portfolio.expected_profit.min_number"/>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="expected_profit" :label="$t(' ')" prop="expected_profit.max_number">
                          <a-input :placeholder="$t('max')" v-model="portfolio.expected_profit.max_number"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="8">
                        <a-form-model-item :label="$t('Portfolio.create.advantage')" prop="advantage" :style="{'margin-bottom': portfolio.advantages.length ? `10px` : '3px'}">
                          <a-input
                            v-model="item.ru"
                            v-for="(item, index) in portfolio.advantages"
                            :key="index"
                            :placeholder="`'${item.en}' / '${item.ru}' / '${item.uz}'`"
                          >
                            <a-icon slot="addonAfter" type="delete" @click="onDeleteAdvantage(index)"/>
                          </a-input>
                        </a-form-model-item>
                        <a-row :span="4" style="margin-bottom: 30px" >
                          <a-button @click="onAddAdvantage()" >{{ $t('add') }}</a-button>
                        </a-row>
                      </a-col>
                    </a-row>
                    <p>{{ $t('Portfolio.create.goal') }}</p>
                    <a-row :gutter="8" v-for="(item, index) in portfolio.goals" :key="index" >
                      <a-col :span="8">
                        <a-form-model-item :label="$t('name')">
                          <a-input
                            v-model="item.goal_title.ru"
                            :placeholder="`'${item.goal_title.en}' / '${item.goal_title.ru}' / '${item.goal_title.uz}'`"
                          >
                            <a-icon slot="addonAfter" type="delete" @click="onDeleteGoal(index)"/>
                          </a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item :label="$t('Description')">
                          <a-textarea
                            v-model="item.goal_description.ru"
                            :placeholder="`'${item.goal_description.en}' / '${item.goal_description.ru}' / '${item.goal_description.uz}'`"
                          >
                          </a-textarea>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8" :class="{'disabled-upload': item.icon}" >
                        <a-form-model-item :label="$t('icon')">
                          <a-upload
                            :customRequest="(data) => uploadGoalIcon(data, index)"
                            list-type="picture-card"
                            :file-list="[item.icon]"
                            @preview="handlePreview"
                            @change="(data) => handleGoalIconChange(data, index)"
                          >
                            <div>
                              <a-icon :type="item.loading ? 'loading' : 'plus'" />
                              <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                            </div>
                          </a-upload>
                          <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                            <img :alt="previewImage" style="width: 100%" :src="previewImage" />
                          </a-modal>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="20" >
                      <a-col :span="4">
                        <a-button @click="onAddGoal()" >{{ $t('add') }}</a-button>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                  <a-tab-pane key="3" :tab="$t('Uzbek')">
                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="name" :label="$t('Portfolio.create.Title')" prop="title.uz">
                          <a-input :placeholder="$t('Название на узбекском языке')" v-model="portfolio.title.uz" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="description" :label="$t('Portfolio.create.Decription')" prop="description.uz">
                          <a-textarea :placeholder="$t('Oписание на узбекском языке')" v-model="portfolio.description.uz" size="large" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="disclaimer" :label="$t('Portfolio.create.Disclaimer')" prop="disclaimer.uz">
                          <a-textarea :placeholder="$t('Дисклеймер на узбекском языке')" v-model="portfolio.disclaimer.uz" size="large" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="learn_more_page" :label="$t(`Описание страницы 'Узнать больше'`)" prop="learn_more_page.description.uz">
                          <a-textarea :placeholder="$t(`Описание страницы 'Узнать больше' на узбекском языке`)" v-model="portfolio.learn_more_page.description.uz" size="large" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="diversification" :label="$t('Portfolio.create.diversification')" prop="diversification.uz">
                          <a-textarea :placeholder="$t('Дисклеймер на узбекском языке')" v-model="portfolio.diversification.uz" size="large" />
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="risk_assessment" :label="$t('Portfolio.create.risk_assessment')" prop="risk_assessment.value.uz">
                          <a-input :placeholder="$t('Значение на узбекском языке')" v-model="portfolio.risk_assessment.value.uz" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="risk_assessment" :label="$t(' ')" prop="risk_assessment.info.ru">
                          <a-textarea :placeholder="$t('Информация на узбекском языке')" v-model="portfolio.risk_assessment.info.uz"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="access_your_money" :label="$t('Portfolio.create.access_your_money')" prop="access_your_money.value.uz">
                          <a-input :placeholder="$t('Значение на узбекском языке')" v-model="portfolio.access_your_money.value.uz" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="access_your_money" :label="$t(' ')" prop="access_your_money.info.uz">
                          <a-textarea :placeholder="$t('Информация на узбекском языке')" v-model="portfolio.access_your_money.info.uz"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="deposit" :label="$t('Portfolio.create.deposit')" prop="deposit.value.uz">
                          <a-input :placeholder="$t('Значение на узбекском языке')" v-model="portfolio.deposit.value.uz" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="deposit" :label="$t(' ')" prop="deposit.info.uz">
                          <a-textarea :placeholder="$t('Информация на узбекском языке')" v-model="portfolio.deposit.info.uz"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="currency" :label="$t('Portfolio.create.currency')" prop="currency.value.uz">
                          <a-input :placeholder="$t('Значение на узбекском языке')" v-model="portfolio.currency.value.uz" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="currency" :label="$t(' ')" prop="currency.info.uz">
                          <a-textarea :placeholder="$t('Информация на узбекском языке')" v-model="portfolio.currency.info.uz"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-model-item ref="expected_profit" :label="$t('Portfolio.create.expected_profit')" prop="expected_profit.expected_profit_text.uz">
                          <a-input :placeholder="$t('Значение на узбекском языке')" v-model="portfolio.expected_profit.expected_profit_text.uz" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="expected_profit" :label="$t(' ')" prop="expected_profit.min_number">
                          <a-input :placeholder="$t('min')" v-model="portfolio.expected_profit.min_number"/>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item ref="expected_profit" :label="$t(' ')" prop="expected_profit.max_number">
                          <a-input :placeholder="$t('max')" v-model="portfolio.expected_profit.max_number"/>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="8">
                        <a-form-model-item :label="$t('Portfolio.create.advantage')" prop="advantage" :style="{'margin-bottom': portfolio.advantages.length ? `10px` : '3px'}">
                          <a-input
                            v-model="item.uz"
                            v-for="(item, index) in portfolio.advantages"
                            :key="index"
                            :placeholder="`'${item.en}' / '${item.ru}' / '${item.uz}'`"
                          >
                            <a-icon slot="addonAfter" type="delete" @click="onDeleteAdvantage(index)"/>
                          </a-input>
                        </a-form-model-item>
                        <a-row :span="4" style="margin-bottom: 30px" >
                          <a-button @click="onAddAdvantage()" >{{ $t('add') }}</a-button>
                        </a-row>
                      </a-col>
                    </a-row>

                    <p>{{ $t('Portfolio.create.goal') }}</p>
                    <a-row :gutter="8" v-for="(item, index) in portfolio.goals" :key="index" >
                      <a-col :span="8">
                        <a-form-model-item :label="$t('name')">
                          <a-input
                            v-model="item.goal_title.uz"
                            :placeholder="`'${item.goal_title.en}' / '${item.goal_title.ru}' / '${item.goal_title.uz}'`"
                          >
                            <a-icon slot="addonAfter" type="delete" @click="onDeleteGoal(index)"/>
                          </a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-model-item :label="$t('Description')">
                          <a-textarea
                            v-model="item.goal_description.uz"
                            :placeholder="`'${item.goal_description.en}' / '${item.goal_description.ru}' / '${item.goal_description.uz}'`"
                          >
                          </a-textarea>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="8" :class="{'disabled-upload': item.icon}" >
                        <a-form-model-item :label="$t('icon')">
                          <a-upload
                            :customRequest="(data) => uploadGoalIcon(data, index)"
                            list-type="picture-card"
                            :file-list="[item.icon]"
                            @preview="handlePreview"
                            @change="(data) => handleGoalIconChange(data, index)"
                          >
                            <div>
                              <a-icon :type="item.loading ? 'loading' : 'plus'" />
                              <div class="ant-upload-text">{{ $t('button.upload') }}</div>
                            </div>
                          </a-upload>
                          <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                            <img :alt="previewImage" style="width: 100%" :src="previewImage" />
                          </a-modal>
                        </a-form-model-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="20" >
                      <a-col :span="4">
                        <a-button @click="onAddGoal()" >{{ $t('add') }}</a-button>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                </a-tabs>
                <!-- <a-col :span="8">
                  <a-form-model-item :label="$t('Portfolio.create.Decription')" ref="description" prop="description">
                    <a-textarea :auto-size="{ minRows: 10, maxRows: 10 }" placeholder="запишите описание" v-model="portfolio.description"/>
                  </a-form-model-item>
                </a-col> -->
              </a-row>
            </a-card>
          </a-form-model>
        </a-col>
      </a-row>
    </a-card>
    <a-row class="edit-btns mt-4">
      <a-col span="24">
        <a-form-model-item>
          <a-row type="flex" justify="end">
            <a-col span="auto">
              <a-button @click="cancelPost" type="grey" style="margin-right: 6px">{{
                $t('button.cancel')
              }}</a-button>
              <a-button @click="postPortfolio" v-if="isNewForm" type="primary">{{ $t('button.create') }}</a-button>
              <a-button @click="updatePortfolio" v-else type="primary">{{ $t('button.save') }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import formRule from './formRules'
// import imageUpload from '@/mixins/imageUpload'
import debounce from 'lodash/debounce'
import request from '@/utils/request'

export default {
  // mixins: [imageUpload],
  data () {
    this.getCorporates = debounce(this.getCorporates, 100)
    return {
      activeKey: '1',
      fileList: [],
      monthList: [3, 6, 9, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120],
      previewImage: '',
      previewVisible: false,
      uploadingImage: false,
      strategyIconLoading: false,
      strategyIcon: '',
      strategyId: this.$route.params.id,
      fetching: false,
      advantageVal: undefined,
      corporateList: [],
      advantageList: [],
      octo_id: 0,
      octo_secret: '',
      paycom_id: '',
      paycom_key: '',
      corporateParams: {
        limit: 10,
        page: 1,
        total: null
      },
      isNewForm: false,
      portfolio: {
        address: '',
        annual_profit_rate: 0,
        corporate: '',
        advantages: [],
        expected_profit: {
        expected_profit_text: {
          en: '',
          ru: '',
          uz: ''
        },
        max_number: 0,
        min_number: 0
      },
        diversification: {
          ru: '',
          en: '',
          uz: ''
        },
        learn_more_page: {
          description: {
            en: '',
            ru: '',
            uz: ''
          }
        },
        goals: [],
        disclaimer: {
          ru: '',
          en: '',
          uz: ''
        },
        risk_assessment: {
          value: {
            ru: '',
            en: '',
            uz: ''
          },
          info: {
            ru: '',
            en: '',
            uz: ''
          }
        },
        access_your_money: {
          value: {
            ru: '',
            en: '',
            uz: ''
          },
          info: {
            ru: '',
            en: '',
            uz: ''
          }
        },
        deposit: {
          value: {
            ru: '',
            en: '',
            uz: ''
          },
          info: {
            ru: '',
            en: '',
            uz: ''
          }
        },
        currency: {
          value: {
            ru: '',
            en: '',
            uz: ''
          },
          info: {
            ru: '',
            en: '',
            uz: ''
          }
        },
        description: {
          ru: '',
          en: '',
          uz: ''
        },
        initial_percent_iman: null,
        max_investment_amount: null,
        min_investment_amount: null,
        min_reinvestment_amount: null,
        min_percent_iman: null,
        month_limits: [],
        photo: '',
        risk_type: '',
        status: '',
        title: {
          ru: '',
          en: '',
          uz: ''
        },
        value_by_mln: 0,
        value_by_month: 0,
        percent_by_month: 0,
        percent_by_mln: 0,
        weight_by_mln: 0,
        weight_by_month: 0
      },
      categories: [],
      rules: formRule
    }
  },

  methods: {
    async uploadImage (data) {
        this.uploadingImage = true
        const formData = new FormData()
        formData.append('file', data.file)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('uploadImage', formData).then(res => {
          console.log(res)
          this.fileList.push({
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
          })
        }).catch(err => console.log(err))
        .finally(() => {
          this.uploadingImage = false
        })
    },
    async uploadStrategyIcon (data) {
        this.strategyIconLoading = true
        const formData = new FormData()
        formData.append('file', data.file)
        const url = await this.$getBase64(data.file)
        this.$store.dispatch('uploadImage', formData).then(res => {
          this.strategyIcon = {
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
          }
        }).catch(err => console.log(err))
        .finally(() => {
          this.strategyIconLoading = false
        })
    },
    async uploadGoalIcon (data, index) {
      const formData = new FormData()
      formData.append('file', data.file)
      this.portfolio.goals[index].loading = true
      const url = await this.$getBase64(data.file)

      this.$store.dispatch('uploadImage', formData).then(res => {
        this.portfolio.goals[index].icon = {
            uid: res.filename,
            name: res.filename,
            status: 'done',
            url: url
          }
      }).catch(err => console.log(err))
        .finally(() => { this.portfolio.goals[index].loading = false })
    },
    handleChange ({ fileList, file }) {
      if (file.status === 'uploading') {
        return
      }
      this.fileList = fileList
      if (file.status === 'done') {
        this.fileList = fileList
      }
    },
    handleStrategyIconChange ({ fileList, file }) {
      if (file.status === 'uploading') {
        return
      }

      if (fileList?.length) {
        this.strategyIcon = fileList[0]
      } else {
        this.strategyIcon = ''
      }
    },
    handleGoalIconChange ({ fileList, file }, index) {
      if (file.status === 'uploading') {
        return
      }

      if (fileList?.length) {
        this.portfolio.goals[index].icon = fileList[0]
      } else {
        this.portfolio.goals[index].icon = ''
      }
    },
    async handlePreview (file) {
        if (!file.url && !file.preview) {
          file.preview = await this.$getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
    },
    callback (e) {
      this.activeKey = e
    },
    onDeleteAdvantage (index) {
      console.log('delete', index)
      this.portfolio.advantages.splice(index, 1)
    },
    onDeleteGoal (index) {
      this.portfolio.goals.splice(index, 1)
    },
    onAddAdvantage (lang) {
      // console.log(val, this.portfolio.advantages)
      if (!this.portfolio.advantages) {
        this.portfolio.advantages = []
      }
      const obj = {
        ru: '',
        en: '',
        uz: ''
      }
      this.portfolio.advantages.push(
        obj
      )
      // console.log('new val', val)
    },
    onAddGoal () {
      const description = {
        en: '',
        ru: '',
        uz: ''
      }

      const title = {
        en: '',
        ru: '',
        uz: ''
      }

      this.portfolio.goals.push({
        goal_description: description,
        goal_title: title,
        icon: '',
        loading: false
      })
    },
    getAdvantages () {
      this.fetching = true
      request({
        url: 'v1/advantages',
        method: 'get'
      })
      .then(response => {
        this.fetching = false
        this.advantageList.push(...response.advantages)
      })
      .catch(() => {
        this.fetching = false
      })
    },
    onScrollBottom (event) {
      var target = event.target
      if (!this.fetching && target.scrollTop + target.offsetHeight === target.scrollHeight) {
        if (this.corporateParams.total > this.corporateList.length) {
          this.corporateParams.page += 1
          this.corporateParams.lang = this.lang || 'ru'
          target.scrollTo(0, target.scrollHeight)
          this.getCorporates()
        }
      }
    },
    getCorporates () {
      this.fetching = true
      request({
        url: 'v1/corporates',
        method: 'get',
        params: this.corporateParams
      })
      .then(response => {
        this.fetching = false
        this.corporateList.push(...response.corporates)
        this.corporateParams.total = response.count
      })
      .catch(() => {
        this.fetching = false
      })
    },
    onKeydown (event) {
       if (!/[0-9]/.test(String.fromCharCode(event.keyCode)) && event.keyCode !== 8 && event.keyCode !== 190) {
         event.preventDefault()
      }
    },
    checkPost () {
      let flag = null
      this.$refs.ruleForm.validate((valid, values) => {
        if (valid) {
          flag = true
          return true
        } else {
          const firstErr = values[Object.keys(values)[0]][0].message
          this.$message.warning(firstErr)
          // console.log('Validation', valid, values, Object.keys(values))
          flag = false
          return false
        }
      })
      return flag
    },
    checkPostTitles () {
      let flag = true
      if (!this.portfolio.title.en) {
        flag = false
        this.activeKey = '1'
      } else if (!this.portfolio.description.en) {
        flag = false
        this.activeKey = '1'
      } else if (!this.portfolio.disclaimer.en) {
        flag = false
        this.activeKey = '1'
      } else if (!this.portfolio.title.ru) {
        flag = false
        this.activeKey = '2'
      } else if (!this.portfolio.description.ru) {
        flag = false
        this.activeKey = '2'
      } else if (!this.portfolio.disclaimer.ru) {
        flag = false
        this.activeKey = '2'
      } else if (!this.portfolio.title.uz) {
        flag = false
        this.activeKey = '3'
      } else if (!this.portfolio.description.uz) {
        flag = false
        this.activeKey = '3'
      } else if (!this.portfolio.disclaimer.uz) {
        flag = false
        this.activeKey = '3'
      }
      return flag
    },
    postPortfolio () {
      console.log('checkPostTitles', this.checkPostTitles())
      if (this.checkPost() === false && !this.checkPostTitles()) return -1
      this.$store.dispatch('postPortfolio', this.stringToInt()).then((res) => {
        console.log(res)
        this.$alertMessage('success', 'success', 'Strategy added successfully', this)
        this.$router.push('/strategy/list')
      }).catch(reject => {
        console.log(reject.response.data)
        this.$alertMessage('error', 'Произошла ошибка', '', this)
      })
    },
    getPortfolio (id) {
      this.$store.dispatch('getPortfolio', id).then((res) => {
        this.fileList = res.strategy?.learn_more_page?.photo?.map(item => {
          return { uid: item?.split('/').pop(), url: item, status: 'done', name: item?.split('/').pop() }
        }) ?? []
        // this.portfolio = { ...this.portfolio, max_investment_amount: 10000000 }

        const resStrategyIcon = res.strategy?.strategy_icon
        if (resStrategyIcon) {
          this.strategyIcon = {
            uid: resStrategyIcon?.split('/').pop(),
            name: resStrategyIcon?.split('/').pop(),
            status: 'done',
            url: resStrategyIcon
          }
        }

        console.log('STRATEGY ===>', this.strategyIcon)

        this.portfolio = {
          ...this.portfolio,
          ...res.strategy,
          diversification: res.strategy?.diversification ?? this.portfolio.diversification,
          risk_assessment: res.strategy?.risk_assessment ?? this.portfolio.risk_assessment,
          access_your_money: res.strategy?.access_your_money ?? this.portfolio.access_your_money,
          deposit: res.strategy?.deposit ?? this.portfolio.deposit,
          expected_profit: res.strategy?.expected_profit ?? this.portfolio.expected_profit,
          currency: res.strategy?.currency ?? this.portfolio.currency,
          learn_more_page: {
            ...this.portfolio,
            description: res.strategy?.learn_more_page?.description ?? this.portfolio.description
          },
          goals: res.strategy?.goals?.map(goal => ({
            ...goal,
            icon: goal.icon ? { uid: goal.icon.split('/').pop(), url: goal.icon, status: 'done', name: goal.icon?.split('/').pop() } : '',
            loading: false
          }))
        }
        this.portfolio.corporate = this.portfolio.corporate && this.portfolio.corporate.id || ''
      }).catch(reject => {
        console.log(reject.response && reject.response.data)
        if (reject && reject.response) {
          this.$alertMessage(reject && reject.response && reject.response.data.message)
        }
      })
    },
    stringToInt () {
      console.log('VALUES ===>', this.portfolio)
      return {
        ...this.portfolio,
        max_investment_percent_limit: parseInt(this.portfolio.max_investment_percent_limit),
        min_investment_amount: parseInt(this.portfolio.min_investment_amount),
        expected_profit: {
          ...this.portfolio.expected_profit,
          max_number: parseInt(this.portfolio.expected_profit.max_number),
          min_number: parseInt(this.portfolio.expected_profit.min_number)
        },
        octo_id: parseInt(this.portfolio.octo_id),
        month_limits: this.portfolio.month_limits.sort((a, b) => a - b),
        learn_more_page: {
          ...this.portfolio.learn_more_page,
          photo: this.fileList.map(item => {
            return item.uid || this.portfolio.file_name
          })
        },
        strategy_icon: this.strategyIcon?.uid ?? null,
        category: this.portfolio.category,
        goals: this.portfolio.goals?.map(goal => ({
          ...goal,
          icon: goal?.icon?.name
        }))
      }
    },
    updatePortfolio () {
      console.log('checkPostTitles', this.checkPostTitles())
      if (this.checkPost() === false && !this.checkPostTitles()) return -1
      this.$store.dispatch('updatePortfolio', this.stringToInt()).then((res) => {
        this.$message.success('Strategy has Успешно обновлено')
        this.$router.go(-1)
      }).catch(reject => {
        console.log(reject.response.data)
        if (reject && reject.response) {
          this.$message.warning(reject.response.data.message)
        }
      })
    },
    cancelPost () {
      this.$router.go(-1)
    }
  },
  created () {
    if (this.$isEmptyObj(this.$route.params)) {
      this.isNewForm = true
    } else {
      this.getPortfolio(this.$route.params.id)
    }
    this.getCorporates()
    this.getAdvantages()
    // this.getCategories()
  },
  watch: {
    fileList (val) {
      console.log('FILEssLIST ===>', val)
    }
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

.disabled-upload {

  .ant-upload-select-picture-card {
    display: none;
  }
}

</style>
