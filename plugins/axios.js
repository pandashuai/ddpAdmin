import Vue from 'vue'
import axios from 'axios'
import apiConfig from '~/api.config'
import { Notification, Loading } from 'element-ui';
import Logc from '~/plugins/logc.js'
const service = axios.create({ baseURL: apiConfig.baseUrl });
let loading = false;
// 拦截器
service.interceptors.request.use(async config => {
    loading = Loading.service({ text: '加载中。。。', background: 'rgba(2, 32, 63, 0.5)' });
    config.headers = {
        authorization: `pandashuai ${apiConfig.token || Logc.cookie.get('ddp_token')}`
    }
    return config
}, error => {
    loading && loading.close();
    return Promise.reject(error)
});
service.interceptors.response.use(res => {
    loading && loading.close();
    const method = ['post', 'delete', 'put', 'patch']
    if (method.indexOf(res.config.method) != '-1') {
        if (res.data && res.data.code !== 3) {
            if (res.data && res.data.code === 2) {
                Notification({
                    title: '错误',
                    message: res.data.message,
                    type: 'error'
                });
            } else {
                Notification({
                    title: res.data.code === 0 ? '错误' : '成功',
                    message: res.data.message,
                    type: res.data.code === 0 ? 'error' : 'success'
                });
            }
        }
    }
    return res
}, error => {
    loading && loading.close();
    return Promise.reject(error)
});
Vue.prototype.$http = axios
Vue.prototype.$axios = service
export default service