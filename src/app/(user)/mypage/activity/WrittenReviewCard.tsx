import { Product } from "./replies";
import WrittenReviewDetail from "./WrittenReviewDetail";

interface WrittenReviewCardProps {
  createdAt: string;
  product: Product;
  content: string;
}

export default function WrittenReviewCard({ createdAt, product, content }: WrittenReviewCardProps) {
  const date = createdAt.split(" ")[0]; // 날짜 부분만 자르기
  return (
    <div>
      <p className="content text-darkGray">{date}</p>
      <WrittenReviewDetail product={product} content={content} />
    </div>
  );
}
