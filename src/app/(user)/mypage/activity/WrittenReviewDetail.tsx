import Button from "@/components/Button";
import Image from "next/image";

import { Product } from "./replies";

interface WrittenReviewDetailProps {
  product: Product;
  content: string;
}

export default function WrittenReviewDetail({ product, content }: WrittenReviewDetailProps) {
  return (
    <div className="flex gap-4 py-3">
      <Image
        src={`https://api.fesp.shop${product.image.path}`}
        alt={product.name}
        width={112}
        height={112}
        className="round w-[112px] h-[112px]"
        priority={true}
      />
      <div className="flex flex-col justify-between pt-1 w-full">
        <h2 className="subTitleMedium text-black">{product.name}</h2>
        <p className="content text-gray overflow-hidden text-ellipsis line-clamp-2">{content}</p>
        <div className="flex gap-2 justify-end mt-2 contentMedium">
          <Button color="disabled" className="">
            삭제
          </Button>
          <Button className="py-0 align-middle">수정</Button>
        </div>
      </div>
    </div>
  );
}
