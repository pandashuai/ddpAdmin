// 公共配置

export const state = () => {
    return {
        // 控制菜单栏的布局状态
        isSide: false,
        // 移动端布局
        mobileLayout: false,
        // 加载样式
        loadingStyle: { text: '加载中。。。', background: 'rgba(2, 32, 63, 0.5)' }
    }
};
// export const getters = {
//     mobileLayout: state => state.mobileLayout
// }
export const mutations = {
    // 修改菜单栏布局状态
    EDIT_ISSIDE_STATUS(state, status) {
        state.isSide = status
    },
    // 设置移动端状态
    SET_MOBILE_LAYOUT(state, status) {
        state.mobileLayout = status
    }
}