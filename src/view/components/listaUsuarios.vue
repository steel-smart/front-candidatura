<template>
    <div class="col-md-10">
     <v-card elevation="8">
        <v-card-title class="card-header justify-content-between">
          <h3 class="mb-0">Usuarios
          </h3>
          <v-btn color="info" @click="criar('usuario')" elevation="6">create Usuario</v-btn>

          </v-card-title
          
        >
        
        <div class="card-body">
          <b-table
          responsive 
            :fields="['nome', 'documento', 'login', 'acoes']"
            :items="lista_usuarios"
            :per-page="perPage"
            :current-page="currentPage"
            id="filiais-table"
            class="
              table
              table-head-custom
              table-vertical-center
              table-head-bg
              table-borderless
            "
            show-empty
            empty-text="Nenhum registro encontrado!"
          >
         
         
            <template #head(acoes)><span>acoes</span></template>
            <template #cell(acoes)="{ item }">
              <div class="text-right w-100">
                <v-tooltip
                  v-for="(btn, index) in lista_btn"
                  :key="index"
                  top
                  :color="btn.color"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      outlined
                      class="mr-1"
                      @click="acoes(item, btn.button)"
                      :color="btn.color"
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      <i :class="btn.icon"></i>
                    </v-btn>
                  </template>
                  <span>{{ btn.title }}</span>
                </v-tooltip>
              </div>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="lista_usuarios.length"
            :per-page="perPage"
            aria-controls="filiais-table"
          >
          </b-pagination>
        </div>
     </v-card>
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
    if(UsuarioService.getUsuario()['perfil'] ==2){
      this.$router.push({ name: "listaPlaca" });

    }
  },
  computed: {
    lista_usuarios() {
      return this.$store.state.usuarios.lista_usuarios;
    },
 
  },
  created() {
    this.listar_usuarios();
  },


  methods: {
    acoes(item, tipo) {
      if (tipo == "editar") this.atualizar(item);
      if (tipo == "exclusao") this.confirm(item);
      if(tipo == "entrar") this.gerenciarConta(item);
    },
    async listar_usuarios() {
      await this.$store.dispatch("usuarios/listar_usuarios");
      this.$store.dispatch("configUsuarios/atualizar", "");
    },
    atualizar(value) {
      this.$router.push({ name: "createUsuario" });
      this.$store.dispatch("configUsuarios/atualizar", value);
    },
    criar(nome) {
      if(nome == 'usuario' ){
      this.$router.push({ name: "createUsuario" });
      this.$store.dispatch("configUsuarios/atualizar", '');
      }else{
        this.$router.push({ name: "createPlaca" });
      this.$store.dispatch("configUsuarios/atualizar", '');
      }
    },
    async confirm(value) {
      await this.$confirm({
        title: "Tem Certeza?",
        message: `Esta ação faz Exclusao desse Usuario no sistema?`,
        button: {
          no: "No",
          yes: "Si",
        },
        callback: (confirm) => {
          if (confirm) {
            this.bloquear(value);
          }
        },
      });
    },
    async bloquear(value) {
      await this.$store.dispatch("usuarios/delete_usuarios", value);
      this.alertMessage(this.mensagem_alert.tipo, this.mensagem_alert.message);
    },
    alertMessage(tipo, mensagem) {
      this.$fire({
        title: "Aviso",
        text: mensagem,
        type: tipo,
        timer: 3000,
      }).then((r) => {
        console.log(r.value);
      });
    },
   

   

    
  },
};
</script>

<style scoped>
.lista:hover {
  background-color: rgba(167, 183, 255, 0.705);
}
</style>