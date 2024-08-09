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
