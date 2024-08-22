import Image from "next/image";
import dummyImage from "../../../../public/community-dummy.png";
import { ProductReplies } from "./page";
import ReplyForm from "./ReplyForm";
export default function ReplyItem({ item }: { item: ProductReplies }) {
  return (
    <>
      <div className="pt-5 border-gray">
        <div className="flex flex-row mt-3 border-t-[0.5px] border-gray">
          <div className="flex justify-">
            <p className="mt-5 subTitleMedium">{item.user.name}</p>
            <p>삭제</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="description text-darkGray">{item.createdAt}</p>
        </div>
        <p className="mt-5 leading-5 description text-darkGray">{item.content}</p>
      </div>
    </>
  );
}
