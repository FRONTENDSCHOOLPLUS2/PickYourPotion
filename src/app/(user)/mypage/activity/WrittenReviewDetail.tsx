import Button from "@/components/Button";
import Image from "next/image";

import dummyImg from "@/../public/community-dummy.png";

export default function ReviewDetail() {
  return (
    <div className="flex gap-4 py-3">
      <Image src={dummyImg} alt="테스트용 이미지" width={112} height={112} className="round" />
      <div className="flex flex-col justify-between pt-1">
        <h2 className="contentMedium text-black">입셈로랑 막걸리</h2>
        <p className="description text-gray overflow-hidden text-ellipsis line-clamp-2">
          어디로 가야하죠 아저씨 우는 손님이 처음인가요 달리면 어디가 나오죠 빗속을 와이퍼는 뽀드득
          신경질 내는데 이별하지말란건지 청승좀 떨지마라 핀잔인건지 술이술이
        </p>
        <div className="flex gap-2 justify-end mt-2 text-[14px] font-medium h-[30px]">
          <Button color="disabled" className="py-0 align-middle">
            삭제
          </Button>
          <Button className="py-0 align-middle">수정</Button>
        </div>
      </div>
    </div>
  );
}
