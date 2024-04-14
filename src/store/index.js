import {createStore, createLogger} from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import * as getters from './getters.js'
import * as actions from './actions.js'

const debug = false

export default createStore({
    state,
    mutations,
    getters,
    actions,
    plugins: debug ? [createLogger()] : [],
    strict: false
})

