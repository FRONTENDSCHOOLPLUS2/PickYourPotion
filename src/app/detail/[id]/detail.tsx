import Image from "next/image";
import detailDummy from "../../../../public/detail_dummy.png";
import { ProductDetail } from "./page";
export default function Detail({ data }: { data: ProductDetail }) {
  const contentImg = `
    ${data.content}
  `;
  return (
    <>
      <div className="my-5" dangerouslySetInnerHTML={{ __html: contentImg }}></div>
    </>
  );
}
