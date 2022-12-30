
import ApiService from "@/core/services/api.service";


export const SET_LISTA_USUARIOS = "setListUsuarios";
export const SET_LISTA_USUARIOS_REV = "setListcontasRev";
export const SET_ROTA = "setRota"
export const SET_MESSAGE_ALERT = 'setMensagem'
export const SET_LISTA_USUARIOS_GIT = "setListUsuariosGit";


export const SET_CONTA ="setConta"


const actions = {
    //contas
    async create_usuarios(context, value) {
        await ApiService.post('usuario', value)
            .then(response => context.commit(SET_MESSAGE_ALERT, {
                tipo: 'success',
                message: response.data
            }))
            .catch((error) => context.commit(SET_MESSAGE_ALERT, {
                tipo: 'error',
                message: error.response.data
            }))
    },

    async update_usuarios(context, value) {

        await ApiService.put('usuario/'+value.id,value)
            .then(response => context.commit(SET_MESSAGE_ALERT, {
                tipo: 'success',
                message: response.data
            }))
            .catch((error) => context.commit(SET_MESSAGE_ALERT, {
                tipo: 'error',
                message: error.response.data
            }))
    },

    async listar_usuarios(context) {
        await ApiService.get('usuario')
            .then(response => {
                context.commit(SET_LISTA_USUARIOS, response.data)
            })
            .catch((error) => {
                context.commit(SET_MESSAGE_ALERT, {
                    tipo: 'error',
                    message: error.response.data
                })
            })
    },

    set_conta(context,item){
        context.commit(SET_CONTA, item)
    },
  
    async delete_usuarios(context, value) {
        await ApiService.delete("usuario/" + value.id)
          .then((response) =>
            context.commit(SET_MESSAGE_ALERT, {
              tipo: "success",
              message: response.data,
            })
          )
          .catch((error) =>
            context.commit(SET_MESSAGE_ALERT, {
              tipo: "error",
              message: error.response.data,
            })
          );
        context.commit(SET_LISTA_USUARIOS_REV, value)
      },

      set_rota(context, value) {
        context.commit(SET_ROTA,value)
      }
,
      async listar_usuarios_git(context) {
        await ApiService.get('usuario/git')
            .then(response => {
                context.commit(SET_LISTA_USUARIOS_GIT, response.data)
            })
            .catch((error) => {
                context.commit(SET_MESSAGE_ALERT, {
                    tipo: 'error',
                    message: error.response.data
                })
            })
    },


};
const getters = {};

const mutations = {
    [SET_LISTA_USUARIOS](state, value) {
        state.lista_usuarios = value;
    },
    [SET_LISTA_USUARIOS_GIT](state, value) {
        state.lista_usuarios_git = value;
    },
    [SET_LISTA_USUARIOS_REV](state, value) {
        state.lista_usuarios = state.lista_usuarios.filter(
            (contas) => contas.id !== value.id
        );
    },
    [SET_CONTA](state, value) {
        state.conta = value;
    },
    [SET_ROTA](state,value){
        state.rota = value
    },
    [SET_MESSAGE_ALERT](state, value) {
        console.log(value)
        let customMessage;
        if (typeof value.message === "object") {
    
          customMessage = value.message.msg;
        }
        state.mensagem_alert = {
          tipo: value.tipo,
          message: customMessage ? customMessage : value.message,
        };
      },

};

const state = {
    lista_usuarios: [],
    lista_usuarios_git:[],
    conta:{},
    mensagem_alert: "",
    rota:"",

};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
