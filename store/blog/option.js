import Service from '~/plugins/axios';

export const state = () => {
    return {
        data: {
            meta: {
                likes: 0
            },
            links: [],
            keywords: [],
            blacklist: {
                ips: [],
                mails: [],
                keywords: []
            },
            ping_sites: []
        }
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
        state.data = {
            meta: {
                likes: 0
            },
            keywords: [],
            blacklist: {
                ips: [],
                mails: [],
                keywords: []
            },
            links: [],
            ping_sites: []
        }
    }
}
export const actions = {
    // 列表
    async lists({ commit }, params) {
        commit('EDIT_ROOT_STATUS', false);
        try {
            let res = await Service.get('/blog/option/lists', { params })
            if (res.data && res.data.code === 1) {
                if (Object.keys(res.data.result).length) {
                    commit('GET_LIST_SUCCESS', res.data)
                } else {
                    commit('GET_LIST_FAILURE')
                }
            } else if (res.data && res.data.code === 2) {
                commit('EDIT_ROOT_STATUS', false)
            } else {
                commit('GET_LIST_FAILURE')
            }
        } catch (err) {
            commit('GET_LIST_FAILURE')
        }
    },
    // 编辑
    async edit({ commit }, params) {
        try {
            return await Service.post('/blog/option/edit', params);
        } catch (err) {
            return { err }
        }
    }
}