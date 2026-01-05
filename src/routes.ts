import { createWebHistory, createRouter } from 'vue-router';

function initRouter(basePath: string) {
  let routes = [
    {
      path: '/',
      name: 'index',
      component: () => import('~/pages/index.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('~/pages/favorites.vue'),
    },
  ];

  routes = routes.map((el: any) => {
    el.path = `${basePath}${el.path}`;
    return el;
  });

  return createRouter({
    history: createWebHistory(),
    routes,
  });
}

export default initRouter;
