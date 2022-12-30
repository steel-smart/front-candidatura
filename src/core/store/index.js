import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";




import usuarios from "./vuex/modulos/usuarios"

import configUsuarios from "./vuex/modulos/configUsuarios"




Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
   
        usuarios,
        configUsuarios,

      


    }
});