import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";

type UserState = {
  user: User
}

type Actions = {
  setUser: (user: User) => void,
  delUser: () => void,
}

export const useUserStore = create<UserState & Actions>()(
    persist(
      (set, get) => ({
        user: {} as User,
        setUser(user: User) {
          set(() => ({ user }))
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