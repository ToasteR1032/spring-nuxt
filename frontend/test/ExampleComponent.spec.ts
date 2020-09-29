import ExampleComponent from '@/components/ExampleComponent.vue'
import ExampleStoreModule from '@/store/examplestoremodule'
import BasicTestUtils from "./utils/basicTestUtils";


const basicTestUtils = new BasicTestUtils();

describe('ExampleComponent test', () => {
    let store: any;
    let wrapper: any;

    beforeEach(() => {
        // mocked state of Vuex Module
        const state = {
            attr1: "bla",
            attr2: "99"
        };
        // mocked mutations of Vuex Module
        const mutations = {
            // mocked function
            incAttr2: jest.fn()
        }
        store = basicTestUtils.getMockedStore(ExampleStoreModule, "exampleStoreModule", state, mutations, null, null);

        const props = {
            requiredProp: 42
        };

        wrapper = basicTestUtils.getWrapper(ExampleComponent, store, props)
    });
    // async and done() call only needed when await is used somewhere
    it('has to get html of v-card', async (done) => {
        const vcard = wrapper.find('#exampleVcard');
        //console.log(vcard.html());
        expect(vcard.html()).toBeDefined();
        done();
    });

    it('should show double attr2 value', () => {
        const doubleAttr2 = wrapper.find('#doubleAttr2');
        expect(doubleAttr2.text()).toBe("198");
    });


    it('incAttr2 on store has been called', () => {
        const btn = wrapper.find('#incButton');
        expect(ExampleStoreModule.mutations.incAttr2).not.toHaveBeenCalled();
        btn.trigger('click');
        expect(ExampleStoreModule.mutations.incAttr2).toHaveBeenCalled();
    });

})

