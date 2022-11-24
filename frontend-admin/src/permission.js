import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, setToken } from '@/utils/auth' // get token from cookie
import CONSTANTS from '@/utils/constants'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            setInterval(() => {
                store
                    .dispatch('permission/renewToken')
                    .then(data => {
                        // success renew token
                        console.log('renew token', data)
                        setToken(data.element.accessToken)
                    })

                    .catch(error => {
                        if (error) {
                            router.push({ path: '/login' })
                        }
                    })
            }, CONSTANTS._15_MINUTES)
            next()
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            await store.dispatch('permission/resetToken')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
