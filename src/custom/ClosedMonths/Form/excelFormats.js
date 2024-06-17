const excelFormats = {
  closedMonth_2: {
    columns: ['number', 'investor_name', 'investor_id', 'period', 'dividend_payment', 'investment_amount', 'payment_amount', 'bank_requisite.card_number', 'bank_requisite.bank_name', 'bank_requisite.mfo', 'bank_requisite.transit_account', 'bank_requisite.inn'],
    header: [[
      {
        value: 'No',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Ф.И.О инвестора',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Идентификатор инвестора',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Период',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Дивиденды к выплате (сум)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Вывод доли (сум)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Сумма (сум)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Банковские реквизиты',
        frowSpan: 1,
        span: 5
      },
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    [
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: 'Номер карты'
      },
      {
        value: 'Наименование банка'
      },
      {
        value: 'МФО'
      },
      {
        value: 'Транзитный счёт'
      },
      {
        value: 'ИНН банка'
      }
    ]]
  },
  closedMonth_1: {
    columns: ['number', 'column_A', 'investor_object_id', 'column_D', 'column_E', 'column_F', 'column_G', 'column_H', 'column_I', 'column_J', 'column_K', 'column_L', 'column_M', 'column_N', 'column_P', 'column_Q', 'column_R', 'column_S', 'column_T', 'previous_dividend', 'column_V', 'column_W', 'month_limit'],
    header: [[
      {
        value: 'No',
        rowSpan: 2,
        span: 1
      },
      {
        value: '',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Идентификатор инвестора',
        rowSpan: 2,
        span: 1
      },
      {
        value: '',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Сумма',
        rowSpan: 2,
        span: 1
      },
      {
        value: '% в УК (всего)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Доля Инвестора (с учетом партенерства)',
        rowSpan: 2,
        span: 1
      },
      {
        value: '% в партнерстве Инвестор',
        rowSpan: 2,
        span: 1
      },
      {
        value: '% в партнерстве (ООО)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'РП по % в УК (всего)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Прыбиль до налогов (ООО)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'РП  по % в УК + по % в Партнерстве до IRR (для инвестора)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Резерв Обесценения (IRR)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Прибыль до налогов (инвестор)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Сумма налога от дивидендов',
        rowSpan: 2,
        span: 3
      },
      {
        value: '',
        rowSpan: 2,
        span: 1
      },
      {
        value: '',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Прибыль после налогов (инвестор)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Прибыль после налогов (ООО)',
        rowSpan: 2,
        span: 1
      },
      {
        value: 'Дивиденды',
        rowSpan: 1,
        span: 3
      },
      {
        value: '',
        rowSpan: 1,
        span: 1
      },
      {
        value: '',
        rowSpan: 1,
        span: 1
      },
      {
        value: 'Месячный лимит',
        rowSpan: 2,
        span: 1
      }
  ],
  [
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: ''
    },
    {
      value: 'Предыдущие'
    },
    {
      value: 'К выплате'
    },
    {
      value: 'К капитализации'
    },
    {
      value: ''
    }
]]
  },
  closedMonth_3: {
    columns: ['number', 'name', 'investor_id', 'type', 'month_limit', 'column_A', 'column_B', 'column_C', 'column_D', 'column_E', 'column_F', 'column_G', 'column_H', 'column_I', 'column_J', 'column_K'],
    header: [
      [
        {
          value: 'No'
        },
        {
          value: 'Наименовие Ф.И.О участника'
        },
        {
          value: 'Идентификатор инвестора'
        },
        {
          value: 'Тип инвестора'
        },
        {
          value: 'Месячный лимит'
        },
        {
          value: 'Номинальная стоимость доли (сум)'
        },
        {
          value: 'Размер доли в УФ %'
        },
        {
          value: 'Сумма причитающейся прыбилы'
        },
        {
          value: 'Сумма прыбыли, получаемая в виде дивидендов'
        },
        {
          value: 'Сумма прыбыли, направляемая на увелечения УФ'
        },
        {
          value: 'Новые инвестиции в УФ (сум)'
        },
        {
          value: 'Номинальная стоимость доли новый размер'
        },
        {
          value: 'Размер доли в УФ (Новый размер)'
        },
        {
          value: 'Новая доля инвестора (с учётом партнёрства)'
        },
        {
          value: '% в партнёрстве инвестор'
        },
        {
          value: '% партнёрства IMAN'
        }
      ]
    ]
  }
}

export default excelFormats
