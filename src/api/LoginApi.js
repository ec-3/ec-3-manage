import Http from './Http.js'

class LoginApi extends Http {
    getAccessToken(data) {
        return this.$postJson('https://cube-management.azurewebsites.net/.auth/login/google', data)
    }
}

export default new LoginApi();
