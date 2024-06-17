const financeExcelFormats = {
  columns: ['created_at', 'date_at', 'subconto_debit', 'subconto_credit', 'account_from.account_number', 'account_to.account_number', 'debit_operation.name', 'credit_operation.name', 'amount', 'description'],
  header: [[
    {
      value: 'Дата создания'
    },
    {
      value: 'Дата'
    },
    {
      value: 'Субконто Дт'
    },
    {
      value: 'Субконто Кт'
    },
    {
      value: 'Cчет Дт'
    },
    {
      value: 'Cчет Кт'
    },
    {
      value: 'Операция Дт'
    },
    {
      value: 'Операция Кт'
    },
    {
      value: 'Сумма'
    },
    {
      value: 'Описание'
    }
  ]]

}

export default financeExcelFormats
