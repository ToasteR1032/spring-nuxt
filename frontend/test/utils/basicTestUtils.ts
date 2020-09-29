import Vuex from 'vuex';
import Vuetify from 'vuetify'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

export default class BasicTestUtils {
    private localVue: any;
    private vuetify: any;

    constructor() {
        this.localVue = createLocalVue();
        this.localVue.use(Vuex);
        this.vuetify = new Vuetify();
    }

    getMockedStore(module: any, moduleName: string, state: object, mutations: any, actions: any, getters: any) {
        const mod = module;
        if (state) mod.state = () => state;
        if (mutations) mod.mutations = mutations;
        if (actions) mod.actions = actions;
        if (getters) mod.getters = getters;

        const storeOptions: any = { modules: {} };
        storeOptions.modules[moduleName] = mod;

        return new Vuex.Store(storeOptions);
    }

    getWrapper(component: any, store: any, props: object = {}) {
        const localVue = this.localVue;
        const vuetify = this.vuetify;

        return mount(component, {
            localVue, store, vuetify,
            propsData: props, 
            mocks: {
                $t: (msg: string) => msg,
                $tc: (msg: string) => msg,
            }
        });
    }

    getShallowWrapper(component: any, store: any, props: object = {}) {
        const localVue = this.localVue;
        const vuetify = this.vuetify;

        return shallowMount(component, {
            localVue, store, vuetify,
            propsData: props, 
            mocks: {
                $t: (msg: string) => msg,
                $tc: (msg: string) => msg,
            }
        });
    }
}