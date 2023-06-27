import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";

type UserState = {
  user: User
}

type Actions = {
  setUser: (user: User) => void,
  getUser: () => User,
  delUser: () => void,
}

export const useUserStore = create<UserState & Actions>()(
    persist(
      (set, get) => ({
        user: {} as User,
        setUser(user: User) {
          set(() => ({ user }))
        },
        getUser() {
          return get().user
        },
        delUser() {
          set(() => ({ user: {} as User }))
        }
      }),
      {
        name: StoreKey.User
      }
    ),
  );