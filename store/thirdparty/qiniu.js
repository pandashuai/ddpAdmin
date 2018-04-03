import Service from '~/plugins/axios';

export const state = () => {
    return {
        root: false,
        data: { list: [], dir: [] }
    }
}

export const mutations = {
    EDIT_ROOT_STATUS(state, status) {
        state.root = status
    },
    GET_LIST_SUCCESS(state, action) {
        state.root = true
        state.data.list = action.result.items;
        state.data.dir = action.result.commonPrefixes || [];
    },
    GET_LIST_FAILURE(state) {
        state.root = true
        state.data = { list: [], dir: [] }
    }
}

export const actions = {
    // 获取
    async uptoken({ commit }, params = {}) {
        try {
            return await Service.get('/thirdparty/qiniu/uptoken', params);
        } catch (err) {
            return { err }
        }
    },
    // 列表
    async lists({ commit }, params) {
        commit('EDIT_ROOT_STATUS', false);
        try {
            let res = await Service.get('/thirdparty/qiniu/lists', { params })
            if (res.data && res.data.code === 1) {
                commit('GET_LIST_SUCCESS', res.data)
            } else if (res.data && res.data.code === 2) {
                commit('EDIT_ROOT_STATUS', false)
            } else {
                commit('GET_LIST_FAILURE')
            }
            return res
        } catch (err) {
            commit('GET_LIST_FAILURE')
        }
    },
    // 删除
    async del({ commit }, params) {
        try {
            return await Service.post('/thirdparty/qiniu/del', params);
        } catch (err) {
            return { err }
        }
    }
}