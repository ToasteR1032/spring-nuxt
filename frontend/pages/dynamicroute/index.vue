<template>
  <div>
    No Path - index file
    </div>
</template>

<script lang="ts">
// https://nuxtjs.org/guide/routing/#dynamic-routes

import { Component, Vue } from "nuxt-property-decorator";
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';
import ExampleStoreModule from "~/store/exampleStoreModule";
import { getModule } from 'vuex-module-decorators';

@Component
export default class extends Vue {
}
</script>

<style scoped>
</style>
