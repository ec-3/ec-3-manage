import * as types from './mutations_type.js'

const mutations = {
    [types.SET_APP](state, obj) {
        state.__app__ = obj
    },

    [types.SET_APP_TOKEN](state, token) {
        state.__app_token__ = token
    },
}

export default mutations
