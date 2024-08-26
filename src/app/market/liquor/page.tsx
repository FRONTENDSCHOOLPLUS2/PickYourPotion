import { ProductDetail } from "@/app/detail/[id]/page";
import Card from "@/components/Card";

async function fetchProductList(params?: string[][]): Promise<ProductDetail[]> {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const searchParams = new URLSearchParams(params);
  const url = `${API_SERVER}/products?showSoldOut=true${"&" + searchParams.toString()}`;
  const res = await fetch(url, {
    headers: {
      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}
export default async function Page() {
  const spiritProduct = await fetchProductList([["custom", '{ "extra.category": "PC03" }']]);
  return (
    <ul className="flex flex-wrap justify-between px-6">
      {spiritProduct &&
        spiritProduct.map((item) => {
          return (
            <li key={item._id}>
              <Card data={item} />
            </li>
          );
        })}
    </ul>
  );
}
