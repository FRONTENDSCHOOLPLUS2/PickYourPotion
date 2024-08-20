import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserStore {
  accessToken?: null | string;
  refreshToken?: null | string;
  setAccessToken: (accessToken: null | string) => void;
  setRefreshToken: (refreshToken: null | string) => void;
}
export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
    }),
    {
      name: "user-storage",
      getStorage: () => sessionStorage,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
interface ProductStore {
  showDetail: boolean;
  setShowDetail: (showDetail: boolean) => void;
}
export const useProductStore = create<ProductStore>((set) => ({
  showDetail: true,
  setShowDetail: (showDetail: boolean) => set({ showDetail }),
}));
