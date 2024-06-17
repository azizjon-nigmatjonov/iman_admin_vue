const innValidator = function (rule, value, callback) {
  if (value.length === 9) {
    callback()
  } else {
    callback(new Error('Неверный ИНН'))
  }
}
// const discountValidator = function (rule, value, callback) {
//   if (value !== 0) {
//     callback()
//   } else {
//     callback(new Error('Скидка должна быть больше 0'))
//   }
// }
export default {
  'name': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'phone_number': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'address.city': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'address.country': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'email': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'address.title': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'requisite.account_number': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'requisite.bank_name': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'requisite.inn': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }, {
    validator: innValidator,
    trigger: 'change'
  }],
  'requisite.legal_address': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'requisite.mfo_code': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  // 'requisite.swift': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  // 'director.FirstName': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  // 'director.LastName': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  // 'director.PhoneNumber': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'contract.started_at': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'contract.expired_at': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  'contract.number': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
  // 'discount': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }, { validator: discountValidator, trigger: 'change' }],
  'type_id': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }]
}
