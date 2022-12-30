<template>
  <div class="col-md-8">
    <v-card elevation="10">
      <v-card-title class="card-header justify-content-between">
        <h3 class="mb-0">
          {{ lista_campos != "" ? "Editar" : "Criar" }} Usuario
        </h3>
      </v-card-title>

      <div class="card-body">
        <div class="col-md-12">
          <form class="form"  @submit="confirm(lista_campos == '' ? 'cria' : 'edita')" >
            <div class="row form-group">
              <div class="col-md-3">
                <label for="saldo">nome:</label>
                <input
                  required=""
                  type="text"
                  class="form-control"
                  id="cpf"
                  v-model="form.nome"
                  placeholder="Digite o Nome"
                />
              </div>
              <div class="col-md-3">
                <label for="saldo">Login:</label>
                <input
                  required=""
                  type="text"
                  class="form-control"
                  id="cpf"
                  v-model="form.login"
                  placeholder="Digite o login"
                />
              </div>

              <div class="col-md-3">
                <label for="cpf">CPF ou CNPJ:*</label>
                <input
                  required=""
                  type="text"
                  class="form-control"
                  id="cpf"
                  v-mask="variableWithMask"
                  v-model="cpf_cnpj1"
                  placeholder="Digite o cpf ou Cnpj"
                />
              </div>

              <div class="col-md-3">
                <label >Senha:*</label>
                <input
                  required=""
                  type="text"
                  class="form-control"
                  id="cpf"
                  v-model="form.password"
                  placeholder="Digite a Senha"
                />
              </div>
            </div>
            <div class="row form-group ">
            <div class="col-md-3 pull-left">
              <div class="md-radio-inline">
                <label>Perfil:*</label>
                <div class="space d-flex">
                  <b-form-radio :inline="true" value="2" v-model="form.perfil">
                    Funcionario
                  </b-form-radio>

                  <b-form-radio :inline="true" value="1" v-model="form.perfil">
                    Admin
                  </b-form-radio>

             
                </div>
              </div>
            </div>
          </div>
          
        <div class="row justify-content-end">
          <div class="col-md-12 text-center">
            <v-btn
            type="submit" 
              color="primary"
              elevation="2"
              :loading="verif"
              class="btn btn-primary"
              :disabled="verif"
              >{{ !lista_campos.id ? "cria" : "edita" }}</v-btn
            >
          </div>
        </div>
        </form>  

        </div>


        <!-- </div> -->
      </div>
    </v-card>
  </div>
</template>

<script>
import { searchAddressMixin } from "@/core/mixins/searchAddressMixin";
import { fireAlert } from "@/core/mixins/alertMessageMixin";
import UsuarioService from "@/core/services/usuario.service";

export default {
  mixins: [searchAddressMixin, fireAlert],
  data() {
    return {
      verif: false,

      form: {
        nome: '',
        cpf_cnpj: '',
        usuario_id: null,
        login: '',
        perfil:1,
        password:''
      },
      variableWithMask: "",

      value: "",
      loading: false,
      cpf_cnpj1: '',
    };
  },
  mounted() {
    if(UsuarioService.getUsuario()['perfil'] ==2){
      this.$router.push({ name: "dashbord" });

    }
  },
  computed: {
    lista_usuarios() {
      let usuarios = Object.values(
        this.$store.state.configUsuarios.lista_usuarios
      );

      let data = [];
      for (let i = 0; i < usuarios.length; i++) {
        data.push({ id: usuarios[i].id, label: usuarios[i].nome_sobrenome });
      }
      return data;
    },
    mensagem_alert() {
      return this.$store.state.usuarios.mensagem_alert;
    },
    lista_perfil() {
      return this.$store.state.configUsuarios.lista_perfil;
    },
    lista_campos() {
      return this.$store.state.configUsuarios.lista_campos;
    },
  },
  created() {
    this.preenxerCampor();
  },
  watch: {
    cpf_cnpj1: function () {
      this.variableWithMask =
        this.cpf_cnpj1.length <= 14 ? "###.###.###-##" : "##.###.###/####-##";
      this.form.cpf_cnpj = this.cpf_cnpj1.replace(/[^0-9]/g, "");
    },
  },
  methods: {
    async confirm(tipo) {
      await this.$confirm({
        title: "Tem Certeza?",
        message: `Esta ação  ` + tipo + ` um Usuario no sistema?`,
        button: {
          no: "No",
          yes: "Si",
        },
        callback: (confirm) => {
          if (confirm) {
            if (tipo == "cria") this.create();
            if (tipo == "edita") this.update();
          }
        },
      });
    },
    async create() {
      this.verif = true;
      await this.$store.dispatch("usuarios/create_usuarios", this.form);
      this.verif = false;
      this.fireAlert({
        ...this.mensagem_alert,
        routeName: "listaUsuario",
      });
    },
    onInput(value) {
      let usuarios = Object.values(
        this.$store.state.configUsuarios.lista_usuarios
      );
      usuarios = usuarios.filter((use) => use.id === value);
      console.log(usuarios[0]);
      this.cpf_cnpj1 = usuarios[0].cpf;
    },
    async update() {
      this.verif = true;
      await this.$store.dispatch("usuarios/update_usuarios", this.form);
      this.verif = false;
      this.fireAlert({
        ...this.mensagem_alert,
        routeName: "listaUsuario",
      });
    },
    async preenxerCampor() {
      if (this.lista_campos != "")
        this.form = {
          id: this.lista_campos.id,
          nome: this.lista_campos.nome,
          login: this.lista_campos.login,
          usuario_id: this.lista_campos.users_id,
          perfil: this.lista_campos.perfil,
        };
      this.cpf_cnpj1 = this.lista_campos.cpf_cnpj;
    },
  },
};
</script>

<style scoped>
.lista:hover {
  background-color: rgba(167, 183, 255, 0.705);
}
</style>