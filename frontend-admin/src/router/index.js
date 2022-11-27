import Vue from 'vue';
import Router from 'vue-router';
import CONS from '../utils/constants'
/* Layout */
import Layout from '@/layout';
Vue.use(Router);

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        hidden: true,
        children: [
            {
                path: '/',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'Bảng Điều Khiển', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/profile',
        component: Layout,
        redirect: '/profile',
        hidden: true,
        children: [
            {
                path: '/',
                component: () => import('@/views/profile'),
                name: 'Profile',
                meta: { title: 'Tài khoản của tôi', icon: 'user', noCache: true }
            }
        ]
    }
];

export const asyncRoutes = [
    {
        path: '/user',
        component: Layout,
        meta: {
            roles: [CONS.ROLE_ADMIN, CONS.ROLE_USER]
        },
        children: [
            {
                path: 'list',
                component: () => import('@/views/user'),
                name: 'UserList',
                meta: {
                    icon: 'el-icon-s-custom',
                    title: 'Quản lý khách hàng'
                }
            },
        ]
    },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
