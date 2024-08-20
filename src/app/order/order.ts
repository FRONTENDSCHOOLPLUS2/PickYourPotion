export interface Product {
  _id: number;
  name: string;
  quantity: number;
  price: number;
  image: ImageProps;
  reply_id?: number;
  extra: {
    brewery: string;
  };
}

export interface Order {
  _id: number;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  products: Product[];
}

export interface ImageProps {
  path: string;
  name: string;
  originalname: string;
}
