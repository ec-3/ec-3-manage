import Http from './Http.js'

class OrderApi extends Http {
    list(data) {
        return this.$get('https://cube-management.azurewebsites.net/api/order', data)
    }
}

export default new OrderApi();
