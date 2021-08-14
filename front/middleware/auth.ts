import { Middleware } from '@nuxt/types';

const privateRoutes = ['/note/edit', '/sandra'];

const authMiddleware: Middleware = context => {
  const { store, route, redirect, from } = context;
  if (store.state.user?.isLogin) return;
  if (privateRoutes.includes(route.path)) {
    // 未登录状态访问私有路由需要引导登录或者重定向
    if (process.server) {
      redirect('/');
    } else {
      store.dispatch('common/openAuthModal');
      redirect(from.path);
    }
    return new Promise(() => {});
  }
};

export default authMiddleware;
