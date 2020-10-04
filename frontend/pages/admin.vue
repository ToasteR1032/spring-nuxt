<template>
  <div>
    Data from Backend: {{ fromBackend }}
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "nuxt-property-decorator";
  import {Inject} from "vue-typedi";
  import ExampleService from "~/services/exampleService";
  import ExampleComponent from "~/components/ExampleComponent.vue";

  @Component({
    middleware: ['auth'],
    meta: {
      role: 'ADMIN',
    }
  })
  export default class extends Vue {
    @Inject()
    exampleService!: ExampleService;

    fromBackend: string = null;

    async fetch() {
      this.fromBackend = await this.exampleService.getAdminContent();
    }

  }
</script>

<style scoped>
</style>

