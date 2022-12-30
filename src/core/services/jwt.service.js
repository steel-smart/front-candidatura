const ID_TOKEN_KEY = "ucpTkn";

export const getToken = () => {
    return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
    window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const parseToken = (token = null) => {
    if (!token && !(token = getToken())) {
        return null
    }
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const getTokenTimingLeft = () => {
    let jwt = parseToken()
    if (!jwt) return null

    let exp = new Date(jwt.exp * 1000)

    // tempo restante para expirar o token em milissegundos
    let timeLeftToExpire = Math.floor(exp - new Date())
    // tempo de duração subtraído  5 minutos
    return timeLeftToExpire - (5 * 1000 * 60)
}

export default {
    getToken,
    saveToken,
    destroyToken,
    parseToken,
    getTokenTimingLeft
};
