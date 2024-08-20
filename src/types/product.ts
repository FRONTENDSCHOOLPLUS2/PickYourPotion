export interface ProductItem {
  content: string;
  updatedAt: string;
  seller_id: number;
  name: string;
  type?: string;
  price: number;
  active: boolean;
  mainImages: [
    {
      path: string;
      name: string;
      originalname: string;
    },
  ];
  extra: {
    subTitle: string;
    description: string;
    discount: boolean;
  };
}
