import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import FilialService from "@/core/services/filial.service";
import UsuarioService from "@/core/services/usuario.service";
import router from "@/core/router/router";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const REFRESH_TOKEN = "refreshToken";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_PASSWORD = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve, reject) => {
      return ApiService.post("auth/login", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error.response);
          reject(error);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("login", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  async [REFRESH_TOKEN](context) {
    if (!JwtService.getToken()) {
      context.commit(PURGE_AUTH);
      return;
    }

    ApiService.post(`auth/refresh`)
      .then(({ data }) => JwtService.saveToken(data.access_token))
      .catch((error) => {
        console.log(error)
        context.commit(PURGE_AUTH);
        router.push({ name: "login" });
      });
  },
  [VERIFY_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();

      ApiService.get("verify")
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, data) {
    var filiais = data.filiais;
    var filialDataMapped = {};

    for (let index in filiais) {
      filialDataMapped[filiais[index].id] = {
        filial: filiais[index].filial,
        id: filiais[index].id,
        permissoes: filiais[index].permissoes,
      };
    }

    state.isAuthenticated = true;
    state.user = data.user;
    state.errors = {};

    JwtService.saveToken(data.access_token);
    UsuarioService.saveUsuario(data.user);
    FilialService.saveFiliais(filialDataMapped);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
    FilialService.destroyFilial();
    UsuarioService.destroyUsuario();
  },
};

const state = {
  errors: null,
  user: UsuarioService.getUsuario(),
  isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
