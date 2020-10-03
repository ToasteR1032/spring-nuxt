import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/utils/axios'

const axiosAccessor: Plugin = ({ $axios, store }) => {
  initializeAxios($axios, store)
}

export default axiosAccessor
