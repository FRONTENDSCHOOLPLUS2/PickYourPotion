import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import WelcomeGif from "@/../public/images/welcome.gif";

export default function Page() {
  // const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-between h-full text-center text-black titleMedium">
      <div className="mt-20 ">
        {/* <p>{session?.user?.name}님,</p> */}
        <p className="text-primary">술상이 준비되었습니다!</p>
        <p className="">빠른 시일 내에 배송해드릴게요!!</p>
      </div>
      <Image
        src={WelcomeGif}
        alt="주문 성공 시 나오는 술잔이 부딫히는 애니메이션"
        width={428}
        height={428}
      />
      <Link href={"/"} className="w-full">
        <Button className="w-full py-5 mb-12 contentMedium">{"확인"}</Button>
      </Link>
    </main>
  );
}
