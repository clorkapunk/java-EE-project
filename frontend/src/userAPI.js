import {jwtDecode} from "jwt-decode";
import axios from "axios";

const REACT_APP_API_URL = 'http://localhost:8080/'

const $host = axios.create({
    baseURL: REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}

export const registration = async (firstname, lastname, email, password, role) => {
    const {data} = await $host.post('/api/v1/auth/register', {firstname, lastname, email, password, role})
    localStorage.setItem('token', data.access_token)
    return jwtDecode(data.access_token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('/api/v1/auth/authenticate', {email, password})
    localStorage.setItem('token', data.access_token)
    return jwtDecode(data.access_token)
}

export const check = async () => {
    const {data} = await $authHost.post('/api/v1/auth/refresh-token')
    localStorage.setItem('token', data.access_token)
    return jwtDecode(data.access_token)
}