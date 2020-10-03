import { Plugin } from '@nuxt/types'
import {config, getModule} from 'vuex-module-decorators'
import AuthStoreModule from "../store/authStoreModule";

const startupConfig: Plugin = async ({store}: any) => {
  config.rawError = true; // Doesn't work somehow

  const authStore: AuthStoreModule = getModule(AuthStoreModule, store);
  await authStore.loadUserData();
}

export default startupConfig
