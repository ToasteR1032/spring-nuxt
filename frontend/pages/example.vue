<template>
  <v-layout>
    <v-flex class="text-center">
      IP (page): {{ ip }}
      <example-component
        :requiredProp="1"
        @click="doSomething()"
      ></example-component>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import ExampleComponent from "~/components/ExampleComponent.vue";
import ExampleStoreModule from "~/store/exampleStoreModule";
import {getModule} from "vuex-module-decorators";

@Component({
  components: {
    ExampleComponent,
  },
})
export default class extends Vue {
  middleware: ['auth']
  ip2: string = "";
  store: ExampleStoreModule;

  created() {
    this.store = getModule(ExampleStoreModule, this.$store);
  }

  // loaded before page is rendered, only available on pages, parameter is context object
  // (We use destructuring here, $axios is attribute of context)
  // 'this' not available in asyncData
  // returned values are merged with 'data'
  // https://nuxtjs.org/api
  async asyncData({ $axios }: any) {
    const ip = await $axios.$get("https://icanhazip.com");
    return { ip };
  }

  // or use fetch, 'this' is available
  // assign attributes yourself
  // https://nuxtjs.org/api/pages-fetch/
  async fetch() {
    await this.store.loadIp();
    const ip = await this.$axios.$get("https://icanhazip.com");
    this.ip2 = ip;
  }

  doSomething() {
    console.log("parent received event");
  }
}
</script>
