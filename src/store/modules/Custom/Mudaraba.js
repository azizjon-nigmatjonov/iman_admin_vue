import request from '@/utils/request'
import moment from 'moment'
const customUrl = 'v1/claims'
const mudaraba = {
    state: {
        claimsParams: {
            page: 1,
            limit: 10,
            status: '',
            type: 'cash_in'
        }
    },
    getters: {
        claimsParams: state => state.claimsParams
    },
    mutations: {
        SET_CLAIMS_PAGINATION (state, params) {
            state.claimsParams = params
        }
    },
    actions: {
        getMudarabaApplications ({ commit }, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: customUrl,
                    method: 'get',
                    params
                })
                .then(result => {
                    const newParams = { ...params }
                    newParams.total = result.count
                    newParams.showQuickJumper = true
                    commit('SET_CLAIMS_PAGINATION', newParams)
                    resolve(result)
                })
                .catch(error => {
                reject(error)
                })
            })
        },
        getApplicationsDetail ({ commit }, { params, id }) {
            return new Promise((resolve, reject) => {
                request({
                    url: `${customUrl}/${id}`,
                    method: 'get',
                    params
                })
                .then(result => {
                resolve(result)
                })
                .catch(error => {
                reject(error)
                })
            })
        },
        getStatuses ({ commit }, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/claim-statuses`,
                    method: 'get',
                    params
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getPaymentTypes ({ commit }, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/claim-payment-types`,
                    method: 'get',
                    params
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        sendApplicationToNextStatus (_, { data, id }) {
            return new Promise((resolve, reject) => {
                request({
                    url: `${customUrl}/${id}/change-status`,
                    method: 'put',
                    data: data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        setApplicationPaymentType (_, { data, id }) {
            return new Promise((resolve, reject) => {
                request({
                    url: `${customUrl}/${id}/change-payment-type`,
                    method: 'put',
                    data: data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getClosedMonths (_, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/claim-payment-types`,
                    method: 'get',
                    params
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getNotifications (_, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/notification/get-all-news`,
                    method: 'get',
                    params
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getNotificationDetail (_, id) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/notification/get-news/${id}`,
                    method: 'get'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        deleteNotification (_, id) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/notification/delete-news/${id}`,
                    method: 'delete'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        sendNotificationToInvestors (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/notification/send-to-all`,
                    method: 'post',
                    data: data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        sendNotification (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/investor-segmentation`,
                    method: 'post',
                    data: {
                        title: data.title
                    },
                    params: {
                        status: data.status,
                        start_date: data.date[0] ? moment(data.date[0]).format('YYYY-MM-DD') : null,
                        end_date: data.date[1] ? moment(data.date[1]).format('YYYY-MM-DD') : null
                    }
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getStories (_, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/stories/get-all-stories`,
                    method: 'get',
                    params
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        deleteStories (_, id) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/stories/delete-stories/${id}`,
                    method: 'delete'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getStoriesDetail (_, id) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/stories/get-stories/${id}`,
                    method: 'get'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        sendStories (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/stories/send-to-all`,
                    method: 'post',
                    data: data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getClaimCardByID (_, { id, params }) {
            return request({
                url: `v1/claim-card/${id}`,
                method: 'get',
                params
            })
        },
        getAdviceCategories (_, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/advices/get-parent-categories`,
                    method: 'get',
                    params
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getCategoryDetail (_, id) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/get-category-by-id/${id}`,
                    method: 'get'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        deleteAdviceCategory (_, id) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/delete-category/${id}`,
                    method: 'delete'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        createAdviceCategory (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/create-category`,
                    method: 'post',
                    data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        updateAdviceCategory (_, { data, id }) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/update-category/${id}`,
                    method: 'patch',
                    data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getAdviceSubcategories (_, { categoryId, params }) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/get-subcategories-by-id/${categoryId}`,
                    method: 'get',
                    params
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getAdviceSubcategoryDetail (_, id) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/get-subcategory-by-id/${id}`,
                    method: 'get'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        createAdviceSubcategory (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/create-subcategory`,
                    method: 'post',
                    data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        updateAdviceSubcategory (_, { data, id }) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/update-subcategory/${id}`,
                    method: 'patch',
                    data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        deleteAdviceSubcategories (_, id) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/delete-subcategory/${id}`,
                    method: 'delete'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getAdvicesList (_, { subcategoryId, params }) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/get-advices-by-subcategory/${subcategoryId}`,
                    method: 'get',
                    params
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getAdviceDetail (_, id) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/get-advice/${id}`,
                    method: 'get'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        createAdvice (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/create-advice`,
                    method: 'post',
                    data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        updateAdvice (_, { data, id }) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/update-advice/${id}`,
                    method: 'patch',
                    data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        deleteAdvice (_, id) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/delete-advice/${id}`,
                    method: 'delete'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        updateCategoriesOrder (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/edit-advice-category-sorted`,
                    method: 'patch',
                    data: { data }
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        updateActualAdviceOrder (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/edit-actual-advice-sorted`,
                    method: 'patch',
                    data: { data }
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        updateSubcategoriesOrder (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/edit-advice-subcategory-sorted`,
                    method: 'patch',
                    data: { data }
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        updateAdvicesOrder (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/edit-advice-sorted`,
                    method: 'patch',
                    data: { data }
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getActualAdvices (_, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/get-actual-advices`,
                    method: 'get',
                    params
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        updateActualAdviceProp (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/advices/update-actual-advice`,
                    method: 'patch',
                    data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        // stocks
        deleteStock (_, guid) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/stock/delete-stock/${guid}`,
                    method: 'delete'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        postStock (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/stocks/create-stock`,
                    method: 'post',
                    data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getStocks (_, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/stocks/get-all-stocks`,
                    method: 'get',
                    params
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getStock (_, guid) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/stocks/get-stock-by-id/${guid}`,
                    method: 'get'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        putStock (_, { id, data }) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/stocks/update-stock/${id}`,
                    method: 'put',
                    data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getAppController (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/app-controller`,
                    method: 'get'
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        updateAppController (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `/v1/app-controller`,
                    method: 'put',
                    data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        }
    }
}
  export default mudaraba
