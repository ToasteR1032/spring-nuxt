import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {getModule} from "vuex-module-decorators";
import AuthStoreModule from "~/store/authStoreModule";

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance, store: any) {
  const authStore = getModule(AuthStoreModule, store);
  $axios = axiosInstance
  $axios.interceptors.request.use((config) => {
    const token = authStore.userData?.accessToken || localStorage.getItem('token');
    // Only add token to our api
    if (token && config.url[0] == '/') {
      config.headers.Authorization =  token ? `Bearer ${token}` : '';
    }
    return config;
  }, (error) => {
    Promise.reject(error);
  });
}

export { $axios }
