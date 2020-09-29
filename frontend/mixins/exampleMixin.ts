import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class ExampleMixin extends Vue {
  someVar:string = "some variable";

  public someFunction(str: string): void {
    this.someVar = `${str}|${this.someVar}`;
  }
}