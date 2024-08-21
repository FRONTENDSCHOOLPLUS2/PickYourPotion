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
  name: string;
  setName: (name: string) => void;
  price: string;
  setPrice: (price: string) => void;
  image: string;
  setImage: (image: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  brewery: string;
  setBrewery: (brewery: string) => void;
}
export const useProductStore = create<ProductStore>((set) => ({
  showDetail: true,
  setShowDetail: (showDetail: boolean) => set({ showDetail }),
  name: "",
  setName: (name: string) => set({ name }),
  price: "",
  setPrice: (price: string) => set({ price }),
  image: "",
  setImage: (image: string) => set({ image }),
  quantity: 0,
  setQuantity: (quantity: number) => set({ quantity }),
  brewery: "",
  setBrewery: (brewery: string) => set({ brewery }),
}));
