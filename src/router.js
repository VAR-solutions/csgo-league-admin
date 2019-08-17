import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Announcements from "./views/Announcements.vue";
import Login from "./components/Login.vue";
import firebase from 'firebase/app';
import Players from './views/Players';
import Profile from './views/Profile';
import Auction from './views/Auction';
import Teams from './views/Teams';
import Fixtures from './views/Fixtures';
import PointsTable from './views/PointsTable'
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
      component: Login,
      meta: {
        title: 'Login to ADMIN | CS:GO League - Arcadia'
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
        title: 'Home Page | CS:GO League - Arcadia | ADMIN'
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
        requiresAuth: true,
        title: 'Announcements | CS:GO League - Arcadia | ADMIN'
      }
    },
    {
      path: "/players",
      name: "Players",
      component: Players,
      meta: {
        requiresAuth: true,
        title: 'Players | CS:GO League - Arcadia | ADMIN'
      }
    },
    {
      path: "/players/:id",
      name: "profile",
      component: Profile,
      props: true,
      meta: {
        requiresAuth: true,
        title: 'Player\'s Profile | CS:GO League - Arcadia | ADMIN'
      }
    },
    {
      path: "/auction",
      name: "Auction",
      component: Auction,
      meta: {
        requiresAuth: true,
        title: 'Auction | CS:GO League - Arcadia | ADMIN'
      }
    },
    {
      path: "/teams",
      name: "Teams",
      component: Teams,
      meta: {
        requiresAuth: true,
        title: 'Teams | CS:GO League - Arcadia | ADMIN'
      }
    },
    {
      path: "/fixtures",
      name: "Fixtures",
      component: Fixtures,
      meta: {
        requiresAuth: true,
        title: 'Fixtures | CS:GO League - Arcadia | ADMIN'
      }
    },
    {
      path: "/points-table",
      name: "PointsTable",
      component: PointsTable,
      meta: {
        requiresAuth: true,
        title: 'Points Table | CS:GO League - Arcadia | ADMIN'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  // if(!nearestWithMeta) return next();
  next()
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
