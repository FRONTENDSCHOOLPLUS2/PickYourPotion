import Image from "next/image";
import iconLike from "../../../../public/images/icons/icon-like.svg";
import dummyImage from "../../../../public/community-dummy.png";
export default function Reply() {
  return (
    <>
      <div className="pt-5 border-gray">
        <form className="border-[0.5px] border-gray">
          <input className="" placeholder="이번 술은 어떠셨나요?" />
          <button type="submit">전송</button>
        </form>
        <div className="flex flex-row justify mt-5 between border-t-[0.5px] border-gray">
          <p className="subTitleMedium mt-5">혈중 알콜농도 면허 취소</p>
        </div>
        <div className="flex justify-between">
          <p className="description text-darkGray">@alcholfreeindechihae</p>
          <p className="description text-darkGray">2020년 10월 21일</p>
        </div>
        <p className="leading-5 description text-darkGray mt-5">
          어제 이 술마시고 오늘 저녁에 운전하다가 면허 취소 당했어요... 하지만 정말 맛은 좋고 끝에
          달달한 맛이 너무 달콤 합니다. 다들 이거 마시고 행복한 연애 하세요 ㅎㅎ 맛꿀마
        </p>
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
      <div className="pt-5 pb-5 border-gray">
        <div className="flex flex-row justify mt-5 between border-t-[0.5px] border-gray">
          <p className="subTitleMedium mt-5">복순도가 막걸리 맛있당</p>
        </div>
        <div className="flex justify-between">
          <p className="description text-darkGray">@testName123</p>
          <p className="description text-darkGray">2020년 10월 21일</p>
        </div>
        <p className="leading-5 description text-darkGray mt-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
        </p>
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
