import {Middleware} from '@nuxt/types'
import {getModule} from "vuex-module-decorators";
import AuthStoreModule from "~/store/authStoreModule";

// destructuring of context (https://nuxtjs.org/api/context/) object in the parameter
const auth: Middleware = ({store, redirect, route, error}: any) => {
  const authStore: AuthStoreModule = getModule(AuthStoreModule, store);
  if (!authStore.isLoggedIn) {
    redirect({path: '/login', query: {ref: route.path}});
    return;
  }

  const requiredRole = route.meta.length > 0 ? route.meta[0].role : null;
  if (requiredRole && !authStore.hasRole(requiredRole)) {
    error({
      message: 'You do not have the permission to view this site',
      statusCode: 403
    })
  }
}

export default auth
