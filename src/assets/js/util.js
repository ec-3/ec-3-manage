import { Base64 } from 'js-base64'

/** 获得URL参数 **/
export function getUrlString(name) {
    return decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/** 获得sessionStorage缓冲 **/
export function getCacheItem (key) {
    let value
    try {
        value = sessionStorage.getItem(key);
        if (value != null) {
            value = JSON.parse(Base64.decode(value))
        }
    } catch (ex) {
        if (process.env.NODE_ENV === 'development') {
            console.error('sessionStorage.getItem报错, ', ex.message)
        }
    } finally {
        return value;
    }
}

/** 设置sessionStoragee缓冲 **/
export function setCacheItem (key, value) {
    try {
        sessionStorage.setItem(key, Base64.encode(JSON.stringify(value)))
    } catch (ex) {
        if (process.env.NODE_ENV === 'development') {
            console.error('sessionStorage.setItem报错, ', ex.message)
        }
    }
}

export function removeCacheItem(key) {
    try {
        sessionStorage.removeItem(key);
    } catch (ex) {
        if (process.env.NODE_ENV === 'development') {
            console.error('sessionStorage.removeItem Error, ', ex.message);
        }
    }
}

export function debounce(func, delay) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}


/**
 * 使用方式 formatDate(new Date(1602604800000), 'yyyy-MM-dd hh:mm')
 * **/
export function formatDate(date, formatStr) {
    if (/(y+)/.test(formatStr)) {
        formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let obj = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in obj) {
        if (new RegExp(`(${k})`).test(formatStr)) {
            let str = obj[k] + '';
            formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return formatStr;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

