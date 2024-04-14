import axios from 'axios';

axios.defaults.timeout = 60000

const POST_CONFIG = {
    method: 'POST',
    transformRequest: [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }],
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    timeout: 90 * 1000
};

export default class Http {
    constructor() {

    }
    $get(url, options) {
        options = options || {};
        const headers = options.headers;
        const params = options.data;
        return new Promise((resolve, reject) => {
            axios.get(url, {headers, params}).then(response => {
                if (response.status === 200) {
                    resolve(response.data)
                } else {
                    reject(response.status + ',' + response.statusText)
                }
            }).catch(err => {
                if (err.response) {
                    if (err.response.data) {
                        reject(err.response.data);
                        return;
                    }
                    reject(err.response.status + ',' + err.response.statusText);
                    return;
                } else {
                    reject(err);
                }
            })
        });
    }
    $post(url, paramObj) {
        return new Promise((resolve, reject) => {
            axios(Object.assign({}, POST_CONFIG, {
                url: url,
                data: paramObj
            })).then((response) => {
                resolve(response)
            }).catch(err => {
                if (err.response) {
                    reject(err.response.status + ', ' + err.response.statusText)
                    return
                }

                let str = err.toString()
                reject(str.includes('timeout') ? 'Network timeout, please retry later.' : str)
            })
        });
    }
    $postJson(url, data, config) {
        config = config || {
            headers: {'Content-Type': 'application/json'},
            timeout: 90 * 1000
        };
        return new Promise((resolve, reject) => {
            axios.post(url, data, config).then((response) => {
                if (response.status === 200) {
                    resolve(response.data)
                } else {
                    reject(response.status + ',' + response.statusText)
                }
                resolve(response)
            }).catch(err => {
                if (err.response) {
                    if (err.response.data) {
                        reject(err.response.data);
                        return;
                    }
                    reject(err.response.status + ',' + err.response.statusText)
                    return
                }
                if (err.message) {
                    reject(err.message)
                }
                let str = err.toString()
                reject(str.includes('timeout') ? 'Network timeout, please retry later.' : str)
            })
        });
    }
}
