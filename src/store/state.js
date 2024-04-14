import { getAppCache, getAppItemCache } from './cache.js'

const state = {
    /** app 传入的信息token、其他信息 **/
    __app__: getAppCache(),
    __app_token__: getAppItemCache('token'),
}

export default state
