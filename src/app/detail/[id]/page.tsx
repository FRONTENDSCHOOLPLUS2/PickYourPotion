import Image from "next/image";
import Link from "next/link";
import dummyImage from "../../../../public/community-dummy.png";
import smallDummyImage from "../../../../public/community-dummy-small.png";
export default function page() {
  return (
    <div className="flex flex-col ">
      <div className="justify-center max-w-3xl">
        <Image src={dummyImage} width={428} height={450} alt="막걸리 이미지" />
      </div>
      <div className="relative px-10 py-8 mt-[-30px]  max-w-[428px] bg-white round topShadow">
        <h1 className="title">복순도가(福順都家) 소주</h1>
        <p className="content text-darkGray text-ellipsis mt-2.5">
          Lorem Ipsum is simply dummy text of the printing and
        </p>
        <div className="flex flex-row mt-3">
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory mr-4 round ">
            <span className="text-black contentMedium">주종</span>
            <p className="description text-ellipsis w-[33px] h-[28px]">증류식 소주</p>
          </div>
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory mr-4 round ">
            <span className="text-black contentMedium">도수</span>
            <p className="description">10도</p>
          </div>
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory mr-4 round ">
            <span className="text-black contentMedium">용량</span>
            <p className="description">1L</p>
          </div>
          <div className="w-[82px] h-[64px] flex flex-col items-center justify-center bg-ivory mr-4 round ">
            <span className="text-black contentMedium">소비기한</span>
            <p className="description">무제한</p>
          </div>
        </div>
        <div className="flex flex-row border-2 round bg-lightGray">
          <button className="contentMedium w-[186px] h-[52px] bg-primary round text-white">
            상세 설명
          </button>
          <button className="w-[186px] h-[52px] contentMedium bg-lightGray round text-white">
            후기
          </button>
        </div>
      </div>
    </div>
  );
}
