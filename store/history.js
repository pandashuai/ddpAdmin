/*
 *
 * 公告数据状态
 *
 */
import Service from '~/plugins/axios';
export const state = () => {
    return {
        root: false,
        data: { data: [], pagination: {} }
    }
}

export const mutations = {
    EDIT_ROOT_STATUS(state, status) {
        state.root = status
    },
    GET_LIST_SUCCESS(state, action) {
        state.root = true
        state.data = action.result;
    },
    GET_LIST_FAILURE(state) {
        state.root = true
        state.data = { data: [], pagination: {} }
    }
}

export const actions = {
    // 列表
    async lists({ commit }, params = { per_page: 1000 }) {
        commit('EDIT_ROOT_STATUS', false);
        try {
            let res = await Service.get('/history/lists', { params })
            if (res.data && res.data.code === 1) {
                commit('GET_LIST_SUCCESS', res.data)
            } else if (res.data && res.data.code === 2) {
                commit('EDIT_ROOT_STATUS', false)
            } else {
                commit('GET_LIST_FAILURE')
            }
        } catch (err) {
            commit('GET_LIST_FAILURE')
        }
    },
    // 删除
    async del({ commit }, params) {
        try {
            return await Service.post('/history/del', params);
        } catch (err) {
            return { err }
        }
    }
}