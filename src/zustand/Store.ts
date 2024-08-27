import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ProductStore {
  showDetail?: boolean;
  setShowDetail?: (showDetail: boolean) => void;
  _id: number;
  setId?: (_id: number) => void;
  name: string;
  setName?: (name: string) => void;
  price: number;
  setPrice?: (price: number) => void;
  image: string;
  setImage?: (image: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  brewery: string;
  setBrewery?: (brewery: string) => void;
  alcohol: string;
  setAlcohol?: (alcohol: string) => void;
}

interface CartProductStore {
  cartData: ProductStore[];
  addToCart?: (item: ProductStore) => void;
  updateCartItem: (itemId: number, newQuantity: number) => void;
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
      storage: createJSONStorage(() => sessionStorage),
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
export const useCartProductStore = create<CartProductStore>()(
  persist(
    (set) => ({
      cartData: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cartData.find((cartItem) => cartItem._id === item._id);
          if (existingItem) {
            return state;
          }
          return {
            cartData: [...state.cartData, item],
          };
        }),
      updateCartItem: (itemId, newQuantity) =>
        set((state) => {
          const updatedCartData = state.cartData.map((cartItem) => {
            if (cartItem._id === itemId) {
              return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
          });
          return { cartData: updatedCartData };
        }),
    }),
    {
      name: "cart-product-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cartData: state.cartData,
      }),
    },
  ),
);
