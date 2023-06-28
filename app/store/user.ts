import { create } from "zustand"
import { persist } from "zustand/middleware"
import Cookies from 'js-cookie'
import { StoreKey } from "../constant"

type UserState = {
  user: User
}

type Actions = {
  getToken: () => string,
  setUser: (user: User) => void,
  getUser: () => User,
  delUser: () => void,
}

export const useUserStore = create<UserState & Actions>()(
    persist(
      (set, get) => ({
        user: {} as User,
        getToken() {
          return Cookies.get('token') as string
        },
        setUser(user: User) {
          set({ user })
        },
        getUser() {
          return get().user
        },
        delUser() {
          console.log('delUser')
          set({ user: {} as User })
        }
      }),
      {
        name: StoreKey.User
      }
    ),
  );