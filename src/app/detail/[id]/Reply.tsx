import { ProductDetail } from "./page";
import ReplyForm from "./ReplyForm";
import ReplyItem from "./ReplyItem";

export default function Reply({ data }: { data: ProductDetail }) {
  const list = data?.replies?.map((item) => <ReplyItem key={item._id} item={item} />);
  return (
    <>
      <ReplyForm />
      {list}
    </>
  );
}
