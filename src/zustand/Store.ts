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
  _id: number;
  setId: (_id: number) => void;
  name: string;
  setName: (name: string) => void;
  price: number;
  setPrice: (price: number) => void;
  image: string;
  setImage: (image: string) => void;
  quantity: number;
  setQuantity?: (quantity: number) => void;
  brewery: string;
  setBrewery: (brewery: string) => void;
  alcohol: string;
  setAlcohol: (alcohol: string) => void;
}
export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      showDetail: true,
      setShowDetail: (showDetail: boolean) => set({ showDetail }),
      _id: 0,
      setId: (_id: number) => set({ _id }),
      name: "",
      setName: (name: string) => set({ name }),
      price: 0,
      setPrice: (price: number) => set({ price }),
      image: "",
      setImage: (image: string) => set({ image }),
      quantity: 1,
      setQuantity: (quantity: number) => set({ quantity }),
      Alcohol: "",
      brewery: "",
      setBrewery: (brewery: string) => set({ brewery }),
      alcohol: "",
      setAlcohol: (alcohol: string) => set({ alcohol }),
    }),
    {
      name: "product-storage",
      getStorage: () => sessionStorage,
      partialize: (state) => ({
        _id: state._id,
        name: state.name,
        price: state.price,
        image: state.image,
        quantity: state.quantity,
        brewery: state.brewery,
        alcohol: state.alcohol,
      }),
    },
  ),
);
