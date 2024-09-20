import Image from "next/image";
import dummy from "../../../../public/community-dummy.png";
import { ProductReplies } from "./page";
export default function ReplyItem({ item }: { item: ProductReplies }) {
  return (
    <>
      <div className="pt-5 border-gray">
        <div className="flex flex-row mt-3 justify-between w-full border-t-[0.5px] border-gray">
          <p className="mt-5 subTitleMedium">{item.user.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="description text-darkGray">{item.createdAt}</p>
        </div>
        <div className="mt-3">
          <Image alt="test" width={87} height={114} src={dummy} />
        </div>
        <p className="mt-5 leading-5 description text-darkGray">{item.content}</p>
      </div>
    </>
  );
}
