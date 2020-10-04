import 'reflect-metadata'
import Vue, { VueConstructor } from 'vue'
import VueTypeDI, { Container } from 'vue-typedi'

export function install(
  vueConstructor: VueConstructor,
): void {
  // Installing Vue dependency:
  vueConstructor.use(VueTypeDI)
}

/* istanbul ignore next */
export default (): void => {
  install(Vue)
}
