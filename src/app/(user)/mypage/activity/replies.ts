import { ImageProps } from "@/app/order/order";

export interface Replies {
  _id: number;
  user: User;
  content: string;
  extra?: {
    title: string;
  };
  createdAt: string;
  product: Product;
}

export interface User {
  _id: number;
  name: string;
}

export interface Product {
  _id: number;
  image: ImageProps;
  name: string;
}
