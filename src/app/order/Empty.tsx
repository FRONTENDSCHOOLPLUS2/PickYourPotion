import Image from "next/image";

import EmptyImage from "@/../public/images/empty.png";
import Button from "@/components/Button";
import Link from "next/link";

export default function Empty() {
  return (
    <div className="h-screen mt-36 flex flex-col items-center">
      <Image src={EmptyImage} alt="주문내역이 비어있습니다." width={288} height={253} />
      <div className="flex flex-col items-center contentMedium text-gray mt-20">
        <p>주문내역이 비어있어요.</p>
        <p>지금 바로 술을 주문해 주세요.</p>
      </div>
      <Link href={"/"} className="w-full">
        <Button className="mt-40 w-full py-5">술 주문하러 가기</Button>
      </Link>
    </div>
  );
}
