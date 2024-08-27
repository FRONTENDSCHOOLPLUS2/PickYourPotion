import Image from "next/image";

import EmptyImage from "@/../public/images/empty.png";
import Button from "@/components/Button";
import Link from "next/link";

export default function Empty() {
  return (
    <div className="flex flex-col items-center h-screen mt-36">
      <Image
        src={EmptyImage}
        alt="주문내역이 비어있습니다."
        width={288}
        height={253}
        className="w-[288px] h-[253px]"
      />
      <div className="flex flex-col items-center mt-20 contentMedium text-gray">
        <p>주문내역이 비어있어요.</p>
        <p>지금 바로 술을 주문해 주세요.</p>
      </div>
      <Link href={"/"} className="w-full">
        <Button className="w-full py-5 mt-40">술 주문하러 가기</Button>
      </Link>
    </div>
  );
}
