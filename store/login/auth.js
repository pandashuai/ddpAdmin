/*
 *
 * login数据状态
 *
 */
import Service from '~/plugins/axios';
import apiConfig from '~/api.config'
export const state = () => {
    return {
        // 判断是否登录，默认不登录
        root: false,
        data: {},
        token: ''
    }
}

export const mutations = {
    EDIT_TOKEN(state, action) {
        state.token = action
    },
    GET_LIST_SUCCESS(state, action) {
        state.root = true
        state.data = action.result;
    },
    GET_LIST_FAILURE(state, param) {
        state.root = param
        state.data = {}
    }
}

export const actions = {
    async root({ commit }, param) {
        try {
            apiConfig.token = param
            let res = await Service.post('/auth', {});
            if (res.data && res.data.code === 3) {
                commit('GET_LIST_SUCCESS', res.data)
            } else {
                apiConfig.token = '';
                commit('GET_LIST_FAILURE', false)
            }
        } catch (err) {
            commit('GET_LIST_FAILURE', false)
        }
    },
    async reRoot({ commit }, status) {
        commit('GET_LIST_FAILURE', status)
    },
    async login({ commit }, param) {
        try {
            let res = await Service.post('/login', param);
            if (res.data && res.data.code === 3) {
                return res.data.result.token
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    }
}