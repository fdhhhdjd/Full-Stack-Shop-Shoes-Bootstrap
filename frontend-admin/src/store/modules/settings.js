import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import { getSetting, setSetting } from '@/utils/auth'

const {
    showSettings,
    showMySettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
    supportPinyinSearch
} = defaultSettings

const state = {
    theme: variables.theme,
    showSettings,
    showMySettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
    supportPinyinSearch
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }

        setSetting(state)
    },
    LOAD_SETTING: (state) => {
        const setting = getSetting()

        if (setting) {
            for (const key in setting) {
                // eslint-disable-next-line no-prototype-builtins
                if (setting.hasOwnProperty(key)) {
                    state[key] = setting[key]
                }
            }
        }
    }
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    },
    loadSetting({ commit }) {
        commit('LOAD_SETTING')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
