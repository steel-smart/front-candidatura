import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/jwt.service";
import FilialService from "@/core/services/filial.service";
import { LOGOUT } from "@/core/store/auth.module";
import Swal from "sweetalert2";
import store from "@/core/store/index";
import router from "@/core/router/router";

let isRefreshing = false;
/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;

    Vue.axios.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${JwtService.getToken()}`;
      config.headers["filial"] = FilialService.getFilialId();
      return config;
    });
    Vue.axios.interceptors.response.use(

      (successResponse) => {

        let tokenTTL = JwtService.getTokenTimingLeft();
        if (tokenTTL && tokenTTL / (1000 * 60) < 30 && isRefreshing === false) {
          isRefreshing = true;

          axios
            .create({
              baseURL: process.env.VUE_APP_API_URL,
              headers: { Authorization: `Bearer ${JwtService.getToken()}` },
            })
            .post(`auth/refresh`)
            .then(({ data }) => JwtService.saveToken(data.access_token))
            .finally(() => (isRefreshing = false));
        }

        return successResponse;
      },
      (error) => {
        if (
          error.response.status === 401 &&
          error.response.data !== "unauthorized"
        ) {
          store.dispatch(LOGOUT);
          router.push({ name: "login" });
          Swal.fire({
            title: "Realize login novamente!",
            icon: "error",
          });
        }
        return Promise.reject(error);
      }

    );


  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
    Vue.axios.defaults.headers.common["filial"] = FilialService.getFilialId();
  },

  setHeaderFilial() {
    Vue.axios.defaults.headers.common["filial"] = FilialService.getFilialId();
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch((error) => {
      throw new Error(`[KT] ApiService ${error}`);
    });
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  get(resource, params) {
    store.dispatch("configUsuarios/MudarPreloader", true)

    return Vue.axios.get(`${resource}`, params).catch((error) => {

      throw new Error(`[KT] ApiService ${error}`);
    }).finally(() => store.dispatch("configUsuarios/MudarPreloader", false));
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params, config) {
    return Vue.axios.post(resource, params, config);
  },

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource) {
    return Vue.axios.delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  getArquivo(rota, dados) {
    return axios
      .post(rota, dados, {
        responseType: "arraybuffer",
        Authorization: `Bearer ${JwtService.getToken()}`,
      })
      .then((response) => {
        console.log(response);

        let blob = new Blob([response.data], {
          type: response.headers["content-type"],
        }),
          url = window.URL.createObjectURL(blob);

        window.open(url); // Mostly the same, I was just experimenting with different approaches, tried link.click, iframe and other solutions
      });
  },
};

export default ApiService;
