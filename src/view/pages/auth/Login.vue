<template>
<div>
      <v-container fluid class="mt-10">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login Sistema</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="form.login"

                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="form.password"

                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onSubmitLogin()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
</template>

<script>
import { LOGIN, LOGOUT } from "@/core/store/auth.module";
import Swal from "sweetalert2";

export default {
  name: "Login",
  props: {
    source: String,
  },
  data() {
    return {
      state: "signin",
      // Remove this dummy login info
      form: {
        login: "",
        password: ""
      }
    };
  },
  methods:{
    
  onSubmitLogin() {
      this.$store.dispatch(LOGOUT);
      this.verif = true;

      this.$store
        .dispatch(LOGIN, this.form)
        .then(() => this.$router.push({ name: "dashboard" }))
        .catch(() => {
          Swal.fire({
            title: "Dados incorretos!",
            text: "Confira suas credenciais e tente novamente.",
            icon: "error",
          });
        })
        .finally(() => {

          this.verif = false});
    },
  }
};
</script>

<style></style>
