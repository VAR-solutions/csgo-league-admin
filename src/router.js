import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Announcements from "./views/Announcements.vue";
import Login from "./components/Login.vue";
import firebase from 'firebase/app';
import Players from './views/Players';
import Profile from './views/Profile';
import 'firebase/auth'
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/announcements",
      name: "Announcements",
      component: Announcements,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/players",
      name: "Players",
      component: Players,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/players/:id",
      name: "profile",
      component: Profile,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/login')
  } else if (!requiresAuth && currentUser) {
      next('/')
  } else {
      next()
  }
});

export default router;
