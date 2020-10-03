<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-alert id="error" v-if="error" type="error" elevation="12">{{error}}</v-alert>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="login" v-model="formValid">
              <v-text-field
                id="username"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="notEmptyRule"
                required
                autofocus
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                :rules="notEmptyRule"
                required
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn id="loginbtn" type="submit" :disabled="!formValid" color="primary">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from "nuxt-property-decorator";
  import {getModule} from "vuex-module-decorators";
  import AuthStoreModule from "~/store/authStoreModule";

  @Component({
    middleware: ['guest']
  })
  export default class extends Vue {
    formValid: boolean = false;
    notEmptyRule: Array<any> = [(v: any) => !!v || "This input is required"];
    username: string = "";
    password: string = "";
    error: string = null;
    authStore: AuthStoreModule;

    created() {
      this.authStore = getModule(AuthStoreModule, this.$store);
    }

    async login() {
      this.error = null;
      try {
        await this.authStore.login(
          {
            username: this.username,
            password: this.password,
          }
        );
        await this.$router.push(this.$route.query.ref as string || '/'); // cast 'ref' to string
      } catch (err) {
        this.error = err;
      }
    }
  }
</script>
