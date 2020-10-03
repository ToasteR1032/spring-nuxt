import {Module, VuexModule, Mutation, Action, MutationAction} from 'vuex-module-decorators'
import { $axios } from '~/utils/axios';

@Module({
  name: 'exampleStoreModule',
  stateFactory: true,
  namespaced: true,
})
export default class ExampleStoreModule extends VuexModule {
  attr1: string = "Example String";
  attr2: number = 1;
  ip: string = "";

  @Mutation
  SET_ATTR1([value1, value2]: [string, string]) {
    this.attr1 = `${value1} ${value2}`;
  }

  @Mutation
  incAttr2(inc: number) {
    this.attr2 += inc || 1;
  }

  @Mutation
  setAttr2(number: number) {
    this.attr2 = number;
  }

  /*
  @Mutation
  SET_IP(ip: string) {
    this.ip = ip;
  }
  */

  // Actions can be async and are only needed if your operations are asynchronous, otherwise just use a mutation
  @Action
  async setAttr1(value: string) {
    //const something = await $axios.$get('/');
    this.SET_ATTR1(['hello', value]);
  }

  /*
  @Action
  async loadIp() {
    const ip = await $axios.$get("https://icanhazip.com");
    this.SET_IP(ip);
  }
  */

  // or use MutationAction, combines Mutation and Action, return value sets state
  @MutationAction
  async loadIp() {
    const ip = await $axios.$get("https://icanhazip.com");
    return { ip }; // short for { ip: ip }
  }

  // Getter with some functionality, if no functionality is needed just access attribute directly
  get attr2Double() {
    return this.attr2 * 2
  }
}
