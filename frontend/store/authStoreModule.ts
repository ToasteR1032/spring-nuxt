import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators'
import { $axios } from '~/utils/axios';
// import type!
import type UserData from "~/types/userData.ts";

@Module({
  name: 'authStoreModule',
  namespaced: true,
  stateFactory: true,
})
export default class AuthStoreModule extends VuexModule {
  // Important! Initialize with null, otherwise values are not correctly safed
  userData: UserData = null;

  @Mutation
  SET_USERDATA(userData: UserData) {
    this.userData = userData;
    if (userData) {
      localStorage.setItem('token', userData.accessToken);
    } else {
      localStorage.removeItem('token');
    }

  }

  @Action({rawError: true})
  async loadUserData(force: boolean = false) {
    const token = localStorage.getItem('token');
    if ((force || !this.userData) && token) {
      //const { data } = await $axios.get('/auth/user'); // TODO: load actual data from server
      //this.SET_USERDATA(data);

      this.SET_USERDATA({
        username: "someone",
        accessToken: token,
        roles: ['USER'],
      })
    }
  }

  // global config doesn't work, we have to set rawError in every @Action where were errors can occur or use @MutationAction when possible
  @Action({rawError: true})
  async login({ username, password }: any) {
    try {
      const { data } = await $axios.post('/auth/signin', { username, password })
      this.SET_USERDATA(data);
    } catch (error) {
     if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error;
    }
  }

  @Action
  async logout() {
    this.SET_USERDATA(null);
  }

  get isLoggedIn(): boolean {
    return this.userData != null;
  }

  // Getter with parameter: return a function
  get hasRole() {
    return (role: string) => this.userData?.roles.includes(role);
  }
}
