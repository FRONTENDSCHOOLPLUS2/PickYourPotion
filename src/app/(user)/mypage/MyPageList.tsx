import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import arrowIcon from "@/../public/images/icons/icon-arrow-right.svg";

const MyPageList: React.FC = () => {
  const { data: session } = useSession();

  const handleItemClick = (item: string) => {
    if (item === "로그아웃") {
      signOut({ callbackUrl: "/" }); // 로그아웃 함수 호출 및 홈화면 이동
    }
  };

  const list = ["취소/환불 내역", "회원 정보", "1:1 쳇봇 상담", "고객센터", "로그아웃"];

  return (
    <ul className="px-3 mt-10 mb-24">
      {list.map((item) => (
        <li
          className="flex justify-between text-black py-3.5 cursor-pointer"
          key={item}
          onClick={() => handleItemClick(item)}
        >
          <span className="pt-1">{item}</span>
          <Image
            src={arrowIcon}
            alt="화살표 아이콘"
            width={20}
            height={28}
            className="w-[20px] h-[28px]"
          />
        </li>
      ))}
      {session?.user?.type === "admin" && (
        <li className="flex justify-between text-black py-3.5 cursor-pointer">
          <Link href="/admin" className="flex justify-between w-full">
            <span className="pt-1">관리자 페이지</span>
            <Image
              src={arrowIcon}
              alt="화살표 아이콘"
              width={20}
              height={20}
              className="w-[20px] h-[20px]"
              priority={true}
            />
          </Link>
        </li>
      )}
    </ul>
  );
};

export default MyPageList;
