import { ProductDetail } from "./page";
import ReplyItem from "./replyItem";

export default function Reply({ data }: { data: ProductDetail }) {
  const list = data.replies?.map((item) => <ReplyItem key={item._id} item={item} />);
  return <>{list}</>;
}
