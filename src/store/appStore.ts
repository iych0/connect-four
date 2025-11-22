import { create } from 'zustand';
import type {IAppStore} from "../types.ts";

export const useAppStore = create<IAppStore>((set) => ({
    isMenuShown: false,

    showMenu: () => {
        set(() => ({
            isMenuShown: true,
        }))
    },

    hideMenu: () => {
      set(() => ({
          isMenuShown: false,
      }))
    }
}))