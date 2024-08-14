import Image from "next/image";
import dummyImage from "../../../../public/community-dummy.png";
import { ProductReplies } from "./page";
import ReplyForm from "./ReplyForm";
export default function ReplyItem({ item }: { item: ProductReplies }) {
  return (
    <>
      <div className="pt-5 border-gray">
        <div className="flex flex-row justify mt-3 between border-t-[0.5px] border-gray">
          <p className="mt-5 subTitleMedium">{item.user.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="description text-darkGray">{item.createdAt}</p>
        </div>
        <p className="mt-5 leading-5 description text-darkGray">{item.content}</p>
      </div>
    </>
  );
}
