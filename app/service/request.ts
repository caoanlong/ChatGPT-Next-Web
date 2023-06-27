import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
// import { cookies } from 'next/headers'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useUserStore } from '../store/user'


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
        !isServer && toast.error(res.data.message)
        if ([4000].includes(res.data.code)) {
            Cookies.remove('token')
            !isServer && useUserStore().delUser()
            return Promise.reject(res)
        }
        return Promise.reject(res)
    }
    return res
}, (err: AxiosError) => {
    console.log(err.response?.status)
    !isServer && toast.error(err.response?.statusText as any)
    return Promise.reject(err)
})

export default service