import { createRouter, createWebHistory } from 'vue-router';
import Swal from 'sweetalert2'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/myrent',
        name: 'myrent',
        meta: { login: true,
                user: true},
        component: () => import('../views/MyRent.vue')
    },
    {
        path: '/sign_in',
        name: 'sign_in',
        meta: { guess: true },
        component: () =>
            import('../views/Sign_in.vue')
    },
    {
        path: '/sign_up',
        name: 'sign_up',
        meta: { guess: true },
        component: () =>
            import('../views/Sign_up.vue')
    },
    {
        path: '/pay',
        name: 'pay',
        meta: { login: true,
            user: true},
        component: () =>
            import('../views/Pay.vue')
    },
    {
        path: '/detailcar/:id',
        name: 'detailcar',
        component: () =>
            import('../views/DetailCar.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        meta: { admin: true },
        component: () =>
            import('../views/Admin.vue')
    },
    {
        path: '/showcar',
        name: 'showcar',
        component: () =>
            import('../components/Home/ShowCar.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token');
    const isAdmin = !!localStorage.getItem('isAdmin')
    // if not login
    if (to.meta.login && !isLoggedIn) {
        // alert('Please login first!');
        const sweet = Swal.fire({
            icon: "warning",
            title: 'Please login first!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#41BEB1'
          })
        next({ path: '/sign_in' });
    }
    // check if user is not logged in or not an admin
    if (to.meta.admin && (!isLoggedIn || !isAdmin)) {
        // alert('You are not authorized to access this page!');
        const sweet = Swal.fire({
            icon: "warning",
            title: 'You are not authorized to access this page!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#41BEB1'
          })
        next({ path: '/' });
    }

    if (to.meta.user && (isAdmin)) {
        const sweet = Swal.fire({
            icon: "warning",
            title: 'You are not authorized to access this page!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#41BEB1'
          })
        next({ path: '/' });
    }

    if (to.meta.guess && isLoggedIn) {
        alert("You've already logged in");
        next({ path: '/myrent' });
    }

    next();
});





export default router;