export const actions = {
    // 全局服务初始化
    nuxtServerInit(store, { params, route, req }) {
        // 检查设备类型
        const userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent;
        const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent);
        store.commit('option/SET_MOBILE_LAYOUT', isMobile)
        store.commit('option/EDIT_ISSIDE_STATUS', isMobile)
    }
}