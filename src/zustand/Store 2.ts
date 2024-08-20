import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserStore {
  accessToken: string;
  refreshToken: string;
}
export const userStore = create<UserStore>((set) => ({
  accessToken: "",
  refreshToken: "",
}));

export interface ReplyStore {
  orderId: number;
  setOrderId: (id: number) => void;
  productId: number;
  setProductId: (id: number) => void;
}
export const replyStore = create<ReplyStore>((set) => ({
  orderId: 0,
  setOrderId: (id: number) => set({ orderId: id }),
  productId: 0,
  setProductId: (id: number) => set({ productId: id }),
}));
