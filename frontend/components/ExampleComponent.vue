<template>
  <div>
    <v-card id="exampleVcard">
      <v-card-title>
        {{ $t("exampleComponent.welcome") }}: {{ ip }}
      </v-card-title>
      <v-card-text>
        <b>Variables from Store:</b> <br />
        IP: {{ store.ip }} <br />
        <br />
        {{ store.attr1 }} <br />
        <span id="doubleAttr2">{{ store.attr2Double }}</span> <br />
        <v-btn id="incButton" @click="store.incAttr2(1)">Increment</v-btn>
        <v-btn @click="store.setAttr2(1)">Reset</v-btn> <br />
        <br />
        <v-btn @click="buttonClickHandler()">Other Button</v-btn> <br />
        <br />
        {{ localVariable }} | {{ computedValue }} <br /><br />
        <b>Props:</b><br />
        {{ requiredProp }};{{ optionalProp }} <br /><br />
        <b>Variable from mixin:</b><br />
        {{ someVar }} <br />
        <br />

        <b>i18n:</b><br />
        {{ $t("exampleComponent.example") }} <br />
        {{ $t("exampleComponent.parameterExample", { param: "Some param" }) }}
        <br />
        {{ $tc("exampleComponent.pluralExample", 1) }}<br />
        {{ $tc("exampleComponent.pluralExample", 2) }}
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snackbar" timeout="1000">
      localVariable changed!
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Emit,
  Prop,
  mixins,
} from "nuxt-property-decorator";
import ExampleMixin from "~/mixins/exampleMixin";
import { getModule } from "vuex-module-decorators";
import ExampleStoreModule from "~/store/exampleStoreModule";
import ExampleService from "~/services/exampleService";
import {Inject} from "vue-typedi";
// import type!
import type SomeType from "~/types/someType";

interface TypeDefinedHere {
  something: string;
  anotherThing: number;
}

// When no mixin is used, use "extends Vue"
@Component
export default class ExampleComponent extends mixins(ExampleMixin) {
  store: ExampleStoreModule;

  @Prop({ required: true }) readonly requiredProp!: number;
  @Prop({ required: false, default: "not set" }) readonly optionalProp!: string;
  @Prop({ required: false }) readonly extractedType!: SomeType;
  @Prop({ required: false }) readonly typeDefinedHere!: TypeDefinedHere;

  @Inject()
  exampleService!: ExampleService;
  localVariable: number = 1;
  arr: Array<number> = [1, 2, 3];
  snackbar: boolean = false;
  ip: string = "";

  created() {
    // Somehow we get a 'maximum call stack exceeded' error when using fetch and intizializing a store attribute in the same component
    // like: "store: ExampleStoreModule = exampleStoreModule" or "store: ExampleStoreModule = getModule(ExampleStoreModule, this.$store)"
    // So we initialize store in created
    this.store = getModule(ExampleStoreModule, this.$store);
  }

  mounted() {
    console.log("mounted");
    console.log(this.$t("exampleComponent.example")); // i18n in typescript
  }

  // https://nuxtjs.org/api/pages-fetch/
  async fetch() {
    const ip = await this.exampleService.getIp();
    this.ip = ip;
  }

  async fetchSomething() {
    // If you don't use injected services (which you probably should) you can get axios from this.$axios
    const ip = await this.$axios.$get("https://icanhazip.com");
    console.log(ip);
  }

  get computedValue(): number {
    return this.localVariable * -1;
  }

  @Watch("localVariable")
  localVariableChanged(newVal: string) {
    console.log("localVariable changed");
    this.snackbar = true;
  }

  @Emit("emitted-event")
  buttonClickHandler() {
    console.log("button click");
    this.localVariable++;
  }
}
</script>

<style scoped>
</style>
