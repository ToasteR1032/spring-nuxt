<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ error.message }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

interface Error {
  message: string,
  statusCode: number
}
@Component({
  layout: 'empty',
})
export default class extends Vue {
  pageNotFound: string = "404 Not Found";
  @Prop({ required: false, default: null }) error!: Error;

  // set <title> in <head>
  public head() {
    return {
      title: this.error.statusCode === 404 ? this.pageNotFound : this.error.message
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
