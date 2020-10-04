import {$axios} from '~/utils/axios';
import {Injectable} from "vue-typedi";

@Injectable()
export default class ExampleService {

  async getIp(): Promise<string> {
    return $axios.$get("https://icanhazip.com/");
  }

  async getUserContent(): Promise<string> {
    return $axios.$get("/test/user");
  }

  async getAdminContent(): Promise<string> {
    return $axios.$get("/test/admin");
  }
}
