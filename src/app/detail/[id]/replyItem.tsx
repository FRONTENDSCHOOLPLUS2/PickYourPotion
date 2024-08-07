import Image from "next/image";
import iconLike from "../../../../public/images/icons/icon-like.svg";
import dummyImage from "../../../../public/community-dummy.png";
import { ProductDetail, ProductReplies } from "./page";
export default function ReplyItem({ item }: { item: ProductReplies }) {
  return (
    <>
      <div className="pt-5 border-gray">
        <form className="border-[0.5px] border-gray">
          <input className="" placeholder="이번 술은 어떠셨나요?" />
          <button type="submit">전송</button>
        </form>
        <div className="flex flex-row justify mt-5 between border-t-[0.5px] border-gray">
          <p className="mt-5 subTitleMedium">{item.user.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="description text-darkGray">{item.createdAt}</p>
        </div>
        <p className="mt-5 leading-5 description text-darkGray">{item.content}</p>
        <p className="mt-3 subTitleMedium">추천 안주</p>
        <div className="mt-3">
          <span className="px-[7px] py-[5px] text-darkGray bg-lightGray mr-4 round">
            소고기 육전
          </span>
          <span className="px-[7px] py-[5px] text-darkGray bg-lightGray mr-4 round">파전</span>
          <span className="px-[7px] py-[5px] text-darkGray bg-lightGray mr-4 round">칼국수</span>
        </div>
        <div className="mt-5">
          <Image src={dummyImage} width={348} height={228} alt="막걸리 이미지" className="round" />
        </div>
      </div>
    </>
  );
}
