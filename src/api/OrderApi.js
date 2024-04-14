import axios from 'axios'
import Http from './Http.js';
import {formatDate} from '@/assets/js/util.js';
import {SERVER_HOST, orderStatus} from '@/config.js'

class OrderApi extends Http {
    list(options) {
        return new Promise((resolve, reject) => {
            axios.all([this._listByPagination(options), this._paginationTotal(options)])
                .then(axios.spread(function (list, total) {
                    const ret = {
                        list,
                        total
                    };
                    resolve(ret)
                }))
                .catch(err => { reject(err) })
        });
    }
    _listByPagination(options) {
        return new Promise((resolve, reject) => {
            this.$get(`${SERVER_HOST}api/order`, options).then(d => {
                for (let i = 0, iLen = d.length; i < iLen; i++) {
                    d[i].CreateTime = formatDate(new Date(d[i].CreateTime*1000), 'yyyy-MM-dd hh:mm');
                    const details = d[i].Details;
                    const productName = Object.keys(details);
                    d[i].ProductName = productName[0] == 'default' ? 'Ec cube' : '';
                    d[i].Quantity = details[productName];
                    d[i].StatusText = orderStatus[d[i].Status] ? orderStatus[d[i].Status]['label'] : '';
                    d[i].StatusDesc = orderStatus[d[i].Status] ? orderStatus[d[i].Status]['desc'] : '';
                }
                resolve(d);
            }).catch(e => {
                reject(e);
            });
        });
    }
    _paginationTotal(options) {
        options.data = Object.assign({}, options.data, {
            pagenum: undefined,
            pagesize: undefined
        });
        return new Promise((resolve, reject) => {
            this.$get(`${SERVER_HOST}api/order`, options).then(d => {
                resolve(d.length);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

export default new OrderApi();
