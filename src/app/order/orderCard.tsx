import Image from "next/image";

import dummyImg from "@/../public/community-dummy-small.png";

export default function OrderCard() {
  return (
    <div className="border border-gray rounded-xl py-3 px-3 flex justify-between my-2.5">
      <Image src={dummyImg} alt="테스트 이미지" width={50} height={50} />
      <div className="flex flex-col text-xs ml-6 text-gray">
        <p className="text-base font-medium text-black">로렘입숨 생막걸리</p>
        <span>17도</span>
        <span>입샘로랑 양조장</span>
      </div>
      <div className="flex text-[13px] items-end text-black">
        <span>24,000원/2개</span>
      </div>
    </div>
  );
}
