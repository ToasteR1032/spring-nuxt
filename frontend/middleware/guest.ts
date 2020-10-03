import {Middleware} from '@nuxt/types'
import {getModule} from "vuex-module-decorators";
import AuthStoreModule from "~/store/authStoreModule";

// destructuring of context (https://nuxtjs.org/api/context/) object in the parameter
const guest: Middleware = ({store, redirect}: any) => {
  const authStore: AuthStoreModule = getModule(AuthStoreModule, store);
  if (authStore.userData) {
    redirect('/')
  }
}

export default guest
