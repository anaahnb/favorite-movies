import { createWebHistory, createRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

function initRouter(basePath: string) {
  let routes = [
    {
      path: '/',
      name: 'index',
      component: () => import('~/pages/movies/index.vue'),
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('~/pages/movies/details.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('~/pages/favorites.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ];

  routes = routes.map((el: any) => {
    el.path = `${basePath}${el.path}`;
    return el;
  });

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach(async (to) => {
    const auth = useAuthStore();

    if (!auth.initialized) {
      await auth.fetchUser();
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
      return { path: '/' };
    }
  });


  return router;
}

export default initRouter;
