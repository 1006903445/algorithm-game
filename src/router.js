import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
	    {
	        path: '/',
	        name: 'index',
	        component: Index,
	        children: [
                {
                    path: '/sd',
                    component: resolve => require(['@/components/sd/index'],resolve),
                    children: [
                        {
                            path: '/sd/3-3',
                            component: resolve => require(['@/components/sd/3-3'],resolve),
                        },
                        {
                            path: '/sd/9-9',
                            component: resolve => require(['@/components/sd/9-9'],resolve),
                        },
                    ]
                },
            ]
	    },
    ]
})
