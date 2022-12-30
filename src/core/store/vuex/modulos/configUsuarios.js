import ApiService from "@/core/services/api.service";
// import JwtService from "@/core/services/jwt.service";

export const SET_LISTA_USUARIOS_MATRICULAS = "setListUsuariosMatriculas"
export const SET_LISTA_USUARIOS_PESQUISA = "setListUsuariosPesquisa"
export const SET_LISTA_MATRICULAS_USUARIO = "setListMatriculasUsuarios"
export const SET_MESSAGE_ALERT = 'setMensagem'
const actions = {
    async create_usuario(context, value) {
        let message = await ApiService.post('usuario/criar', value)
            .then(response => ({tipo: 'success', message: response.data}))
            .catch((error) => ({tipo: 'error', message: error.response.data}))
        context.commit(SET_MESSAGE_ALERT, message)
    },
    async update_usuario(context, value) {
        let message = await ApiService.put('usuario/atualizar/'+value.id, value)
            .then(response => ({tipo: 'success', message: response.data}))
            .catch((error) => ({tipo: 'error', message: error.response.data}))
        context.commit(SET_MESSAGE_ALERT, message)
    },

    async pesquisar_usuarios(context, texto, tipo) {
        await ApiService.get('usuario/', texto, '/', tipo)
            .then(response => context.commit(SET_LISTA_USUARIOS_PESQUISA, response.data))
            .catch((error) => context.commit(SET_MESSAGE_ALERT, {
                tipo: 'error', message: error.response.data
            }))
    },
    
    async listar_matriculas_usuario(context, id) {
        await ApiService.get('matricula_grade_curricular/usuario/' + id)
            .then(response =>
                context.commit(SET_LISTA_MATRICULAS_USUARIO, response.data))
            .catch((error) => context.commit(SET_MESSAGE_ALERT, {
                tipo: 'error', message: error.response.data
            }))
    },

    
    async troca_senha(context, value) {
        let message = await ApiService.put('usuario/trocar/senha/'+value.id, value)
            .then(response => ({tipo: 'success', message: response.data}))
            .catch((error) => ({tipo: 'error', message: error.response.data}))
        context.commit(SET_MESSAGE_ALERT, message)
    },


    async MudarPreloader(context, value) {
        context.commit("SET_PRELOADER", value);
   
      },
      atualizar(context, value) {
        context.commit("SET_CAMPOS", value);
      },
    
};

const getters = {};

const mutations = {
    [SET_LISTA_USUARIOS_MATRICULAS](state, value) {
        state.lista_usuarios = value
    },
    [SET_LISTA_USUARIOS_PESQUISA](state, value) {
        state.lista_usuarios = value
    },
    [SET_LISTA_MATRICULAS_USUARIO](state, value) {
        state.lista_matriculas_usuario = value
    },
    [SET_MESSAGE_ALERT](state, value) {
        console.log(value)
        let customMessage;
        if (typeof value.message === "object") {
    
          customMessage = value.message.msg;
        }
        state.mensagem_alert = {
          tipo: value.tipo,
          message: customMessage ? customMessage : value.msg,
        };
      },
      SET_PRELOADER(state, value) {
        state.isLoading = value;
      },
      SET_CAMPOS(state, value) {
        state.lista_campos = value;
      },
};

const state = {
    lista_usuarios: [],
    lista_matriculas_usuario: [],
  isLoading: false,
  lista_campos:{}

};

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
};