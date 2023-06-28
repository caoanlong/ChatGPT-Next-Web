import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
// import { cookies } from 'next/headers'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

export function isServer() {
    return typeof window === 'undefined'
  }

function getToken() {
    // if (isServer()) {
    //     const cookieStore = cookies()
    //     return cookieStore.get('token')?.value
    // }
    return Cookies.get('token') as string
}

function getRootDomain() {
    let domain = window.location.host
    if (window.location.host.startsWith('www')) {
        domain = window.location.host.replace('www.', '')
    }
}

const baseURL = '/api'
const service = axios.create({
    withCredentials: true,
    baseURL,
    timeout: 15000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken()
    if (token && config.headers) {
        config.headers['Authorization'] = token
        config.headers['Cookie'] = `token=${token}`
    }
    return config
})

service.interceptors.response.use((res: AxiosResponse) => {
    if (res.data.code !== 200) {
        !isServer() && toast.error(res.data.message)
        if ([4000, 4001, 4002, 4003].includes(res.data.code)) {
            console.log(getRootDomain())
            Cookies.remove('token', {
                domain: '.' + getRootDomain()
            })
            if (!isServer()) {
                localStorage.removeItem('user')
            }
            return Promise.reject(res)
        }
        return Promise.reject(res)
    }
    return res
}, (err: AxiosError) => {
    console.log(err.response?.status)
    !isServer() && toast.error(err.response?.statusText as any)
    return Promise.reject(err)
})

export default service