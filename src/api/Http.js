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
    $get(url, paramObj) {
        return new Promise((resolve, reject) => {
            axios.get(url, {params: paramObj}).then(response => {
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
}
