import Cookies from 'js-cookie';
// import AWS from 'aws-sdk'

const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus')
            ? !!+Cookies.get('sidebarStatus')
            : true,
        withoutAnimation: false
    },
    device: 'desktop',
    language: "tai",
    size: Cookies.get('size') || 'medium',
    metaData: {}
}

const mutations = {
    TOGGLE_SIDEBAR: (state) => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    SET_LANGUAGE: (state, language) => {
        state.language = language
        Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
        state.size = size
        Cookies.set('size', size)
    },
};

const actions = {
    setLanguage({ commit }, language) {
        commit('SET_LANGUAGE', language);
    },
    closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
        commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
        commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
        commit('SET_SIZE', size)
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
