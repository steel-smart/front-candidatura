const FILIAIS = "ucpFiliais";
const FILIAL_ID = "ucpFilialId";

export const getFiliais = () => {
    return JSON.parse(window.localStorage.getItem(FILIAIS));
};

export const saveFiliais = Filial => {
    window.localStorage.setItem(FILIAIS, JSON.stringify(Filial));
};

export const destroyFilial = () => {
    window.localStorage.removeItem(FILIAIS);
    window.localStorage.removeItem(FILIAL_ID);
};

export const setFilialId = filialId => {
    window.localStorage.setItem(FILIAL_ID, filialId);
}

export const getFilialId = () => {
    return window.localStorage.getItem(FILIAL_ID);
}

export default {getFiliais, saveFiliais, destroyFilial, setFilialId, getFilialId};