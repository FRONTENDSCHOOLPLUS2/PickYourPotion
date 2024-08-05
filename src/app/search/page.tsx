import Image from "next/image";
import searchIcon from "../../../public/images/icons/icon-search.svg";

export default function page() {
  return (
    <div className="flex flex-col mx-[25px] mt-14">
      <p className="font-light text-darkGray text-[36px]">어떤 술을</p>
      <p className="font-medium text-primary text-[36px] mt-[-10px]">원하시나요?</p>
      <div className="flex justify-between mt-12 border-b-2 border-darkGray">
        <input placeholder="검색어를 입력하세요" className="mb-2 content" />
        <button>
          <Image src={searchIcon} width={35} height={35} alt="돋보기 버튼" />
        </button>
      </div>
      <p className="mt-10 text-darkGray">추천 검색어</p>

      <div className="flex flex-row flex-wrap content text-darkGray gap-[10px] mt-4">
        <button className=" px-4 py-2 border-2 border-peach rounded-[30px]">복순도가</button>
        <button className=" px-4 py-2 border-2 border-peach rounded-[30px]">막걸리</button>
        <button className=" px-4 py-2 border-2 border-peach rounded-[30px]">소주</button>
        <button className=" px-4 py-2 border-2 border-peach rounded-[30px]">맥주</button>
        <button className=" px-4 py-2 border-2 border-peach rounded-[30px]">복순도가각</button>
        <button className=" px-4 py-2 border-2 border-peach rounded-[30px]">복순도각도각</button>
      </div>
    </div>
  );
}
