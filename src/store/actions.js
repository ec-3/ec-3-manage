import * as types from './mutations_type.js'
import { setAppCache } from './cache.js'

export const setApp = function ({commit, state}, obj) {
    const { token } = obj
    commit(types.SET_APP, setAppCache(obj));
    commit(types.SET_APP_TOKEN, token);
}
