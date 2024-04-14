import {getCacheItem, setCacheItem, removeCacheItem} from '@/assets/js/util.js'

const CACHE_NAME_APP = 'EC3_manage'

export function setAppCache(obj) {
    setCacheItem(CACHE_NAME_APP, obj)
    return obj
}
export function setAppItemCache(key, value) {
    let appCache = getCacheItem(CACHE_NAME_APP);
    if (appCache == null) {
        appCache = {};
    }
    appCache[key] = value;
    setCacheItem(CACHE_NAME_APP, appCache);
    return value;
}
export function getAppCache() {
    return getCacheItem(CACHE_NAME_APP);
}
export function getAppItemCache(key) {
    let appInfo = getCacheItem(CACHE_NAME_APP)
    if (appInfo != null) {
        return appInfo[key] || null;
    }
    return null;
}
export function removeAppCache() {
    removeCacheItem(CACHE_NAME_APP)
    return null;
}
