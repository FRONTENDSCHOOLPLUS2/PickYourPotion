import DetailClient from "./detailClient";
export interface ProductImage {
  path: string;
  name: string;
  originalname: string;
}
export interface ProductDetail {
  name: string;
  price: number;
  mainImages: ProductImage[];
  content: string;
  _id: string;
  path: string;
}
export async function fetchPost(_id: string) {
  const API_SERVER = process.env.PICK_YOUR_POTION_API_SERVER;
  const CLIENT_ID = process.env.PICK_YOUR_POTION_CLIENT_ID;
  console.log(API_SERVER);
  const url = `${API_SERVER}/products/${_id}`;
  const res = await fetch(url, {
    headers: {
      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();
  console.log(resJson);
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchPost(params.id);
  return (
    <div className="flex flex-col ">
      <DetailClient data={data} />
    </div>
  );
}
