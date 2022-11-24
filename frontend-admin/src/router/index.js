import Vue from 'vue';
import Router from 'vue-router';
/* Layout */
import Layout from '@/layout';
Vue.use(Router);

export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        name: 'Dashboard',
        children: [
            {
                path: '/',
                component: () => import('@/views/hello/index'),
                name: 'Hello'
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
];

export const asyncRoutes = [];

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
