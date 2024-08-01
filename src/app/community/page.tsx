import Image from "next/image";
import Link from "next/link";
import dummyImage from "../../../public/community-dummy.png";
import smallDummyImage from "../../../public/community-dummy-small.png";
export default function page() {
  return (
    <div className="flex flex-col ">
      <div className="justify-center max-w-3xl">
        <Image src={dummyImage} width={428} height={450} alt="막걸리 이미지" />
      </div>
      <div className="relative px-10 py-8 mt-[-30px]  max-w-[428px] bg-white round topShadow">
        <h1 className="titleMedium">로렘 입숨 생막걸리</h1>
        <p className="content text-darkGray text-ellipsis mt-2.5">
          프랑스 파리에서 만든 입숨막걸리 마셔봤는데 역시 명품 막걸리라 그런가 맛도 아주 좋았고
          패키지도 너무 고급 스러웠어요 ㅎㅎ 다들 추천 드려요 맛있게 드세요 ㅎㅎ
        </p>
        <p className="mt-12 titleMedium">추천 안주</p>
        <div className="mt-3">
          <span className="px-[7px] py-[5px] text-darkGray bg-lightGray mr-4 round">
            소고기 육전
          </span>
          <span className="px-[7px] py-[5px] text-darkGray bg-lightGray mr-4 round">파전</span>
          <span className="px-[7px] py-[5px] text-darkGray bg-lightGray mr-4 round">칼국수</span>
        </div>
        <p className="titleMedium mt-7">해당 상품</p>
        <Link href="#">
          <div className="flex flex-row">
            <Image src={smallDummyImage} width={120} height={120} alt="느린마을 막걸리" />
            <div className="flex flex-col mt-3 ml-5">
              <p className="contentMedium">나루 생 막걸리 11.5%</p>
              <span className="">
                <p className="mt-1 text-gray description">한강주조</p>
              </span>
              <p className="mt-1 text-gray description">깊고 묵직한 단맛의 막걸리</p>
              <p className="mt-1 text-black contentMedium">32,000원</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
