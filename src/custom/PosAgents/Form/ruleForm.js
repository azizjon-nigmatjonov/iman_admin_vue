export default {
    'first_name': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
    'last_name': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
    'merchant_branches1': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
    'patronymic': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'blur' }],
    'phone_number': [{ required: true, message: 'Пожалуйста, заполните поле', trigger: 'change' }],
    'merchant_branches': [{ required: true, type: 'array', message: 'Пожалуйста, заполните поле', trigger: 'blur' }]
}
