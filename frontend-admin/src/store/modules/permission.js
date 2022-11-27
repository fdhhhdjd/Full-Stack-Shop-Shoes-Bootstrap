import router, { asyncRoutes, constantRoutes, resetRouter } from '@/router'
import { getID, getToken, setToken, removeToken } from '@/utils/auth'
import axios from 'axios'
import CONSTANTS from '@/utils/constants'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles && roles instanceof Array && roles.length > 0) {
        return roles.some((role) => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach((route) => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    token: getToken(),
    id: getID(),
    name: '',
    avatar: '',
    roles: [],
    routes: [],
    addRoutes: [],
    renewPool: [],
    role: ''
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    },
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_RENEW_POOL: (state, args) => {
        state.renewPool.push(args.request)
        const result = state.renewPool
        args.callback(result)
    },
    CLEAR_RENEW_POOL: (state, callback) => {
        const result = state.renewPool
        state.renewPool = []
        callback(result)
    },
    SET_ROLE: (state, role) => {
        state.role = role
    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise((resolve) => {
            const accessedRoutes = roles.includes(CONSTANTS.USER_ROLE_SUPERVISOR) ? asyncRoutes || [] : filterAsyncRoutes(asyncRoutes, roles)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    },
    login({ commit }, userInfo) {
        const { email_phone, password, type } = userInfo
        if (type === CONSTANTS.LOGIN_TYPE_PASSWORD) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/v1/api/admin/login`, {
                        email_phone, password
                    })
                    .then(res => {
                        const { accessToken } = res.data.element
                        setToken(accessToken)
                        resolve(res.data);
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err);
                    });
            });
        }
    },
    resetToken({ commit }) {
        return new Promise((resolve) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_ROLE', '')
            commit('SET_AVATAR', '')
            commit('SET_NAME', '')
            commit('SET_ID', '')
            removeToken()
            resolve()
        })
    },

    async renewToken() {
        return new Promise((resolve, reject) => {
            axios
                .get(`/v1/api/admin/new/access`)
                .then(res => {
                    const { accessToken } = res.data.element
                    commit('SET_TOKEN', accessToken)
                    setToken(accessToken)
                    resolve(res.data);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                });

        });
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/v1/api/admin/profile`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                })
                .then(res => {
                    const { image, name, role, _id } = res.data.element
                    commit('SET_AVATAR', image)
                    commit('SET_NAME', name)
                    commit('SET_ROLE', role)
                    commit('SET_ID', _id)
                    resolve(res.data);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                });

        });
    },

    // dynamically modify permissions
    async changeRoles({ commit, dispatch }) {
        // get user info
        // note: roles must be a object array! such as: ['administrator'] or ,['developer','editor']
        const userInfo = await dispatch('getInfo')
        commit('SET_ROLES', [userInfo.element.role])
        commit('SET_ROLE', userInfo.element.role)
        commit('SET_NAME', userInfo.element.name)
        commit('SET_AVATAR', userInfo.element.image)

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes',
            [userInfo.element.role],
            {
                root: true
            }
        )
        console.log(accessRoutes)
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        await dispatch('tagsView/delAllViews', null, {
            root: true
        })
    },

    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/v1/api/admin/logout`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                })
                .then(res => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_ROLE', '')
                    commit('SET_AVATAR', '')
                    commit('SET_NAME', '')
                    commit('SET_ID', '')
                    removeToken()
                    resetRouter()
                    resolve(res.data);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                });

        });

    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

