import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(name, value, options) {
    return Cookies.set(name, value, options)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
