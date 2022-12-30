<template>
  <div class="col-md-8">
    <v-card elevation="8" class="mb-4">
      <v-card-title class="card-header justify-content-between">
        <h3 class="mb-0">Dashboard</h3>
      </v-card-title>
    </v-card>
  <div class="row justify-content-md-center mt-5">
  

      <div  class="col-md-6 " v-for="(item,index) in lista_usuarios_git" :key="index" >
        
      <v-card  class="p-2 row align-items-center mt-3">

        <div class="col-md-2">
              <v-list-item-avatar>
                <v-img
                  :src="item.avatar_url"
                ></v-img>
              </v-list-item-avatar>
            </div>
            <div class="col-md-8">
               {{ item.name }}
               <br>
               <span class="ml-2" style="font-size:10px; font-weight: 300;"> Usuario desde {{ item.created_at }} </span>

            </div>
            <div class="col-md-2">
              {{ item.public_repos }}
          </div>

       
      </v-card>
    </div>
  </div>
</div>

</template>



<script>
import UsuarioService from "@/core/services/usuario.service";

export default {
  data() {
    return {
      lista_btn: [
        {
          button: "editar",
          title: "Editar registro",
          color: "primary",
          icon: "far fa-edit text-primary",
        },
        {
          button: "exclusao",
          title: "Bloquear/Desbloquear registro",
          color: "error",
          icon: "fas fa-unlock-alt text-danger",
        },
      ],
      currentPage: 1,
      perPage: 10,
    };
  },
  mounted() {
    if (UsuarioService.getUsuario()["perfil"] == 2) {
      this.$router.push({ name: "dashboard" });
    }
  },
  computed: {
    lista_usuarios_git() {
      return this.$store.state.usuarios.lista_usuarios_git;
    },
  },
  created() {

    this.listar_usuarios_git();
  },

  methods: {
    acoes(item, tipo) {
      if (tipo == "editar") this.atualizar(item);
      if (tipo == "exclusao") this.confirm(item);
    },
    async listar_usuarios_git() {
      await this.$store.dispatch("usuarios/listar_usuarios_git");
      this.$store.dispatch("configUsuarios/atualizar", "");
    },
  },
};
</script>

<style scoped>
.lista:hover {
  background-color: rgba(167, 183, 255, 0.705);
}
</style>