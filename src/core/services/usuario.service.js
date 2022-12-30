const ID_USUARIO_KEY = "key_usu";

export const getUsuario = () => {
    return JSON.parse(window.localStorage.getItem(ID_USUARIO_KEY));
};

export const saveUsuario = Usuario => {
    window.localStorage.setItem(ID_USUARIO_KEY, JSON.stringify(Usuario));
};

export const destroyUsuario = () => {
    window.localStorage.removeItem(ID_USUARIO_KEY);
};

export default { getUsuario, saveUsuario, destroyUsuario };