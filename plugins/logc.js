import Vue from 'vue';
import api from '~/api.config.js'
let logc = {};

logc.noSpace = (val) => {
    return (val || '').replace(/(^\s+|\s+$)/g, '');
}
logc.qnUrl = api.qnUrl;
logc.baseUrl = api.baseUrl;
logc.blogUrl = api.blogUrl;
logc.cookie = {
    get(name, datas = '') {
        if (process.browser) {
            datas = document.cookie
        }
        if (!datas) {
            return '';
        }
        const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
        let arr = datas.match(reg);
        if (arr && arr[2]) {
            return unescape(arr[2]);
        }
        return '';
    },
    set(key, value) {
        if (!key) {
            return false
        }
        if (process.browser) {
            if (value) {
                document.cookie = `${key}=${value}`;
                return true;
            } else {
                const exp = new Date();
                exp.setTime(exp.getTime() - 1);
                value = logc.cookie.get(key) || '';
                document.cookie = `${key}=${value};expires=${exp.toGMTString()}`;
            }
        }
        return false
    }
};


Vue.prototype.$logc = logc;
export default {
    cookie: logc.cookie
}