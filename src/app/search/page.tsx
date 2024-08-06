import Image from "next/image";
import searchIcon from "../../../public/images/icons/icon-search.svg";
import Input from "@/components/Input";

export default function page() {
  return (
    <div className="flex flex-col mx-[25px] mt-14 max-w-[428px]">
      <div className="flex">
        <p className="font-medium  text-primary text-[36px]">어떤 술</p>
        <p className="text-[28px] font-light text-darkGray flex mt-1 items-center">을</p>
      </div>
      <p className="font-light text-darkGray text-[36px] mt-[-10px]">원하시나요?</p>
      <div className="flex mt-12">
        <Input type={""} id={""} width="w-full" />
        <button className="ml-[-30px]">
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
