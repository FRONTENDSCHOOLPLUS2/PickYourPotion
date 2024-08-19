import Image from "next/image";

import dummyImg from "@/../public/community-dummy.png";

export default function OrderDetail() {
  return (
    <div className="flex items-center">
      <Image src={dummyImg} alt="테스트용 이미지" width={75} className="round" />
      <div className="ml-3">
        <p className="contentMedium text-black">로렘입숨 생막걸리</p>
        <p className="description text-gray ">입셍로랑 양조장</p>
        <p className="text-[14px] font-medium">
          <span className="text-primary">23000원</span>
          <span> | 2개</span>
        </p>
      </div>
    </div>
  );
}
